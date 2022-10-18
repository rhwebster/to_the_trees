const express = require('express');
const asyncHandler = require('express-async-handler');
const { Listing, User } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/:param', asyncHandler(async (req, res) => {
    const param = req.params.param;
    const res = await Listing.findAll({
        where: {
            name: {
                [Op.iLike]: `%${param}%`,
            },
        },
        include: User,
    });
    return res.json({ res });
}));

module.exports = router;