const express = require('express');
const router = express.Router();
const Cars = require('../model/car');

//Buscar registros cadastrados
router.get('/', async (req, res) => {
  try {
    const car = await Cars.find({});
    return res.send(car);

  } catch (err) {
    return res.status(500).send({ error: 'Erro na consulta do registro!' });
  }
});

// Criar registro na base de dados
router.post('/create', async (req, res) => {
  const { placa } = req.body;
  try {
    if (await Cars.findOne({ placa })) return res.status(400).send({ error: 'Veículo já cadastrado!' });

    const car = await Cars.create(req.body);
    res.status(201).json({ message: 'Cadastro realizado com sucesso!' })

  } catch (err) {
    return res.status(500).send({ error: 'Erro ao cadastrar!' });
  }
});

module.exports = router;