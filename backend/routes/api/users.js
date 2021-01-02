const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('Name')
    .exists({ checkFalsy: true })
    .withMessage("Please provide aName")
    .isLength({ max: 50 })
    .withMessage("Name must not exceed 50 Characters"),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid email')
    .isEmail()
    .withMessage("Invalid email address")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Email Address is already in use"
          );
        }
      });
    }),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { name, email, password, username } = req.body;
    const user = await User.signup({ name, email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

module.exports = router;
