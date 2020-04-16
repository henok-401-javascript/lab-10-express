'use strict';
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: { type: 'string', require: true },
  password: { type: 'string', require: true },
  lastname: { type: 'string' },
});

const model = mongoose.model('persons', schema);

module.exports = model;
