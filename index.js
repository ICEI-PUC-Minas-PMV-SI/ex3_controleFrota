const express =  require('express');
const app = express();
const mongoose = require('mongoose');
const connectDb = require('./models/database')
const chalk = require('chalk');
const bodyParser = require('body-parser');
const carModel = require('./models/car-model');

//Configuração para arquivos staticos
app.use(express.static('/public'));
//Configuração para utilizar formulários
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Configurando a view engine para trabalhar com ejs
app.set('view engine', 'ejs');

//Rotas
app.get('/', (req, res) => {
  res.send('Oi!');
});

app.get('/cadastro', (req, res) => {
  res.render('create');
});

app.listen(8080, () => {});


//Conexão ao banco de dados
connectDb
  .then(() => {
    console.log(chalk.bgGreen.black('Conectado ao MongoDB!'))
  })
  .catch((err) => console.log(err));