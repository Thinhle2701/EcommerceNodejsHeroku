const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderID: {
    type: String,
    required: true,
  },
  customerID: {
    type: String,
    required: true,
  },
  total: {
    type: String,
  },
  paymentType: {
    type: String,
  },
  shippingData: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    ward: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  date: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Order", orderSchema);
