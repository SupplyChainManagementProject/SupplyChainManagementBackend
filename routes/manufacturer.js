const express = require('express')

const { body } = require('express-validator/check')

const manufacturerController = require('../controllers/manufacturer')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

// POST /manufacturer/product/create
router.post('/product/create', isAuth, [
    body('productName').trim().not().isEmpty().withMessage('productName cannot be empty.'),
    body('rawMaterials').isArray().notEmpty().withMessage('rawMaterials cannot be empty.'),
    body('originalUnitPrice').isInt({ min: 1 }).withMessage('Field must be greater than 0')
], manufacturerController.createProduct)

router.post('/rawMaterialOrder/create', isAuth, [
    body('rawMaterialItems').isArray().notEmpty().withMessage('rawMaterials cannot be empty.'),
    body('supplier').trim().not().isEmpty().withMessage('supplier cannot be empty.')
], manufacturerController.createRawMaterialOrder)

router.get('/products', isAuth, manufacturerController.getCreatedProducts)

router.get('/rawMaterialOrders/placed', isAuth, manufacturerController.getPlacedRawMaterialsOrder)

router.get('/productOrders/recieved', isAuth, manufacturerController.getRecievedProductOrders)

module.exports = router