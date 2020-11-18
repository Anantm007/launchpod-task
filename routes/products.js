const express = require("express");
const router = express.Router();

// Models
const Product = require("../models/Product");

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});

    // Return all products
    if (products) {
      return res.status(200).json({ success: true, products });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   GET /api/products/:id
// @desc    Get particular product
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check if the product exists or not
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found!" });
    } else {
      // Return the product details
      return res.status(200).json({ success: true, product });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Public
router.post("/", async (req, res) => {
  try {
    // Check if the code already exists
    const checkOldProduct = await Product.findOne({
      code: req.body.code,
    }).select("_id");

    if (checkOldProduct) {
      return res
        .json(400)
        .json({ success: false, message: "Product already exists" });
    }

    // Destructuring the body
    const { name, code, description } = req.body;

    // Create new product object
    let product = new Product({
      name,
      code,
      description,
    });

    // Save product to the DB and return
    await product.save();

    // Return the product
    return res.status(201).json({ success: true, product });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    const newData = req.body;

    // Role cannot be changed
    if (newData.role) {
      return res
        .status(400)
        .json({ success: false, message: "You cannot change the role!" });
    }

    // Check if product exists or not
    const checkProduct = await Product.findById(req.params.id).select("_id");

    if (!checkProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Update the product with the new data
    const product = await Product.findByIdAndUpdate(req.params.id, newData, {
      new: true,
    });

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("_id");

    // Check if product exists or not
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }

    // Delete the product and return success
    await Product.findByIdAndRemove(req.params.id);

    return res.status(204).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

module.exports = router;
