const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Vui lòng nhập tên sản phẩm!!!"],
  },
  productPrice: {
    type: Number,
    required: [true, "Vui lòng nhập giá sản phẩm!!!"],
  },
  productImage: {
    type: String,
    required: [true, "Vui lòng thêm hình ảnh sản phẩm !!!"],
  },
  quantity: {
    type: Number,
    required: [true, "Vui lòng nhập số lượng sản phẩm !!!"],
  },
  userId: {
    type: String,
    required: [true, "Vui lòng nhập ID người dùng"],
  },
  productId: {
    type: String,
    required: [true, "Vui lòng nhập ID người dùng"],
  },
  Stock: {
    type: Number,
    required: [true, "Vui lòng nhập số lượng sản phẩm!!!"],
  }
});

module.exports = mongoose.model("Cart", cartSchema);
