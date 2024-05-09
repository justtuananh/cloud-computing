import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import Header from "../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Pagination from "react-js-pagination";
import "./Product.css";
import Typography from "@material-ui/core/Typography";
// import { useAlert } from "react-alert";
import MetaData from "../../more/Metadata";
import BottomTab from "../../more/BottomTab";
import Carousel from "react-material-ui-carousel";
import bg from "../../Assets/backgroundHome1.webp";

import bg3 from "../../Assets/backgroundHome2.jpg";
import bg4 from "../../Assets/productBanner/NEW_ARRIVALS.png";

const categories = ["Áo hoodie", "Others"];
const styleman = [
  "Áo thun nam",
  "Áo sơ mi nam",
  "Áo khoác nam",
  "Quần short nam",
  "Quần dài nam",
];
const stylegirl = [
  "Áo thun nữ",
  "Áo sơ mi nữ",
  "Áo khoác nữ",
  "Quần short nữ",
  "Quần dài nữ",
  "Chân váy nữ",
  "Đầm nữ",
  "Yếm",
];
const accessory = [
  "Túi xách",
  "Giày nữ",
  "Thắt lưng",
  "Kính mắt",
  "Giày nam",
  "Ví",
];

const colors = ["Trắng", "Xám", "Xanh lục", "Đen", "Đỏ", "Xanh dương","Hồng","Xanh rêu","Màu be","Xanh bơ","Nâu","Kem","Nâu sữa","Hồng tím","Hồng sữa","Cam","Vàng"];

const size = ["S", "M", "L", "XL", "XXL", "XXXL","25","26","27","28","29","30","31","32","34","35","36"];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [sizes, setSizes] = useState("");

  const [openManGirl, setOpenManGirl] = React.useState(false);
  const handleOpenManGirl= () => {
    setOpenManGirl(!openManGirl);
  };

  const [openMan, setOpenMan] = React.useState(false);
  const handleOpenMan = () => {
    setOpenMan(!openMan);
  };
  const [openWoman, setOpenWoman] = React.useState(false);
  const handleOpenWoman = () => {
    setOpenWoman(!openWoman);
  };

  const [openAccessory, setOpenAccessory] = React.useState(false);
  const handleOpenAccessory= () => {
    setOpenAccessory(!openAccessory);
  };

  const [openColor, setOpenColor] = React.useState(false);
  const handleOpenColor= () => {
    setOpenColor(!openColor);
  };

  const [openSize, setOpenSize] = React.useState(false);
  const handleOpenSize= () => {
    setOpenSize(!openSize);
  };

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category, color, sizes));
  }, [dispatch, keyword, currentPage, category, color,sizes, alert, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Sản phẩm" />
          <Header />
          <div>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <div className="productBanner">
                <Carousel
                  style={{
                    overflow: "hidden",
                    height: "10vh",
                  }}
                >
                  <img src={bg} className="bgImgi" />

                  <img src={bg3} className="bgImgi" />
                  <img src={bg4} className="bgImgi" />
                </Carousel>
              </div>
            </div>
            {products.length === 0 ? (
              ""
            ) : (
              <h2
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid rgba(21,21,21,0.5)",
                  width: "20vmax",
                  fontSize: "1.4vmax",
                  fontFamily: "Poppins,sans-serif",
                  margin: "3vmax auto",
                  color: "rgb(0, 0, 0, 0.7)",
                }}
              >
                SẢN PHẨM
              </h2>
            )}
            <div
              className="sidebar__product"
              style={{
                display: "flex",
                flex: 1,
              }}
            >
              <div
                className="sidebar__products"
                style={{
                  border: "1px solid #999",
                  margin: "1vmax",
                  flex: ".177",
                  display:"flex",
                  flexDirection:"column",
                 
                }}
              >
                <Typography style={{ fontSize: "1.2vmax", padding: "5px", textAlign:"center" }}>
                  DANH MỤC
                </Typography>

                {/* <ul className="categoryBox">
                  <li className="category-link" onClick={() => setCategory()}>
                    Tất cả
                  </li>
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                      type="checkbox"
                    >
                      + {category}
                    </li>
                  ))}
                </ul> */}
                <button style={{borderLeft:"none", borderRight:"none",cursor:"pointer"  }} onClick={() => setCategory()}>
                  {" "}
                  <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                  +Tất cả
                  </Typography>
                </button>
               
                  {/* <ul className="categoryBox">
                    {categories.map((category) => (
                      <li style={{borderBottom:"1px solid grey"}}
                        className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                        type="checkbox"
                      >
                        + {category}
                      </li>
                    ))}
                  </ul> */}
                  <button style={{borderLeft:"none", borderRight:"none", borderTop:"none"  }} onClick={handleOpenManGirl}>
                  {" "}
                  <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                  +Thời trang nam, nữ
                  </Typography>
                </button>
                {openManGirl ? (
                  <ul className="categoryBox">
                    {categories.map((category) => (
                      <li style={{borderBottom:"1px solid grey"}}
                        className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                        type="checkbox"
                      >
                        + {category}
                      </li>
                    ))}
                  </ul>
                ) : null}
          
                <button style={{borderLeft:"none", borderRight:"none", borderTop:"none"  }} onClick={handleOpenMan}>
                  {" "}
                  <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                  +Thời trang nam
                  </Typography>
                </button>
                {openMan ? (
                  <ul className="categoryBox">
                    {styleman.map((category) => (
                      <li style={{borderBottom:"1px solid grey"}}
                        className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                        type="checkbox"
                      >
                        + {category}
                      </li>
                    ))}
                  </ul>
                ) : null}
               
                <button style={{ borderLeft:"none", borderRight:"none",borderTop:"none"}} onClick={handleOpenWoman}>
                  {" "}
                  <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                  +Thời trang nữ
                  </Typography>
                </button>
                {openWoman ? (
                  <ul className="categoryBox">
                    {stylegirl.map((category) => (
                      <li style={{borderBottom:"1px solid grey"}}
                        className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                        type="checkbox"
                      >
                        + {category}
                      </li>
                    ))}
                  </ul>
                ) : null}
               
               <button style={{borderLeft:"none", borderRight:"none",borderTop:"none"}} onClick={handleOpenAccessory}>
                  {" "}
                  <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                 +Phụ kiện
                  </Typography>
                </button>
                {openAccessory ? (
                  <ul className="categoryBox">
                    {accessory.map((category) => (
                      <li style={{borderBottom:"1px solid grey"}}
                        className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                        type="checkbox"
                      >
                        + {category}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <button style={{borderLeft:"none", borderRight:"none",borderTop:"none"}} onClick={handleOpenColor}>
                  {" "}
                  <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                    +Tìm kiếm theo màu sắc
                  </Typography>
                </button>
                {openColor ? (
                  <ul className="categoryBox">
                    {colors.map((color) => (
                      <li style={{borderBottom:"1px solid grey"}}
                        className="category-link"
                        key={color}
                        onClick={() => setColor(color)}
                        type="checkbox"
                      >
                        + {color}
                      </li>
                    ))}
                  </ul>
                ) : null}

<button style={{borderLeft:"none", borderRight:"none",borderTop:"none"}} onClick={handleOpenSize}>
                  {" "}
                  <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                    +Tìm kiếm theo kích thước
                  </Typography>
                </button>
                {openSize ? (
                  <ul className="categoryBox">
                    {size.map((sizes) => (
                      <li style={{borderBottom:"1px solid grey"}}
                        className="category-link"
                        key={sizes}
                        onClick={() => setSizes(sizes)}
                        type="checkbox"
                      >
                        + {sizes}
                      </li>
                    ))}
                  </ul>
                ) : null}
               
              </div>

              {products.length === 0 ? (
                <span
                  style={{
                    display: "block",
                    padding: "30px 0",
                    fontSize: "1.5rem",
                    flex: ".9",
                    textAlign: "center",
                  }}
                >
                  Không tìm thấy sản phẩm trong danh mục này....
                </span>
              ) : (
                <div
                  className="products"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    flex: ".9",
                  }}
                >
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              )}
            </div>

            <div
              className="pagination__box"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "6vmax",
              }}
            >
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          </div>
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Products;
