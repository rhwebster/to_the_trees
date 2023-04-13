const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { User } = require('../../db/models');
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

module.exports = router;