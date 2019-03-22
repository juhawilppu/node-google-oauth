const express = require('express');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./models/User');
require('./services/passportConfig');
require('./routes/authRoutes')(app);
mongoose.connect(keys.mongo.URI);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log('ready')