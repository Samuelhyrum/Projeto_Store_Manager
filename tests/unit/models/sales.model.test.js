const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model')

const connection = require('../../../src/models/connection');
const { newSale } = require('./mocks/mockProducts.model');

describe('Testes de unidade do model das consultas ao DB StoreManager', function () {
  afterEach(sinon.restore);

  it('Cadastrando uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await salesModel.insertDataSales();
    const insert = await salesModel.insert(newSale, result)
    expect(insert).to.equal(1);
  });
});