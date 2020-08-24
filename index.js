const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const config = require('./config/config')
const booking = require('./router/booking')
const cors = require('cors')

app.use(express.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

app.use(cors())

app.use(booking)

const port = process.env.PORT || 8000

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongoose.connect(config.databaseURL, options).then(() => {
    console.log('server started at ' + port)
    app.listen(port)
})

module.exports = app