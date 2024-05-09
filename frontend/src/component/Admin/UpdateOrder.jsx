import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../more/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/OrderAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constans/OrderConstans";
import "./UpdateOrder.css";
import { ToastContainer, toast } from "react-toastify";
import currency from "currency-formatter";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import DOMPurify from "isomorphic-dompurify";

const UpdateOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector(
    (state) => state.myOrderDetails
  );
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.deleteOrder
  );

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(match.params.id, myForm));
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, match.params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Xử lý đơn hàng" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContaineraa">
          {loading ? (
            <Loading />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Thông tin vận chuyển</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Tên:</p>
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

                  <Typography>Thanh toán</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      {order &&
                      order.paymentMethod === "Thanh toán khi nhận hàng !" ? (
                        <p
                          style={{
                            color: "red",
                          }}
                        >
                          CHƯA THANH TOÁN
                        </p>
                      ) : (
                        <p
                          style={{
                            color: "green",
                          }}
                        >
                          ĐÃ THANH TOÁN
                        </p>
                      )}
                      <span>
                        (
                        {order.paidAt &&
                          formatDistanceToNow(new Date(order.paidAt), {
                            addSuffix: true,
                          })}
                        )
                      </span>
                    </div>

                    <div>
                      <p>Số tiền:</p>
                      {/* <span>${order.totalPrice && order.totalPrice}</span> */}
                      <span>
                        {currency.format(order.totalPrice, { code: "VND" })}
                      </span>
                    </div>
                    <div>
                      {/* <p>Hình thức thanh toán:</p> */}
                      {/* <span>$ {order.totalPrice && order.totalPrice}</span> */}
                    </div>
                  </div>

                  <Typography>Trạng thái đơn hàng</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                  <Typography>Ghi chú của khách hàng:</Typography>
                  {order.noteBuy != " " ? (
                    <div className="orderDetailsContainerBox">
                      <div
                        style={{
                          backgroundColor: "#d4d4d444",
                          padding: "2vmax",
                          border: "1px solid #30303021",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(order.noteBuy),
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <p
                      style={{
                        fontSize: "1vmax",
                        padding: "1.5vmax",
                        marginLeft: ".5vmax",
                      }}
                    >
                      Không có ghi chú!!!
                    </p>
                  )}
                </div>
                <div className="confirmCartItems">
                  <Typography>Đơn hàng:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <div style={{ display: "contents" }}>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>{" "}
                            Size: {item.size && item.size}, Màu:{" "}
                            {item.color && item.color}
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
              {/*  */}
              <div
                style={{
                  display:
                    order.orderStatus === "Đã giao hàng" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Cập nhật trạng thái</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Chọn trạng thái</option>
                      {order.orderStatus === "Chờ xác nhận" && (
                        <>
                          <option value="Xác nhận đơn hàng">
                            Xác nhận đơn hàng
                          </option>
                          <option value="Hủy đơn hàng">Hủy đơn hàng</option>
                        </>
                      )}
                      {order.orderStatus === "Xác nhận đơn hàng" && (
                        <option value="Đơn hàng đã đưa đến bưu cục">Đơn hàng đã đưa đến bưu cục vận chuyển</option>
                      )}
                      {order.orderStatus === "Đơn hàng đã đưa đến bưu cục" && (
                        <option value="Đang giao hàng">
                          Đang giao hàng
                        </option>
                      )}
                      {/* {order.orderStatus === "Đơn hàng đã đưa đến bưu cục" && (
                        <option value="Đang giao hàng">Đang giao hàng</option>
                      )} */}

                      {order.orderStatus === "Đang giao hàng" && (
                        <option value="Đã giao hàng">Đã giao hàng</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    CẬP NHẬT
                  </Button>

                  {order.orderStatus === "Hủy đơn hàng" ? (
                    <div
                      style={{
                        padding: "10px",
                        flexDirection: "column",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "1.2vmax",
                          color: "red",
                        }}
                      >
                        Quản lý cần liên hệ và thông báo lí do với khách hàng
                        qua số điện thoại hoặc Email.
                      </p>
                      <p
                        style={{
                          fontSize: "1.2vmax",
                          color: "black",
                        }}
                      >
                        Số điện thoại: 
                        0{order.shippingInfo && order.shippingInfo.phoneNo}{" "}
                      </p>
                      <p
                        style={{
                          fontSize: "1.2vmax",
                          color: "black",
                        }}
                      >Email: 
                      <span>{order.user && order.user.email}</span>
                    </p>
                    </div>
                  ) : null}
                </form>
              </div>
            </div>
          )}
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
    </Fragment>
  );
};

export default UpdateOrder;
