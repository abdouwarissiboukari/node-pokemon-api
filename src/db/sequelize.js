const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')

let sequelize

if(process.env.NODE_ENV === 'production'){
  sequelize = new Sequelize(
    'bmp41i3e2p3zmx9t',
    'nhna5ko5j0ouqnnx',
    'pokedex46',
    {
      host: 'q0h7yf5pynynaq54.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      dialect: 'mariadb',
      dialectOptions: {
        timezone: '+00:00'
      },
      logging: true,
      timezone: '+00:00'
    }
  )
}else{
  sequelize = new Sequelize(
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
}

sequelize = new Sequelize(
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
  
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync().then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })

    bcrypt.hash('pikachu', 10)
      .then(hash => {
        User.create({
          username: 'pikachu',
          password: hash
        })
        .then(user => console.log(user.toJSON()))
      })
    

    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon, User
}