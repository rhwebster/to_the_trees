const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { User, Listing, Reservation, Image } = require('../../db/models');
const { Validator } = require('sequelize');
const { route } = require('./listings');

router.post('/', requireAuth, async(req, res) => {
    const { startDate, endDate, numGuests, listingId, guestId } = req.body;

    let newResy = await Reservation.create({
        startDate, endDate, numGuests, listingId, guestId
    });

    res.status(200);
    return res.json(newResy);
});

router.get('/', requireAuth, async(req, res) => {
    const resys = await Reservation.findAll({
        where: {
            guestId: req.user.id
        },
        include: [
            {
                model: Listing,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                },
                include: {
                    model: Image
                }
            }
        ]
    });

    resys.map(resy => resy.toJSON());
    
    res.json({ Reservations: resys });
});

router.put('/:resyId', requireAuth, async (req, res) => {
    const resy = await Reservation.findByPk(resyId);

    if (!resy) {
        res.status(404);
        return res.json({
            message: "Reservation couldn't be found",
            statusCode: 404
        })
    };

    if (req.user.id !== resy.guestId) {
        res.status(403);
        return res.json({
            message: "Unauthorized",
            statusCode: 403
        })
    };

    const { startDate, endDate } = req.body;

    const today = new Date().toString();

    if (Validator.isAfter(today, resy.startDate.toString())) {
        res.status(403);
        return res.json({
            message: "Reservations cannot be modified after they begin",
            statusCode: 403
        })
    };

    await resy.update({
        startDate: startDate,
        endDate: endDate
    });

    return res.json(resy);
});

router.delete('/:resyId', requireAuth, async(req, res) => {
    const resy = await Reservation.findByPk(req.params.resyId, {
        include: {
            model: Listing
        }
    });

    if (!resy) {
        res.status(404);
        return res.json({
            message: "Reservation couldn't be found",
            statusCode: 404
        })
    };

    if ((req.user.id !== resy.Listing.ownerId) && (req.user.id !== resy.guestId)) {
        res.status(403);
        return res.json({
            message: "Unauthorized",
            statusCode: 403
        })
    };

    const today = new Date().toString();

    if (Validator.isAfter(today, resy.startDate.toString())) {
        res.status(403);
        return res.json({
            message: "Reservations cannot be cancelled after they've begun",
            statusCode: 403
        })
    };

    await resy.destroy();

    return res.json({
        message: "Reservation successfully deleted",
        statusCode: 200
    });
});

module.exports = router;