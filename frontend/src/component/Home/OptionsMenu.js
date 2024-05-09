import React from "react";
import "./Header.css";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HeartIcon from "@material-ui/icons/FavoriteBorder";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Support from "@material-ui/icons/ReportProblem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OptionsMenu = ({user}) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { favouriteItems } = useSelector((state) => state.favourite);

  const options = [
    {
      icon: (
        <HomeIcon
          style={{
            marginRight: "4px",
          }}
        />
      ),
      name: "Home",
      link: "/",
    },
    {
      icon: (
        <ListAltIcon
          style={{
            marginRight: "4px",
          }}
        />
      ),
      name: "Orders",
      link: "/orders",
    },
    {
      icon: (
        <ShoppingCartIcon
          style={{
            color: cartItems.length === 0 ? "" : "tomato",
            marginRight: "4px",
          }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      link: "/cart",
    },
    {
      icon: (
        <HeartIcon
          style={{
            color: favouriteItems.length === 0 ? "" : "tomato",
            marginRight: "4px",
          }}
        />
      ),
      name: `Favourite (${favouriteItems.length})`,
      link: "/favourite",
    },
    {
      icon: (
        <PersonIcon
          style={{
            marginRight: "4px",
          }}
        />
      ),
      name: "Profile",
      link: "/me",
    },
    {
      icon: (
        <Support
          style={{
            marginRight: "4px",
          }}
        />
      ),
      name: "Report us",
      link: "/support",
    },
    {
      icon: (
        <PersonIcon
          style={{
            marginRight: "4px",
          }}
        />
      ),
      name: "Login",
      link: "/login",
    },
    {
      icon: (
        <ExitToAppIcon
          style={{
            marginRight: "4px",
          }}
        />
      ),
      name: "Logout",
      link: "/logout",
    },
  ];

  return (
    <div className="dropdown">
      <button className="dropbtn">
        {user ? ( <img
            className="avatarOptions"
            src={user.avatar ? user.avatar : ("/profile.png")}
            alt="Profile"
            style={{
              
            }}
          />) :( <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-person pxz__20 black"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
        </svg>)}
        
        
      </button>
      <div className="dropdown-content"> 
        {options.map((item) => (
          <Link
            to={item.link}
            style={{ display: "flex", alignItems: "center" }}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OptionsMenu;
