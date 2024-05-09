import React, { useState, Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import BottomTab from "../../more/BottomTab";
import MetaData from "../../more/Metadata";
import ProductCard from "./ProductCard";
import "./Search.css";
import Pagination from "react-js-pagination";

const Search = ({ history,match }) => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const keywords = match.params.keyword;

  const { products, error, loading, productsCount, resultPerPage } =
    useSelector((state) => state.products);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keywords,currentPage));
  }, [dispatch, error, currentPage,keywords]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  const switcherTab = useRef(null);

  return (
    <div className="ContainerSearch">
      <div className="navbar flex pz__10 space__beetween" ref={switcherTab}>
        <Fragment>
          <MetaData title="Tìm kiếm" />
          <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm ..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-search pointer"
              viewBox="0 0 16 16"
              onClick={searchSubmitHandler}
              style={{
                right: "26%",
                position: "absolute",
              }}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </form>

          <BottomTab />
        </Fragment>
      </div>
      <div className="SearchContainer">
        <div className="container" id="container">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
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
  );
};

export default Search;
