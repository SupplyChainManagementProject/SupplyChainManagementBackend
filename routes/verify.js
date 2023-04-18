const express = require('express')

const { body } = require('express-validator/check')

const verifyController = require('../controllers/verify')

const router = express.Router()

router.get('/supplier/:publicAddress', verifyController.getSupplierByPublicAddress)

module.exports = router