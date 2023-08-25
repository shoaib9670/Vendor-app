const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// GET all products
router.get("/products/get", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Post new products
router.post("/products/add", async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the received request body

    const { commonName, botanicalName, category, vendorName } = req.body;
    const newProduct = new Product({
      commonName,
      botanicalName,
      category,
      vendorName,
    });

    console.log("New product object:", newProduct); // Log the new product object before saving

    const savedProduct = await newProduct.save();

    console.log("Saved product:", savedProduct); // Log the saved product object

    res.json(savedProduct);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a product 
router.delete("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Update a product
router.put("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedData = req.body;

    // Find the product by ID and update it
    const updateProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );

    if (!updateProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updateProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
