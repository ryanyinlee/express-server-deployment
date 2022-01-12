'use strict';
require('dotenv').config();
const server = require('./src/server.js');

// const server = require('./app.js');


server.start(process.env.PORT || 3000);