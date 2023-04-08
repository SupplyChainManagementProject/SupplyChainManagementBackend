const mongoose = require('mongoose')
const Schema = mongoose.Schema

const manufacturerSchema = new Schema({
    publicAddress: {
        type: String,
        required: true
    },
    name:  {
        type:String,
        required: true
    },
    location: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    products : [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    rawMaterialOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'RawMaterialOrder'
    }],
    productOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'ProductOrder'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Manufacturer', manufacturerSchema)