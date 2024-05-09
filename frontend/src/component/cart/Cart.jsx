import React from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/CartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import CartItemCard from "./CartItemCard.js";
import BottomTab from "../../more/BottomTab";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../Home/Header";
import currency from "currency-formatter"
import MetaData from "../../more/Metadata";

const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  let Price = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  let totalPrice = Price;

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return toast.error("Product Stock Limited");
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping"); 
  };

  return (
    <>
    <Header />
    <MetaData title="Giỏ hàng" />
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>Giỏ hàng trống!!!</Typography>
          <Link to="/products">Mua ngay!!!</Link>
          <BottomTab />
        </div>
      ) : (
        <>
          <div className="cartPage">
            <h1 style={{textAlign:"center", paddingBottom:"1vmax"}}>Giỏ hàng</h1>
            <div className="cartHeader">
              <p>Sản phẩm</p>
              <p>Số lượng</p>
              <p>Thành tiền</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" readOnly value={item.quantity} />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  {/* <p className="cartSubtotal">{`đ.${
                    item.price * item.quantity
                  }`}</p> */}
                  <p className="cartSubtotal"> {currency.format( item.price * item.quantity, {code:"VND"})}</p>
                 
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Tổng số tiền</p>
                <p>{currency.format(totalPrice, {code:"VND"})}</p>
              </div>
              <div></div> 
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Đặt hàng</button>
              </div>
            </div>
          </div>
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
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Cart;
