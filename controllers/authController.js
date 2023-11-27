// authController.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

// Login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Logout endpoint
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/login');
        }
    });
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (admin && admin.password === password) {
            req.session.isLoggedIn = true;
            res.redirect('/users');
        } else {
            res.render('login', { error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
admin.js

// auth/models/admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Admin', adminSchema);