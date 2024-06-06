const express = require('express');
const User = require('../models/User');
const router = express.Router();

require('dotenv').config();

router.post('/register', async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;