const mongoose = require('mongoose')
const Schema = mongoose.Schema

const supplierSchema = new Schema({
    publicAddress: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rawMaterials: [{
        type: Schema.Types.ObjectId,
        ref: 'RawMaterial'
    }],
    rawMaterialOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'RawMaterialOrder'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Supplier', supplierSchema)