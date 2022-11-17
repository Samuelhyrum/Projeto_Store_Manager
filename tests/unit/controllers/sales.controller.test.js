const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service')

const { newSale, saleFinal, salesMock, saleById} = require('./mocks/products.controller.mock');

describe('Controller das Sales ', function () {
  describe('Cadastrando Sales ', function () {
    afterEach(sinon.restore);

    it('Testando retorno do cadastro de uma nova venda ', async function () {
      const res = {};
      const req = {
        "body": [
          {
            "productId": 1,
            "quantity": 1
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'createSale')
        .resolves({ type: null, message: saleFinal });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleFinal);
    });
  });

  describe('Listagens das Sales', function () {
    afterEach(sinon.restore);

    it('retorna a lista completa das vendas ', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAllSales')
        .resolves({ type: null, message: salesMock });

      await salesController.listSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesMock);
    });
    it('retorna o Produto pelo ID ', async function () {
      const res = {};
      const req = {
        params: { id: 2 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findByIdSale')
        .resolves({ type: null, message: saleById });

      await salesController.getSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleById);
    });
    it('Erro ao passar Id invalido ', async function () {
      const res = {};
      const req = {
        params: { id: 5 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findByIdSale')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await salesController.getSales(req, res);

      expect(res.status).to.have.been.calledWith(404);
    });
  })
  });
