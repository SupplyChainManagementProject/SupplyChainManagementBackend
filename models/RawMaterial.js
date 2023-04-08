const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rawMaterialSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    source: {
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
    supplier: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Supplier'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('RawMaterial', rawMaterialSchema)