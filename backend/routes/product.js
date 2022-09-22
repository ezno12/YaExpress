const Product = require("../models/Product");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./token");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all sous_cat of specific category
//http://localhost:5000/api/products/sous_cat?category=visage
router.get("/sous_cat", async (req, res) => {
  const qCategory = req.query.category;
  console.log(qCategory);
  try {
    if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
      var data = products.map((v) => v.sous_cat);
      var uniqueArr = [...new Set(data)];
      console.log(uniqueArr);
      res.status(200).json(uniqueArr);
    } else res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL POPULAR PRODUCTS
router.get("/pop", async (req, res) => {
  try {
    let products;

    products = await Product.find({ popular: "yes" });
    console.log(products);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS WITH DISCOUNT

router.get("/discount", async (req, res) => {
  try {
    let products;

    products = await Product.find({ remise: { $gte: 1 } });
    console.log(products);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS WITH SAME MARQUE
router.get("/marque", async (req, res) => {
  const qMarque = req.query.marq;
  console.log(qMarque);
  try {
    if (qMarque) {
      let products;
      products = await Product.find({
        marque: {
          $in: [qMarque],
        },
      });
      console.log(products);
      res.status(200).json(products);
    } else res.status(200).json();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
