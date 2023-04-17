const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { User, Listing, Reservation, Image } = require('../../db/models');
const { Validator } = require('sequelize');

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
})