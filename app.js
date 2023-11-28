const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersController = require('./controllers/userController');
const authController = require('./controllers/authController');
const Admin = require('./models/admin');


const app = express();

app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Mongo connect
const connectionString = 'mongodb+srv://group8:group8@cluster0.i9s0r05.mongodb.net/user_management_db';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


Admin.findOne({ username: 'admin' })
    .then(admin => {
        if (!admin) {
            return Admin.create({
                username: 'admin',
                password: 'admin123',
            });
        }
        return admin;
    })
    .then(createdAdmin => {
        console.log('Admin user created:', createdAdmin);

        
        app.use('/', authController);
        app.use('/users', usersController);


        
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error(err);
    });