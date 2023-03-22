const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon == null){
          res.json("Pokémon non trouvé")
        }
        else{
          const message = 'Un pokémon a bien été trouvé.'
          res.json({ message, data: pokemon })
        }        
      })
  })
}