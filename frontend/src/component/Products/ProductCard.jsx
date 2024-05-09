import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import currency from "currency-formatter";
const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  
  return (
    <div style={{boxShadow:"-moz-initial"}}>
      <Link className="ProductCard" to={`/product/${product._id}`}>
      <img
              src={product.images[0].url}
              alt={product.name}
              className="ProductImg"
            />
            <p className="productName" style={{
              fontSize:"large"
            }}>{product.name}</p>
            <div>
            <Rating {...options} />
              <span>({product.numOfReviews} Đánh giá)</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="offerPriceBox">
                <h1
                  className="discountPrice"
                  style={{
                    paddingLeft: "2.5vmax",
                    fontSize: ".9vmax",
                    paddingBottom: "0",
                    color:"#c50000"
                  }}
                >
                  {product.offerPrice > 0 ? `${product.offerPrice} (đ)` : ""}
                </h1>
                <span className="p__Price" style={{color:"#ea0800", fontSize:"1.2vmax"}}>{`${currency.format(product.price, {code:"VND"})}`} </span>
                <span style={{fontSize:".9vmax",marginLeft:"1.5vmax"}}>(Còn {`${product.Stock}`})</span>
              </div>
            </div>
          </Link>
    </div>
  );
};

export default ProductCard;
