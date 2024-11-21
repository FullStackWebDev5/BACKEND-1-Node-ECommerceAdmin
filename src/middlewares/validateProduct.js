const { getP } = require('../models/product')

const validateProductMiddleware = (req, res, next) => {
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
  
  next()
}

module.exports = { validateProductMiddleware }