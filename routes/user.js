const Model = require('../models')
const bcrypt = require('bcrypt')

const getUser = async (req, res) => {
    const id = req.params.id
    const user = await Model.user.findByPk(id)
    res.send(user)
}

const updateUser = async (req, res) => {
    const { email, password } = req.body
    const id = req.params.id
    const user = await Model.user.update({
        "email": email,
        "password": bcrypt.hashSync(password, 10)
    }, {where: {id}},).then(() => {
        res.send('updated!')
    })
}

const deleteUser = (req, res) => {
    const id = req.params.id
    Model.user.destroy({where: {id}}).then(() => {
        res.send('deleted!')
    })
}

/* const editUser = (req, res) => {

} */

module.exports = {
    getUser,
    updateUser,
    deleteUser
}