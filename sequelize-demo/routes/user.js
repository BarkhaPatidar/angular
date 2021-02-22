const express = require('express');
const router = express.Router();

const userController = require('../controller/user');

router.get('/', userController.index);

router.post('/add', userController.addProduct);

router.post('/update', userController.updateProduct);

router.post('/delete', userController.deleteProduct);

router.get('/cart', userController.getCart);

router.post('/post-cart', userController.postCart);

module.exports = router;