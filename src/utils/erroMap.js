const errorMap = {
  INVALID_NAME: 422,
  INVALID_VALUE: 404,
  PRODUCT_NOT_FOUND: 404,
  // INVALID_VALUE: 422,
  // TRAVEL_CONFLICT: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
