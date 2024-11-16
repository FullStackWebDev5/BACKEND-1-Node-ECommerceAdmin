const path = require('path')
const { 
  getP,
  createP
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
  console.log(req.body)
  const newProduct = req.body
  createP(newProduct)
  res.send('Product added successfully!')
}

module.exports = { 
  fetchProducts,
  createProduct,
  displayDashboard
}