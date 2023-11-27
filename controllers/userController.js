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
// Edit user page
router.get('/edit/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('edit', { user });
});

// Display user page
router.get('/display/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('display', { user });
});



module.exports = router;