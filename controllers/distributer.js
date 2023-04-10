const { validationResult } = require('express-validator/check')
const { ethers, providers } = require('ethers');
const Product = require('../models/Product')
const Manufacturer = require('../models/Manufacturer')
const contract = require('../contract/Contract')
const ProductOrder = require('../models/ProductOrder')
const RawMaterial = require('../models/RawMaterial');
const Distributer = require('../models/Distributer');

exports.createProductOrder = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const error = new Error('Validation Failed.')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const { productOrderItems, manufacturer } = req.body
    let transactionHash
    let orderId
    let totalOrderPrice
    let manufacAddress

    const productsArray = productOrderItems.map(obj => obj.product)
    const quantityArray = productOrderItems.map(obj => obj.quantity)

    const products = productOrderItems.map(obj => ({ productId: obj.product, quantity: obj.quantity }));

    // Fetch the raw materials from the database based on the "rawMaterialId" values
    Product.find({ _id: { $in: products.map(obj => obj.productId) } })
    .then(productsData => {
        // Compute the total price by iterating over the fetched raw materials and multiplying with the quantity
        let totalPrice = 0;
        productsData.forEach(productData => {
            const product = products.find(obj => obj.productId.toString() === productData._id.toString());
            if (product) {
                totalPrice += productData.currentUnitPrice * product.quantity;
            }
        });

        totalOrderPrice = totalPrice
        console.log('Total Order Price: '+totalOrderPrice)
        return totalOrderPrice
    })
    .then(result => {

        return Manufacturer.findById(manufacturer)
    })
    .then(fetchedManufac => {
        
        manufacAddress = fetchedManufac.publicAddress
        
        const productOrder = new ProductOrder({
            items: productOrderItems,
            from: req.userId,
            to: manufacturer,
            totalPrice: totalOrderPrice
        })

        return productOrder.save()
    })
    .then(result => {
        // console.log(result)
        // string[] memory _manufacturedProds,
        // uint[] memory _quantity,
        // string memory _orderDateTime,
        // uint _totalPrice,
        // address _distributer,
        // address _manufacturer,
        // string memory _orderId
        orderId = result._id.toString()
        return contract.createManufacturedProdOrder(
            productsArray, 
            quantityArray, 
            result.createdAt,
            ethers.BigNumber.from(totalOrderPrice),
            req.publicAddress.toString(),
            manufacAddress,
            result._id.toString()
        )
    })
    .then((tx) => {
        return tx.wait();
    })
    .then((receipt) => {
        transactionHash = receipt.transactionHash
        console.log('Transaction confirmed with hash:', transactionHash);
        return Distributer.findById(req.userId)
    })
    .then(distributer => {
        if(!distributer) {
            const error = new Error('Distributer not found!')
            error.statusCode = 404
            throw error
        }
        distributer.productOrders.push(orderId)
        return distributer.save()
    })
    .then(result => {
        return Manufacturer.findById(manufacturer)
    })
    .then(result => {
        if(!result) {
            const error = new Error('Manufacturer not found!')
            error.statusCode = 404
            throw error
        }
        result.productOrders.push(orderId)
        return result.save()
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

exports.getPlacedProductOrders = (req, res, next) => {
    const publicAddress = req.publicAddress
    const distributerId = req.userId

    Distributer.findById(distributerId)
    .populate({
        path:'productOrders',
        populate:[
            {
                path:'items.product',
                model:'Product',
                populate: {
                    path: 'rawMaterials',
                    model: 'RawMaterial'
                }
            },
            { 
                path: 'from', 
                model: 'Distributer',
                select: '_id publicAddress name location'
            },
            { 
                path: 'to', 
                model: 'Manufacturer',
                select: '_id publicAddress name location' 
            }
        ]
    })
    .then(distributer => {
        if(!distributer)  {
            const error = new Error('Manufacturer not found.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({count:distributer.productOrders.length, productOrders: distributer.productOrders})
    })
    .catch(err => {
        console.error('Error fetching created product:', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}