const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const axios = require('axios');

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

console.log('making call to graphql');

//const from = "Adjutantinkatu 3, 02650 ESPOO";
//const to = "Vaisalantie 6, ESPOO";

axios({
    url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
    method: 'post',
    data: {
        query: `{
            plan(
              from: {lat: 60.168992, lon: 24.932366}
              to: {lat: 60.175294, lon: 24.684855}
              numItineraries: 1
            ) {
              itineraries {
                legs {
                  duration
                  distance
                }
              }
            }
        }`
    }
}).then(response => {
    console.log(response.data);

    const duration = response.data.data.plan.itineraries[0].legs.map(leg => leg.duration).reduce((a, b) => a+b, 0) / 60;
    const distance = response.data.data.plan.itineraries[0].legs.map(leg => leg.distance).reduce((a, b) => a+b, 0) / 1000;

    console.log(`total duration ${duration.toFixed(0)} min`)
    console.log(`total distance ${distance.toFixed(1)} km`)

});