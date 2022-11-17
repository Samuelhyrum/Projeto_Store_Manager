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
];

const hammer = {
  "id": 1,
  "name": "Martelo de Thor"
};

const Product = {
  "name": "Varinha"
}
const newProduct = {
  "id": 4,
  "name": "Varinha"
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

const newSaleInvalid = [
  {
    "productId": 4,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]
const newSaleQuantityErr = [
  {
    "productId": 2,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 0
  }
]


const saleFinal = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1, 
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

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
  productsMock, hammer,
  newProduct, Product, newSale,
  saleFinal, newSaleInvalid,
  newSaleQuantityErr, salesMock,
  saleById
}