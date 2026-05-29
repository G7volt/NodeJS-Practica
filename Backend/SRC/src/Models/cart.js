/*
    customerId,
    Products: {
        productId
        quantity
        subtotal
    },
    total,
    status

Usando localStorage
*/
import {Schema, model} from "mongoose";

const cartSchema = new Schema({
    customerId:{
        type: mongoose.types.ObjectId,
        ref: "Customers"

    },
    products: [
        {
            productId:{
                type: mongoose.types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number
            },
            subtotal: {
                type: Number
        }
        }
    ],
    total: {
        type: Number
    },
    status: {
        type: String
    }
}, {
    timestamps: true,
    strict: false
})

export default model("cart", cartSchema)
