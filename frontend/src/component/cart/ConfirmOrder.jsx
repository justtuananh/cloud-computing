import React, { useState } from "react";
import "./ConfirmOrder.css";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../../more/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import BottomTab from "../../more/BottomTab";
import currency from "currency-formatter";
import Header from "../Home/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { saveNoteBuy } from "../../actions/CartAction";
import { createOrder, clearErrors } from "../../actions/OrderAction";
import { removeItemsFromCart } from "../../actions/CartAction";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const [noteBuy, setNoteBuy] = useState(" ");

  let productPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const subtotal = productPrice;
  // eslint-disable-next-line
  const shippingCharges = productPrice > 200000 ? 0 : 20000;

  const totalPrice = subtotal + shippingCharges;

  // const address = `${shippingInfo.address}, ${shippingInfo.state}, ${shippingInfo.country}`;
  const address = `${shippingInfo.address}, ${shippingInfo.wards}, ${shippingInfo.district}, ${shippingInfo.province}`;
  const actionCreator = () => {
    // dispatch(saveShippingInfo({ address, state, country, phoneNo }));
    dispatch(saveNoteBuy(noteBuy));
  };

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
    };
    actionCreator();

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  };
  const paymentAtHome = () => {
    const orderInfo = {
      subtotal,
      shippingCharges,
      totalPrice,
    };
    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
      noteBuy: noteBuy,
      paymentMethod: "Thanh toán khi nhận hàng !",
    };

    dispatch(createOrder(order));

    history.push("/successOrder");
  };

  return (
    <>
      <MetaData title="Xác nhận" />
      <Header />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Thông tin giao hàng</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Tên:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Số điện thoại:</p>
                <span>(+84) {shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Địa chỉ:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmshippingArea">
            <Typography>Ghi chú cho người bán:</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <ReactQuill
                  theme="snow"
                  style={{ width: "60%" }}
                  id="noteBuy"
                  value={noteBuy}
                  onChange={setNoteBuy}
                  placeholder="Ghi chú..."
                />
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Đơn hàng của bạn:</Typography>

            {cartItems.length === 0 ? (
              <div className="confirmCartItemsContainer">""</div>
            ) : (
              <div className="confirmCartItemsContainer">
                {cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                      <br />({item.size},{"     "} {item.color})
                    </Link>{" "}
                    <span>
                      {item.quantity} X{" "}
                      {currency.format(item.price, { code: "VND" })} ={" "}
                      <b>
                        {currency.format(item.price * item.quantity, {
                          code: "VND",
                        })}{" "}
                      </b>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Hóa đơn đặt hàng</Typography>
            <div>
              <div>
                <p>Thành tiền:</p>
                <span>{currency.format(subtotal, { code: "VND" })}</span>
              </div>
              <div>
                <p>Phí vận chuyển:</p>
                <span>{currency.format(shippingCharges, { code: "VND" })}</span>
              </div>
              <div></div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Tổng tiền:</b>
              </p>
              <span>{currency.format(totalPrice, { code: "VND" })}</span>
            </div>

            <button onClick={proceedToPayment}>Tiến hành thanh toán</button>
            <div className="orderSummaryTotal"></div>
            {totalPrice && totalPrice > 500000 ? ( <p style={{fontSize:"1.2vmax"}}>Không áp dụng <b>thanh toán khi nhận hàng</b> đối với đơn hàng có tổng giá trị lớn hơn <b>500.000VND</b> </p>) : (<>
              <button onClick={paymentAtHome}>Thanh toán khi nhận hàng</button>
             
              </>
             
            )}
            {/* <button onClick={paymentAtHome}>Thanh toán khi nhận hàng</button> */}
          </div>
        </div>
      </div>
      <BottomTab />
    </>
  );
};

export default ConfirmOrder;
