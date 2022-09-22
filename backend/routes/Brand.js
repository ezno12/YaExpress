const Brand = require("../models/Brand");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./token");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newBrand = new Brand(req.body);

  try {
    const savedBrand = await newBrand.save();
    res.status(200).json(savedBrand);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBrand);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json("Brand has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Brand
router.get("/find/:id", async (req, res) => {
  try {
    const Brand = await Brand.findById(req.params.id);
    res.status(200).json(Brand);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL BrandS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  console.log(qNew);
  const qCategory = req.query.category;
  console.log(qCategory);
  try {
    let Brands;

    if (qNew) {
      Brands = await Brand.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      Brands = await Brand.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      Brands = await Brand.find();
    }

    res.status(200).json(Brands);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
