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

module.exports = router;