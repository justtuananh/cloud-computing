import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FavouriteItemsCard.css";
import { useSelector, useDispatch } from "react-redux";

import currency from "currency-formatter";

const FavouriteItemsCard = ({ item, deleteFavouriteItems }) => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productDetails);

  return (
  

    
    <div className="FavouriteItemsCard">
       
      <div className="itemConatiner">

        <img src={item.image} alt="ssa" />
        
           
      </div>
      <div>
                <Link to={`/product/${item.product}`} style={{fontSize:"1vmax"}}>{item.name}</Link>
                      
          
            </div>
      <div>
      <span>{`${currency.format(item.price, {code:"VND"})}`}</span>
      </div>

      <div>
        <p style={{ paddingBottom: ".5vmax" }}>
          <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
            {product.Stock < 1 ? "Hết hàng" : "Còn hàng"}
          </b>
        </p>
      </div>

      <div>
        <Link to={`/product/${item.product}`}>
          <button
            className="favouritesButton"
            onClick={() => deleteFavouriteItems(item.product)}
          >
            Mua ngay
          </button>
        </Link>
        <button
        style={{marginTop:"5px"}}
            className="favouritesButton"
            onClick={() => deleteFavouriteItems(item.product)}
          >
           Xóa
          </button>
      </div>
    </div>
    
  );
};

export default FavouriteItemsCard;
