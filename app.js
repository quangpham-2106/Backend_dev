const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersController = require('./controllers/userController');
const authController = require('./controllers/authController');
const Admin = require('./models/admin');


const app = express();

app.use(session({
    secret: '123', // Change this to a secure key
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Replace this connection string with your MongoDB Atlas connection string
const connectionString = 'mongodb+srv://group8:group8@cluster0.i9s0r05.mongodb.net/user_management_db';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the admin user exists, if not, create it
Admin.findOne({ username: 'admin' })
    .then(admin => {
        if (!admin) {
            // Create the admin user
            return Admin.create({
                username: 'admin',
                password: 'admin123',
            });
        }
        return admin; // Return the existing admin if found
    })
    .then(createdAdmin => {
        console.log('Admin user created:', createdAdmin);

        // Routes
        app.use('/', authController);
        app.use('/users', usersController);


        // Start server
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error(err);
    });