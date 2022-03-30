const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Conexão com o mongo Atlas
const url = 'mongodb+srv://ex3_admin:frota123456@cluster0.vaa3i.mongodb.net/dbFrota?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
  console.log('Erro na conexão com o banco de dados: '+ err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Aplicação desconectada do banco de dados!');
});

mongoose.connection.on('connected', () => {
  console.log('Aplicação conectada ao banco de dados!');
});

//Body parser => capturar arquivos json
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Rotas
const indexRoutes = require('./routes/index')
const usersRoutes = require('./routes/users')

app.use('/', indexRoutes);
app.use('/users', usersRoutes);


app.listen(8080);

module.exports = app;