const express = require("express");
const router = express.Router();
const cart = require("../model/cart");
const req = require("express/lib/request");

router.get("/:cartid", async (req, res) => {
  const cartid = req.params.cartid;
  try {
    const result = await cart.findOne({ id: cartid });
    if (result) {
      res.send(result);
    } else {
      throw new Error("Does not exist cart");
    }
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});

router.post("/add_cart", async (req, res) => {
  try {
    const cartNew = new cart(req.body);
    await cartNew.save();
    res.json({
      success: true,
      message: "Create cart successfully",
      data: cartNew,
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/update_item/:id", (req, res) => {
  var id = req.params.id;
  cart.findOne({ id: id }, function (err, foundObject) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        if (req.body) {
          foundObject.line_items = req.body.line_items;
          foundObject.subtotal = req.body.subtotal;
          foundObject.total_items = req.body.total_items;
          foundObject.total_unique_items = req.body.total_unique_items;
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

module.exports = router;
