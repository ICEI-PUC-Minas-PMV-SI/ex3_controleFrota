const router = require('express').Router()
const Car = require('../models/Car-model')

router.post('/', async (req, res) => {
  const {
    fabricante,
    anoFabricacao,
    anoModelo,
    combustivel,
    carroceria,
    resumo
  } = req.body

  const car = {
    fabricante,
    anoFabricacao,
    anoModelo,
    combustivel,
    carroceria,
    resumo
  }

  try {
    await Car.create(car)

    res.status(201).json({ message: 'Registro inserido com sucesso!' })

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router