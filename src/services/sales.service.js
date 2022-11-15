const sales = require('../models/sales.model');
const validateSales = require('./validations/validations.services');

const createSale = async (data) => {
  const insertDataSales = await sales.insertDataSales();
  const quantity = data.map((value) => value.quantity);
  const validateQuantity = quantity.map((value) => validateSales.validateQuantity(value));
  const error = validateQuantity.find((e) => e.type === 'INVALID_QUANTITY');
  if (error) return error;

  const product = data.map((value) => value.productId);
  const productsById = await product.map((v) => sales.findById(v));
  if (!productsById) { return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; }
  
  await Promise.all(data.map(async (v) => sales.insert(v, insertDataSales)));

  const salesResult = {
    id: insertDataSales,
    itemSold: data,
  };
  return { type: null, message: salesResult };
};

module.exports = {
  createSale,
}; 