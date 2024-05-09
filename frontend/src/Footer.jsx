import React from "react";
import { Link } from "react-router-dom";
import logo from "./Assets/logo.webp";

const Footer = () => {
  return (
    <div className="Footer flex space__around pz__15" style={{"borderTop":".10px solid rgba(21,21,21,0.5)"}}>
      {/* Footer 1st part */}
      <div className="footer1st" style={{marginLeft:"10px"}}>
        <img
          src={logo}
          style={{ cursor: "pointer" }}
        />
        <div className="location flex py__10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-geo-alt icon__color"
            viewBox="0 0 16 16"
          >
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
          <strong>Địa chỉ:</strong>
          <h6>Bich la, trieu phong, trieu dong, tp.hcm</h6>
        </div>

        <div className="location flex py__10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-geo-alt icon__color"
            viewBox="0 0 16 16"
          >
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
          </svg>
          <strong>Email:</strong>
          <h6>army2406@gmail.com</h6>
        </div>

        <div className="location flex py__10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-geo-alt icon__color"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
          </svg>
          <strong>sdt:</strong>
          <h6>+84 67 837 635</h6>
        </div>

        <div className="location flex py__10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-geo-alt icon__color"
            viewBox="0 0 16 16"
          >
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
          </svg>
          <strong>Time:</strong>
          <h6>10:00 Am - 10:00 Pm (các ngày trong tuần)</h6>
        </div>
      </div>
      <div className="app" style={{
         margin:"10px"
        }}>
            <h1>Install App</h1>
            <h6>From App Store or Google Play</h6>
            <div className="App__Image flex pointer">
            <Link to="/creator"><img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/app-store.jpg" style={{"width":"150px","margin":"10px"}} /></Link>
            <Link to="/creator"><img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/google-play.jpg" style={{"width":"150px","margin":"10px"}} /></Link>
            </div>
        </div>
      {/* Footer 2nd part */}
      <div className="mobile">
        <div className="footer__2nd__part">
             <h5>Account</h5>
             <Link to="/login"><h3>Đăng nhập</h3></Link>         
             <Link to="/login"><h3>Đăng ký</h3></Link>
             <Link to="/password/forgot"><h3>Quên mật khẩu</h3></Link>
        </div>
        {/* Footer 3rd part */}
        <div className="footer__2nd__part">
             <h5>Follow us</h5>
             <Link to="/facebook.com"><h3>Facebook</h3></Link>
             <Link to="/youtube.com"><h3>Youtube</h3></Link>
             <Link to="/instagram.com"><h3>Instagram</h3></Link>
        </div>
      {/* Footer 4th part */}
       <div className="footer__3rd__part">
            <h5>Dịch vụ</h5>
             {/* <Link to="/creator"><h3>Create A Seller Account</h3></Link> */}
             {/* <Link to="/creator"><h3>Seller Rules</h3></Link> */}
             <Link to="/Products"><h3>Xem cửa hàng</h3></Link>
             <Link to="/support"><h3>Báo cáo</h3></Link>
             <Link to="/creator"><h3>Blog</h3></Link>
       </div>
      {/* Footer 5th part */}
      <div className="footer__4th__part">
      <h5>Rules</h5>
      <Link to="/faq"><h3>FAQ</h3></Link>
      <Link to="/contact"><h3>Liên hệ</h3></Link>
      <Link to="/about"><h3>Giới thiệu</h3></Link>
      <Link to="/creator"><h3>Live Chat</h3></Link>
        </div>
        </div>
    </div>
  );
};

export default Footer;
