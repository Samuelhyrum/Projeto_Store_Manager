module.exports = (req, res, next) => {
  const array = req.body;
  for (let index = 0; index < array.length; index += 1) {
    if (array[index].productId === undefined) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    if (array[index].quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  }
  return next();
};
