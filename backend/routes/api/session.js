const router = require('express').Router();
const { check } = require('express-validator');
const { User } = require('../../db/models');
const bcrypt = require('bcryptjs');
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

router.post('/', validateLogin, async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.unscoped().findOne({ 
        where: { email: email }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["Invalid credentials"];
        return next(err);
    }

    const safeUser = {
        id: user.id,
        email: user.email,
    };

    await setTokenCookie(res, safeUser);

    return res.json({ user: safeUser });
});

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});

router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
        const safeUSer = {
            id: user.id,
            email: user.email,
        };
        return res.json({ user: safeUser });
    } else return res.json({ user: null });
});

module.exports = router;