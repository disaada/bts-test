const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const jwt = require('jsonwebtoken')
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, "SecretKey", (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }

            req.user = user
            next()
        })
    } else {
        res.sendStatus(401)
    }
}

const user = require('./routes/user')
app.get('/user/:id', authenticateJWT, user.getUser)
app.post('/user/:id', authenticateJWT, user.updateUser)
app.get('/user/:id/delete', authenticateJWT, user.deleteUser)

const login = require('./routes/login')
app.post('/register', login.register)
app.post('/', login.getLogin)

const shop = require('./routes/shop')
app.post('/checkout', authenticateJWT, shop.checkout)
app.get('/order/:id', authenticateJWT, shop.getOrder)
app.post('/order/:id/update', authenticateJWT, shop.updateOrderDetail)
app.get('/order/:id/delete', authenticateJWT, shop.deleteOrder)

app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.json({ error : err })
})

const port = 3000
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})
