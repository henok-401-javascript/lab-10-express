'use strict';
///// Resources
const express = require('express');

////////// Internal routes /////
// const persons = require('../models/model.js');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  // let results = persons.update();
  res.send('sign up');
});

router.post('/signin', (req, res, next) => {
  res.send('sign in');
});

module.exports = router;
