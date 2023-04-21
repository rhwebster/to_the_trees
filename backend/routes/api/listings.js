const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { User, Listing, TreehouseReview, Image, sequelize } = require('../../db/models');
const { ValidationError } = require('sequelize');

router.get('/', async(req, res, next) => {
    let {
        page, size, minLat, maxLat, minLon, maxLon, minPrice, maxPrice
    } = req.query;

    page = parseInt(page);
    size = parseInt(size);
    if (!page || isNaN(page) || page < 1) {
        page = 1;
    } else {
        page = parseInt(page);
    };

    if (!size || size > 10 || isNaN(size) || size < 1) {
        size = 10;
    } else {
        size = parseInt(size);
    }

    const where = {};

    const errorResult = {
        message: "Validation error",
        statusCode: 400,
        errors: {}
    }

    const offset = size * (page-1);

    where.minLat = (!isNaN(minLat) && minLat > -90 && minLat < 90) ? parseInt(minLat) : -90;
    where.maxLat = (!isNaN(maxLat) && maxLat > -90 && maxLat < 90) ? parseInt(maxLat) : 90;
    where.minLon = (!isNaN(minLon) && minLon > -180 && minLon < 180) ? parseInt(minLon) : -180;
    where.maxLon = (!isNaN(maxLon) && maxLon > -180 && maxLon < 180) ? parseInt(maxLon) : 180;
    where.minPrice = (!isNaN(minPrice) && minPrice > 0) ? parseInt(minPrice) : 0;
    where.maxPrice = (!isNaN(maxPrice) && maxPrice > minPrice) ? parseInt(maxPrice) : Infinity;

    if (Object.keys(errorResult.errors).length) {
        res.status(400);
        return res.json(errorResult);
    }

    const listings = await Listing.findAll({
        where,
        include: [{
            model: Image
        }],
        limit: size,
        offset: offset,
        order: ['id']
    });

    return res.json({
        listings,
        page,
        size
    })
});

router.get('/:listingId', async (req, res) => {
    const listing = await Listing.findByPk(req.params.listingId, {
        include: [
            {
                model: Image,
            },
            {
                model: TreehouseReview,
            }      
        ]
    });

    if (!listing) {
        res.status(404);
        return res.json({ message: "Listing couldn't be found" });
    };

    return res.json(listing);
});

router.post('/', requireAuth, async(req, res) => {
    const { name, address, cityState, description, maxGuests, 
        pricePerNight, lat, lon, previewImageId } = req.body;

    let newListing = await Listing.create({
        name, address, cityState, ownerId: req.user.id, description, 
        maxGuests, pricePerNight, lat, lon, previewImageId, rating: null
    });

    res.status(200);
    return res.json(newListing);
});

router.put('/:listingId', requireAuth, async(req, res)  => {
    const { name, address, cityState, description, maxGuests, 
        pricePerNight, lat, lon, previewImageId, rating } = req.body;
    
    const ownerId = req.user.id;
    const listing = await Listing.findByPk(req.params.listingId);

    if (!listing) {
        res.status(404);
        return res.json({ message: "Listing couldn't be found" });
    };

    if (listing.ownerId !== req.user.id) {
        res.status(403);
        return res.json({
            message: "Unauthorized",
            statusCode: 403
        });
    };

    await listing.update({
        name: name,
        address: address,
        cityState: cityState,
        ownerId: ownerId,
        description: description,
        maxGuests: maxGuests,
        pricePerNight: pricePerNight,
        lat: lat,
        lon: lon,
        previewImageId: previewImageId,
        rating: rating
    });

    return res.json(listing);
});

router.delete('/:listingId', requireAuth, async(req, res) => {
    const listing = await Listing.findByPk(req.params.listingId);

    if (!listing) {
        res.status(404);
        return res.json({
            message: "Listing couldn't be found",
            statusCode: 404
        });
    };

    if (listing.ownerId !== req.user.id) {
        res.status(403);
        return res.json({
            message: "Unauthorized",
            statusCode: 403
        });
    };

    await listing.destroy();

    return res.json({
        message: "Listing successfully deleted",
        statusCode: 200
    });
});

router.get('/:listingId/reviews', async(req, res) => {
    const listing = await Listing.findByPk(req.params.listingId);

    if (!listing) {
        res.status(404);
        return res.json({
            message: "Listing couldn't be found",
            statusCode: 404
        });
    }

    const reviews = await TreehouseReview.findAll({
        where: {
            listingId: req.params.listingId
        },
        include: [
            {
                model: User,
                arrtibutes: ['name']
            }
        ]
    });

    return res.json({ Reviews: reviews });
});

router.get('/:listingId/images', async(req, res) => {
    const listing = await Listing.findByPk(req.params.listingId);
    if (!listing) {
        res.status(404);
        return res.json({
            message: "Listing couldn't be found",
            statusCode: 404
        });
    }

    const images = await Image.findAll({
        where: {
            listingId: req.params.listingId
        }
    })

    return res.json({ Images: images });
});