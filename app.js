const express = require('express')
const helper = require('./helper.js')
const {success} = require('./helper.js')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

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
    res.json(success('La liste des pokémons a bien été récupée', pokemons))
  }
)

app.listen(port, () => console.log(`Notre application Node est démqrrée sur : http://localhost:${port}`))