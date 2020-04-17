'use strict';
const persons = require('./users-schema.js');

class Model {
  constructor(schema) {
    this.schema = schema;
  }
  async create(data) {
    let results = await this.schema.create(data);
    return results.save();
  }
  async read(_id) {
    let results = await this.schema.findById(_id);
    return results;
  }
  async readByQuery(query) {
    let result = await this.schema.find(query);
    return result;
  }
  async readAll() {
    let result = await this.schema.find();
    return result;
  }
  async update(_id, record) {
    let results = await this.schema.findByIdAndUpdate(_id, record);
    if (results && results.nModified === 1) {
      let result = await this.read(_id);
      return result;
    } else {
      return false;
    }
  }
  async delete(_id) {
    let result = await this.schema.findByIdAndDelete(_id);
    return result;
  }
}

module.exports = {
  person: new Model(persons),
};
