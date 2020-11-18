const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    alias: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    repName: {
      type: String,
      required: true,
    },
    customerSince: {
      type: Date,
      required: true,
      default: new Date(),
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
