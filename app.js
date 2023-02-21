const express = require('express')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello, Express!'))
app.get('/api/pokemon/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id===id)
  res.send(`Vous aveez demandé le pokemon ${pokemon.name}`)
})

app.get('/api/pokemons', (req, res) =>
  {
    const pokemonsCount = pokemons.length
    res.send(`Il y a ${pokemonsCount} pokémon dans le pokedex pour le moment`)
  }
)

app.listen(port, () => console.log(`Notre application Node est démqrrée sur : http://localhost:${port}`))