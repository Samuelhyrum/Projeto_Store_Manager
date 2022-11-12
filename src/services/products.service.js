const products = require('../models/products');
const validateServices = require('./validations/validations.services');

const findAll = async () => {
  const allProducts = await products.findAll();
  return { type: null, message: allProducts };
};

const findById = async (passengerId) => {
  const error = validateServices.validateId(passengerId);
  if (error.type) return error;

  const productsById = await products.findById(passengerId);
  if (productsById) return { type: null, message: productsById };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
};