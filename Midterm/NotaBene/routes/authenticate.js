const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication
    res.redirect('/dashboard');
  });

// Facebook Auth
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication
    res.redirect('/dashboard');
  });

// Apple Auth
router.get('/apple', passport.authenticate('apple'));

router.get('/apple/callback',
  passport.authenticate('apple', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication
    res.redirect('/dashboard');
  });

module.exports = router;




ADD-------

const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust path as necessary
const router = express.Router();

// Register new user
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

  if (!name || !email || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', { errors, name, email, password });
  } else {
    // Check if the email is already registered
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', { errors, name, email, password });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        newUser
          .save()
          .then(user => {
            req.flash('success_msg', 'You are now registered and can log in');
            res.redirect('/login');
          })
          .catch(err => console.log(err));
      }
    });
  }
});

// Login user
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout user
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
});

module.exports = router;
