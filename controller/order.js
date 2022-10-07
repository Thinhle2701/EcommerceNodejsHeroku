const express = require("express");
const router = express.Router();
const order = require("../model/order");
var unirest = require("unirest");
const axios = require("axios");
const product = require("../model/product");

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
  const {
    orderID,
    customerID,
    total,
    paymentType,
    shippingData,
    date,
    status,
  } = req.body;
  const Ord = await order.findOne({ orderID });
  if (Ord) {
    res.json({ success: false, message: "Your Order is already existed" });
  } else {
    const dateSort = new Date();
    try {
      const newOrder = new order({
        orderID,
        customerID,
        total,
        paymentType,
        shippingData,
        date,
        status,
        dateSort,
      });
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
  console.log(orderID, customerID, total, paymentType, shippingData, status);
});

router.get("/:order_sort_date", async (req, res) => {
  const userid = req.params.order_sort_date;
  try {
    order
      .find({ customerID: userid })
      .sort({ dateSort: -1 })
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

router.get("/get_ord/:orderid", async (req, res) => {
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

router.delete("/delete/:orderid", async (req, res) => {
  const order_id = req.params.orderid;
  // res.send(order_id)
  const Ord = await order.findOne({ orderID: order_id });
  if (!Ord) {
    res.status(400).send("Your Order is not exist");
  } else {
    const result = await order.deleteOne({ orderID: order_id });
    res.status(200).send(result);
  }
});

router.get("/", async (req, res) => {
  try {
    order
      .find()
      .sort({ dateSort: -1 })
      .find(function (err, posts) {
        if (err) return res.status(500).send({ message: "No Posts." });
        res.status(200).send(posts);
      });
  } catch (err) {
    console.log(err);
  }
});

router.get("/thinh/test/ne", async (req, res) => {
  const url = "https://api.chec.io/v1/checkouts/tokens/chkt_aZWNoyrDdE580J";
  axios
    .get(url, {
      headers: {
        "X-Authorization": "pk_4513267273233fc7080de820c6f5b5630e0fadf031a5a",
      },
    })
    .then((response) => {
      console.log(response.live);
    })
    .catch((error) => {
      console.log("error " + error);
    });
});
router.get("/test/test", async (req, res) => {
  test_date
    .find()
    .sort({ date: -1 })
    .find(function (err, posts) {
      if (err) return res.status(500).send({ message: "No Posts." });
      const obj = [];
      for (let i = 0; i < posts.length; i++) {
        // posts[i].date = posts[i].date.toString();
        // obj.push(posts[i]);
        console.log(posts[i].toString());
      }
      res.status(200).send(obj);
    });
});

router.get("/statistic/months/:month", async (req, res) => {
  try {
    const month = req.params.month;
    const result = await order.find();
    // res.send(result);
    const object = [];

    for (let i = 1; i <= month; i++) {
      let numberOrder = 0;
      for (let k = 0; k < result.length; k++) {
        // let number = 0;
        let myarray = result[k].date.split("/");
        if (myarray[1] == i) {
          numberOrder++;
        }
      }
      const data = { month: i - 0, numberOrder: numberOrder };
      object.push(data);
    }

    res.send(object);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/get_order/confirm", async (req, res) => {
  try {
    const result = await order.find({ status: "Wait To Confirm" });
    res.status(200).send({ number: result.length });
    // res.send(result.length);
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/update_status/:ordid", (req, res) => {
  var ord_id = req.params.ordid;
  order.findOne({ orderID: ord_id }, async function (err, foundObject) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        if (req.body.status) {
          // // foundObject.line = req.body.line_items;
          foundObject.status = req.body.status;

          console.log("hello", foundObject.status);
          if (foundObject.status == "success") {
            if (foundObject.statistic == false) {
              foundObject.statistic = true;
              console.log(foundObject.orderID);
              const url =
                "https://api.chec.io/v1/checkouts/tokens/" +
                foundObject.orderID;
              await axios
                .get(url, {
                  headers: {
                    "X-Authorization":
                      "pk_4513267273233fc7080de820c6f5b5630e0fadf031a5a",
                  },
                })
                .then(async function (response) {
                  // console.log(response.data.live);
                  for (
                    let i = 0;
                    i < response.data.live.line_items.length;
                    i++
                  ) {
                    const Pro = await product.findOne({
                      id: response.data.live.line_items[i].product_id,
                    });
                    if (Pro) {
                      Pro.numberOnSale =
                        Pro.numberOnSale +
                        response.data.live.line_items[i].quantity;
                      await Pro.save();
                    }
                  }
                })
                .catch((error) => {
                  console.log("error " + error);
                });
            }
          } else {
            if (foundObject.statistic == true) {
              foundObject.statistic = false;
              const url =
                "https://api.chec.io/v1/checkouts/tokens/" +
                foundObject.orderID;
              await axios
                .get(url, {
                  headers: {
                    "X-Authorization":
                      "pk_4513267273233fc7080de820c6f5b5630e0fadf031a5a",
                  },
                })
                .then(async function (response) {
                  // console.log(response.data.live);
                  for (
                    let i = 0;
                    i < response.data.live.line_items.length;
                    i++
                  ) {
                    const Pro = await product.findOne({
                      id: response.data.live.line_items[i].product_id,
                    });
                    if (Pro) {
                      Pro.numberOnSale =
                        Pro.numberOnSale -
                        response.data.live.line_items[i].quantity;
                      await Pro.save();
                    }
                  }
                })
                .catch((error) => {
                  console.log("error " + error);
                });
            }
          }
        }
        foundObject.save(function (err, updatedObject) {
          if (err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.send(updatedObject);
            // console.log(updatedObject);
          }
        });
      }
    }
  });
});
module.exports = router;
