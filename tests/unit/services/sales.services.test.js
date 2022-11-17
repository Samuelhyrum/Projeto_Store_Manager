const { expect } = require('chai');
const sinon = require('sinon')

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service')
const validateService = require('../../../src/services/validations/validations.services')

const { newSale, saleFinal, newSaleInvalid, newSaleQuantityErr } = require('./mocks/products.mock.service');

describe('cadastro de produtos ', function () {
  beforeEach(function () {
    sinon.stub(salesModel, 'insert').resolves(newSale, 3);
  })
  afterEach(function () {
    sinon.restore();
  });

  it('Cadastrando uma nova Venda', async function () {

    const result = await salesService.createSale(newSale)

    expect(result).to.deep.equal({ type: null, message: saleFinal });

  });
  it('Erro ao passar ID inexistente ', async function () {
    const result = await salesService.createSale(newSaleInvalid)

    expect(result).to.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

  });
  it('Erro ao passar quantity negativa ou 0 ', async function () {
    const result = await salesService.createSale(newSaleQuantityErr)

    expect(result).to.deep.equal({ type: 'INVALID_QUANTITY', message: '"quantity" must be greater than or equal to 1' });

  });
});