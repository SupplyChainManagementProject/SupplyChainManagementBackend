const mongoose = require('mongoose')
const Schema = mongoose.Schema

const distributerSchema = new Schema({
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
    productOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'ProductOrder'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Distributer', distributerSchema)