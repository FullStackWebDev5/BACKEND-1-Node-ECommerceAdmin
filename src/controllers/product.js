const path = require('path')
const { 
  getP,
  createP,
  updateP,
  deleteP
} = require('../models/product')

const displayDashboard = (req, res) => {
  const products = getP()
  res.render('dashboard', {
    products: products,
    errorMessage: ''
  })
}

const fetchProducts = (req, res) => {
  const products = getP()
  res.json(products)
}

const createProduct = (req, res) => {
  const products = getP()
  const { title, currentPrice, mrp, imageURL } = req.body

  // # Validation
  const errors = []

  // 1. Title: It cannot be empty, it cannot be less than 3 characters
  if (title == '' || title.length < 3) {
    errors.push('Incorrect product title')
  }

  // 2. Current Price: It cannot be empty, it cannot be non-numeric
  if(currentPrice == '' || isNaN(Number(currentPrice))) {
    errors.push('Incorrect current price')
  }

  // 3. MRP: It cannot be empty, it cannot be non-numeric
  if(mrp == '' || isNaN(Number(mrp))) {
    errors.push('Incorrect MRP')
  }

  // 4. Image URL: It cannot be empty, it has to be a valid URL
  try {
    const url1 = new URL(imageURL)
  } catch (error) {
    errors.push('Incorrect image URL')
  }

  if(errors.length != 0) {
    return res.render('dashboard', { products, errorMessage: errors[0] })
  }

  const newProduct = { title, currentPrice, mrp, imageURL }
  createP(newProduct)
  res.redirect('/dashboard')
}

const updateProduct = (req, res) => {
  const { id } = req.params
  const { title, currentPrice, mrp, imageURL } = req.body
  const updatedProduct = { title, currentPrice, mrp, imageURL }
  updateP(Number(id), updatedProduct)
  res.send('Product updated successfully')
}

const deleteProduct = (req, res) => {
  const { id } = req.params
  deleteP(Number(id))
  res.send('Product deleted successfully')
}

module.exports = { 
  fetchProducts,
  createProduct,
  displayDashboard,
  updateProduct,
  deleteProduct
}