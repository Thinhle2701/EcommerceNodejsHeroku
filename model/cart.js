const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  id: { type: String },
  created: { type: Number },
  updated: { type: Number },
  expires: { type: Number },
  total_items: { type: Number },
  total_unique_items: { type: Number },
  subtotal: {
    raw: { type: Number },
    formatted: { type: String },
    formatted_with_symbol: { type: String },
    formatted_with_code: { type: String },
  },
  hosted_checkout_url: { type: String },
  meta: { type: String },
  line_items: [
    {
      id: { type: String },
      product_id: { type: String },
      name: { type: String },
      product_name: { type: String },
      sku: { type: String },
      permalink: { type: String },
      quantity: { type: Number },
      price: {
        raw: { type: Number },
        formatted: { type: String },
        formatted_with_symbol: { type: String },
        formatted_with_code: { type: String },
      },
      line_total: {
        raw: { type: Number },
        formatted: { type: String },
        formatted_with_symbol: { type: String },
        formatted_with_code: { type: String },
      },
      is_valid: { type: String },
      product_meta: { type: Array },
      selected_options: { type: Array },
      variant: { type: String },
      image: {
        id: { type: String },
        url: { type: String },
        description: { type: String },
        is_image: { type: String },
        filename: { type: String },
        file_size: { type: Number },
        file_extension: { type: String },
        image_dimensions: {
          width: { type: Number },
          height: { type: Number },
        },
        meta: { type: Array },
        created_at: { type: Number },
        updated_at: { type: Number },
      },
      tax: { type: String },
    },
  ],
  currency: {
    code: { type: String },
    symbol: { type: String },
  },
  discount: { type: Array },
});

module.exports = mongoose.model("userCart", cartSchema);
