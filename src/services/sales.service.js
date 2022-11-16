const sales = require('../models/sales.model');
const validateSales = require('./validations/validations.services');

const createSale = async (data) => {
  const quantity = data.map((value) => value.quantity);
  const validateQuantity = quantity.map((value) => validateSales.validateQuantity(value));
  const error = validateQuantity.find((e) => e.type === 'INVALID_QUANTITY');
  if (error) return error;
  
  const product = data.map((value) => value.productId);
  const productsById = await Promise.all(product.map(async (v) => validateSales.validateIdSale(v)));
  const errId = productsById.find((e) => e.type === 'PRODUCT_NOT_FOUND');
  if (errId) return errId;
    
  const insertDataSales = await sales.insertDataSales();
  await Promise.all(data.map(async (v) => sales.insert(v, insertDataSales)));

  const salesResult = {
    id: insertDataSales,
    itemsSold: data,
  };
  return { type: null, message: salesResult };
};

module.exports = {
  createSale,
}; 