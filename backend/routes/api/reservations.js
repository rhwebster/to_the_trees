const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const db = require('../../db/models/');
const handleValidationErrors = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/', restoreUser, asyncHandler(async(req, res, next) => {
    const user = await db.user.toJSON()
    const reservations = await db.Reservation.findAll({
        where: { userId: user.id },
    });
}));

router.get('/:id(\\d+)', restoreUser, asyncHandler(async(req, res, next) => {
    const reservation = await Reservation
}))

module.exports = router;