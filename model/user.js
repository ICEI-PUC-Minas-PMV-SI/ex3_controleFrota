const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

  nomeCondutor: {
    nome: { type: String, require: true },
    sobrenome: { type: String, require: true },
    dataNasc: { type: String, require: true },
    cpf: { type: String, require: true },
    email: { type: String, require: true, unique: true, lowercase: true },
    password: { type: String, require: true, select: false },
  },
  endereco: {
    endereco: { type: String, require: true },
    numero: { type: String, require: true },
    complemento: { type: String, require: true },
  },
  cnhCondutor: {
    cnh: { type: String, require: true },
    categoria: { type: Array, require: true },
    priHab: { type: String, require: true },
    validadeHab: { type: String, require: true },
  }
});

//Criptografar a senha
UserSchema.pre('save', async function (next) {
  let user = this;
  if (!user.isModified('password'))
    return next();

  user.password = await bcrypt.hash(user.password, 10)
  return next();
});

module.exports = mongoose.model('User', UserSchema);