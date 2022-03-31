const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { tokenKey, tokenExpires } = require('../config/config')

//Token para autenticação
const createUserToken = (userId) => {
  return jwt.sign({ id: userId }, tokenKey, { expiresIn: tokenExpires});
};

//Buscar usuários cadastrados
router.get('/', async (req, res) => {
  try {
    const users = await Users.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ error: 'Erro na consulta de usuários!' });
  }
});

//Criar usuários na base de dados
router.post('/create', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

  try {
    if (await Users.findOne({ email })) return res.status(400).send({ error: 'Usuário já registrado!' });

    const user = await Users.create(req.body);
    //Pedir para não retornar a senha
    user.password = undefined;
    return res.status(201).send({ user, token: createUserToken(user.id) });

  } catch (err) {
    return res.status(500).send({ error: 'Usuário não encontrado!' });
  }
});

//Autenticação do usuário
router.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

  try {
    const user = await Users.findOne({ email }).select('+password');
    if (!user) return res.status(400).send({ error: 'Usuário não registrado!' });

    const pass_ok = await bcrypt.compare(password, user.password);
    if (!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar o usuário!' });
    //Pedir para não retornar a senha
    user.password = undefined;
    return res.send({ user, token: createUserToken(user.id) });

  } catch (err) {
    return res.status(500).send({ error: 'Usuário não registrado!' });
  }
});

module.exports = router;