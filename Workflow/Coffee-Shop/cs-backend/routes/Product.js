const express = require("express");
const { getProduct, getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/Product");
const multer = require('../middlewares/multer-config')
const auth = require('../middlewares/auth')

const router = express.Router();

router.get('/all/:userId', auth, getProducts);
router.get('/:id', auth, getProduct);
router.post('/', multer, auth, createProduct);
router.put('/:id', multer, auth, updateProduct);
router.delete('/:id', auth, deleteProduct);


module.exports = router;