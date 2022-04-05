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
  const carro = req.body;
  const { placa } = carro;

  //findOne( { placa: req.body.placa } )
  //findOne( { placa: carro.placa } )
  //findOne( { placa: placa } )
  //findOne( { placa } )

  try {
    if (await Cars.findOne({ placa })) return res.status(409).send({ error: 'Veículo já cadastrado!' });

    const car = await Cars.create(carro);
    res.status(201).json({ message: 'Cadastro realizado com sucesso!' })

  } catch (err) {
    return res.status(500).send({ error: 'Erro ao cadastrar!' });
  }
});

module.exports = router;