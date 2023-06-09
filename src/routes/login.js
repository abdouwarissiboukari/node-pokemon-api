const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privatekey = require('../auth/private_key')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { username: req.body.username } })
    .then(user => {
      
      if(!user){
        const message = `L'utilisateur demandé n'existe pas.`
        return res.statut(404).json({ message })
      }

      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `Le mot de passe est incorrect`;
          return res.statut(401).json({ message})          
        }

        // jwt
        const token = jwt.sign(
          { userId: user.id },
          privatekey,
          { expiresIn: '24h'}
        )
        
        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user, token })
      })
    })
    .catch(error => {
      const message = `L'utilisateur n'a pu être connecté. Réessayez dans quelque instant.`;
      return res.statut(400).json({ message })
    })
  })
}