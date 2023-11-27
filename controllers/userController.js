const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Index page
router.get('/', async (req, res) => {
    const users = await User.find();
    res.render('index', { users });
});
// Add user page
router.get('/add', (req, res) => {
    res.render('add');
});


module.exports = router;