const Model = require('../models')
const bcrypt = require('bcrypt')
const uuid = require('uuid4')

const checkout = (req, res) => {
    const id_order = uuid()
    const id_user = req.body[0].id_user
    const orderList = req.body

    Model.order.create({id_order, id_user}).then(() => {
        checkout_detail(orderList, id_order)
        res.send('order saved!')
    })
    .catch((err) => {
        console.log(err)
    })
    
}

const checkout_detail = (orderList, id_order) => {
    try {
        orderList.map(({item, qty}) => {
            Model.order_detail.create({id_order, item, qty})
        })
    } catch (err) {
        console.log(err)
    }
}

const getOrder = async (req, res) => {
    const id_order = req.params.id
    const data_order = await Model.order.findOne({id_order})
    const order_detail = await Model.order_detail.findAll({where: {id_order}})
    res.send({data_order, order_detail})
}

const updateOrder = async (req, res) => {
    const { email, password } = req.body
    const id = req.params.id
    const order = await Model.order.update({
        "email": email,
        "password": bcrypt.hashSync(password, 10)
    }, {where: {id}},).then(() => {
        res.send('updated!')
    })
}

const deleteOrder = (req, res) => {
    const id = req.params.id
    Model.order.destroy({where: {id}}).then(() => {
        res.send('deleted!')
    })
}

/* const editorder = (req, res) => {

} */

module.exports = {
    checkout,
    getOrder,
    updateOrder,
    deleteOrder
}