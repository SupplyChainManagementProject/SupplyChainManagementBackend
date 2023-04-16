const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const authRouter = require('./routes/auth')
const supplierRouter = require('./routes/supplier')
const manufacturerRouter = require('./routes/manufacturer')
const distributerRouter = require('./routes/distributer')
const healthCheckRouter = require('./routes/healthCheck')

const app = express()
dotenv.config()

// app.use(bodyParser.urlencoded()) // x-www-form-urlencoded <form>
app.use(bodyParser.json())

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/auth', authRouter)
app.use('/supplier', supplierRouter)
app.use('/manufacturer', manufacturerRouter)
app.use('/distributer', distributerRouter)
app.use(healthCheckRouter)

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode
    const message = error.message
    const data = error.data

    if(data) {
        res.status(status).json({message:message, data:data})
    } else {
        res.status(status).json({message:message})
    }
})

mongoose
    .connect(process.env.MONGO_DEV_URI)
    .then(result => {
        app.listen(process.env.PORT || 3000)
        console.log('Server started at PORT: ', 3000)
    })
    .catch(err => console.log(err))