const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');


//Buscar usuários cadastrados
router.get('/', (req, res) => {
  Users.find({}, (err, data) => {
    if (err) return res.send({ error: 'Erro na consulta de usuário"' });
    return res.send(data);
  });
});

//Criar usuários na base de dados
router.post('/create', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.send({ error: 'Dados insuficientes!' });

  //Checar se o usuário já foi criado
  Users.findOne({ email }, (err, data) => {
    if (err) return res.send({ error: 'Usuário não cadastrado!' });
    if (data) return res.send({ error: 'Usuário já registrado!' });

    //Criar o usuário caso não exista
    Users.create(req.body, (err, data) => {
      if (err) return res.send({ error: 'Erro ao criar usuário!' });
      //Pedir para não retornar a senha
      data.password = undefined;
      return res.send(data);
    });
  });

});

//Autenticação do usuário
router.post('/auth', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.send({ error: 'Dados insuficientes!' });

  //Comparando a usuário e senha com o registrado
  Users.findOne({ email }, (err, data) => {
    if (err) return res.send({ error: 'Erro ao buscar usuário!' });
    if (!data) return res.send({ error: 'Usuário não registrado!' });

    bcrypt.compare(password, data.password, (err, same) => {
      if (!same) return res.send({ error: 'Erro ao autenticar o usuário!' });
      //Pedir para não retornar a senha
      data.password = undefined;
      return res.send(data);
    });
  }).select('+password');
});

module.exports = router;