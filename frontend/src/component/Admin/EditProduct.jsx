import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct, getProductDetails } from "../../actions/ProductActions";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
    // eslint-disable-next-line
import DiscountIcon from "@material-ui/icons/LocalOffer";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constans/ProductConstans";
import { ToastContainer, toast } from 'react-toastify';
import SizesList from "./SizeList";
import ColorsList from "./ColorsList";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Creator from "@material-ui/icons/Store";

const UpdateProduct = ({ history, match }) => {

  const dispatch = useDispatch();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.deleteProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0); 
      // eslint-disable-next-line
  const [offerPrice, setOfferPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // const [supplier, setSupplier] = useState("Chưa cập nhật...");

  const categories = [
    "Áo khoác",
    "Áo thun nam",
    "Áo sơ mi nam",
    "Quần short nam",
    "Quần dài nam",
    "Áo thun nữ",
    "Áo sơ mi nữ",
    "Quần short nữ",
    "Quần dài nữ",
    "Chân váy nữ",
    "Đầm nữ",
    "Yếm",
    "Túi xách",
    "Giày nữ",
    "Thắt lưng",
    "Kính mắt",
    "Giày nam",
    "Ví",
    "Others",
  ];
  const [sizes] = useState([
    { name: "S" },
    { name: "XS" },
    { name: "M" },
    { name: "L" },
    { name: "XL" },
    { name: "XXL" },
    { name: "XXXL" },
    { name: "FREE SIZE" },
  ]);
  const [color] = useState([
    { name: "Trắng" },
    { name: "Xám" },
    { name: "Xanh lục" },
    { name: "Đen" },
    { name: "Đỏ" },
    { name: "Xanh dương" },
    { name: "Hồng" },
    { name: "Xanh rêu" },
    { name: "Màu be" },
    { name: "Xanh bơ" },
    { name: "Nâu" },
    { name: "Kem" },
    { name: "Nâu sữa" },
    { name: "Hồng tím" },
    { name: "Hồng sữa" },
    { name: "Cam" },
    { name: "Vàng" },
    { name: "ONE COLOR" },
  ]);
 

   // chọn size
   const [sizeList, setSizeList] = useState([]);
   const chooseSize = (sizeObject) => {
     const filtered = sizeList.filter((size) => size.name !== sizeObject.name);
     setSizeList([...filtered, sizeObject]);
   };
   const deleteSize = (name) => {
     const filtered = sizeList.filter((size) => size.name !== name);
     setSizeList(filtered);
   };
   //chọn màu
   const [colorList, setColorList] = useState([]);
   const chooseColor = (sizeObject) => {
     const filtered = colorList.filter(
       (color) => color.name !== sizeObject.name
     );
     setColorList([...filtered, sizeObject]);
   };
   const deleteColor = (name) => {
     const filtered = colorList.filter((color) => color.name !== name);
     setColorList(filtered);
   };

  const productId = match.params.id;
  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setOfferPrice(product.offerPrice);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
      setSizeList(product.sizes);
      setColorList(product.color);
      // setSupplier(product.supplier);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler  = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("offerPrice", offerPrice);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("Stock", Stock);
    myForm.append("sizes", JSON.stringify(sizeList));
    myForm.append("color", JSON.stringify(colorList));
    // myForm.set("supplier", supplier);


    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
    console.log("đã submit")
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files); 

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };


  return (
    <Fragment>
      <MetaData title="Chỉnh sửa sản phẩm" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Chỉnh sửa sản phẩm</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <DiscountIcon />
              <input
                type="String"
                placeholder="% Giảm giá or thông báo "
                onChange={(e) => setOfferPrice(e.target.value)}
                value={offerPrice}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Product Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            {/* <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div> */}

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            {/* <div>
              <Creator />
              <input
                type="string"
                placeholder="Nhà cung cấp"
              
                onChange={(e) => setSupplier(e.target.value)}
                value={supplier}
              />
            </div> */}

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <SizesList list={sizeList} deleteSize={deleteSize} />
            <div>
              <h3 style={{ textAlign: "center", fontSize: "15px" }}>
                Chọn size:{" "}
              </h3>
              {sizes.length > 0 && (
                <div className="selectSize">
                  {sizes.map((size) => (
                    <div
                      className="ChooseSize"
                      key={size.name}
                      onClick={() => chooseSize(size)}
                    >
                      {size.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <ColorsList list={colorList} deleteColor={deleteColor} />
            <div>
              <h3 style={{ textAlign: "center", fontSize: "15px" }}>
                Chọn màu:{" "}
              </h3>
              {color.length > 0 && (
                <div className="selectColor">
                  {color.map((color) => (
                    <div
                      className="ChooseColor"
                      key={color.name}
                      onClick={() => chooseColor(color)}
                    >
                      {color.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
           
            <div className="description">
              {/* <DescriptionIcon />
              <textarea
                placeholder="Mô tả sản phẩm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea> */}
              <ReactQuill theme="snow" id="description" value={description} onChange={setDescription}  placeholder="Description..." />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
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

export default UpdateProduct;