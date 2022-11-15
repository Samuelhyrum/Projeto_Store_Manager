const snakeize = require('snakeize');
const connection = require('./connection');

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE product_id = ?',
    [productId],
  );
  return result;
};

const insertDataSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  return insertId;
};

const insert = async (product, saleId) => {
  const columns = Object.keys(snakeize(product))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (${columns}, sale_id) VALUES (${placeholders}, ?)`,
    [...Object.values(product), saleId],
  );

  return insertId;
};

module.exports = {
  insert,
  insertDataSales,
  findById,
};