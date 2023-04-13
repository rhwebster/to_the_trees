const router = require('express').Router();
const asyncHandler = require('express-async-handler');
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

router.post('/', validateSignUp, asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    const user = await User.signup({ email, password, name });

    await setTokenCookie(res, user);

    return res.json({ user });
}));

module.exports = router;