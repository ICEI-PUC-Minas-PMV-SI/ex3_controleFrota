const carModel = require('../models/car-model')
const mongoose = require('mongoose')

const Registro = mongoose.model('car-model', carModel)

class CarRegisterService {
  async Create(modelo, fabricante, anoFabricacao, anoModelo, combustivel, carroceria, descricao, autor, data, time, reservado) {
    var newRegistro = new Registro({
      modelo,
      fabricante,
      anoFabricacao,
      anoModelo,
      combustivel,
      carroceria,
      descricao,
      autor,
      data,
      time,
      reservado,
      finished: false
    });
    try {
      await newRegistro.save()
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = new CarRegisterService();