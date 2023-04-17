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
            message: "Unauthorized",
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

router.delete('/:reviewId', requireAuth, async(req, res) => {
    const review = await TreehouseReview.findByPk(req.params.reviewId);

    if (!review) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    if (review.userId !== req.user.id) {
        res.status(403);
        return res.json({
            message: "Unauthorized",
            statusCode: 403
        });
    };

    await review.destroy();

    res.json({
        message: "Review successfully deleted",
        statusCode: 200
    });
});

module.exports = router;
