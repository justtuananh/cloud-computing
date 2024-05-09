const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Vui lòng thêm tên sản phẩm !!!"],
        trim: true,
        maxLength:[70, "Tên sản phẩm không được dài quá 70 kí tự!!!"],
        trim:true
    },
    description:{
        type:String,
        required:[true, "Vui lòng thêm mô tả sản phẩm!!!"],
        maxlength:[5000,"Mô tả không được dài quá 5000 từ!!!"],
        trim:true,
    },
    price:{
        type:Number,
        required: [true, "Vui lòng thêm giá sản phẩm !!!"],
        maxLength:[8, "Giá sản phẩm không được dài quá 8 kí tự!!!"],
    },
    offerPrice:{
        type:String,
        maxLength: [8, "Giá khuyến mãi không được dài quá 8 kí tự!!!"],
    },
    color:{
        type: [Map],
    },
    sizes:{
        type: [Map],
    },
    ratings:{
        type: Number,
        default: 0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            },
        }
    ],
    category:{
        type: String,
        required:[true,"Vui lòng thêm loại sản phẩm !!!"],
    },
    Stock:{
        type: Number,
        required:[true,"Vui lòng thêm số lượng sản phẩm !!!"],
        maxLength: [3, "Số lượng không được vượt quá 1000 sản phẩm!!!"],
    },
    supplier:{
        type:String,
        default:"đang cập nhật",
    },
  numOfReviews:{
      type: Number,
      default: 0
  },
  reviews:[
      {
          user: {
              type:mongoose.Schema.ObjectId,
              ref:"User",
              required: true,
          },
          avatar: {
            public_id: {
              type: String,
            
            },
            url: {
              type: String,
             
            },
          },
          name:{
              type: String,
              required: true,
          },
          rating:{
              type: Number,
              required: true,
          },
          comment:{
              type:String,
          },
          time:{
              type: Date,
              default: Date.now()
          },
      },
  ],
  user:{
      type: mongoose.Schema.ObjectId,
      ref:"User",
    //   required: true
  },
  createAt:{
      type:Date,
      default: Date.now()
  }
})

module.exports = mongoose.model("Product",productSchema);