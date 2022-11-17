const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model')

const connection = require('../../../src/models/connection');
const { newSale, salesMock, saleById } = require('./mocks/mockProducts.model');

describe('Testes de unidade do model das consultas ao DB StoreManager', function () {
  afterEach(sinon.restore);

  it('Cadastrando uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await salesModel.insertDataSales();
    const insert = await salesModel.insert(newSale, result)
    expect(insert).to.equal(1);
  });

  it('Recuperando todas as Vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);
    const result = await salesModel.findAllSales();
    expect(result).to.be.deep.equal(salesMock);
  });

  it('Recuperando uma venda pelo seu ID', async function () {
    sinon.stub(connection, 'execute').resolves([saleById]);
    const result = await salesModel.findByIdSale(2);
    expect(result).to.be.deep.equal(saleById);
  });
});