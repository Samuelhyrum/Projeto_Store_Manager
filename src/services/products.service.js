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
  if (error.type) return error;

  const insert = await products.insert({ name });
  const newTable = await products.findById(insert);
  return { type: null, message: newTable };
};

const updateProduct = async (name, id) => {
  const error = validateServices.validadeName(name);
  if (error.type) return error;
  
  await products.updateProduct(name, id);
  const newProduct = await products.findById(id);
  if (newProduct) return { type: null, message: newProduct };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};
module.exports = {
  findAllService,
  findById,
  createProduct,
  updateProduct,
};