import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../actions/ProductActions";
import { Link } from "react-router-dom"; 
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import SideBar from "./Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import { DELETE_PRODUCT_RESET } from "../../constans/ProductConstans";
import ProductSell from "./Chart/ProductSell.jsx";


const ProposalImportPrduct = ({history}) => {

const dispatch = useDispatch();

const { error, products } = useSelector((state) => state.products);

const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
        toast.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        toast.success("Xóa thành công!!!");
        history.push("/admin/products");
        dispatch({ type: DELETE_PRODUCT_RESET });
      }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);


const columns = [
    { field: "id", headerName: "ID", minWidth: 200, flex: 0.1 },

    {
      field: "name",
      headerName: "Tên",
      minWidth: 350,
      flex: 0.2,
    },
    {
      field: "stock",
      headerName: "Số lượng",
      type: "number",
      minWidth: 190,
      flex: 0.1,
    },
    {
      field: "price",
      headerName: "Giá",
      type: "number",
      minWidth: 270,
      flex: 0.1,
    },

    {
      field: "actions",
      flex: 0.1,
      headerName: "Tùy chọn",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/product/${params.getValue(params.id, "id")}`}>
              <VisibilityOutlinedIcon style={{marginRight:".8vmax"}}/>
            </Link>
            <Link to={`/edit/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
            onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
                
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
        if (item.Stock < 30 ) {
            rows.push({
                id: item._id, 
                stock: item.Stock,
                price: item.price,
                name: item.name,
              });
          }
      });

    return (
       <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ĐỀ XUẤT SẢN PHẨM CẦN NHẬP HÀNG</h1>
          <div className="lineChart">
              {/* <Line data={lineState} /> */}
              <ProductSell />
            </div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={12}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
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
    )
}

export default ProposalImportPrduct
