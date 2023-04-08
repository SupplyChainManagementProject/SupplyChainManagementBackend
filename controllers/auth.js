const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Supplier = require('../models/Supplier')
const Manufacturer = require('../models/Manufacturer')
const Distributer = require('../models/Distributer')
const contract = require('../contract/Contract')

exports.createSupplier = (req, res, next) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const error = new Error('Validation Failed.')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const name = req.body.name
    const publicAddress = req.body.publicAddress
    const location = req.body.location
    const password = req.body.password
    let transactionHash

    contract.createRawMaterialSupplier(publicAddress, name, location)
    .then((tx) => {
        return tx.wait();
    })
    .then((receipt) => {
        transactionHash = receipt.transactionHash
        console.log('Transaction confirmed with hash:', transactionHash);
        return bcrypt.hash(password, 12)
    })
    .then(hashedPw => {
        const supplier = new Supplier({
            publicAddress: publicAddress,
            name: name,
            location: location,
            password: hashedPw,
            rawMaterials: [],
            rawMaterialOrders: []
        })

        return supplier.save()
    })
    .then(result => {
        res.status(201).json({message:'Supplier Created!', transactionHash: transactionHash})
    })
    .catch(err => {
        console.log('Error creating raw material supplier:', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.loginSupplier = (req, res, next) => {
    const { publicAddress, password } = req.body

    let loadedSupplier

    Supplier.findOne({publicAddress:publicAddress})
    .then(supplier => {
        if(!supplier) {
            const error = new Error('A supplier with this public address was not found.')
            error.statusCode = 401
            throw error
        }
        loadedSupplier = supplier
        return bcrypt.compare(password, supplier.password)
    })
    .then(isEqual => {
        if(!isEqual) {
            const error = new Error('Wrong password.')
            error.statusCode = 401
            throw error
        }
        const token = jwt.sign({
            userId: loadedSupplier._id.toString(),
            publicAddress: loadedSupplier.publicAddress,
            name: loadedSupplier.name
        }, process.env.JWT_SECRET, { expiresIn: '2d' })
        res.status(200).json({ token:token, supplierId: loadedSupplier._id.toString(), publicAddress: loadedSupplier.publicAddress.toString(), name: loadedSupplier.name })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}


// Manufacturer
exports.createManufacturer = (req, res, next) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const error = new Error('Validation Failed.')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const name = req.body.name
    const publicAddress = req.body.publicAddress
    const location = req.body.location
    const password = req.body.password
    let transactionHash

    contract.createManaufacturer(publicAddress, name, location)
    .then((tx) => {
        return tx.wait();
    })
    .then((receipt) => {
        transactionHash = receipt.transactionHash
        console.log('Transaction confirmed with hash:', transactionHash);
        return bcrypt.hash(password, 12)
    })
    .then(hashedPw => {
        const manufacturer = new Manufacturer({
            publicAddress: publicAddress,
            name: name,
            location: location,
            password: hashedPw,
            products: [],
            rawMaterials: [],
            productOrders: []
        })

        return manufacturer.save()
    })
    .then(result => {
        res.status(201).json({message:'Manufacturer Created!', transactionHash: transactionHash})
    })
    .catch(err => {
        console.log('Error creating manufacturer:', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.loginManufacturer = (req, res, next) => {
    const { publicAddress, password } = req.body

    let loadedManufacturer

    Manufacturer.findOne({publicAddress:publicAddress})
    .then(manufacturer => {
        if(!manufacturer) {
            const error = new Error('A manufacturer with this public address was not found.')
            error.statusCode = 401
            throw error
        }
        loadedManufacturer = manufacturer
        return bcrypt.compare(password, manufacturer.password)
    })
    .then(isEqual => {
        if(!isEqual) {
            const error = new Error('Wrong password.')
            error.statusCode = 401
            throw error
        }
        const token = jwt.sign({
            userId: loadedManufacturer._id.toString(),
            publicAddress: loadedManufacturer.publicAddress,
            name: loadedManufacturer.name
        }, process.env.JWT_SECRET, { expiresIn: '2d' })
        res.status(200).json({ token:token, manufacturerId: loadedManufacturer._id.toString(), publicAddress: loadedManufacturer.publicAddress.toString(), name: loadedManufacturer.name })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

// Distributer
exports.createDistributer = (req, res, next) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const error = new Error('Validation Failed.')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const name = req.body.name
    const publicAddress = req.body.publicAddress
    const location = req.body.location
    const password = req.body.password
    let transactionHash

    contract.createDistributer(publicAddress, name, location)
    .then((tx) => {
        return tx.wait();
    })
    .then((receipt) => {
        transactionHash = receipt.transactionHash
        console.log('Transaction confirmed with hash:', transactionHash);
        return bcrypt.hash(password, 12)
    })
    .then(hashedPw => {
        const distributer = new Distributer({
            publicAddress: publicAddress,
            name: name,
            location: location,
            password: hashedPw,
            productOrders: []
        })

        return distributer.save()
    })
    .then(result => {
        res.status(201).json({message:'Distributer Created!', transactionHash: transactionHash})
    })
    .catch(err => {
        console.log('Error creating distributer:', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.loginDistributer = (req, res, next) => {
    const { publicAddress, password } = req.body

    let loadedDistributer

    Distributer.findOne({publicAddress:publicAddress})
    .then(distributer => {
        if(!distributer) {
            const error = new Error('A distributer with this public address was not found.')
            error.statusCode = 401
            throw error
        }
        loadedDistributer = distributer
        return bcrypt.compare(password, distributer.password)
    })
    .then(isEqual => {
        if(!isEqual) {
            const error = new Error('Wrong password.')
            error.statusCode = 401
            throw error
        }
        const token = jwt.sign({
            userId: loadedDistributer._id.toString(),
            publicAddress: loadedDistributer.publicAddress,
            name: loadedDistributer.name
        }, process.env.JWT_SECRET, { expiresIn: '2d' })
        res.status(200).json({ token:token, distributerId: loadedDistributer._id.toString(), publicAddress: loadedDistributer.publicAddress.toString(), name: loadedDistributer.name })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}