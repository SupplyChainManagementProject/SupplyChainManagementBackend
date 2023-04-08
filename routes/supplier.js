const express = require('express')

const { body } = require('express-validator/check')

const supplierController = require('../controllers/supplier')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.post('/rawMaterial/create', isAuth, [
    body('materialName').trim().not().isEmpty().withMessage('materialName cannot be empty.'),
    body('materialSource').trim().not().isEmpty().withMessage('materialSource cannot be empty.'),
    body('originalUnitPrice').isInt({ min: 1 }).withMessage('Field must be greater than 0')
], supplierController.createRawMaterial)

router.get('/rawMaterials', isAuth, supplierController.getCreatedRawMaterials)

module.exports = router