const mongoose = require('mongoose');

const carModel = new mongoose.Schema({

  modelo: String,
  fabricante: String,
  anoFabricacao: String,
  anoModelo: String,
  combustivel: String,
  carroceria: String,
  resumo: {
    descricao: String,
    autor: String
  },
  data: Date,
  time: String,
  reservado: Boolean,
  finished: Boolean
});

module.exports = carModel;