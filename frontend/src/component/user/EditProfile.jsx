
import React, {useState, useEffect,Fragment } from "react";
import "./EditProfile.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import Loading from "../../more/Loader";
import MetaData from "../../more/Metadata";
import { UPDATE_PROFILE_RESET } from "../../constans/userContans";
import { ToastContainer, toast } from 'react-toastify';
import { Avatar } from "@material-ui/core";
import Header from "../Home/Header";
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const EditProfile = ({ history }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.user
  );

  const {error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();

  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [avatarPreview, setAvatarPreview] = useState("/profile.png");
//  avatar = user.avatar.url;
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.append("avatar", avatar);
    myForm.set("address", address);
    myForm.set("province",province);
    myForm.set("district", district);
    myForm.set("wards", wards);
    myForm.set("phoneNumber", phoneNumber);
    dispatch(updateProfile(myForm));
    
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
    }
    reader.readAsDataURL(e.target.files[0]);
   
  };

 

  useEffect(() => {
      if(user){
          setName(user.name);
          setEmail(user.email);
          setAvatarPreview(user.avatar.url);
         
          setAddress(user.address);
          setProvince(user.province);
          setDistrict(user.district);
          setWards(user.wards);
          setPhoneNumber(user.phoneNumber)
      }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Cập nhật thành công!!!");
      dispatch(loadUser());

      history.push("/me");
       
      dispatch({
          type: UPDATE_PROFILE_RESET,
      })
    }
  }, [dispatch, error, alert, history, isUpdated,user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Cập nhật hồ sơ" />
          <Header />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Chỉnh sửa hồ sơ</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data" 
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName" style={{marginBottom:"10px"}}>
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <h2>Địa chỉ</h2>
               
                <div className="updateProfileName">
                  <HomeIcon />
                  <input
                    type="text"
                    placeholder="Số nhà, đường, ấp, làng"
                   
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
               
                <div className="updateProfileName">
                  <LocationCityIcon />
                  <input
                    type="text"
                    placeholder="Tỉnh, thành phố"
                  
                    name="province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </div>
              
                <div className="updateProfileName">
                  <LocationOnIcon />
                  <input
                    type="text"
                    placeholder="Quận, huyện"
                   
                    name="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>
              
                <div className="updateProfileName">
                  <LocationOnIcon />
                  <input
                    type="text"
                    placeholder="Phường, xã"
                    
                    name="wards"
                    value={wards}
                    onChange={(e) => setWards(e.target.value)}
                  />
                </div>
               
                <h2 style={{marginTop:"1vmax"}}>Số điện thoại</h2>
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="Number"
                    placeholder="Số điện thoại"
                    size="10"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Cập nhật"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
            </>
        )}
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
        </>
  );
};

export default EditProfile;
