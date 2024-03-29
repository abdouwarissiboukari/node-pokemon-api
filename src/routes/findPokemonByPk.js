const auth = require('../auth/auth')
const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null){
          const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({message})
        }
        else{
          const message = 'Un pokémon a bien été trouvé.'
          res.json({ message, data: pokemon })
        }        
      })
      .catch(error => {
        const message = `Le n'apas pu être récupéré. Réessayer dans quelques instants.`
        res.status(500).json({message, data: error})
      })
  })
}