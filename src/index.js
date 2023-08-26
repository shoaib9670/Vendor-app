require("dotenv").config();
const port = process.env.PORT || 3000;
const URI = process.env.URI;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
const productsRouter = require("./routes/products");
app.use("/", productsRouter);
// app.use("/products/add", productsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
