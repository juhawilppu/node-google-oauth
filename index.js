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

const getCoordinates = async (address) => {
    const response = await axios({
        url: `https://api.digitransit.fi/geocoding/v1/search?text=${encodeURIComponent(address)}&size=1`,
        method: 'GET'
    });
    return response.data.features[0].geometry.coordinates;
}

const getItinerary = async (fromCoordinates, toCoordinates) => {

    const query = `{
        plan(
          from: {lat: ${fromCoordinates[1]}, lon: ${fromCoordinates[0]}}
          to: {lat: ${toCoordinates[1]}, lon: ${toCoordinates[0]}}
          date: "2019-03-25"
          time: "09:00:00"
          numItineraries: 1
          transportModes: [{mode: BUS}, {mode: RAIL}, {mode:TRAM}, {mode: FERRY}, {mode: WALK}]
          walkReluctance: 2
        ) {
          itineraries {
            legs {
              duration
              distance
            }
          }
        }
    }`;

    const response = await axios({
        url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
        method: 'post',
        data: {
            query
        }
    });

    const duration = response.data.data.plan.itineraries[0].legs.map(leg => leg.duration).reduce((a, b) => a+b, 0) / 60;
    const distance = response.data.data.plan.itineraries[0].legs.map(leg => leg.distance).reduce((a, b) => a+b, 0) / 1000;
    
    return {
        duration: duration.toFixed(0),
        distance: distance.toFixed(1)
    }    
}

const get = async (fromAddress, toAddress) => {
    const fromCoordinates = await getCoordinates(fromAddress);
    const toCoordinates = await getCoordinates(toAddress);
    const itinerary = await getItinerary(fromCoordinates, toCoordinates);
    return itinerary;
}


const test = async () => {
    const fromAddress = "Adjutantinkatu 3, 02650 ESPOO";
    const toAddress = "Vaisalantie 6, 02130 ESPOO";
    
    return await get(fromAddress, toAddress);
}

console.log(Date.now())
test().then(response => {
    console.log(Date.now());
    console.log(response);
});