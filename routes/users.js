const express = require('express');
const router = express.Router();
const Users = require('../model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { tokenKey, tokenExpires } = require('../config/config')

//Token para autenticação
const createUserToken = (userId) => {
  return jwt.sign({ id: userId }, tokenKey, { expiresIn: tokenExpires });
};

//Buscar lista de usuários cadastrados
router.get('/', async (req, res) => {
  try {
    const users = await Users.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ error: 'Erro na consulta de usuários!' });
  }
});

//Buscar usuários cadastrados
router.get('/:cpf', async (req, res) => {
  const cpf = req.params.cpf
  try {
    const user = await Users.findOne({ "nomeCondutor.cpf": cpf });

    if (!user) {
      res.status(422).send({ error: 'O usuário não foi encontrado!' })
    } else {
      return res.send(user);
    }

  } catch (err) {
    return res.status(500).send({ error: 'Erro na consulta de usuário!' });
  }
});

//Criar usuários na base de dados
router.post('/', async (req, res) => {
  const { cpf, password } = req.body.nomeCondutor;
  if (!cpf || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

  try {
    if (await Users.findOne({ "nomeCondutor.cpf": cpf })) return res.status(400).send({ error: 'Usuário já registrado!' });
    const user = await Users.create(req.body);
    //Pedir para não retornar a senha
    user.nomeCondutor.password = undefined;
    return res.status(201).send({ user, token: createUserToken(user.id) });

  } catch (err) {
    console.log(err)
    return res.status(500).send({ error: 'Usuário não encontrado!' });
  }
});

//Updade - atualização dos dados de usuário (PATCH - Atualização parcial dos dados)

router.patch('/:cpf', async (req, res) => {
  const cpf = req.params.cpf
  try {
    const updateUser = await Users.updateOne({ "nomeCondutor.cpf": cpf });

    if (!updateUser) {
      res.status(422).send({ error: 'O usuário não foi encontrado!' })
    } else {
      return res.status(200).send({ mensage: 'Usuário atualizado!' });
    }

  } catch (err) {
    return res.status(500).send({ error: 'Erro na consulta de usuário!' });
  }
});



// Autenticação do usuário
router.post('/auth', async (req, res) => {
  const { cpf, password } = req.body.nomeCondutor;
  if (!cpf || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

  try {
    const user = await Users.findOne({ "nomeCondutor.cpf": cpf }).select('+password');
    if (!user) return res.status(400).send({ error: 'Usuário não registrado!' });

    const pass_ok = await bcrypt.compare(password, user.nomeCondutor.password);
    if (!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar o usuário!' });
    //Pedir para não retornar a senha
    user.nomeCondutor.password = undefined;
    return res.send({ user, token: createUserToken(user.id) });

  } catch (err) {
    return res.status(500).send({ error: 'Usuário não registrado!' });
  }
});

module.exports = router;