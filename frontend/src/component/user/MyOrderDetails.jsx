import React, { useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/OrderAction";
import { useAlert } from "react-alert";
import Loading from "../../more/Loader";
import BottomTab from "../../more/BottomTab";
import currency from "currency-formatter"
import Header from "../Home/Header";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const MyOrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.myOrderDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <>
  
      {loading ? (
        <Loading />
      ) : (
        <>
        
          <MetaData title="Chi tiết đơn hàng" />
          <Header />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Đơn hàng #{order && order._id}
              </Typography>
              <Typography>Thông tin vận chuyển:</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Tên khách hàng:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Số điện thoại:</p>
                  <span>
                    0{order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Địa chỉ:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.wards}, ${order.shippingInfo.district}, ${order.shippingInfo.province}`} 
                  </span>
                </div>
              </div>
              <Typography>Thanh toán:</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus === "Đã giao hàng"
                        ? "greenColor"
                        : "redColor"
                    }
                  >                  
                  </p>
                  <p style={{
                      color:"green"
                  }}>
                  Đã thanh toán
                  </p>
                  <span>({order.paidAt && formatDistanceToNow(new Date(order.paidAt),{addSuffix: true})})</span>
                </div>

                <div>
                  <p>Thành tiền:</p>
                  {/* <span>$ {order.totalPrice && order.totalPrice}</span> */}
                  <span>{currency.format(order.totalPrice && order.totalPrice, {code:"VND"})}</span>
                </div>

                <div>
                  <p>Hình thức thanh toán:</p>
                 
                  <p style={{fontSize:"1.1vmax", fontWeight:"bold",marginLeft:"4px"}}> {order.paymentMethod}</p>
                </div>
               
              </div>

              <Typography>Trạng thái đơn hàng:</Typography>
              <div className="orderDetailsContainerBox">
                <div style={{flexDirection: "column",}}>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                  
                  {order.orderStatus && order.orderStatus === "Hủy đơn hàng" ? (
                    <p  style={{
                      fontSize: "1.2vmax",
                      color: "black",
                      fontWeight:"600"
                    }}>Quản lý, nhân viên sẽ liên hệ phản hồi qua Email hoặc Số điện thoại của bạn trong thời gian sớm nhất, kính mong quý khách thông cảm!!!</p>
                  ):(null)}
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Thông tin đơn hàng:</Typography>
              <div className="orderDetailsCartItemsContainer">

                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.Offer}>
                      <img src={item.image} alt="Product" />
                      <div style={{ display: "contents" }}>
                            <Link to={`/product/${item.Offer}`}>
                              {item.name}
                            </Link>{" "}
                           Size: {item.size && item.size}, Màu: {item.color && item.color}
                          </div>
                          <span>
                            {/* {item.quantity} X {currency.format(item.price, {code:"VND"})} ={" "}
                            <b>{currency.format(item.quantity * item.price, {code:"VND"})}</b> */}
                            {item.quantity} X{" "}
                            {currency.format(item.price, { code: "VND" })} ={" "}
                            {currency.format(item.quantity * item.price, {
                              code: "VND",
                            })}
                          </span>
                    </div>
                  ))}


              </div>
            </div>
          </div>
        </>
      )}
      <BottomTab />
    </>
  );
};

export default MyOrderDetails;