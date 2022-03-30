const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDb = require('./models/database')
const chalk = require('chalk');
const bodyParser = require('body-parser');
const carModel = require('./models/car-model');
const carRegisterService = require('./services/CarRegisterService');

//Configurando a view engine para trabalhar com ejs
app.set('view engine', 'ejs');
//Configuração para arquivos staticos
app.use(express.static('public'));
//Configuração para utilizar formulários
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas
app.get('/', (req, res) => {
  res.send('Oi!');
});

app.get('/cadastro', (req, res) => {
  res.render('create');
});

app.post('/create', async (req, res) => {
  await carRegisterService.Create(
    req.body.modelo,
    req.body.fabricante,
    req.body.anoFabricacao,
    req.body.anoModelo,
    req.body.combustivel,
    req.body.carroceria,
    req.body.descricao,
    req.body.autor,
    req.body.data,
    req.body.time,
    req.body.reservado,
    req.body.finished
  )

  // if (statusCode) {
  //   res.redirect('/')
  // } else {
  //   res.send('Erro ao realizar cadastro!');
  // }

})

app.listen(8080, () => { });


//Conexão ao banco de dados
connectDb
  .then(() => {
    console.log(chalk.bgGreen.black('Conectado ao MongoDB!'))
  })
  .catch((err) => console.log(err));