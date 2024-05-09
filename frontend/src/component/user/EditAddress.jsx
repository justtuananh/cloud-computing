import React, { useState } from "react";
import "../cart/Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../cart/CheckoutSteps.jsx";
import MetaData from "../../more/Metadata";
import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { saveShippingInfo } from "../../actions/CartAction";
import BottomTab from "../../more/BottomTab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Home/Header";

const EditAddress = ({history}) => {
    const dispatch = useDispatch();


  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  // eslint-disable-next-line
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  // eslint-disable-next-line
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
//   const [paymentMethod, setPaymentMethod] = useState("Visa");

  const actionCreator =()=>{
    // dispatch(savePaymentMethod((paymentMethod)));
    dispatch(saveShippingInfo({ address, state, country, phoneNo }));
    
  }
  const shippingSubmit = (e) => {
    e.preventDefault();
    
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Số điện thoại phải dài 10 chữ số");
      return;
    }
    actionCreator();
   
    history.push("/me");
   
   
  };
 
  return (
    <>
    <MetaData title="Chi tiết vận chuyển" />

    <Header />
    <div className="shippingContainer">
      <div className="shippingBox">
        <h2 className="shippingHeading">Địa chỉ & số điện thoại</h2>

        <form
          className="shippingForm"
          encType="multipart/form-data"
          onSubmit={shippingSubmit}
        >
          <div>
            <HomeIcon />
            <input
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <PhoneIcon />
            <input
              type="number"
              placeholder="Phone Number"
              required
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              size="10"
            />
          </div>

          <div>
            <PublicIcon />

            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {country && (
            <div>
              <TransferWithinAStationIcon />

              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">City</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {/* <div>
            <PublicIcon />

            <select
              required
              value={paymentMethod}
              onChange={(e)=>{
                setPaymentMethod(e.target.value);
               
              }}
            >
              <option value="Visa">Visa</option>

              <option value="Khi nhận hàng">Thanh toán khi nhận hàng</option>
            </select>
          </div> */}

          <input
            type="submit"
            value="Continue"
            className="shippingBtn"
            disabled={state ? false : true}
          />
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
    <BottomTab />
  </>
  )
}

export default EditAddress