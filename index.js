const mongoose = require('mongoose');
const connectDb = require('./models/database')
const chalk = require('chalk');
const carModel = require('./models/car-model');

//Conexão ao banco de dados
connectDb
  .then(() => {
    console.log(chalk.bgGreen.black('Conectado ao MongoDB!'))
  })
  .catch((err) => console.log(err));

//Model para registro de carros
const CarRegister = mongoose.model('CarRegister', carModel);

const register = new CarRegister({
  modelo: 'MT03',
  fabricante: 'Yamaha',
  anoFabricacao: '2020',
  anoModelo: '2021'
});

register.save();