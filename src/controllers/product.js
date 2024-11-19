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
    products: products
  })
}

const fetchProducts = (req, res) => {
  const products = getP()
  res.json(products)
}

const createProduct = (req, res) => {
  const newProduct = req.body
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