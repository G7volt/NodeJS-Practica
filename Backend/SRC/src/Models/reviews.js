import { Schema, model } from "mongoose";

/* 
idEmployee
idProduct
rating
comment
*/

const reviewSchema = new Schema ({
    idEmployee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    rating: {
        type: Number
    },
    comment: {
        type: String
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Review", reviewSchema);