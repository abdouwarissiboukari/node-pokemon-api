const pokemons = require('../db/mock-pokemon');
const { Pokemon } = require('../db/sequelize')
const { Op, INTEGER } = require('sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {

    if(req.query.name){
      const name = req.query.name;
      if(name.length < 2){
        const message = `Le terme de recherche doit contenir au moins 2 caractères.`
        return res.status(400).json({ message })
      }
      const limit =parseInt(req.query.limit) || 5  
      return Pokemon.findAndCountAll(
          { 
            where: { // 'name' est propriété du modèle pokemon
              name: {
                // [Op.eq]: name // 'name' est le critère de recherche 
                [Op.like]: `%${name}%`
               } 
            },
            order: ['name'],
            limit: limit
          }
        )
      .then(({count, rows}) => {
        const message =`Il y a ${count} pokémons qui correspondent au termes de recherches ${name}`
        res.json({ message, data: rows})
      });
    } else {
      Pokemon.findAll({ order: ['name'] })
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = `La liste des pokémons n'a pas être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({message, data: error})
      })
    }

    
  })
}