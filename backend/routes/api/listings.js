const express = require('express');
const asyncHandler = require('express-async-handler');
const { Listing, User, TreehouseReview, Reservation, Favorite } = require('../../db/models');

const router = express.Router();

// Get all listings
router.get('/all', asyncHandler(async (req, res) => {
    const listings = await Listing.findAll({
        include: [User],
    });
    return res.json({ listings });
}));

// Get specific place
router.get('/:listingId', asyncHandler(async (req, res) => {
    const listingId = req.params.listingId;
    const listing = await Listing.findByPk(listingId);
    return res.json({ listing });
}));

// Get all listings from a specific user
router.get('/:userId/listings', asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const userListings = await Listing.findAll({
        where: {
            ownerId: userId
        },
        include: User,
    });
    return res.json({ userListings });
}));

// Create new listing
router.post('/', asyncHandler(async (req, res) => {
    const newListing = await Listing.create(req.body);
    return res.json(newListing);
}));

router.put('/:listingId', asyncHandler(async (req, res) => {
    const listingId = req.params.listingId;
    const editedListing = await Listing.findByPk(listingId, {
        include: User,
    });
    await editedListing.update(req.body);
    return res.json(editedListing);
}));

router.delete('/:listingId', asyncHandler(async (req, res) => {
    const listingId = req.params.listingId;
    const reviews = await Review.findAll({
        where: {
            listingId,
        },
    });
    reviews.forEach(async (review) => {
        await review.destroy();
    });
    const resys = await Reservation.findAll({
        where: {
            listingId,
        }
    });
    resys.forEach(async (resy) => {
        await resy.destroy();
    });
    const favorites = await Favorite.findAll({
        where: {
            listingId,
        },
    });
    favorites.forEach(async (favorite) => {
        await favorite.destroy();
    });
    const listing = await Listing.findByPk(listingId);
    await listing.destroy();
    return res.json(listing);
}));

module.exports = router;