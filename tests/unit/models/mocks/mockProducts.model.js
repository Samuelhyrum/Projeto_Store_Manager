const productsMock = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]

const newProduct = {
  "name": "Varinha das Varinhas"
}

const newSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const salesMock = [
  {
    "saleId": 1,
    "date": "2022-11-17T19:43:36.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-11-17T19:43:36.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-11-17T19:43:36.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const saleById = [
  {
    "date": "2022-11-17T19:43:36.000Z",
    "productId": 3,
    "quantity": 15
  }
] 

module.exports = {
  productsMock,
  newProduct,
  newSale,
  salesMock,
  saleById
}