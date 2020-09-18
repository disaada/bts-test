const Model = require('../models')
const bcrypt = require('bcrypt')

const getLogin = async (req, res) => {
    const { email, password } = req.body
    const user = await Model.user.findOne({where: {email}})
    if (user && (bcrypt.compareSync(password, user.password))) {
        res.send('success login!')
    }
    else {
        req.send('login failed!')
    }
}

module.exports = {
    getLogin
}