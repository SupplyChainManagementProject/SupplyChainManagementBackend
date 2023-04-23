const contract = require('../contract/Contract')

exports.getSupplierByPublicAddress = (req, res, next) => {
    const publicAddress = req.params.publicAddress

    contract
    .getSupplierByPublicAddress(publicAddress)
    .then(supplier => {
        if(!supplier) {
            const error = new Error('Supplier not found on Blockchain.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message:"Supplier found.",
            data: supplier
        })
    })
    .catch(err => {
        console.error('Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getAllSuppliers = (req, res, next) => {
    contract
    .getAllSuppliers()
    .then(suppliers => {
        if(!suppliers) {
            const error = new Error('List of Suppliers not found.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message: 'List of suppliers found.',
            data: suppliers
        })
    })
    .catch(err => {
        console.error('Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getAllRawMaterials = (req, res, next) => {
    contract
    .getAllRawMaterials()
    .then(rawMaterials => {
        if(!rawMaterials) {
            const error = new Error('List of Raw Materials not found.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message: 'List of Raw Materials found.',
            data: rawMaterials
        })
    })
    .catch(err => {
        console.error('Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getRawMaterialById = (req, res, next) => {
    const materialId = req.params.materialId

    contract
    .getRawMaterialById(materialId)
    .then(rawMaterial => {
        if(!rawMaterial) {
            const error = new Error('Raw Material not found on the Blockchain.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message: 'Raw Material found on the Blockchain.',
            data: rawMaterial
        })
    })
    .catch(err => {
        console.error('Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
    
}

exports.getAllRawMaterialOrders = (req, res, next) => {
    contract
    .getAllRawMaterialOrders()
    .then(rawMaterialOrders => {
        if(!rawMaterialOrders) {
            const error = new Error('List of Raw Material Orders not found.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message: 'List of Raw Material Order found.',
            data: rawMaterialOrders
        })
    })
    .catch(err => {
        console.error('Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getRawMaterialOrderById = (req, res, next) => {
    const orderId = req.params.orderId

    contract
    .getRawMaterialOrderById(orderId)
    .then(rawMaterialOrder => {
        if(!rawMaterialOrder) {
            const error = new Error('Raw Material Order not found on the Blockchain.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message: 'Raw Material Order found on the Blockchain.',
            data: rawMaterialOrder
        })
    })
    .catch(err => {
        console.error('Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getManufacturerByPublicAddress = (req, res, next) => {
    const publicAddress = req.params.publicAddress

    contract
    .getManufacturerByPublicAddress(publicAddress)
    .then(manufacturer => {
        if(!manufacturer) {
            const error = new Error('Manufacturer not found on Blockchain.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message:"Manufacturer found.",
            data: manufacturer
        })
    })
    .catch(err => {
        console.error('Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getAllManufacturers = (req, res, next) => {
    contract
    .getAllManufacturers()
    .then(manufacturers => {
        if(!manufacturers) {
            const error = new Error('List of Manufacturers not found.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message: 'List of manufacturers found.',
            data: manufacturers
        })
    })
    .catch(err => {
        console.error('Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getAllManufacturedProds = (req, res, next) => {
    contract
    .getAllManufacturedProds()
    .then(manufacturedProds => {
        if(!manufacturedProds) {
            const error = new Error('Manufactured Products not Found on the Blockchain.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message: 'Manufactured Products Found on the Blockchain.',
            data: manufacturedProds
        })
    })
    .catch(err => {
        console.error('Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getManufacturedProductById = (req, res, next) => {
    const prodId = req.params.prodId

    contract
    .getManufacturedProductById(prodId)
    .then(product => {
        if(!product) {
            const error = new Error('Manufactured Product not found on the Blockchain.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message: 'Manufactured Product found on the Blockchain.',
            data: product
        })
    })
    .catch(err => {
        console.error('Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })

}

exports.getAllManufacturedProdOrders = (req, res, next) => {
    contract
    .getAllManufacturedProdOrders()
    .then(prodOrders => {
        if(!prodOrders) {
            const error = new Error('Product Orders not found on the Blockchain.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message: 'Product Orders Found on the Blockchain.',
            data: prodOrders
        })
    })
    .catch(err => {
        console.error('Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getManufacturedProdOrderById = (req, res, next) => {
    const prodOrderId = req.params.prodOrderId

    contract
    .getManufacturedProdOrderById(prodOrderId)
    .then(prodOrder => {
        if(!prodOrder) {
            const error = new Error('Product Order not found on the Blockchain.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message: 'Product Order Found on Blockchain.',
            data: prodOrder
        })
    })
    .catch(err => {
        console.error('Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getAllDistributers = (req, res, next) => {
    contract
    .getAllDistributers()
    .then(distributers => {
        if(!distributers) {
            const error = new Error('Distributers not found on the Blockchain.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message: 'Distributers Found on the Blockchain.',
            data: distributers
        })
    })
    .catch(err => {
        console.error('Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getDistributerByPublicAddress = (req, res, next) => {
    const publicAddress = req.params.publicAddress

    contract
    .getDistributerByPublicAddress(publicAddress)
    .then(distributer => {
        if(!distributer) {
            const error = new Error('Distributer not found on the Blockchain.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message: 'Distributor Found on the Blockchain.',
            data: distributer
        })
    })
    .catch(err => {
        console.error('Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}