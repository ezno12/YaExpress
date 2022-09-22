const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },

    products: [
      {
        productId: {
          type: String,
        }
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);