const { expect } = require('chai');
const sinon = require('sinon')

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service')
const validateService = require('../../../src/services/validations/validations.services');
const { salesMock } = require('../models/mocks/mockProducts.model');

const { newSale, saleFinal, newSaleInvalid, newSaleQuantityErr, saleById } = require('./mocks/products.mock.service');

describe('cadastro de produtos ', function () {
  beforeEach(sinon.restore);

  it('Cadastrando uma nova Venda', async function () {
    sinon.stub(salesModel, 'insertDataSales').resolves(3);
    sinon.stub(validateService, 'validateIdSale').resolves(true);
    sinon.stub(salesModel, 'insert').resolves();

    await salesModel.insertDataSales()

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
  describe('listagem de Vendas Service ', function () {
    afterEach(sinon.restore);

    it('retorna a lista completa das vendas ', async function () {
      sinon.stub(salesModel, 'findAllSales').resolves(salesMock);

      const result = await salesService.findAllSales();

      expect(result.message).to.deep.equal(salesMock);
    });
    it('retorna o produto procurado pelo ID', async function () {
      sinon.stub(salesModel, 'findByIdSale').resolves(saleById);

      const result = await salesService.findByIdSale(1);

      expect(result.message).to.deep.equal(saleById);
    });
    it('retorna erro ao passar ID invalido', async function () {
      sinon.stub(salesModel, 'findByIdSale').resolves();

      const result = await salesService.findByIdSale('aa');

      expect(result.message).to.deep.equal('"id" must be a number');
    });
    // it('retorna erro ao passar ID invalido', async function () {
    //   sinon.stub(salesModel, 'findByIdSale').resolves();

    //   const result = await salesService.findByIdSale(999);

    //   expect(result.message).to.deep.equal([]);
    // });
  });
});