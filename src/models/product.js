let productId = 2

let products = [
  {
    id: 1,
    title: 'boAt Rockerz 430 w/ 40mm Drivers',
    currentPrice: '1299',
    mrp: '2499',
    imageURL: 'https://m.media-amazon.com/images/I/71L70bAl2KL._SX679_.jpg'
  }
]

const getP = () => {
  return products
}

const createP = (newProduct) => {
  products.push({ id: productId, ...newProduct })
  productId++
}

const updateP = (id, updatedProduct) => {
  products = products.map(product => {
    if(product.id !== id) {
        return product
    } else {
        return { id, ...updatedProduct}
    }
  })
}

const deleteP = (id) => {
  products = products.filter(product => {
    if(product.id !== id) {
        return true
    } else {
        return false
    }
  })
}

module.exports = {
  getP,
  createP,
  updateP,
  deleteP
}