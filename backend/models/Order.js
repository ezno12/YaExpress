const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    ville: { type: String, required: false },
    amount: { type: Number, required: false },
    address: { type: String, required: false },
    phoneNumber: { type: Number, required: false },
    status: { type: String, default: "EnAttente" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
