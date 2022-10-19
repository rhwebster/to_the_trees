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


module.exports = router;