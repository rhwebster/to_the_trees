const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');

const validateLogin = [
    check("email")
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Please provide a valid email address"),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please enter a password"),
    handleValidationErrors,
]

router.post('/', validateLogin, asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.login({ email, password });

    if (!user) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["Invalid credentials"];
        return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({ user });
}));

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});

router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) return res.json({ user: user.toSafeObject() });
    else return res.json({});
});

module.exports = router;