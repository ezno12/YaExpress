const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: String },
    brand: { type: String, required: true }, 
    price: { type: Number, required: true },
    remise: { type: Number, default: 0 },
    inStock:{type: Boolean, default: true},
    size: { type: Array },
    color: { type: Array },
    popular:{type: String,required: true, default: "no"}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);