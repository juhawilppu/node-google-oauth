const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./models/Message');
require('./services/passportConfig');
mongoose.connect(keys.mongo.URL, {useNewUrlParser: true});

app.use(
   cookieSession({
       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
       keys: [ keys.cookieKey ] // cookie encryption key
   })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

require('./routes/authRoutes')(app);
require('./routes/messageRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve the client main.js etc.
    app.use(express.static('client/build'));

    // Express will redirect to / if it's doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log('Server started')