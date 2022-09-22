const Image = require("../models/Image");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./token");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newImage = new Image(req.body);

  try {
    const savedImage = await newImage.save();
    res.status(200).json(savedImage);
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedImage = await Image.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedImage);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //GET all images 
    router.get("/", async (req, res) => {
    try {
      const imgs = await Image.find();
      res.status(200).json(imgs);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;