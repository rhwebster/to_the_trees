const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { User, Reservation, GuestReview } = require('../../db/models');

router.post('/', requireAuth, async(req, res) => {
    const { body, rating, guestId } = req.body;
    const ownerId = req.user.id;

    
})

router.put('/:guestReviewId', requireAuth, async(req, res) => {
    const reviewToUpdate = await GuestReview.findByPk(req.params.guestReviewId);

    if (!reviewToUpdate) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    if (GuestReview.ownerId !== req.user.id) {
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

router.delete('/:guestReviewId', requireAuth, async(req, res) => {
    const review = await GuestReview.findByPk(req.params.guestReviewId);
    
    if (!reviewToUpdate) {
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    if (GuestReview.ownerId !== req.user.id) {
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