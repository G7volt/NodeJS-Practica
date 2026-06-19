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
import mongoose, {Schema, model} from "mongoose";
import customers from "./customers.js";
import products from "./products.js";

const cartSchema = new Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: customers
    },
    products: [
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: products
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
    new: true
})

export default model("cart", cartSchema)
