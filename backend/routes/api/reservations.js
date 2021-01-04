const express = require('express');
const asyncHandler = require('express-async-handler');
const ReservationRepo = require('../../db/reservationRepo');
const { check } = require('express-validator');
const db = require('../../db/models/');
const handleValidationErrors = require('../../utils/validation');
const { restoreUser } = require('../../utils/auth');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/', restoreUser, asyncHandler(async(req, res, next) => {
    const user = await req.db.user.toJSON()
    const { reservations, listing } = await ReservationRepo.userList(user.id)
    res.json({ reservations, listing })
}));

router.get('/:id(\\d+)', restoreUser, asyncHandler(async(req, res, next) => {
    const reservation = await ReservationRepo.getOne(req.params.id);
    res.json(reservation);
}))

router.post('/', asyncHandler(async (req, res, next) => {
    const reservation = await ReservationRepo.getOne(req.body);
    res.json(reservation);
}))

router.put('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const reservation = await ReservationRepo.edit(req.body);
    res.json(reservation);
}))

router.put('/:id(\\d+)/confirm', asyncHandler(async (req, res, next) => {
    const reservation = await ReservationRepo.confirm(req.params.id)
    res.json(booking);
}))

router.patch('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const reservation = await ReservationRepo.cancelBooking(req.params.id)
    res.json(reservation);
}));
module.exports = router;