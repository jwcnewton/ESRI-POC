const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const public = path.join(__dirname, 'client');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())

require('./server/controllers/authenticationController')(app, public);

require('./server/controllers/homeController')(app, public);

app.use('/', express.static(public));

app.listen(8080);