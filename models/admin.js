const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/* ADMIN DASHBOARD */
router.get('/', async (req, res) => {
  const productCount = await Product.countDocuments();
  res.render('admin/dashboard', {
    layout: 'admin/layout',
    productCount
  });
});

/* LIST PRODUCTS */
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.render('admin/products', {
    layout: 'admin/layout',
    products
  });
});

/* ADD PRODUCT FORM */
router.get('/products/add', (req, res) => {
  res.render('admin/add-product', {
    layout: 'admin/layout'
  });
});

/* CREATE PRODUCT */
router.post('/products', async (req, res) => {
  await Product.create(req.body);
  res.redirect('/admin/products');
});

/* EDIT FORM */
router.get('/products/edit/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('admin/edit-product', {
    layout: 'admin/layout',
    product
  });
});

/* UPDATE PRODUCT */
router.post('/products/edit/:id', async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin/products');
});

/* DELETE PRODUCT */
router.post('/products/delete/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
});

module.exports = router;
