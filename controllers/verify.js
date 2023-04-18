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
        console.error('Supplier Blockchain error: ', err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}