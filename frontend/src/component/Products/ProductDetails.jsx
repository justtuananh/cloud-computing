import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
  getProduct,
} from "../../actions/ProductActions";
import Footer from "../../Footer";
import MetaData from "../../more/Metadata";
import Header from "../Home/Header";
import "./Productdetails.css";
import { Rating } from "@material-ui/lab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItemsToCart } from "../../actions/CartAction";
import { addFavouriteItemsToCart } from "../../actions/FavouriteAction";
import ReviewCard from "./ReviewCard.jsx";
import { NEW_REVIEW_RESET } from "../../constans/ProductConstans";
import BottomTab from "../../more/BottomTab";
import Loading from "../../more/Loader";
import currency from "currency-formatter";
import DOMPurify from "isomorphic-dompurify";


const ProductDetails = ({ match, history }) => {
  const dispatch = useDispatch();

  const { product,loading, error } = useSelector(
    (state) => state.productDetails  
  );


  const { isAuthenticated } = useSelector((state) => state.user);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    {
      isAuthenticated !== true ? history.push(`/login?redirect=/`) : <></>;
    }

    dispatch(newReview(myForm));

    {
      comment.length === 0
        ? toast.error("Please fill the comment box")
        : toast.success("Đã đăng đánh giá thành công!!!");
    }
    dispatch({ type: NEW_REVIEW_RESET });
  };
  // Increase quantity
  const [quantity, setQuantity] = useState(1);
  let [size, setSize] = useState(product.sizes && product.sizes[0].name);
  
  let [color, setColor] = useState( product.color && product.color[0].name);
  // let [color, setColor] = useState(product.color[0].name
  // );
//  console.log(product.sizes[0].name)
//  console.log(product.color[0].name)

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


  const increaseQuantity = () => {
    if (product.Stock <= quantity) return toast.error("Số lượng sản phẩm có giới hạn!!!");
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    
    if (product.Stock > 0) {
      dispatch(addItemsToCart(match.params.id, quantity, color, size));
      toast.success("Đã thêm sản phẩm vào giỏ hàng!");
    } else {
      toast.error("Số lượng sản phẩm có giới hạn!!");
    }
  };

  const addToFavouriteHandler = () => {
    dispatch(addFavouriteItemsToCart(match.params.id, quantity));
    toast.success("Đã thêm sản phẩm vào mục yêu thích!!");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${product.name}`} />
          <Header />
          <div className="ProductDetails">
            <div className="first__varse">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div className="varse__2">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span style={{ marginLeft: "16px" }}>
                  ({product.numOfReviews} Reviews)
                </span>
                <span style={{ marginLeft: "16px"}}>|</span>
                <span style={{ marginLeft: "16px", width:"5px"}}>
                  Mã số:{product._id}
                </span>
              </div>
              <div className="detailsBlock">
                <div
                  style={{
                    display: "flex",
                    marginTop: "12px",
                  }}
                >
                  <h1
                    style={{
                      color: "rgb(250, 0, 0)",
                    }}
                  >
                    {/* // >{`${product.price} VND`}</h1> */}
                    {currency.format(product.price, { code: "VND" })}
                  </h1>
                  <h1 className="discountPrice">
                    {product.offerPrice > 0 ? `đ${product.offerPrice}` : ""}
                  </h1>
                </div>
                <div className="detailsBlock-3-1">
                  <span className="quantity">Số lượng:</span>
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" style={{textAlign:"center", fontWeight:"550"}} readOnly value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                </div>
                <p
                  className="stock__meta"
                  style={{ paddingBottom: "1.5vmax", paddingTop: "1vmax" }}
                >
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Đã hết hàng:" : "Còn hàng"}
                  </b>

                  <b
                    className={product.Stock < 1 ? "" : "display: none"}
                    style={{ marginLeft: "10px" }}
                  >
                    ({`${product.Stock}`} sản phẩm có sẵn)
                  </b>
                </p>
                <p
                  className="stock__meta"
                  style={{
                    paddingBottom: "1.2vmax",
                    paddingTop: "0.5vmax",
                    fontWeight: 550,
                  }}
                >
                  Nhà cung cấp: {product.supplier}
                </p>

                {product.sizes && (
                  <div style={{ padding: "4px 0 4zpx 0" }}>
                    <h1
                      style={{ fontSize: "1.3vmax", padding: "10px 0 5px 0" }}
                    >
                      Chọn size:
                    </h1>
                  
                    <select
                      style={{
                        padding: "6px",
                        width: "8vmax",
                        fontSize: "1.1vmax",
                        cursor:"pointer"
                      }}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option
                        style={{ fontSize: "1.1vmax", fontWeight: 550 }}
                        value=""
                      >
                        Chọn size
                      </option>
                      {product.sizes.map((size) => (
                        <option
                          style={{ fontSize: "1.1vmax", fontWeight: 450 }}
                          // key={size.name}
                          value={size.name}
                        >
                          {size.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {product.color && (
                  <div style={{ padding: "4px 0 4zpx 0" }}>
                    <h1
                      style={{
                        fontSize: "1.3vmax",
                        padding: "10px 0 5px 0",
                        fontWeight: 550,
                      }}
                    >
                      Chọn màu:
                    </h1>
                   
                    <select
                      style={{
                        padding: "6px",
                        width: "8vmax",
                        fontSize: "1.1vmax",
                        cursor:"pointer"
                      }}
                      onChange={(e) => setColor(e.target.value)}
                    >
                      <option
                        style={{ fontSize: "1.1vmax", fontWeight: 550 }}
                        value=""
                      >
                        Chọn màu
                      </option>
                      {product.color.map((color) => (
                        <option
                          style={{ fontSize: "1.1vmax", fontWeight: 450 }}
                          // key={color.name}
                          value={color.name}
                        >
                          {color.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "3vmax",
                  }}
                >
                  <div
                    className="wishlist"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "25px 8px ",
                      backgroundColor: "#fe6d6de8",
                      color: "#222222",
                      fontWeight: 550,
                      borderRadius: "8px",
                      fontSize: "1vmax",
                    }}
                    onClick={addToFavouriteHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                    </svg>
                    <span
                      className="cartBtn"
                      style={{ opacity: 0.7, padding: "0px 5px" }}
                    >
                      Thêm vào yêu thích
                    </span>
                  </div>

                  <div
                    className="pointer flex"
                    style={{
                      cursor: "pointer",
                      padding: "25px 8px ",
                      alignItems: "center",
                      backgroundColor: "#3cc4ff",
                      borderRadius: "8px",
                      marginLeft: "2vmax",
                    }}
                    onClick={addToCartHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-bag"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                    <button
                      className="cartBtn"
                      style={{
                        opacity: 0.7,
                        padding: "0px 5px",
                        border: "none",
                        cursor: "pointer",
                        background: "none",
                        fontWeight: 550,
                        color: "#1f1f1f",
                        fontSize: "1vmax",
                      }}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* //mô tả sản phẩm */}
          <div
            style={{
              padding: "2vmax 0 0 5vmax",
              alignItems: "center",
              borderTop: "2px dashed #344",
              borderBottom: "2px dashed #344",
            }}
          >
            <div>
              {" "}
              <span
                style={{
                  fontSize: "1.5vmax",
                  marginBottom: "14px",
                  fontWeight: 750,
                  paddingLeft: "4vmax",
                }}
              >
                Giới thiệu sản phẩm:
              </span>
            </div>

            <p
              style={{
                fontSize: "1.1vmax",
                padding: "2vmax 5vmax 5vmax 5vmax",
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description),
                }}
              />

              {/* {product.description} */}
            </p>
          </div>
          {/* Reviews */}
          <div className="reviews__heading">
            <h1
              style={{
                padding: "5px 30px",
                opacity: 1,
                borderBottom: "1px solid #999",
                fontFamily: "Poppins,sans-serif",
                marginLeft: "2.5vmax",
                marginTop: "5vmax",
              }}
            >
              Đánh giá
            </h1>
          </div>
          <div>
            <div
              style={{
                padding: "0px 2vmax",
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "1.9vmax",
                  fontWeight: "700",
                  lineHeight: 1,
                  letterSpacing: "-.0125em",
                  color: "#222",
                  fontFamily: "Poppins,sans-serif",
                  marginLeft: "3vmax",
                }}
              >
                Viết đánh giá:
              </span>
              <div
                style={{
                  margin: "1vmax 0",
                  flexDirection: "column",
                  display: "flex",
                }}
              >
                <div>
                  <span
                    style={{
                      color: "#222",
                      fontFamily: "Poppins,sans-serif",
                      padding: "1vmax 0",
                      marginLeft: "5vmax",
                    }}
                  >
                    Bình chọn:
                  </span>
                  <Rating
                    style={{
                      marginLeft: "10px",
                    }}
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  ></div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid #999",
                }}
              >
                <textarea
                  cols="25"
                  rows="3"
                  placeholder="Comment *"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    maxWidth: "50%",
                    color: "#111",
                    borderColor: "#727272",
                    background: "#ffefef",
                    borderRadius: "0.3rem",
                    outline: "none",
                    padding: "5px",
                    fontSize: "1.2vmax",
                    lineHeight: "1.5",
                    resize: "none",
                    display: "block",
                    marginTop: "20px",
                    width: "50%",
                    marginBottom: "20px",
                    marginLeft: "5vmax",
                  }}
                ></textarea>
                <button
                  type="submit"
                  style={{
                    width: "8vmax",
                    height: "3vmax",
                    margin: "1vmax 0px",
                    fontFamily: "sans-serif",
                    padding: "10px 15px",
                    background: "#006b9c",
                    // margin: "5vmax",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                    borderRadius: "14px",
                    marginLeft:"4vmax"
                  }}
                  onClick={reviewSubmitHandler}
                >
                  Submit
                </button>
              </div>
            </div>
            {/* Reviews */}
            <div
              style={{
                padding: "1vmax",
                backgroundColor: "#faf7f783",
                maxHeight: "25vmax",
                overflow: "auto",
              }}
            >
              {product.reviews && product.reviews[0] ? (
                <div className="review__option">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ReviewCard review={review} />
                    ))}
                </div>
              ) : (
                <p
                  className="noReviews"
                  style={{
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  Chưa có đánh giá
                </p>
              )}
            </div>
          </div>
          {/* <div
            style={{
              borderBottom: "2px dashed #344",
              backgroundColor: "#4343",
              height: "20vmax",
              borderTop: "2px dashed #344",
            }}
          >
            <h1 style={{textAlign:"center", padding:"2vmax"}}>Có thể bạn cũng thích</h1>
            <div className="SearchContainer">
        <div className="container" id="container">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
          </div> */}
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default ProductDetails;
