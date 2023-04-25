const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { Listing, TreehouseReview, Reservation } = require('../../db/models');
const listing = require('../../db/models/listing');

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

    const reservations = await Reservation.findAll({
        where: {
            listingId: listingId,
            guestId: guestId
        }
    });

    if (!reservations) {
        res.status(403);
        return res.json({
            message: "You cannot review a treehouse without staying in it",
            statusCode: 403
        });
    };

    const userReviews = await TreehouseReview.findAll({
        where: {
            listingId: listingId,
            guestId: guestId
        }
    });

    if (userReviews.length > reservations.length) {
        res.status(403);
        return res.json({
            message: "You can only review a Treehouse once per stay",
            statusCode: 403
        });
    };

    listing.rating = ((listing.rating*listing.numReviews)+rating)/(listing.numReviews+1);
    listing.numReviews += 1;

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
    const listing = await Listing.findByPk(reviewToUpdate.listingId);

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

    listing.rating = ((listing.rating * listing.numReviews) 
            - reviewToUpdate.rating + req.body.rating) / listing.numReviews;

    const { body, rating } = req.body;

    await reviewToUpdate.update({
        body: body,
        rating: rating
    });

    return res.json(reviewToUpdate);
});

router.delete('/:reviewId', requireAuth, async(req, res) => {
    const review = await TreehouseReview.findByPk(req.params.reviewId);
    const listing = await Listing.findByPk(review.listingId);

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

    listing.rating = (((listing.rating*listing.numReviews)-review.rating) 
                        / (listing.numReviews-1));
    listing.numReviews -= 1;

    await review.destroy();

    res.json({
        message: "Review successfully deleted",
        statusCode: 200
    });
});

module.exports = router;
