const mongoose = require("mongoose");
const Product = require("./models/Product");

// Connect to SAME DB as server.js
mongoose.connect("mongodb://127.0.0.1:27017/yogaShopDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const products = [
  {
    name: "Yoga Mat",
    price: 1500,
    category: "Accessories",
    image: "/images/yoga1.jpg",
    description: "High-quality yoga mat"
  },
  {
    name: "Yoga Block",
    price: 900,
    category: "Accessories",
    image: "/images/yoga2.jpg",
    description: "Lightweight yoga block for support"
  }
];

// Insert products
Product.insertMany(products)
  .then(() => {
    console.log("Products inserted successfully!");
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
