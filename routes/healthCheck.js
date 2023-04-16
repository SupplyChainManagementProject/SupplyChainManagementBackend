const express = require('express')

const { body } = require('express-validator/check')

const supplierController = require('../controllers/supplier')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({message: 'Server is running!'})
})

module.exports = router