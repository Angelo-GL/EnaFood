const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({ 
    name: {
        type: String,
        required:true
    },
    descriptions: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    avaliable: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true} )

const Product= mongoose.model("Product", productSchema)

module.exports = {Product, productSchema}