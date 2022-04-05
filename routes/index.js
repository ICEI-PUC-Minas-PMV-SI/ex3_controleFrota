const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

router.get('/', auth, (req, res) => {
  console.log(res.locals.auth_data);
  return res.status(403).send({ message: 'Informação restrita!' });
});

router.post('/', (req, res) => {
  return res.send({ message: 'Tudo certo com o método POST da raiz!' });
});

module.exports = router;