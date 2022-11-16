const products = require('../models/products');
const validateServices = require('./validations/validations.services');

const findAllService = async () => {
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

const createProduct = async (name) => {
  const error = validateServices.validadeName(name);
  if (error) return error;

  const insert = await products.insert({ name });
  const newTable = await products.findById(insert);
  return { type: null, message: newTable };
};

module.exports = {
  findAllService,
  findById,
  createProduct,
};