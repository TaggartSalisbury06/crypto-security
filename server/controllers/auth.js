const bcrypt = require('bcryptjs')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existingPass = bcrypt.compareSync(password, users[i].password)
        if (users[i].username === username && existingPass) {
          console.log('it maybe worked')
          const secureUsr = {...users[i]}
          delete secureUsr.password
          console.log(secureUsr)
          res.status(200).send(secureUsr)
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        const { username, email, firstName, lastName, password } = req.body

        let salt = bcrypt.genSaltSync(5)
        let passHash = bcrypt.hashSync(password, salt)

        let usrObj = {
          password: passHash,
          username,
          email,
          firstName,
          lastName
        }

        users.push(usrObj)
        let secureUsr = {...usrObj}
        delete secureUsr.passHash
        console.log(secureUsr)
        res.status(200).send(secureUsr)
    }
}