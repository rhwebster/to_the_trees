const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { User, Listing, TreehouseReview, sequelize } = require('../../db/models');
const { ValidationError } = require('sequelize');

router.post('/:listingId/reviews', requireAuth, async(req, res) => {
    const { body, rating } = req.body;

    const listing = await Listing.findByPk(req.params.spotId);

    if (!listing) {
        res.status(404);
        return res.json({
            message: "Listing couldn't be found",
            statusCode: 404
        });
    };

    const userReviews = await TreehouseReview.findAll({
        where: {
            listingId: req.params.listingId,
            userId: req.user.id
        }
    });

    if (userReviews.length) {
        res.status(403);
        return res.json({
            message: "You have already reviewed this Treehouse",
            statusCode: 403
        });
    };

    let review = await TreehouseReview.create({
        userId: req.user.id,
        listingId: req.params.listingId,
        body: body,
        rating: rating
    })

    res.status(201);
    return res.json(review);
});