const app = require('express')()
const bodyParser = require('body-parser')
const routes = require('./config/routes')
const connection = require('./config/connection')
connection()

app.use(bodyParser.json())
app.use(routes)

app.listen(5000, () => {
    console.log("Back-end executando na porta 5000");
})