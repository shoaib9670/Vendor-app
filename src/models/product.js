const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  commonName: String,
  botanicalName: String,
  category: String,
  vendorName: String,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;



