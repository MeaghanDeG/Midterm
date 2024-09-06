const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    User.findOne({ email }).then(user => {
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        } else {
            const newUser = new User({ name, email, password });

            newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        }
    });
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) return res.status(400).json({ message: info.message });
        req.logIn(user, (err) => {
            if (err) throw err;
            res.json({ user });
        });
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.json({ message: 'Logged out' });
    });
});

module.exports = router;
