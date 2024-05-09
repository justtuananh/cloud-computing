const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Vui lòng thêm tẻn sản phẩm !!!"],
  },
  productPrice: {
    type: Number,
    required: [true, "Vui lòng thêm giá sản phẩm!!!"],
  },
  productImage: {
    type: String,
    required: [true, "Vui lòng thêm hình ảnh sản phẩm!!!"],
  },
  quantity: {
    type: Number,
    required: [true, "Vui lòng thêm giá sản phẩm !!!"],
  },
  userId: {
    type: String,
    required: [true, "Vui lòng thêm ID người dùng!!!"],
  },
  productId:{
    type: String,
    required: [true, "Vui lòng thêm ID người dùng!!"],
  },
  Stock: {
    type: Number,
    required: [true, "Vui lòng thêm số lượng sản phẩm !!!"],
  }
});

module.exports = mongoose.model("Wishlist", wishListSchema);
