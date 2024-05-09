import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../../Footer";
import Header from "../Home/Header";
import MetaData from "../../more/Metadata";
import Loading from "../../more/Loader";
import "./Profile.css";
import BottomTab from "../../more/BottomTab";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const address = `${user.address}, ${user.wards}, ${user.district},${user.province}`;

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div>
            <MetaData title={`${user.name}'s profile`} />
            <div className="profileContainer">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginBottom:"20px",
                  marginTop:"10px"
                }}
              >
                <h1
                  style={{
                    fontFamily: "Poppins,sans-serif",
                    opacity: "1",
                    fontSize: "2vmax",
                    marginBottom:"10px"
                  }}
                >
                 Trang cá nhân
                </h1>
                <img
                  src={user.avatar ? user.avatar.url : "/profile.png"}
                  alt={user.name}
                  className="profile__img"
                />          
              </div>
            </div>
            <div className="information">
              <div className="middle">
                <div className="infoName">
                  
                  <p>{user.name}</p>
                </div>
                <div className="info">
                  <h4
                    style={{
                      padding: "0px 5px",
                      fontSize:"20px"
                    }}
                  >
                    Email:
                  </h4>
                  <p>{user.email}</p>
                </div>
                <div className="info">
                  <h4
                    style={{
                      padding: "0px 5px",
                      fontSize:"20px"
                    }}
                  >
                    Số điện thoại:
                  </h4>
                  <p>(+84) {user.phoneNumber}</p>
                </div>
                <div className="info">
                  <h4
                    style={{
                      padding: "0px 5px",
                      fontSize:"20px"
                    }}
                  >
                    Địa chỉ:
                  </h4>
                  <p>{address}</p>
                </div>
                <div className="info">
              
                  <h4
                    style={{
                      padding: "0px 5px",
                      fontSize:"20px"
                    }}
                  >
                    Tham gia:
                  </h4>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>
                <div style={{paddingTop:"10px", display:"flex",justifyContent:"center"}}>
                <Link to="/me/update/info" className="edit__profile">
                  <button className="btnEdit">Sửa hồ sơ</button>
                </Link>
                </div>

                <div className="change__info">
                  <Link to="/orders" className="settings">
                    Đơn hàng của tôi
                  </Link>
                  {/* <Link to="/me/update/address" className="settings">
                   Thay đổi địa chỉ
                  </Link> */}
                  <Link to="/me/update" className="settings">
                    Đổi mật khẩu
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Profile;
