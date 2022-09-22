const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    redirect: { type: String, required: true},
    desc: { type: String, required: true},
      bg: {type: String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);