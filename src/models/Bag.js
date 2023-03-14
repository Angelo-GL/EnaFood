
const mongoose = require('mongoose')
const { Schema } = mongoose
const { productSchema } = require('./product')

const bagSchema = new Schema({ 
    productItens: [{
        quantity: { 
            type: Number,
            default: 0
        },
        products: {
            type: productSchema,
        } 
    }],
    priceTotal: {
        type: Number,
        required: true
    }
}, { timestamps: true} )

const Bag = mongoose.model("Bag", bagSchema)

module.exports = Bag