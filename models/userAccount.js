const { Schema, model } = require('mongoose');

const schema = new Schema({
 login: { type: String, required: true, unique: true },
 password: { type: String, required: true },
 tokens: { type: [String], default: [] }
});

const UserAccount = new model('userAccounts', schema, 'userAccounts');

module.exports = { UserAccount };