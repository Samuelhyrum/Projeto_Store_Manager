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

const findAllSales = async () => {
  const allSales = await sales.findAllSales();
  return { type: null, message: allSales };
};

const findByIdSale = async (passengerId) => {
  const error = validateSales.validateId(passengerId);
  if (error.type) return error;

  const salesById = await sales.findByIdSale(passengerId);
  if (salesById.length !== 0) return { type: null, message: salesById };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

module.exports = {
  createSale,
  findAllSales,
  findByIdSale,
}; 