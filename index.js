const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
const user = require("./model/user");
const cart = require("./model/cart");
const ordeer = require("./model/order");

const mongoose = require("mongoose");
const { stringify } = require("querystring");
const { Router } = require("express");

app.use(express.json());

mongoose.connect(
  "mongodb+srv://thinh:123@cluster0.ydjcp.mongodb.net/EcommerceWebsite",
  (err) => {
    if (!err) console.log("db connected");
    else console.log("db error");
  }
);

var cors = require("cors");
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/ecommerce", function (req, res) {
  res.send("Ecommerce Website");
});
app.get("/helloo", function (req, res) {
  res.send("Hello Website");
});

const userRouter = require(__dirname + "/controller/user");
app.use("/api/user", userRouter);

const cartRouter = require(__dirname + "/controller/cart");
app.use("/api/cart", cartRouter);

const orderRouter = require(__dirname + "/controller/order");
app.use("/api/order", orderRouter);

app.listen(process.env.PORT || 8000, () =>
  console.log("Listening Port 8000...")
);
