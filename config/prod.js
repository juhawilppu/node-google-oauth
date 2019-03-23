// Production keys are defined here
module.exports = {
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    mongo: {
        URL: process.env.MONGO_URL
    },
    cookieKey: process.env.COOKIE_KEY,
    sendGridKey: process.env.SENDGRID_KEY
}