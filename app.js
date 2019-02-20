const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))

const routes = require('./routes')
app.use(routes.herb)
app.use(routes.image)

module.exports = app