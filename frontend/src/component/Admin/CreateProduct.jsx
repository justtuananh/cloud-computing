import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/ProductActions";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
// import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import Creator from "@material-ui/icons/Store";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DiscountIcon from "@material-ui/icons/LocalOffer";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constans/ProductConstans";
import { ToastContainer, toast } from "react-toastify";
import SizesList from "./SizeList";
import ColorsList from "./ColorsList";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CreateProduct = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.createProduct
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [offerPrice, setOfferPrice] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  // const [supplier, setSupplier] = useState("Chưa cập nhật...");


  const categories = [
    "Áo thun nam",
    "Áo sơ mi nam",
    "Áo khoác nam",
    "Quần short nam",
    "Quần dài nam",
    "Áo hoodie",
    "Áo thun nữ",
    "Áo sơ mi nữ",
    "Áo khoác nữ",
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
    { name: "25" },
    { name: "26" },
    { name: "27" },
    { name: "28" },
    { name: "29" },
    { name: "30" },
    { name: "31" },
    { name: "32" },
    { name: "33" },
    { name: "34" },
    { name: "35" },
    { name: "36" },
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
    { name: "one color" },
  ]);

  // chọn size
  const [sizeList, setSizeList] = useState([{name:"FREESIZE"}]);
  const chooseSize = (sizeObject) => {
    const filtered = sizeList.filter((size) => size.name !== sizeObject.name);
    setSizeList([...filtered, sizeObject]);
  };
  const deleteSize = (name) => {
    const filtered = sizeList.filter((size) => size.name !== name);
    setSizeList(filtered);
  };
  //chọn màu
  const [colorList, setColorList] = useState([{name:"one color"}]);
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
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      history.push("/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("offerPrice", offerPrice);
    myForm.append("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.append("sizes", JSON.stringify(sizeList));
    myForm.append("color", JSON.stringify(colorList));
    // myForm.set("supplier", supplier);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
      <MetaData title="Thêm sản phẩm" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Thêm sản phẩm</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Tên sản phẩm"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <DiscountIcon />
              <input
                type="String"
                placeholder="Khuyến mãi"
                onChange={(e) => setOfferPrice(e.target.value)}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Giá sản phẩm"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Chọn danh mục sản phẩm</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <h3 style={{ textAlign: "center", fontSize: "15px" }}>Hình ảnh</h3>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
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
            {/* <div>
              <Creator />
              <input
                type="string"
                placeholder="Nhà cung cấp"
              
                onChange={(e) => setSupplier(e.target.value)}
              />
            </div> */}
            <div className="description">
              {/* <DescriptionIcon />
              <textarea
                placeholder="Mô tả sản phẩm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea> */}
              <ReactQuill theme="snow" id="description" value={description} onChange={setDescription}  placeholder="Mô tả sản phẩm..." />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Thêm sản phẩm
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

export default CreateProduct;
