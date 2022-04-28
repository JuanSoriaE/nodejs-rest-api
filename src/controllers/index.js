const Product = require('./../models/product.model.js')
const {uploadImage, deleteImage} = require('./../db/cloudinary.js');
const fs = require('fs-extra');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.starus(500).json({message: error.message});
    }
};

const createProduct = async (req, res) => {
    try {
        const {name, description, price} = req.body;
        const product = new Product({
            name,
            description,
            price
        });

        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath);
            product.image = {
                public_id: result.public_id,
                url: result.secure_url
            };

            await fs.unlink(req.files.image.tempFilePath);
        }

        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateProduct = async (req, res) => {
    try {
        const {name, description, price} = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price
        }, {new: true});

        res.json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({
            message: "Product doesn't exist."
        });

        if (product.image?.public_id) await deleteImage(product.image.public_id);
        res.json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({
            message: "Product doesn't exist."
        });
        
        res.json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct
}