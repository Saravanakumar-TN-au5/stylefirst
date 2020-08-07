const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    name : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    path : {
        type: String,
        required: true
    },
    price : {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    shortDesc : {
        type: String,
        required: true
    },
    prodCode : {
        type: String,
        required: true
    },
    material : {
        type: String,
        required: true
    },
    images : {
        type: Object,
        required: true
    },
    variants : [{
        varId :{type: mongoose.SchemaTypes.ObjectId, ref: 'Variant'},
        size : mongoose.SchemaTypes.Number,
        color : String
    }]
})

const Product = mongoose.model('Product', product);
module.exports = Product;