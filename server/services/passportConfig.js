const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google.clientId,
            clientSecret: keys.google.clientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                // We already have saved this customer to db
                done(null, existingUser);
            } else {
                // New user. Save it to db.
                const user = await new User({
                    googleId: profile.id,
                    email: profile._json.email,
                    name: profile._json.name
                }).save();
                done(null, user);
            }
        }
    )
);