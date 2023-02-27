const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')
const checkAuth = require('../middleware/checkAuth')
const checkAdmin = require('../middleware/checkAdmin')

//PRODUCT ROUTES
router.get('/api/products/', productController.getProduct);
router.get('/api/products/:id', productController.getProduct);
router.get('/api/categories/', productController.getAllCategories);
router.get('/api/category/', productController.getCategory);
router.post('/api/products/', productController.insertProduct);

//USER routes
router.get('/api/user/:id', checkAdmin, userController.getUser);
router.get('/api/cart/:id', checkAdmin, userController.getCart);
router.get('/api/wish/:id', checkAdmin, userController.getWish);
router.post('/api/user/', checkAdmin, userController.addUser);
router.post('/api/register/', userController.register);
router.post('/api/login/', userController.login);
router.patch('/api/logout', checkAuth, userController.logout);
router.delete('/api/delete/user/:id', checkAdmin, userController.deleteUser);
router.patch('/api/cart/:id', checkAdmin, userController.addCart);
router.patch('/api/wish/:id', checkAdmin, userController.addWish);
router.patch('/api/delete/cart/:id', checkAdmin, userController.deleteCart);
router.patch('/api/delete/wish/:id', checkAdmin, userController.deleteWish);

//MYUSER routes
router.get('/api/my/cart/', checkAuth, userController.myCart);
router.get('/api/my/wish/', checkAuth, userController.myWish);
router.get('/api/my/', checkAuth, userController.me);
router.get('/api/account/', checkAuth, userController.account);
router.post('/api/checkout/', userController.checkout);
router.post('/api/finishCheckout/', userController.finishCheckout);
router.patch('/api/my/account/', checkAuth, userController.update);
router.patch('/api/my/cart/:id', userController.addMyCart);
router.patch('/api/my/wish/:id', userController.addMyWish);
router.patch('/api/my/delete/cart/:id', userController.deleteMyCart);
router.patch('/api/my/delete/wish/:id', checkAuth, userController.deleteMyWish);

module.exports = router;
