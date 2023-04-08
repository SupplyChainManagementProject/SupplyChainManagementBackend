const express = require('express')

const { body } = require('express-validator/check')

const validator = require('validator')

const authController = require('../controllers/auth')
const Supplier = require('../models/Supplier')
const Manufacturer = require('../models/Manufacturer')
const Distributer = require('../models/Distributer')

const router = express.Router()

// /auth/supplier/create [POST]
router.post('/supplier/create', [
    body('publicAddress').custom((value) => {
        if (!validator.isEthereumAddress(value)) {
          throw new Error('Invalid Ethereum wallet public address');
        }
        return true;
    }),
    body('publicAddress').custom(async (value) => {
      const supplier = await Supplier.findOne({publicAddress: value})
      if(supplier) {
        return Promise.reject('Supplier already exists.')
      }
    }),
    body('password').trim().isLength({min:6}).withMessage('Password should be atleast 6 characters long.'),
    body('name').trim().not().isEmpty().withMessage('Supplier Name cannot be empty.'),
    body('location').trim().not().isEmpty().withMessage('Location cannot be empty.')
], authController.createSupplier)

// /auth/supplier/login [POST]
router.post('/supplier/login', [
  body('publicAddress').custom((value) => {
    if (!validator.isEthereumAddress(value)) {
      throw new Error('Invalid Ethereum wallet public address');
    }
    return true;
  }),
  body('password').trim().isLength({min:6})
], authController.loginSupplier)

// /auth/manufacturer/create [POST]
router.post('/manufacturer/create', [
  body('publicAddress').custom((value) => {
      if (!validator.isEthereumAddress(value)) {
        throw new Error('Invalid Ethereum wallet public address');
      }
      return true;
  }),
  body('publicAddress').custom(async (value) => {
    const manufacturer = await Manufacturer.findOne({publicAddress: value})
    if(manufacturer) {
      return Promise.reject('Manufacturer already exists.')
    }
  }),
  body('password').trim().isLength({min:6}).withMessage('Password should be atleast 6 characters long.'),
  body('name').trim().not().isEmpty().withMessage('Manufacturer Name cannot be empty.'),
  body('location').trim().not().isEmpty().withMessage('Location cannot be empty.')
], authController.createManufacturer)

// /auth/manufacturer/login [POST]
router.post('/manufacturer/login', [
  body('publicAddress').custom((value) => {
    if (!validator.isEthereumAddress(value)) {
      throw new Error('Invalid Ethereum wallet public address');
    }
    return true;
  }),
  body('password').trim().isLength({min:6})
], authController.loginManufacturer)

// /auth/distributer/create [POST]
router.post('/distributer/create', [
  body('publicAddress').custom((value) => {
      if (!validator.isEthereumAddress(value)) {
        throw new Error('Invalid Ethereum wallet public address');
      }
      return true;
  }),
  body('publicAddress').custom(async (value) => {
    const distributer = await Distributer.findOne({publicAddress: value})
    if(distributer) {
      return Promise.reject('Distributer already exists.')
    }
  }),
  body('password').trim().isLength({min:6}).withMessage('Password should be atleast 6 characters long.'),
  body('name').trim().not().isEmpty().withMessage('Distributer Name cannot be empty.'),
  body('location').trim().not().isEmpty().withMessage('Location cannot be empty.')
], authController.createDistributer)

// /auth/distributer/login [POST]
router.post('/distributer/login', [
  body('publicAddress').custom((value) => {
    if (!validator.isEthereumAddress(value)) {
      throw new Error('Invalid Ethereum wallet public address');
    }
    return true;
  }),
  body('password').trim().isLength({min:6})
], authController.loginDistributer)

module.exports = router