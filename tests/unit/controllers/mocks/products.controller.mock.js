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
const newProduct = {
  "id": 4,
  "name": "Varinha das Varinhas"
};

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


module.exports = {
  productsMock, hammer, newProduct,
  newSale,saleFinal
}