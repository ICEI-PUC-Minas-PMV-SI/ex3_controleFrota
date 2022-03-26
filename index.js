const express = require('express')
const { connectDb, disconnectDb } = require('./models/Database');
const Car = require('./models/Car-model')
const app = express()
const port = 3000
app.use(express.json())

app.use(
  express.urlencoded({
    extended: true,
  }),
)

//ROUTES

const carRoutes = require('./routes/carRoutes')

app.get('/', (req, res) => {
  res.json({ message: 'Hello Express!' })
})

app.use('./cars', carRoutes)

const start = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    });
  } catch (error) {
    console.log('Could not start the server!', error);
  }
}

start();