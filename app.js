const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./middlewares/database')
const port = 8080;

//Body parser => capturar arquivos json
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Rotas
const indexRoutes = require('./routes/index')
const usersRoutes = require('./routes/users');
const carsRoutes = require('./routes/cars');

app.use('/', indexRoutes);
app.use('/users', usersRoutes);
app.use('/cars', carsRoutes);

const connectDb = async() => {
    try {
        await database;
        app.listen(port, () => {
            console.log(`Aplicação escutando a porta ${port}`)
        });
    } catch (error) {
        console.log('Não foi possível iniciar o servidor!', error);
    }
  }
  
  connectDb();

module.exports = app;