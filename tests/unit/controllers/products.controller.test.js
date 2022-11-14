const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service')

const { productsMock, hammer, newProduct } = require('./mocks/products.controller.mock');

describe('Verificando o Controller de Produtos ', function () {
  describe('listagem de produtos ', function () {
    afterEach(sinon.restore);

    it('retorna a lista completa dos produtos ', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAllService')
        .resolves({ type: null, message: productsMock });
      
      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsMock);
    });
    it('retorna o Produto pelo ID ', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: null, message: hammer });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(hammer);
    });
    it('Erro ao passar Id invalido ', async function () {
      const res = {};
      const req = {
        params: { id: 5 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
    });
    it('Cadastrando um novo produto com sucesso', async function () {
      const res = {};
      const req = {
        body: {
          "name": "Varinha",
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'createProduct')
        .resolves({ type: null, message: newProduct });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });

    afterEach(sinon.restore);
    it('Erro ao passar produto com menos de 5 caracteres', async function () {
      const res = {};
      const req = {
        body: {
          "name": "Var",
        }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'createProduct')
        .resolves({ type: 'INVALID_NAME', message:  '"name" length must be at least 5 characters long' });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
    });

    afterEach(sinon.restore);
  });
});