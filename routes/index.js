const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.send({message: 'Tudo certo com o método GET da raiz!'});
});

router.post('/', (req, res) => {
  return res.send({message: 'Tudo certo com o método POST da raiz!'});
});

module.exports = router;