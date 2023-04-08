const { validationResult } = require('express-validator/check')
const { ethers, providers } = require('ethers');
const RawMaterial = require('../models/RawMaterial')
const Supplier = require('../models/Supplier')
const contract = require('../contract/Contract')
const mongoose = require('mongoose')

// const unixTimestamp = Math.floor(Date.now() / 1000)

exports.createRawMaterial = (req, res, next) => {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const error = new Error('Validation Failed.')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const { materialName, materialSource, originalUnitPrice } = req.body
    let transactionHash
    let materialId

    const unitPriceBN = ethers.BigNumber.from(originalUnitPrice);
    const unixTimestamp = Math.floor(Date.now() / 1000)
    // const materialId = 'rawMaterialsId'+unixTimestamp.toString()
    // console.log(materialId)

    const rawMaterial = new RawMaterial({
        name: materialName,
        source: materialSource,
        originalUnitPrice: originalUnitPrice,
        currentUnitPrice: originalUnitPrice,
        supplier: req.userId
    })

    rawMaterial
    .save()
    .then(result => {
        console.log(result)
        materialId = result._id.toString()
        return contract.createRawMaterial(materialName, materialSource, unitPriceBN, req.publicAddress.toString(), result._id.toString())
    })
    .then((tx) => {
        return tx.wait();
    })
    .then((receipt) => {
        transactionHash = receipt.transactionHash
        console.log('Transaction confirmed with hash:', transactionHash);
        return Supplier.findById(req.userId)
    })
    .then(supplier => {
        supplier.rawMaterials.push(materialId)
        return supplier.save()
    })
    .then(result => {
        res.status(201).json({message:'Raw Material Created!', materialId: materialId, transactionHash: transactionHash})
    })
    .catch(err => {
        console.error('Error creating raw material:', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getCreatedRawMaterials = (req, res, next) => {
    const publicAddress = req.publicAddress
    const supplierId = req.userId

    Supplier.findById(supplierId)
    .populate('rawMaterials')
    .then(supplier => {
        if(!supplier)  {
            const error = new Error('Supplier not found.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({count:supplier.rawMaterials.length ,rawMaterials: supplier.rawMaterials})
    })
    .catch(err => {
        console.error('Error creating raw material:', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}