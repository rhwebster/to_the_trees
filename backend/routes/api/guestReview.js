const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { User, Reservation, GuestReview } = require('../../db/models');

router.post('/', requireAuth, async(req, res) => {
    const { body, rating, guestId, reservationId } = req.body;
    const ownerId = req.user.id;

    const guest = await User.findByPk(guestId);
    const owner = await User.findByPk(ownerId);
    const reservation = await Reservation.findByPk(reservationId);

    if (!guest || !reservation) {
        res.status(404);
        return res.json({
            message: "Guest's reservation couldn't be found",
            statusCode: 404
        });
    };

    if (owner.id !== reservation.ownerId) {
        res.status(403);
        return res.json({
            message: "You cannot review a guest unless you are the owner of a Treehouse they stayed in",
            statusCode: 403
        });
    };

    const reviews = await GuestReview.findAll({
        where: {
            reservationId: reservationId
        }
    });

    if (reviews.length) {
        res.status(403);
        return res.json({
            message: "You can only review a guest once per stay"
        })
    };

    let guestReview = await GuestReview.create({
        body: body,
        rating: rating,
        guestId: guestId,
        reservationId: reservationId,
        ownerId: ownerId
    });

    res.status(201);
    return res.json(guestReview);
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