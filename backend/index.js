const express = require("express");
const app = express();
const mongoose = require("mongoose");
const env = require("dotenv");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const cors = require("cors");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const brandRoute = require("./routes/Brand");
const imageRoute = require("./routes/img");

env.config();

mongoose
  .connect(process.env.MONGOO_CNX)
  .then(() => console.log("Connect successful Cloud DB"))
  .catch(() => console.log("Fail to connect to Cloud DB"));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRoute);
app.use("/api/image", imageRoute);
app.use("/api/brand", brandRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("API ready");
});
