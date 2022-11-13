const { expect } = require('chai');
const sinon = require('sinon');
const products = require('../../../src/models/products')

const connection = require('../../../src/models/connection');
const productsMock = require('./mocks/mockProducts.model');

describe('Testes de unidade do model das consultas ao DB StoreManager', function () {
  afterEach(sinon.restore);

  // it('Cadastrando uma pessoa passageira', async function () {
  //   sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
  //   const result = await passengerModel.insert(newPassenger);
  //   expect(result).to.equal(42);
  // });

  it('Recuperando todos os Produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const result = await products.findAll();
    expect(result).to.be.deep.equal(productsMock);
  });

  it('Recuperando um produto pelo seu ID', async function () {
    sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);
    const result = await products.findById(1);
    expect(result).to.be.deep.equal(productsMock[0]);
  });
});
