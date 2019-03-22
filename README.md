# node-google-oauth

Test project for NodeJS using Google OAuth 2.0.

## How to configure Google OAuth
Got to [https://console.developers.google.com](https://console.developers.google.com) .

1. Create a new project by clicking the top bar, then click "NEW PROJECT". It takes about 1 minute until it's created.
2. On the "APIs & Services" -page Dashboard, click "ENABLE APIS AND SERVICES".
3. Search for "Google+ API" and open it. Click "Enable".
4. Goto "Credentials" -page. Click "CREATE CREDENTIAL".
5. Settings:
"Which API are you using" -> Google+ API
"Where will you be caliling the API from?" -> Web browser (Javascript)
"What data will you be accessing?" -> User data

Next, click on "What credentials do I need?"
Click "SET UP A CONSENT SCREEN". Write something to "Application name" and click "Save".

6. You should now be in "Credentials" -page again.
Click "Create credentials" -> OAuth client id.
"Application type" -> Web application
"Authorized JavaScript origins" -> http://localhost:5000
"Authorized redirect URIs" -> http://localhost:5000/

A popup should open with the keys.

7. Create a file `./config/keys.js" like below and insert the keys there.
```
module.exports = {
    google: {
        clientId: "${Insert here the Client ID}",
        clientSecret: "${Insert here the Client secret}"
    }
}
```

Google OAuth is now configured.

## How to create a Heroku project
Install Heroku CLI tools
```
brew tap heroku/brew && brew install heroku
```

Configure credentials and areate a new project
```
heroku login
heroku create
```

Heroku is now configured.

## Running locally
Remember to configure Google OAuth first.

```
git clone git@github.com:juhawilppu/node-google-oauth.git
cd node-google-oauth
npm install
npm start
```

The app should now be running on [localhost:5000](http://localhost:5000/).

## How to deploy
Create a Heroku project first.

```
git push heroku master
```

Go to https://limitless-ocean-63000.herokuapp.com/

## Built with
* NodeJS
* Express
* Heroku
* Google OAuth