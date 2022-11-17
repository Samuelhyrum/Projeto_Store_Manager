const snakeize = require('snakeize');
const camelize = require('camelize');
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

const findAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity 
     FROM StoreManager.sales_products AS sp
     INNER JOIN StoreManager.sales AS sa ON sp.sale_id = sa.id
     ORDER BY sale_id, product_id `,
  );
  return camelize(result);
};

const findByIdSale = async (id) => {
  const [result] = await connection.execute(
    `SELECT sa.date, sp.product_id, sp.quantity
     FROM StoreManager.sales_products AS sp
     INNER JOIN StoreManager.sales AS sa
     ON sp.sale_id = sa.id
     WHERE sale_id = ?
     ORDER BY sale_id, product_id`,
    [id],
  );
  return camelize(result);
};

module.exports = {
  insert,
  insertDataSales,
  findById,
  findAllSales,
  findByIdSale,
};