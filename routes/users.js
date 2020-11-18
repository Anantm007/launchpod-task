const express = require("express");
const router = express.Router();

// Utility packages
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Environment Variables
require("dotenv").config();
const { JWTSECRET } = process.env;

// Middleware for protecting routes
// const auth = require("../middleware/shopAuth");

// Models
const User = require("../models/User");

// @route   GET /api/users
// @desc    Get all users
// @access  Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});

    // Return all users
    if (users) {
      return res.status(200).json({ success: true, users });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   GET /api/users/:id
// @desc    Get particular user
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Check if the user exists or not
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    } else {
      // Return the user details
      return res.status(200).json({ success: true, user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   POST /api/users
// @desc    Create a new user
// @access  Public
router.post("/", async (req, res) => {
  try {
    // Check if the user already exists
    const checkOldUser = await User.findOne({ email: req.body.email }).select(
      "_id"
    );

    if (checkOldUser) {
      return res
        .json(400)
        .json({ success: false, message: "User already exists" });
    }

    // Destructuring the body
    const {
      name,
      email,
      password,
      age,
      companyName,
      location,
      role,
    } = req.body;

    // Create new user object
    let user = new User({
      name,
      email,
      password,
      age,
      companyName,
      location,
      role,
    });

    // Encrypting the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to the DB and return
    await user.save();

    // Payload for jwt
    const payload = {
      user: {
        id: user._id,
      },
    };

    // Signing the payload
    jwt.sign(payload, JWTSECRET, { expiresIn: 360000 }, (error, token) => {
      if (!error) {
        // Do not send this to the client
        user.password = undefined;

        // Return the user and the token
        return res.status(201).json({ success: true, user, token });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
});

// @route   POST /api/users/login
// @desc    Authenticate(login) user & get token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if user exists or not
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials (not found)",
      });
    }

    // Compare the hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Sign payload and return jwt token
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, JWTSECRET, { expiresIn: 360000 }, (error, token) => {
      if (!error) {
        // Do not send password to the client
        user.password = undefined;

        res.status(200).json({
          success: true,
          user,
          token,
        });
      }
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
});

// @route   PUT /api/users/:id
// @desc    Update a user
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

    // Check if user exists or not
    const checkUser = await User.findById(req.params.id).select("_id");

    if (!checkUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update the user with the new data
    const user = await User.findByIdAndUpdate(req.params.id, newData, {
      new: true,
    });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete a user
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("_id");

    // Check if user exists or not
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Delete the user and return success
    await User.findByIdAndRemove(req.params.id);

    return res.status(204).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

module.exports = router;
