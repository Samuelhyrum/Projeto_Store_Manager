const { expect } = require('chai');
const sinon = require('sinon')

const productsModel = require('../../../src/models/products');
const productsService = require('../../../src/services/products.service')
const validateService = require('../../../src/services/validations/validations.services')

const { productsMock, hammer,newProduct, Product, newUptProduct } = require('./mocks/products.mock.service');

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
    it('retorna erro ao passar ID invalido', async function () {
      sinon.stub(productsModel, 'findById').resolves();

      const result = await productsService.findById(6);

      expect(result.message).to.deep.equal('Product not found');
    });
  });
  describe('cadastro de produtos ', function () {
    beforeEach(sinon.restore);
    it('Cadastrando um novo produto', async function () {
      
      sinon.stub(productsModel, 'insert').resolves([{ insertId: 4 }]);
      sinon.stub(productsModel, 'findById').resolves(newProduct);
      sinon.stub(validateService, 'validadeName').resolves();
  
      const result = await productsService.createProduct(Product)

      expect(result).to.deep.equal({ type: null, message: newProduct });

    });
       
    it('Erro ao cadastrar um novo produto com nome errado', async function () {
      const result = await productsService.createProduct('erro')
    
      expect(result.type).to.equal('INVALID_NAME');
      expect(result.message).to.deep.equal('"name" length must be at least 5 characters long');
    });
  });

  describe('Testando funções de deletar e atualizar ', function () {
    beforeEach(sinon.restore);
    it('Atualizando um produto', async function () {

      sinon.stub(validateService, 'validadeName').resolves();
      sinon.stub(productsModel, 'updateProduct').resolves();
      sinon.stub(productsModel, 'findById').resolves(true);

      const result = await productsService.updateProduct("Cajado",2)

      expect(result).to.deep.equal({ type: null, message: true });

    });
    it('Atualizando um produto com ID invalido ', async function () {

      sinon.stub(validateService, 'validadeName').resolves();
      sinon.stub(productsModel, 'updateProduct').resolves();
      sinon.stub(productsModel, 'findById').resolves(false);

      const result = await productsService.updateProduct("Cajado", 2)

      expect(result).to.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    });

    it('Atualizando um produto com ID invalido ', async function () {

      sinon.stub(validateService, 'validateId').resolves();
      sinon.stub(productsModel, 'findById').resolves(false);
      sinon.stub(productsModel, 'deleteProduct').resolves();

      const result = await productsService.deleteProduct(999)

      expect(result).to.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    });

    it('Atualizando um produto com ID invalido ', async function () {

      sinon.stub(validateService, 'validateId').resolves();
      sinon.stub(productsModel, 'findById').resolves(true);
      sinon.stub(productsModel, 'deleteProduct').resolves();

      const result = await productsService.deleteProduct(2)

      expect(result).to.deep.equal({ type: null, message: undefined });

    });
  });
});