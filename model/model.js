const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
// 1. Tạo Schema
const yourSchema = new mongoose.Schema({
  title: String,slug: { type: String, slug: "title",unique : true },
  description : String,
  price: Number,
  discountpercent: Number,
  stock: Number,
  thumbnail: String,
  position: Number,
  status: String,
  deleted: {
    type : Boolean,
    default: false
  },
  deletedAt: Date
}, { timestamps: true });



// 2. Compile Schema thành Model
const Product = mongoose.model("product-management", yourSchema, "products");
module.exports = Product;
