const schemas = require('./schemas');

const validateId = (id) => {
  const { error } = schemas.idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validadeName = (name) => {
  const { error } = schemas.nameSchema.validate(name);
  if (error) {
 return {
    type: 'INVALID_NAME',
    message: '"name" length must be at least 5 characters long',
  }; 
}
};

const validateQuantity = (quantity) => {
  const { error } = schemas.saleQuantity.validate(quantity);
  if (error) {
    return {
      type: 'INVALID_QUANTITY',
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validadeName,
  validateQuantity,
};