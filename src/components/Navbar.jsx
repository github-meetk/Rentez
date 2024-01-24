import React from "react";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Nav-LOGO.svg";
import { NavbarLinks } from "../data/NavbarLinks";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();
  const navigate = useNavigate();
//   console.log(location.pathname);
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  const url = user?.image;

  const currentNav = [
    {
      // color : "#6B53FF",
      textDecoration : "underline white",
      textUnderlineOffset : "10px", 
      textDecorationThickness : "2px",

      // background : "linear-gradient(90deg,#8d49f7,#6b53ff)",
      // color : "white",
      // padding : "5px 15px",
      // borderRadius : "10px",
    },
    {
      // color : "white",
    }
  ]

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <img onClick={ () => navigate("/")} className="navbar-img" src={logo} alt="" />
        <div className="navbar-links">
          {NavbarLinks.map((nav, index) => {
            return (
              <Link style={matchRoute(nav.path) ? (currentNav[0]) : (currentNav[1])} key={index} className="navlink" to={nav.path}>
                {nav.title}
              </Link>
            );
          })}
        </div>
        <div className="navbar-buttons">
          {token === null && (
            <Link to={"/login"}>
              <button className="nav-button-login">Login</button>
            </Link>
          )}

          {token === null && (
            <Link to={"/signup"}>
              <button className="nav-button-signup">Sign up</button>
            </Link>
          )}

          {token !== null && (
            // <div className="profile-img">
            <img className="profile-img" onClick={ () => navigate('/dashboard/my-profile')} src={url} alt="" />
            // </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
