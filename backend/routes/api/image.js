const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { Listing, Image } = require('../../db/models');
const { singlePublicFileUpload, multiplePublicFileUpload,
    singleMulterUpload, multipleMulterUpload } = require('../../awsS3');

router.post('/', requireAuth, multipleMulterUpload("images"), async (req, res) => {
    const { url, listingId } = req.body;

    const listing = await Listing.findByPk(listingId);

    if (!listing) {
        res.status(404);
        return res.json({
            message: "Listing couldn't be found",
            statusCode: 404
        })
    };

    if (listing.ownerId !== req.user.id) {
        res.status(403);
        return res.json({
            message: "Unauthorized",
            statusCode: 403
        })
    }

    const listingImages = await Image.findAll({
        where: {
            listingId: listingId,
        }
    });

    const imageUrls = await multiplePublicFileUpload(req.files);
    const res = { "Images": [] };

    for (const image of imageUrls) {
        const newImage = await listing.create({
            url: image,
            listingId: listingId
        })
        res.Images.push(newImage.toJSON());
    };

    return res.json(res);
})