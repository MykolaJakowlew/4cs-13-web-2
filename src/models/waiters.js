const { Schema, model } = require('mongoose');

const schema = new Schema({
 name: { type: String }
});

const Waiters = new model('waiters', schema, 'waiters');

module.exports = { Waiters };