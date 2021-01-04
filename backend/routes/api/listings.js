const express = require("express");
const asyncHandler = require('express-async-handler');
const { Listing, Reservation } = require('../../db/models')
const { Op } = require('sequelize');

const router = express.Router();

router.get("/", asyncHandler(async (req, res, next) => {
    const listings = await Listing.findAll();
    res.json({ listings: listings });
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id)
    const listing = await Listing.findByPk(id);
    return res.json({ listing });
}))

module.exports = router;