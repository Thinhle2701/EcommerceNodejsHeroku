const express = require("express");
require("dotenv").config();
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
const user = require("./model/user");
const cart = require("./model/cart");
const order = require("./model/order");
const product = require("./model/product");
const swaggerUI = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");
const mongoose = require("mongoose");
const { stringify } = require("querystring");
const { Router } = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/auth");

app.use(express.json());

mongoose.connect(
  "mongodb+srv://thinh:123@cluster0.ydjcp.mongodb.net/EcommerceWebsite",
  (err) => {
    if (!err) console.log("db connected");
    else console.log("db error");
  }
);
const test_date = new Date();
console.log(test_date);

var cors = require("cors");
app.use(cors());
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/ecommerce", function (req, res) {
  res.send("Ecommerce Website");
});
app.get("/helloo", function (req, res) {
  res.send("Hello Website");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing user name or password" });
  }
  try {
    const User = await user.findOne({ username });
    if (!User) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect user name or password" });
    }
    const passwordValid = await argon2.verify(User.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect user name or password" });
    }

    // res.send(User);
    const accessToken = jwt.sign(
      User.toJSON(),
      process.env.ACCESS_TOKEN_SECRET
    );

    // console.log(User);
    res.json({ User, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const userRouter = require(__dirname + "/controller/user");
app.use("/api/user", userRouter);

const cartRouter = require(__dirname + "/controller/cart");
app.use("/api/cart", cartRouter);

const productRouter = require(__dirname + "/controller/product");
app.use("/api/product", productRouter);

const orderRouter = require(__dirname + "/controller/order");
app.use("/api/order", orderRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(process.env.PORT || 8000, () =>
  console.log("Listening Port 8000...")
);
