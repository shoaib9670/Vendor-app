const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  vendorName: String,
  productID: [String],
  category: String,
  vendorName: String,
});