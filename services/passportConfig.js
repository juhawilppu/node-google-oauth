const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google.clientId,
            clientSecret: keys.google.clientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            new User({
                googleId: profile.id,
                email: profile._json.email,
                name: profile._json.name
            }).save();
        }
    )
);