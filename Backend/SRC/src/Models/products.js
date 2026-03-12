/* 
Campos: 
name
description
price
stock
category
imageUrl
*/

import { shcema, model} from 'mongoose';

const productSchema = new shcema({ 
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    category: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
}, {
    timestamps: true,
    strict: false
    
}

);

export default model('Product', productSchema);