const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./controllers/authenticationController')(app);
require('./controllers/shapesController')(app);

app.listen(8000);