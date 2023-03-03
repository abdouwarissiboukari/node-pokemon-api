const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser=require('body-parser')
const {Sequelize, DataTypes} = require('sequelize')
const helper = require('./helper.js')
const {success} = require('./helper.js')
const {getUniqueId}=require('./helper.js')
let pokemons = require('./mock-pokemon')
const PokemonModel = require('./src/models/pokemon')
const pokemon = require('./src/models/pokemon')

const app = express()
const port = 3000

const sequelize = new Sequelize(
  'db_a64746_pokedex',
  'a64746_pokedex',
  'pokedex46',
  {
    host: 'mysql5025.site4now.net',
    dialect: 'mysql',
    dialectOptions: {
      timezone: '+00:00'
    },
    logging: false,
    timezone: '+00:00'
  }
)

sequelize.authenticate()
  .then(_ => console.log('La connexion à la base de données a bien été établie.'))
  .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

const Pokemon = PokemonModel(sequelize, DataTypes)
sequelize.sync({force: true})
  .then(_ => {
    console.log('La base de donnée "db_a64746_pokedex" a bien été créé')

    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture:pokemon.picture,
        types: pokemon.types.join(),
      }).then(bulbizarre => {
        const bul = bulbizarre.toJSON()
        bul.types = bul.types.split()
        console.log(bul)
      })
    })
  })


// sequelize

app
  .use(favicon(__dirname + '/favicon.ico'))
  .use(morgan('dev'))
  .use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello, Express!'))
app.get('/api/pokemon/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id===id)
  const message = "Un pokémon a été bien retrouvé."
  // res.send(`Vous aveez demandé le pokemon ${pokemon.name}`)
  // res.json(helper.success(message, pokemon))
  res.json(success(message, pokemon))
})

app.get('/api/pokemons', (req, res) =>
  {
    // const pokemonsCount = pokemons.length
    // res.send(`Il y a ${pokemonsCount} pokémon dans le pokedex pour le moment`)
    const message = 'La liste des pokémons a bien été récupée'
    res.json(success(message, pokemons))
  }
)

app.post('/api/pokemons/', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated= {...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)

    const message = `Le pokemon ${pokemonCreated.name} a bien été créé`
    res.json(success(message, pokemonCreated))
  }
)

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = {...req.body, id:id}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ?  pokemonUpdated : pokemon
      }
    )
    const message = `Le pokemon ${pokemonUpdated.name} a été bien modifié.`
    res.json(success(message, pokemonUpdated))
  }
)

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id===id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokemon ${pokemonDeleted.name} a été bien modifié.`
    res.json(success(message, pokemonDeleted))
  }
)

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))