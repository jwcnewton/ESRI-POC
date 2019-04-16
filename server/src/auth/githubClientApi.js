'use strict';
const request = require('superagent');
const githubUserUri = 'https://api.github.com/user';

function getUserDetails(token) {
    return request
        .get(githubUserUri)
        .query({ access_token: token })
        .set('Accept', 'application/json')
        .then(res => {
            return res.body.name ? res.body.name : res.body.login;
        });
};

module.exports = {
    getUserDetails
};