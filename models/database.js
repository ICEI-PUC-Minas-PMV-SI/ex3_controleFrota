const mongoose = require('mongoose');
const config = require('../config/config');

const uri = config;
const client = { useNewUrlParser: true, useUnifiedTopology: true };

const connectDb = mongoose.connect(uri, client);

module.exports = connectDb;