const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const order = new Schema({
    userId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true
    }
})

const Order = mongoose.model('Order', order);
module.exports = Order;