const express = require('express');
const asyncHandler = require('express-async-handler');
const { Reservation } = require('../../db/models');

const router = express.Router();

// Get all user reservations
router.get('/user/:userId', restoreUser, asyncHandler(async(req, res) => {
    const userId = await req.params.userId;
    const userResys = await Reservation.findAll({
        where: {
            userId,
        },
    });
    res.json(userResys);
}));

// Create a new reservation
router.post('/', asyncHandler(async (req, res) => {
    const reservation = await Reservation.create(req.body);
    return res.json(reservation);
}))

// Delete a reservation
router.delete('/:id', asyncHandler(async (req, res) => {
    const resyId = req.params.id;
    const reservation = await Reservation.findByPk(resyId);
    await reservation.destroy();
    return res.json(resyId);
}));

module.exports = router;