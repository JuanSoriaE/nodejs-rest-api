const router = require('express').Router();
const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct
} = require('./../controllers/index.js')
const fileUpload = require('express-fileupload');

router.get('/products', getProducts);

router.post('/products', createProduct);

router.put('/products', fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}), updateProduct);

router.delete('/products/:id', deleteProduct);

router.get('/products/:id', getProduct);

module.exports = router;