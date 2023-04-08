const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productOrderSchema = new Schema({
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    from: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Distributer'
    },
    to: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Manufacturer'
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('ProductOrder', productOrderSchema)