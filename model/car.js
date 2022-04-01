const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({

  placa: { type: String, require: true },
  fabricante: { type: String, require: true },
  modelo: { type: String, require: true },
  ano: { type: String, require: true },
  categoria: { type: String, require: true },
  combustivel: { type: String, require: true },
  kmTotal: { type: String, require: true },
  KmProxManu: { type: String, require: true },
  kmIn: { type: String, require: true },
  kmOut: { type: String, require: true },
  block: { type: Boolean },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Car', CarSchema);