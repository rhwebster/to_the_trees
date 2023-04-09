const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const listingsRouter = require('./listings.js')
const reservationsRouter = require('./reservations.js');
const treehouseReviewsRouter = require('./treehouseReview');
const favoritesRouter = require('./favorites');
const rentalAppRouter = require('./rentalApp');
const searchRouter = require('./search');
const imagesRouter = require('./images');

// GET /api/set-token-cookie
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/listings', listingsRouter);
router.use('/reservations', reservationsRouter);
router.use('/treehouseReviews', treehouseReviewsRouter);
router.use('/favorites', favoritesRouter);
router.use('/rentalApp', rentalAppRouter);
router.use('/search', searchRouter);
router.use('/images', imagesRouter);

module.exports = router;
