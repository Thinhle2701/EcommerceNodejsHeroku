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

module.exports = router;
