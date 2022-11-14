const productService = require('../services/products.service');
const errorMap = require('../utils/erroMap');
// const errorMap = require('../utils/erroMap');

const listProducts = async (_req, res) => {
  const { message } = await productService.findAllService();
  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productService.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
};