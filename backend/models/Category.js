const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title:{type:"string"}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);