const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { User, Listing, TreehouseReview, sequelize } = require('../../db/models');
const { ValidationError } = require('sequelize');

router.put('/:reviewId', requireAuth, async(req, res) => {
    const reviewToUpdate = await TreehouseReview.findByPk(req.params.reviewId);

    if (!reviewToUpdate) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    if (reviewToUpdate.userId !== res.user.id) {
        res.status(403);
        return res.json({
            message: "Forbidden",
            statusCode: 403
        });
    };

    const { body, rating } = req.body;

    await reviewToUpdate.update({
        body: body,
        rating: rating
    });

    return res.json(reviewToUpdate);
});

