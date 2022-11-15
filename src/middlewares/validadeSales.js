module.exports = (req, res, next) => {
  const [{ productId, quantity }] = req.body;

  if (!productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  return next();
};
