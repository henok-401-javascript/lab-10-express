'use strict';
const app = require('./lib/server.js');
const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
  console.log('MONGODB IS ON');
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.start(PORT, MONGODB_URI);
