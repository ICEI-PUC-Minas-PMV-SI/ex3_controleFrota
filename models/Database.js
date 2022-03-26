const { MongoClient } = require('mongodb');
const config = require('../config/config');
const chalk = require('chalk');

const uri = config.bd_uriString;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'aprendendoMongo';

const connectDb = async () => {
  try {
    await client.connect();
    console.log(chalk.green('Connected to database!'));
  } catch (error) {
    console.log(chalk.bgRed('Error connecting to database, Detail: '), error);
  }
}

const disconnectDb = async () => {
  try {
    await client.close();
    console.log(chalk.green('Database closed successfully!'));
  } catch (error) {
    console.log(chalk.bgRed('Error closing database, Detail: '), error);
  }
}

const getDb = () => {
  return client.db(dbName);
}

module.exports = {
  connectDb,
  disconnectDb,
  getDb
};