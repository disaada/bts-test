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

const updateOrderDetail = (req, res) => {
    const { item, qty, id_order } = req.body
    const id = req.params.id
    Model.order_detail.update({item, qty}, {where: {id, id_order}}).then(() => {
        res.send('updated!')
    })
}

const deleteOrder = (req, res) => {
    const id_order = req.params.id
    Model.order.destroy({where: {id_order}}).then(() => {
        Model.order_detail.destroy({where: {id_order}}).then(() => {
            res.send('deleted!')
        })
    })
    
}

/* const editorder = (req, res) => {

} */

module.exports = {
    checkout,
    getOrder,
    updateOrderDetail,
    deleteOrder
}