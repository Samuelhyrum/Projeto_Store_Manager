const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product.name],
 );
  
  return insertId;
};

const updateProduct = async (name, id) => {
  const [{ insertId }] = await connection.execute(
    `UPDATE StoreManager.products
     SET name = ?
     WHERE id = ?`,
    [name, id],
  );
  return insertId;
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  updateProduct,
  deleteProduct,
};