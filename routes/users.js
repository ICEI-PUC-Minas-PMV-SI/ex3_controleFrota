const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');

//Buscar usuários cadastrados
router.get('/', async (req, res) => {
  try {
    const users = await Users.find({});
    return res.send(users);
  } catch (err) {
    return res.send({ error: 'Erro na consulta de usuários!' });
  }
});

//Criar usuários na base de dados
router.post('/create', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send({ error: 'Dados insuficientes!' });

  try {
    if (await Users.findOne({ email })) return res.send({ error: 'Usuário já registrado!' });

    const user = await Users.create(req.body);
    //Pedir para não retornar a senha
    user.password = undefined;
    return res.send(user);

  } catch (err) {
    return res.send({ error: 'Usuário não encontrado!' });
  }
});

//Autenticação do usuário
router.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send({ error: 'Dados insuficientes!' });

  try {
    const user = await Users.findOne({ email }).select('+password');
    if (!user) return res.send({ error: 'Usuário não registrado!' });

    const pass_ok = await bcrypt.compare(password, user.password);
    if (!pass_ok) return res.send({ error: 'Erro ao autenticar o usuário!' });
    //Pedir para não retornar a senha
    user.password = undefined;
    return res.send(user);

  } catch (err) {
    return res.send({ error: 'Usuário não registrado!' });
  }
});

module.exports = router;