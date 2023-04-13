const mongoose = require('mongoose');

module.exports.setupConnectionToDb = async () => {
 await mongoose.connect(process.env.MONGO_DB_URI);
};