const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google.clientId,
            clientSecret: keys.google.clientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then(existingUser => {
                    if (existingUser) {
                        // We already have saved this customer to db
                        done(null, existingUser);
                    } else {
                        // New user. Save it to db.
                        new User({
                            googleId: profile.id,
                            email: profile._json.email,
                            name: profile._json.name
                        })
                        .save()
                        .then(user => done(null, user));
                    }
                });
        }
    )
);