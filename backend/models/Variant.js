const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const variant = new Schema({
    prodCode : {
        type: String,
        required: true
    },
    path :{
        type: String,
        required: true
    },
    size : {
        type: Number,
        required: true
    },
    color : {
        type: String,
        required: true
    },
    price : {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    quantity : {
        type: Number,
        required: true
    }

})

const Variant = mongoose.model('Variant', variant);
module.exports = Variant;