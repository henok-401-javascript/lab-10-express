'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

const auterRouter = require('./routes/auth-routes.js');
const swaggerDocument = require('../docs/swagger.js');
swaggerDocument(app);
app.use(morgan('div'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.get('/', (req, res, next) => {
  res.send('HOME PAGE!!');
});

app.use(auterRouter);

const serverHandler = (PORT) => {
  app.listen(PORT, () => {
    console.log('server is up', PORT);
  });
};

module.exports = {
  server: app,
  start: serverHandler,
};
