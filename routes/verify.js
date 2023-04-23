const express = require('express')

const { body } = require('express-validator/check')

const verifyController = require('../controllers/verify')

const router = express.Router()

router.get('/supplier/:publicAddress', verifyController.getSupplierByPublicAddress)

router.get('/suppliers', verifyController.getAllSuppliers)

router.get('/rawMaterials', verifyController.getAllRawMaterials)

router.get('/rawMaterial/:materialId', verifyController.getRawMaterialById)

router.get('/rawMaterialOrders', verifyController.getAllRawMaterialOrders)

router.get('/rawMaterialOrder/:orderId', verifyController.getRawMaterialOrderById)

router.get('/manufacturer/:publicAddress', verifyController.getManufacturerByPublicAddress)

router.get('/manufacturers', verifyController.getAllManufacturers)

router.get('/manufacturedProducts', verifyController.getAllManufacturedProds)

router.get('/manufacturedProduct/:prodId', verifyController.getManufacturedProductById)

router.get('/manufacturedProdOrders', verifyController.getAllManufacturedProdOrders)

router.get('/manufacturedProdOrder/:prodOrderId', verifyController.getManufacturedProdOrderById)

router.get('/distributers', verifyController.getAllDistributers)

router.get('/distributer/:publicAddress', verifyController.getDistributerByPublicAddress)

module.exports = router