const express = require("express");
const router = express.Router();
const order = require("../model/order");

router.post("/add_order", async (req, res) => {
  const orderID = req.body.orderID;
  const Ord = await order.findOne({ orderID });
  if (Ord) {
    res.json({ success: false, message: "Your Order is already existed" });
  } else {
    try {
      const newOrder = new order(req.body);
      await newOrder.save();
      res.json({
        success: true,
        message: "Create order successfully",
        data: newOrder,
      });
    } catch (err) {
      console.log(err);
    }
  }
});

router.post("/add_order_temp", async (req, res) => {
  const { orderID, customerID, total, paymentType, shippingData, status } =
    req.body;
  // const Ord = await order.findOne({ orderID });
  // if (Ord) {
  //   res.json({ success: false, message: "Your Order is already existed" });
  // } else {
  //   try {
  //     const newOrder = new order(req.body);
  //     await newOrder.save();
  //     res.json({
  //       success: true,
  //       message: "Create order successfully",
  //       data: newOrder,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  console.log(orderID, customerID, total, paymentType, shippingData, status);
});

router.get("/:order_sort_date", async (req, res) => {
  const userid = req.params.order_sort_date;
  try {
    order
      .find({ customerID: userid })
      .sort({ date: -1 })
      .find(function (err, posts) {
        console.log(posts);
      });
    // if (result) {
    //   res.send(result);
    // } else {
    //   res.json({
    //     success: false,
    //     message: "Does not exist order ",
    //   });
    // }
  } catch (err) {
    console.log(err);
  }
});

router.get("/:orderid", async (req, res) => {
  const orderid = req.params.orderid;
  try {
    const result = await order.findOne({ orderID: orderid });
    if (result) {
      res.send(result);
    } else {
      res.json({
        success: false,
        message: "Does not exist order ",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/find_order_cus/:customerid", async (req, res) => {
  const cusID = req.params.customerid;
  try {
    order
      .find({ customerID: cusID })
      .sort({ date: -1 })
      .find(function (err, posts) {
        if (err) return res.status(500).send({ message: "No Posts." });
        res.status(200).send({ order: posts });
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
