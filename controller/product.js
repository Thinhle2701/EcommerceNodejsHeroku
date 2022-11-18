const express = require("express");
const router = express.Router();
const order = require("../model/order");
var unirest = require("unirest");
const product = require("../model/product");
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const result = await product.find();
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/add_product", async (req, res) => {
  const id = req.body.id;
  const Pro = await product.findOne({ id });
  if (Pro) {
    res.json({ success: false, message: "Your Product is already existed" });
  } else {
    try {
      const newProduct = new product(req.body);
      await newProduct.save();
      res.json({
        success: true,
        message: "Create product successfully",
        data: newProduct,
      });
    } catch (err) {
      console.log(err);
    }
  }
});

router.put("/update/:id", (req, res) => {
  var id = req.params.id;
  const { name, url, price } = req.body;
  product.findOne({ id: id }, function (err, foundObject) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        if (req.body) {
          // // foundObject.line = req.body.line_items;
          // foundObject.cartID = req.body.cartID;
          console.log(req.body);
          foundObject.name = name;
          foundObject.image = url;
          foundObject.price = price;
        }
        foundObject.save(function (err, updatedObject) {
          if (err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.send(updatedObject);
            console.log(updatedObject);
          }
        });
      }
    }
  });
});

router.delete("/delete/:productID", async (req, res) => {
  const pro_id = req.params.productID;
  // res.send(order_id)
  const Pro = await product.findOne({ id: pro_id });
  if (!Pro) {
    res.status(400).send("Your Product is not exist");
  } else {
    const result = await product.deleteOne({ id: pro_id });
    res.status(200).send({ success: true, message: "Delete Successful" });
  }
});

module.exports = router;
