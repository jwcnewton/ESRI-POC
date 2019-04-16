'use strict';
const simpleOauthModule = require('simple-oauth2');

const oauth2 = simpleOauthModule.create({
    client: {
        id: process.env.AUTHCLIENT_ID,
        secret: process.env.AUTHCLIENT_SECRET,
    },
    auth: {
        tokenHost: 'https://github.com',
        tokenPath: '/login/oauth/access_token',
        authorizePath: '/login/oauth/authorize',
    },
});

const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: 'http://localhost:8000/callback',
    scope: 'notifications',
    state: '3(#0/!~',
});

module.exports = {
    authorizationUri,
    oauth2,
};