const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { Listing, TreehouseReview } = require('../../db/models');

router.post('/', requireAuth, async (req, res) => {
    const { body, rating, listingId } = req.body;

    const listing = await Listing.findByPk(listingId);
    const guestId = req.user.id;

    if (!listing) {
        res.status(404);
        return res.json({
            message: "Listing couldn't be found",
            statusCode: 404
        });
    };

    const userReviews = await TreehouseReview.findAll({
        where: {
            listingId: listingId,
            guestId: guestId
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
        guestId: guestId,
        listingId: listingId,
        body: body,
        rating: rating
    })

    res.status(201);
    return res.json(review);
});

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
