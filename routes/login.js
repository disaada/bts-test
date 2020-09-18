const Model = require('../models')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    const { email, password } = req.body
    const user = await Model.user.create({
        "email": email,
        "password": bcrypt.hashSync(password, 10)
    }).then((user) => {
        res.json({user, message: "create user successfully"})
    })
}

const getLogin = async (req, res) => {
    const { email, password } = req.body
    const user = await Model.user.findOne({where: {email}})
    if (user && (bcrypt.compareSync(password, user.password))) {
        const token = jwt.sign({ user }, "SecretKey", { expiresIn: "24h" })
        res.json({ user, token, message: "login successfully" })
    }
    else {
        res.status(401).json({
            message: "Unauthenticated !"
        })
    }
}

module.exports = {
    getLogin,
    register
}