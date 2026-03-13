import { Schema, model  } from "mongoose";

const branchSchema = new Schema({

    name: {
        type: String
    },
    adress: {
        type: String
    },
    Schedule: {
        type: String
    },
    isActive: {
        type: Boolean
    }
}, 
{
    timestamps: true,
    strict: false
})

export default model('Branch', branchSchema);