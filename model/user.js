const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

//Criptografar a senha
UserSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('password'))
    return next();

  bcrypt.hash(user.password, 10, (err, encrypted) => {
    user.password = encrypted;
    return next();
  });
});

module.exports = mongoose.model('User', UserSchema);