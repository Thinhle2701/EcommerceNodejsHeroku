const express = require("express");
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

// const get_order_list = () => {
//   try {
//     order
//       .find()
//       .sort({ dateSort: -1 })
//       .find(function (err, posts) {
//         if (err) return res.status(500).send({ message: "No Posts." });
//         // res.status(200).send(posts);
//         console.log(posts);
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };

// get_order_list();
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

const productRouter = require(__dirname + "/controller/product");
app.use("/api/product", productRouter);

const orderRouter = require(__dirname + "/controller/order");
app.use("/api/order", orderRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(process.env.PORT || 8000, () =>
  console.log("Listening Port 8000...")
);
