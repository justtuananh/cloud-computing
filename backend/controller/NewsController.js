const News = require("../models/NewsModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Features = require("../utils/Features");

//TẠO 1 BÀI VIẾT TIN TỨC

exports.createNews = catchAsyncErrors(async (req, res, next) => {
    const {
        newsTitle,
        newsImage,
        description,
    
    } = req.body;
    // let newsImage = "https://i.pinimg.com/564x/77/0a/e6/770ae6a60205896a094ce7e46f492f2a.jpg";
  
  
    // if (typeof req.body.images === "string") {
    //   images.push(req.body.images);
    // } else {
    //   images = req.body.images;
    // }
  
    // const imagesLinks = [];
  
    // for (let i = 0; i < images.length; i++) {
    //   const result = await cloudinary.v2.uploader.upload(images[i], {
    //     folder: "products",
    //   });
  
    //   imagesLinks.push({
    //     public_id: result.public_id,
    //     url: result.secure_url,
    //   });
    // }
  
    // req.body.images = imagesLinks;
    req.body.user = req.user.id;
  
    // const product = await Product.create(req.body);
    const news = await News.create({
        newsTitle: newsTitle,
        newsImage,
        description,
     createdBy: req.user._id,
    });
   
    res.status(201).json({
      success: true,
      news,
    });
  });

  //lấy tất cả tin tức
  // Get All Product (Admin)
exports.getAdminNews = catchAsyncErrors(async (req, res, next) => {
  
    const news = await News.find();
    
    res.status(200).json({
      success: true,
      news,
    });
  });
  
  // get All Products
  exports.getAllNews = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 8;
  
    const productsCount = await News.countDocuments();
  
    const feature = new Features(News.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const news = await feature.query;
    res.status(200).json({
      success: true,
      news,
      productsCount,
      resultPerPage,
    });
  });
  
  // CẬP NHẬT TIN TỨC
  // Update Product ---Admin
exports.updateNews = catchAsyncErrors(async (req, res, next) => {
    const {
        newsTitle,
        newsImage,
        description,
      
    } = req.body;
    let news = await News.findById(req.params.id);
    if (!news) {
      return next(new ErrorHandler("News is not found with this id", 404));
    }
  
    // let images = [];
  
    // if (typeof req.body.images === "string") {
    //   images.push(req.body.images);
    // } else {
    //   images = req.body.images;
    // }
  
    // if (images !== undefined) {
    //   // Delete image from cloudinary
    //   for (let i = 0; i < product.images.length; i++) {
    //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    //   }
  
    //   const imagesLinks = [];
  
    //   for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //       folder: "products",
    //     });
    //     imagesLinks.push({
    //       public_id: result.public_id,
    //       url: result.secure_url,
    //     });
    //   }
    //   req.body.images = imagesLinks;
    // }
    news = await News.findByIdAndUpdate(
      req.params.id,
      {
        newsTitle,
        newsImage,
        description,
      
      },
      { new: true, runValidators: true, useUnified: false }
    );
   
    res.status(200).json({
      success: true,
      news,
    });
  });

  // delete news
exports.deleteNews = catchAsyncErrors(async (req, res, next) => {
    const news = await News.findById(req.params.id);
  
    if (!news) {
      return next(new ErrorHandler("News is not found with this id", 404));
    }
  
    await news.remove();
    // Deleting images from cloudinary
    // for (let i = 0; 1 < product.images.length; i++) {
    //   const result = cloudinary.v2.uploader.destroy(product.images[i].public_id);
    // }
  
    res.status(200).json({
      success: true, 
      message: "News deleted succesfully",
    });
  });

  // single Product details
exports.getSingleNews = catchAsyncErrors(async (req, res, next) => { 
    const news = await News.findById(req.params.id);
    if (!news) {
      return next(new ErrorHandler("Product is not found with this id", 404));
    }
  
    res.status(200).json({
      success: true,
      news,
    });
  });