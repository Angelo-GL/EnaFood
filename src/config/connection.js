const mongoose = require('mongoose')
require('dotenv').config()

async function main () {
    try {
        const URL = `mongodb+srv://${process.env.NODE_USER}:${process.env.NODE_PASS}@cluster0.2zbx7gp.mongodb.net/?retryWrites=true&w=majority`

        mongoose.connect(URL, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        })  

        console.log("Conectado com MongoDB");

    } catch (error) {
        console.log(`[ERROR]: ${error}`);
    }
}

module.exports = main
