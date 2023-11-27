userController.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next(); // Continue to the next middleware or route handler
    } else {
        res.redirect('/login'); // Redirect to the login page if not logged in
    }
};

// Apply the isLoggedIn middleware to all /users routes
router.use('/', isLoggedIn);

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

// Update user page
router.post('/update/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/users');
});

// Add user endpoint
router.post('/add', async (req, res) => {
    await User.create(req.body);
    res.redirect('/users');
});

// Delete user endpoint
router.get('/delete/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
});

// Delete user route
router.get('/delete', (req, res) => {
    res.render('deleteuser');
  });
  
  router.post('/delete', async (req, res) => {
    try {
      const { name } = req.body;
  
      // Find and delete the user by username
      const deletedUser = await User.findOneAndDelete({ name });
  
      if (deletedUser) {
        res.redirect('/users');
      } else {
        res.render('userNotFound', { name });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;