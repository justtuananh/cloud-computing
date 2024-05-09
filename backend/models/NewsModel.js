const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  newsTitle: {
    type: String,
    required: [true, "Vui lòng nhập tên sản phẩm!!!"],
  },
  newsImage: {
    type: String,
    required: [true, "Vui lòng nhập giá sản phẩm!!!"],
  },
  description: {
    type: String,
    required: [true, "Vui lòng thêm hình ảnh sản phẩm !!!"],
    trim: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    //   required: true
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("News", newsSchema);
