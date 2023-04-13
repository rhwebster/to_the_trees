const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            email: 'barney@awesome.com'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
});

router.use(restoreUser);

router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;