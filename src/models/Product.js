const { Schema, model } = require("mongoose")

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
        typeof: String,
        required:true
    },
    avaliable: {
        typeof: Boolean,
        default: true,
    },
}, { timestamps: true} )

const Product = model("Product", productSchema)

module.exports = {
    Product,
    productSchema
}