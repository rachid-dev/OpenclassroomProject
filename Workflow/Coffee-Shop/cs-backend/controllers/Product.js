const productList = require('../Data/productList');
const Product = require('../models/Product')
const fs = require('fs')


exports.getProducts =(req, res, next) => {

    Product.find({userId : req.params.userId})
        .then( products => res.status(200).json(products) )
        .catch( error => res.status(404).json({error}) )

}

exports.getProduct =(req, res, next) => {
    
    Product.findOne({_id : req.params.id})
        .then(product => res.status(200).json(product))
        .catch(error => res.status(404).json({ error }))
}

exports.createProduct = (req, res, next)=>{
    
    const product = new Product({
        ...JSON.parse(req.body.product),
        picture : req.file ? `${req.protocol}://${req.headers.host}/assets/${req.file.filename}`: '',
    })
    
    product.save()
        .then( () => res.status(201).json({message : 'Product Successfully created'}))
        .catch( error => res.status(500).json({error}) )
}

exports.updateProduct = (req, res, next)=>{
    const product = req.file ? ({
        ...JSON.parse(req.body.product),
        picture : `${req.protocol}://${req.headers.host}/assets/${req.file.filename}`
    }) :(
        {
            ...JSON.parse(req.body.product)
        }
    )

    Product.updateOne({_id : req.params.id},{...product, _id : req.params.id})
        .then(() => res.status(200).json({message : 'Product successfuly modified'}))
        .catch(error => res.status(500).json({error}))
    
}

exports.deleteProduct = (req, res, next)=>{
   
    Product.findOne({_id : req.params.id})
    .then(product => {
        const filename = product.picture.split('assets')[1]
        fs.unlink(`public/assets/${filename}`, ()=>{
            Product.deleteOne({_id : req.params.id})
            .then(() => res.status(200).json({message : 'Product successfuly deleted'}))
            .catch(error => res.status(400).json({error}))
        })
    })
    .catch(error => res.status(500).json({error}))
    
}