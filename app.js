const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser=require('body-parser')
const sequelize = require('./src/db/sequelize')
// const findAllPokemons = require('./src/routes/findAllPokemons')
// const findPokemonByPk = require('./src/routes/findPokemonByPk')
// const createPokemon = require('./src/routes/createPokemon')
// const updatePokemon = require('./src/routes/updatePokemon')
// const deletePokemon = require('./src/routes/deletePokemon')

const app = express()
const port = 3000

app
  .use(favicon(__dirname + '/favicon.ico'))
  .use(morgan('dev'))
  .use(bodyParser.json())

sequelize.initDb()

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

// On ajoute la gestion des erreurs 404
app.use(({res}) => {
  const message = 'Impossible de trouver la ressource demandée! vous pouvez essayez une autre URL.'
  res.status(404).json({message})
})


app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))