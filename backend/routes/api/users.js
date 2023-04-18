const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { User, GuestReview, Listing, Image, TreehouseReview } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');

const validateSignUp = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email address'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name field must be filled'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    handleValidationErrors,
];

router.post('/', validateSignUp, async (req, res) => {
    const { email, password, name, profilePicUrl } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, hashedPassword, name, profilePicUrl });

    const safeUser = {
        id: user.id,
        email: user.email,
    }

    await setTokenCookie(res, safeUser);

    return res.json({ user: safeUser });
});

router.get('/:guestId/reviews', requireAuth, async (req, res) => {
    const guest = await User.findByPk(req.params.guestId);

    if (!guest) {
        res.status(404);
        return res.json({
            message: "User couldn't be found",
            statusCode: 404
        });
    };

    const reviews = await GuestReview.findAll({
        where: {
            guestId: req.params.guestId
        }
    });

    reviews.map(review => review.toJSON());

    return res.json({ Reviews: reviews });
});

router.get('/:ownerId/listings', requireAuth, async(req, res) => {
    const ownerId = req.params.ownerId;
    const listings = await Listing.findAll({
        where: {
            ownerId: ownerId
        },
        include: [{
            model: Image,
        },
        {
            model: TreehouseReview,
        }]
    });

    listings.map(listing => listing.toJSON());

    res.json({
        Listings: listings
    });
})

module.exports = router;