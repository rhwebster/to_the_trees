const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

module.exports = router;