const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");

exports.getProductById = (req, res, next, id) => {

    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err || !product){
            return res.status(400).json({
                error: "product not found"
            })
        }
        req.product = product;
        next();
    });
};

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "problem with image"
            });
        }
        //console.log(fields)
        //destructure the fiekds 
        const {name, description, buyPrice,rentPrice, category, stock,creator} = fields

        if(!name || !description || !buyPrice || !rentPrice || !category || !stock || !creator){
            return res.status(400).json({
                error: "Please include all fields"
            });
        }

        let product = new Product(fields)

        //handling of file
        if(file.photo){
            if(file.photo.size > 5000000){
                return res.status(400).json({
                    error: "file size too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //console.log("i need this")
        //console.log(product);
        
        if(file.resource){
            if(file.resource.size > 50000000){
                return res.status(400).json({
                    error: "file size too big"
                });
            }
            product.resource.data = fs.readFileSync(file.resource.path)
            product.resource.contentType = file.resource.type
        }




        //save to db
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: " Saving file in db failed"
                });
            }
            res.json(product)
        });
    });
};

exports.getProduct = (req, res) => {
    req.product.photo = undefined; 
    return res.json(req.product)
};

//middleware for optimization photo getting from db (we can remove this //1 and this middleware also )
exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("'Content-Type','req.product.photo'");
        return res.send(req.product.photo.data);
    }
    next();
};

//delete controller
exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deleteProduct) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete the product"
            });
        }
        
        //if delete successful
        res.json({
            message: "delete successful",
            deleteProduct
        });
    });
};

//update controller
exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "problem with image"
            });
        }
        
        //updation code
        let product = req.product;
        product = _.extend(product, fields)

        //handling of file
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "file size too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        console.log(product);

        //save to db
        product.save((err, product) => {
            if(err){
                res.status(400).json({
                    error: "updation of product failed"
                });
            }
            res.json(product)
        });
    });
};

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit): 9;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if(err){
            return res.status(200).json({
                error: "no products found"
            })
        }
        res.json(products)
    });
};


exports.getProductByCategory= (req,res) =>
{
    let cate = req.body;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find({category:cate})
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(200).json({
                error:"No product found"
            })
        }
        console.log(products)
        res.json(products)
    })
}



exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if(err){
            return res.status(400).json({
                error: " no category found"
            })
        }
        res.json(category);
    });
}
exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        };
    });

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err){
            return res.status(400).json({
                error: "Bulk operation failed"
            });
        }
        next();
    });
};