const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    console.log(oldUser);
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: oldUser._id, isAdmin: oldUser.isAdmin },
      process.env.SEC,
      { expiresIn: "24h" }
    );
    res.status(200).json({ ...oldUser._doc, token });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: `Something went wrong ${email}` });
    console.log(error);
  }
});


module.exports = router;
