const express = require('express');
const salesController = require('../controllers/sales.controller');
const validadeSales = require('../middlewares/validadeSales');

const router = express.Router();

router.post(
  '/',
  validadeSales,
  salesController.createSale,
);

module.exports = router;