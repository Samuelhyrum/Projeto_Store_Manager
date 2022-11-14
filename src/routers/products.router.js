const express = require('express');
const productsController = require('../controllers/products.controller');
const validateNewProduct = require('../middlewares/validateNewProduct');

const router = express.Router();

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.getProduct,
);

router.post(
  '/',
  validateNewProduct,
  productsController.createProduct,
);

module.exports = router;