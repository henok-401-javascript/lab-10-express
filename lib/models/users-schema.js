'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({
  username: { type: 'string', unique: true, require: true },
  password: { type: 'string', require: true },
  firstname: { type: 'string', require: true },
  lastname: { type: 'string' },
});

schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const model = mongoose.model('persons', schema);

module.exports = model;
