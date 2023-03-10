const { Schema, model } = require("mongoose")
const { productSchema } = require('Product')

const bagSchema = new Schema({ 
    productItens: [{
        quantity: { 
            type: Number,
            default: 0
        },
        products: {
            type: schemaProduct,
        } 
    }],
    priceTotal: {
        type: Number,
        required: true
    }
}, { timestamps: true} )

const Bag = model("Bag", bagSchema)

module.exports = Bag