import React, { useEffect, useState } from "react";
import "./Home.css";
import Carousel from "react-material-ui-carousel";

import bg from "../../Assets/banner.webp";
import bg2 from "../../Assets/banner2.webp";
import bg3 from "../../Assets/top-banner-pc-3.png";
import bg4 from "../../Assets/cover-whiteonwhite.jpg";

import ProductCard from "../Products/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Header from "./Header";
import MetaData from "../../more/Metadata";
import Footer from "../../Footer";
import BottomTab from "../../more/BottomTab";
import Loading from "../../more/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalContact from "../../more/ModalContact";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ModalContact />
          <MetaData title="Kiana shop" />
          <Header />
          {/* Carousel */}
          <div
            className="banner">
            <Carousel
              style={{
                overflow: "hidden",
              }}
            >
              <img src={bg2} className="bgImg" />
              <img src={bg} className="bgImg" />

              <img src={bg3} className="bgImg" />
              <img src={bg4} className="bgImg" />
            </Carousel>
          </div>
          <div style={{ paddingTop: "5vmax" }}>
            <h2 className="homeHeading">SẢN PHẨM NỔI BẬT</h2>
          </div>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
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

          <Footer />

          <BottomTab />
        </>
      )}
    </>
  );
};

export default Home;
