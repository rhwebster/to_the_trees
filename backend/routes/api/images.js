const express = require('express');
const asyncHandler = require('express-async-handler');
const { Image } = require('../../db/models');

const router = express.Router();

router.get('/:listingId', asyncHandler(async (req, res) => {
    const listingId = req.params.listingId;
    const listingImages = await Image.findAll({
        where: {
            listingId,
        },
    });
    return res.json({ listingImages });
}));

module.exports = router;