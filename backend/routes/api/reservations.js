const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { User, Listing, Reservation, Image } = require('../../db/models');

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

