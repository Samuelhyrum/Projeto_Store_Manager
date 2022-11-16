const saleService = require('../services/sales.service');
const errorMap = require('../utils/erroMap');

const createSale = async (req, res) => {
  const array = req.body;

  const { type, message } = await saleService.createSale(array);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  createSale,
  // findById,
};