const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/Product');

const app = express();
const PORT = 3000;

/* =====================
   MIDDLEWARE
===================== */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

/* =====================
   VIEW ENGINE
===================== */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* =====================
   ROUTES
===================== */

// HOME
app.get('/', (req, res) => {
  res.render('home', { title: 'BeYoga Home' });
});

// PRODUCTS  ✅ FIXED
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();

    res.render('products', {
      products,
      query: req.query || {}   // ⭐ ALWAYS SEND query
    });
  } catch (err) {
    console.error(err);
    res.send('Error loading products');
  }
});

// CHECKOUT
app.get('/checkout', (req, res) => {
  res.render('checkout', { title: 'Checkout' });
});

// ADMIN DASHBOARD (simple)
app.get('/admin', async (req, res) => {
  const products = await Product.find();
  res.render('admin/dashboard', { products });
});

/* =====================
   404 (NO EJS)
===================== */
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

/* =====================
   START SERVER
===================== */
mongoose
  .connect('mongodb://127.0.0.1:27017/yogaShopDB')
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  })
  .catch(err => console.error(err));
