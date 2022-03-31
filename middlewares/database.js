const mongoose = require('mongoose');
const { url } = require('../config/config')
const chalk = require('chalk');

const options = { useNewUrlParser: true, useUnifiedTopology: true };

//Conexão com o mongo Atlas
const database = mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
  console.log(chalk.bgRed.black('Erro de conexão com o MongoDB:') + err);
});

mongoose.connection.on('disconnected', () => {
  console.log(chalk.bgGray.black('Aplicação desconectada do banco de dados!'));
});

mongoose.connection.on('connected', () => {
  console.log(chalk.bgGreen.black('Conectado ao MongoDB!'));
});

module.exports = database