const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersController = require('./controllers/userController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Replace this connection string with your MongoDB Atlas connection string
const connectionString = 'mongodb+srv://group8:group8@cluster0.i9s0r05.mongodb.net/user_management_db';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/users', usersController);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});