const products = require('../models/products');
const validateServices = require('./validations/validations.services');

const findAllService = async () => {
  const allProducts = await products.findAll();
  return { type: null, message: allProducts };
};

const findById = async (productsID) => {
  const error = validateServices.validateId(productsID);
  if (error.type) return error;

  const productsById = await products.findById(productsID);
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

const deleteProduct = async (productsID) => {
  const error = validateServices.validateId(productsID);
  if (error.type) return error;

  const productsById = await products.findById(productsID);
  if (!productsById) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const result = await products.deleteProduct(productsID);
  return {
    type: null, message: result,
  };
};

module.exports = {
  findAllService,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};