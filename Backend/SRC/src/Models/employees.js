import { Schema, model } from "mongoose";

/*
name
lastName
salary
DUI
phone 
email
password
branchId
*/

const employeeSchema = new Schema({
    name: {
         type: String 
    },
    lastName: { 
        type: String
    },
    salary: { 
        type: Number
    },
    DUI: { 
        type: String
    },
    phone: { 
        type: String 
    },
    email: { 
        type: String 
    },
    password: { 
        type: String 
    },
    idBRanches: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch"
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Employee", employeeSchema);