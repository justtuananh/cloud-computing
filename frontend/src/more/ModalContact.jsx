import React, { useState } from "react";
import "./UserOption.css";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Support from "@material-ui/icons/ReportProblem"
import HeartIcon from "@material-ui/icons/FavoriteBorder";
import HeartActiveIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import MessagerLogo from "../Assets/icons/Facebook_Messenger.webp"
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const UserData = () => {


  const [open, setOpen] = useState(false);
  const history = useHistory();

  const scroolEffect = useRef(null);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      document.querySelector(".speedDial").classList.add("active");
    }
    else {
      document.querySelector(".speedDial").classList.remove("active");
    }
  })

  const dispatch = useDispatch();

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="up"
        className="speedDial"
        useRef={scroolEffect}
        icon={
          <img
            className="speedDialIcon"
            src={MessagerLogo}
            alt="Profile"
            style={{
              position: "fixed"
            }}
          />
        }
      >
        {/* {options.map((item) => (
         
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={false}
            
          />
         
        ))} */}
      
          <SpeedDialAction 
          key={"WhatsApp"}
          icon={<WhatsAppIcon />}
            tooltipTitle={"WhatsApp"}
            tooltipOpen={false}
            href="https://call.whatsapp.com/voice/TVh9QBu0E8WfGXgHsG8X3S"
          />
       
      
          <SpeedDialAction 
          key={"Messager"}
          icon={<FacebookIcon />}
            tooltipTitle={"Message"}
            tooltipOpen={false}
            href="https://m.me/212296270204994"
          />
       
      </SpeedDial>
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

export default UserData;
