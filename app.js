const express = require('express')
const favicon = require('serve-favicon')
const bodyParser=require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')
// const findAllPokemons = require('./src/routes/findAllPokemons')
// const findPokemonByPk = require('./src/routes/findPokemonByPk')
// const createPokemon = require('./src/routes/createPokemon')
// const updatePokemon = require('./src/routes/updatePokemon')
// const deletePokemon = require('./src/routes/deletePokemon')

const app = express()
const port = process.env.PORT || 3000

app
  .use(favicon(__dirname + '/favicon.ico'))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    next();
})
  // .use(cors())

sequelize.initDb()

app.get('/', (req, res) => {
  res.json('Hello, Heroku! 👋🏿')
})

// Ici, nous placeront nos futurs points de terminaisons
// findAllPokemons(app)
// findPokemonByPk(app)
// createPokemon(app)
// updatePokemon(app)
// deletePokemon(app)

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

require('./src/routes/login')(app)

// On ajoute la gestion des erreurs 404
app.use(({res}) => {
  const message = 'Impossible de trouver la ressource demandée! vous pouvez essayez une autre URL.'
  res.status(404).json({message})
})


app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))