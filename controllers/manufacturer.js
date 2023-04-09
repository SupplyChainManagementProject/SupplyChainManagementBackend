const { validationResult } = require('express-validator/check')
const { ethers, providers } = require('ethers');
const Product = require('../models/Product')
const Manufacturer = require('../models/Manufacturer')
const contract = require('../contract/Contract')
const RawMaterialOrder = require('../models/RawMaterialOrder')
const RawMaterial = require('../models/RawMaterial');
const { default: mongoose } = require('mongoose');
const Supplier = require('../models/Supplier');

exports.createProduct = (req, res, next) => {
    
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const error = new Error('Validation Failed.')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const { productName, rawMaterials, originalUnitPrice } = req.body
    let transactionHash
    let productId

    const unitPriceBN = ethers.BigNumber.from(originalUnitPrice);
    const unixTimestamp = Math.floor(Date.now() / 1000)
    // const materialId = 'rawMaterialsId'+unixTimestamp.toString()
    // console.log(materialId)


    const product = new Product({
        name: productName,
        rawMaterials: rawMaterials,
        originalUnitPrice: originalUnitPrice,
        currentUnitPrice: originalUnitPrice,
        manufacturer: req.userId
    })

    product
    .save()
    .then(result => {
        console.log(result)
        productId = result._id.toString()
        return contract.createManufacturedProd(productName, rawMaterials, req.publicAddress.toString(), unitPriceBN, result._id.toString())
    })
    .then((tx) => {
        return tx.wait();
    })
    .then((receipt) => {
        transactionHash = receipt.transactionHash
        console.log('Transaction confirmed with hash:', transactionHash);
        return Manufacturer.findById(req.userId)
    })
    .then(manufacturer => {
        manufacturer.products.push(productId)
        return manufacturer.save()
    })
    .then(result => {
        res.status(201).json({message:'Product Created!', productId: productId, transactionHash: transactionHash})
    })
    .catch(err => {
        console.error('Error creating product:', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.createRawMaterialOrder = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const error = new Error('Validation Failed.')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const { rawMaterialItems, supplier } = req.body
    let transactionHash
    let orderId
    let totalOrderPrice
    let createdAt

    const rawMaterialsArray = rawMaterialItems.map(obj => obj.rawMaterial)
    const quantityArray = rawMaterialItems.map(obj => obj.quantity)

    const rawMaterials = rawMaterialItems.map(obj => ({ rawMaterialId: obj.rawMaterial, quantity: obj.quantity }));

    // Fetch the raw materials from the database based on the "rawMaterialId" values
    RawMaterial.find({ _id: { $in: rawMaterials.map(obj => obj.rawMaterialId) } })
    .then(rawMaterialsData => {
        // Compute the total price by iterating over the fetched raw materials and multiplying with the quantity
        let totalPrice = 0;
        rawMaterialsData.forEach(rawMaterialData => {
        const rawMaterial = rawMaterials.find(obj => obj.rawMaterialId.toString() === rawMaterialData._id.toString());
        if (rawMaterial) {
            totalPrice += rawMaterialData.currentUnitPrice * rawMaterial.quantity;
        }
        });

        totalOrderPrice = totalPrice
        return totalOrderPrice
    })
    .then(result => {
        const rawMaterialOrder = new RawMaterialOrder({
            items: rawMaterialItems,
            from: req.userId,
            to: supplier,
            totalPrice: totalOrderPrice
        })

        return rawMaterialOrder.save()
    })
    .then(result => {
        console.log(result)
        // string[] memory _rawMaterials,
        // uint[] memory _quantities,
        // string memory _orderDateTime,
        // uint _totalPrice,
        // address _manufacturer,
        // address _supplier
        // string memory _orderId
        orderId = result._id.toString()
        createdAt = result.createdAt
        console.log('Manufacturer Public Address: '+req.publicAddress)
        console.log('supplier Public Address: '+supplier)
        return Supplier.findById(supplier)
        
    })
    .then(fetchedSupplier => {
        if(!fetchedSupplier) {
            const error = new Error('supplier not found')
            error.statusCode = 404
            throw error
        }

        fetchedSupplier.rawMaterialOrders.push(orderId)
        return fetchedSupplier.save()

        
    })
    .then(result => {
        return contract.createRawMaterialOrder(
            rawMaterialsArray, 
            quantityArray, 
            createdAt,
            ethers.BigNumber.from(totalOrderPrice),
            req.publicAddress,
            result.publicAddress,
            orderId
        )
    })
    .then((tx) => {
        return tx.wait();
    })
    .then((receipt) => {
        transactionHash = receipt.transactionHash
        console.log('Transaction confirmed with hash:', transactionHash);
        return Manufacturer.findById(req.userId)
    })
    .then(manufacturer => {
        manufacturer.rawMaterialOrders.push(orderId)
        return manufacturer.save()
    })
    .then(result => {
        res.status(201).json({message:'Order Placed Successfully!', orderId: orderId, transactionHash: transactionHash})
    })
    .catch(err => {
        console.error('Error creating order:', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getCreatedProducts = (req, res, next) => {
    const publicAddress = req.publicAddress
    const manufacturerId = req.userId

    Manufacturer.findById(manufacturerId)
    .populate('products')
    .then(manufacturer => {
        if(!manufacturer)  {
            const error = new Error('Manufacturer not found.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({count:manufacturer.products.length, products: manufacturer.products})
    })
    .catch(err => {
        console.error('Error fetching created product:', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getPlacedRawMaterialsOrder = (req, res, next) => {
    const publicAddress = req.publicAddress
    const manufacturerId = req.userId

    Manufacturer.findById(manufacturerId)
    .populate('rawMaterialOrders')
    .then(manufacturer => {
        if(!manufacturer)  {
            const error = new Error('Manufacturer not found.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({count:manufacturer.rawMaterialOrders.length, rawMaterialOrders: manufacturer.rawMaterialOrders})
    })
    .catch(err => {
        console.error('Error fetching placed rawMaterialOrders:', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getRecievedProductOrders = (req, res, next) => {
    const publicAddress = req.publicAddress
    const manufacturerId = req.userId

    Manufacturer.findById(manufacturerId)
    .populate('productOrders')
    .then(manufacturer => {
        if(!manufacturer)  {
            const error = new Error('Manufacturer not found.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({count:manufacturer.productOrders.length, productOrders: manufacturer.productOrders})
    })
    .catch(err => {
        console.error('Error fetching recieved productOrders:', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}