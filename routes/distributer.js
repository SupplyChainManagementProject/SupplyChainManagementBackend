const express = require('express')

const { body } = require('express-validator/check')

const distributerController = require('../controllers/distributer')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.post('/productOrder/create', isAuth, [
    body('productOrderItems').isArray().notEmpty().withMessage('productOrderItems cannot be empty.'),
    body('manufacturer').trim().not().isEmpty().withMessage('manufacturer cannot be empty.')
], distributerController.createProductOrder)

router.get('/productOrders/placed', isAuth, distributerController.getPlacedProductOrders)

module.exports = router