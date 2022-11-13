const { expect } = require('chai');
const sinon = require('sinon')

const productsModel = require('../../../src/models/products');
const productsService = require('../../../src/services/products.service')

const { productsMock, hammer } = require('./mocks/products.mock.service');

describe('Verificando o Service de Produtos ', function () {
  describe('listagem de produtos ', function () {
    afterEach(sinon.restore);

    it('retorna a lista completa dos produtos ', async function () {
      sinon.stub(productsModel, 'findAll').resolves(productsMock);

      const result = await productsService.findAllService();

      expect(result.message).to.deep.equal(productsMock);
    });
    it('retorna o produto procurado pelo ID', async function () {
      sinon.stub(productsModel, 'findById').resolves(hammer);

      const result = await productsService.findById(1);

      expect(result.message).to.deep.equal(hammer);
    });
    it('retorna erro ao passar ID invalido', async function () {
      sinon.stub(productsModel, 'findById').resolves();

      const result = await productsService.findById('aa');

      expect(result.message).to.deep.equal('"id" must be a number');
    });
  });
});