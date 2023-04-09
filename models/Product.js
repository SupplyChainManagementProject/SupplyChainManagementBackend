const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    originalUnitPrice: {
        type: Number,
        required: true
    },
    currentUnitPrice: {
        type: Number,
        required: true
    },
    rawMaterials: [{
        type: Schema.Types.ObjectId,
        ref: 'RawMaterial'
    }],
    manufacturer: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)