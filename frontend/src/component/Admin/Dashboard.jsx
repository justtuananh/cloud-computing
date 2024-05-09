import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata.js";
import Loading from "../../more/Loader.js";
import { getAdminProduct } from "../../actions/ProductActions.js";
import { getAllOrders } from "../../actions/OrderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import currency from "currency-formatter";
import ProductChart from "./Chart/ProductChart.jsx";
import UserChart from "./Chart/UserChart.jsx";
import IncomeChart from "./Chart/IncomeChart.jsx";
import OderChart from "./Chart/OderChart.jsx";
import ProductSell from "./Chart/ProductSell.jsx";
import MinProduct from "./Chart/MinProduct.jsx";
import OrderMonth from "./Chart/OrderMonth.jsx";
import { ToastContainer, toast } from "react-toastify";
import SellInMonth from "./Chart/SellInMonth.jsx";
import UserBuyMost from "./Chart/UserBuyMost.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.AllOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  let canNhapHang = 0;
  let RatingSlow = 0;

  products &&
    products.forEach((item) => {
      if (item.ratings > 0 && item.ratings <= 3) {
        RatingSlow += 1;
      }
    });

  products &&
    products.forEach((item) => {
      if (item.Stock < 30) {
        canNhapHang += 1;
      }
    });
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    if (canNhapHang > 0) {
      toast.warning(
        "Có sản phẩm sắp hết hàng!! Quản lý nhớ chú ý việc nhập hàng sớm nhất."
      );
    }
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      if (
        item.orderStatus !== "Hủy đơn hàng" &&
        item.paymentMethod !== "Thanh toán khi nhận hàng !"
      ) {
        totalAmount += item.totalPrice;
      } else if (
        item.paymentMethod === "Thanh toán khi nhận hàng !" &&
        item.orderStatus === "Đã giao hàng"
      ) {
        totalAmount += item.totalPrice;
      }
    });

  // const lineState = {
  //   labels: ["Initial Amount", "Amount Earned"],
  //   datasets: [
  //     {
  //       label: "TỔNG THU NHẬP",
  //       backgroundColor: ["#42c2e2"],
  //       hoverBackgroundColor: ["#3BB77E"],
  //       data: [0, totalAmount],
  //     },
  //   ],
  // };

  const doughnutState = {
    labels: ["Hết hàng", "Còn hàng"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="dashboard">
          <MetaData title="Quản lý" />
          <Sidebar />

          <div className="dashboardContainer">
            <Typography component="h1">Dashboard</Typography>

            <div className="dashboardSummary">
              <div>
                <p>
                  Tổng thu nhập <br />{" "}
                  {currency.format(totalAmount, { code: "VND" })}
                </p>
              </div>
              <div className="dashboardSummaryBox2">
                <Link to="/admin/products">
                  <p>Sản phẩm</p>
                  <p>{products && products.length}</p>
                </Link>
                <Link to="/admin/orders">
                  <p>Đơn hàng</p>
                  <p>{orders && orders.length}</p>
                </Link>
                <Link to="/admin/users">
                  <p>Tài khoản</p>
                  <p>{users && users.length}</p>
                </Link>
                <Link to="/admin/products">
                  <p>Sản phẩm hết hàng</p>
                  <p>{products && outOfStock}</p>
                </Link>
              </div>
              <div className="dashboardSummaryBox2">
                <Link to="/admin/proposal">
                  <p>Sản phẩm cần nhập hàng:</p>
                  <p>{products && canNhapHang}</p>
                </Link>
                <Link
                  to="/admin/lowratings"
                  style={{ backgroundColor: "#da0424e2" }}
                >
                  <p>Cảnh báo sản phẩm:</p>
                  <p>{products && RatingSlow}</p>
                </Link>
              </div>
            </div>
            <div className="lineChart">
              {/* <Line data={lineState} /> */}
              <SellInMonth />
            </div>
            <div className="lineChart">
              {/* <Line data={lineState} /> */}
              <OderChart />
            </div>

            <div className="lineChart">
              {/* <Line data={lineState} /> */}
              <IncomeChart />
            </div>

            <div className="lineChart">
              {/* <Line data={lineState} /> */}
              <OrderMonth />
            </div>

            {/* <div className="doughnutChart">
              <h1 style={{textAlign:"center"}}>Biểu đồ cơ cấu sản phẩm</h1>
              <Doughnut data={doughnutState} />
            </div> */}
            <div className="lineChart">
              {/* <Line data={lineState} /> */}
              <ProductSell />
            </div>
            <div className="lineChart">
              {/* <Line data={lineState} /> */}
              <UserBuyMost />
            </div>
            <div className="lineChart">
              {/* <Line data={lineState} /> */}
              <MinProduct />
            </div>
            <div className="ContainerChart">
              <ProductChart />
              <UserChart />
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
export default Dashboard;
