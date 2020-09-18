const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const user = require('./routes/user')
app.post('/register', user.register)
app.get('/user/:id', user.getUser)
app.post('/user/:id', user.updateUser)
app.get('/user/:id/delete', user.deleteUser)

const login = require('./routes/login')
app.post('/', login.getLogin)

const shop = require('./routes/shop')

const port = 3000
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})