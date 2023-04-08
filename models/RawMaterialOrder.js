const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rawMaterialOrderSchema = new Schema({
    items: [{
        rawMaterial: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'RawMaterial'
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    from: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Manufacturer'
    },
    to: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Supplier'
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('RawMaterialOrder', rawMaterialOrderSchema)