const express = require('express');
const asyncHandler = require('express-async-handler');
const { TreehouseReview, Listing, User } = require('../../db/models');

const router = express.Router();

// Get all of listing's reviews
router.get('/:listingId', asyncHandler(async (req, res) => {
    const listingId = req.params.listingId;
    const reviews = await TreehouseReview.findAll({
        where: {
            listingId,
        },
        include: User,
    });
    return res.json(reviews);
}))

// Delete your review
router.delete('/:reviewId', asyncHandler(async (req, res) => {
    const reviewId = req.params.reviewId;
    const review = await TreehouseReview.findByPk(reviewId);
    await review.destroy();
    return res.json(reviewId);
}));

// Edit a review
router.put('/:reviewId', asyncHandler(async (req, res) => {
    const reviewId = req.params.reviewId
    const review = await TreehouseReview.findByPk(reviewId);
    await review.update(req.body);
    return res.json(review);
}));

// Create a new review
router.post('/', asyncHandler(async (req, res) => {
    const review = await TreehouseReview.create(req.body);
    return res.json(review);
}))

// Get all reviews from a specific user
router.get('/:userId', asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const reviews = await TreehouseReview.findAll({
        where: {
            userId,
        },
        include: User,
    });
    return res.json({ reviews });
}));

// Get average rating for a listing
router.get('/:listingId/rating', asyncHandler(async (req, res) => {
    const listingId = req.params.listingId;
    let oneStar = 1, twoStar = 2, threeStar = 3, fourStar = 4, fiveStar = 5, avg = 0;
    const reviews = await TreehouseReview.findAll({
        where: {
            listingId,
        },
    });
    reviews.forEach(review => {
        switch (review.rating) {
            case '1':
                oneStar++;
                break;
            case '2':
                twoStar++;
                break;
            case '3':
                threeStar++;
                break;
            case '4':
                fourStar++;
                break;
            case '5':
                fiveStar++;
                break;
            default:
                return;
        }
    });
    avg = ((oneStar + twoStar*2 + threeStar*3 + fourStar*4 + fiveStar*5) / reviews.length);

    res.json({ avg: avg.toFixed(1), length: reviews.length, listingId });
}));

module.exports = router;