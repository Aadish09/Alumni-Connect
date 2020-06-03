const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const gravator = require('gravatar');
const encrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('config');
// @route   POST /api/user
// @desc    Register User
// @access  Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password of 6 or more charactors'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // find user is already registered
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      // Get user gravator
      const avatar = gravator.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt the password
      const salt = await encrypt.genSalt(10);
      user.password = await encrypt.hash(password, salt);
      await user.save();
      // Return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //res.send('User registered');
    } catch (err) {
      Console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
