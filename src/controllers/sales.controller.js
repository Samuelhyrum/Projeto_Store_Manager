const saleService = require('../services/sales.service');
const errorMap = require('../utils/erroMap');

const createSale = async (req, res) => {
  const array = req.body;

  const { type, message } = await saleService.createSale(array);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const listSales = async (_req, res) => {
  const { message } = await saleService.findAllSales();
  res.status(200).json(message);
};

const getSales = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findByIdSale(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  createSale,
  listSales,
  getSales,
};