'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
app.use(morgan('div'));
app.use(cors());
app.use(express.json());

const auterRouter = require('./routes/auth-routes.js');

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
