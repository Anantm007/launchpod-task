const express = require("express");
const router = express.Router();

// Models
const Customer = require("../models/Customer");

// @route   GET /api/customers
// @desc    Get all customers
// @access  Public
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find({});

    // Return all customers
    if (customers) {
      return res.status(200).json({ success: true, customers });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   GET /api/customers/:id
// @desc    Get particular customer
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    // Check if the customer exists or not
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "customer not found!" });
    } else {
      // Return the customer details
      return res.status(200).json({ success: true, customer });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   POST /api/customers
// @desc    Create a new customer
// @access  Public
router.post("/", async (req, res) => {
  try {
    // Check if the code already exists
    const checkOldCustomer = await Customer.findOne({
      code: req.body.code,
    }).select("_id");

    if (checkOldCustomer) {
      return res
        .json(400)
        .json({ success: false, message: "Customer already exists" });
    }

    // Destructuring the body
    const {
      name,
      code,
      alias,
      repName,
      number,
      customerSince,
      products,
    } = req.body;

    // Create new customer object
    let customer = new Customer({
      name,
      code,
      alias,
      repName,
      number,
      customerSince,
      products,
    });

    // Save customer to the DB and return
    await customer.save();

    // Return the customer
    return res.status(201).json({ success: true, customer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
});

// @route   PUT /api/customers/:id
// @desc    Update a customer
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

    // Check if customer exists or not
    const checkCustomer = await Customer.findById(req.params.id).select("_id");

    if (!checkCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "customer not found" });
    }

    // Update the customer with the new data
    const customer = await Customer.findByIdAndUpdate(req.params.id, newData, {
      new: true,
    });

    return res.status(200).json({ success: true, customer });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   DELETE /api/customers/:id
// @desc    Delete a customer
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).select("_id");

    // Check if customer exists or not
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "customer not found" });
    }

    // Delete the customer and return success
    await Customer.findByIdAndRemove(req.params.id);

    return res.status(204).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

module.exports = router;
