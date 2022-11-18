const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  login_type: {
    type: String,
  },
  url: {
    type: String,
  },
  cartID: {
    type: String,
  },
  user_type: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("userLogin", userSchema);
