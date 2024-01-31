import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/rentez-svg.svg";
import { NavbarLinks } from "../data/NavbarLinks";
import Hamburger from 'hamburger-react'

const NavbarLight = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();
  const navigate = useNavigate();

  const currentNav = [
    {
      textDecoration : "underline black",
      textUnderlineOffset : "10px", 
      textDecorationThickness : "2px",
    }
  ]

  const [isOpen, setOpen] = useState(false)

  const humburgerHandler = () => {
    const nav = document.getElementById("nav");
    nav.classList.toggle("active");
    // nav.classList.toggle("navbar-links")

    if(!isOpen){
      document.body.style.overflowY = "hidden";
    }
    else{
      document.body.style.overflowY = "scroll";
    }
  }


  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  const url = user?.image;

  

  return (
    <div className="navbar-wrapper-light">
      <div className="navbar">
        <img onClick={ () => navigate("/")} className="navbar-img" src={logo} alt="" />
        <div id="nav" className="navbar-links">
          {NavbarLinks.map((nav, index) => {
            return (
              <Link style={matchRoute(nav.path) ? (currentNav[0]) : (currentNav[1])} key={index} className="navlink-light" to={nav.path}>
                {nav.title}
              </Link>
            );
          })}
        </div>
        <div className="navbar-buttons">
          {token === null && (
            <Link to={"/login"}>
              <button className="nav-button-login-light">Login</button>
            </Link>
          )}

          {token === null && (
            <Link to={"/signup"}>
              <button className="nav-button-signup-light">Sign up</button>
            </Link>
          )}

          {token !== null && (
            // <div className="profile-img">
            <img className="profile-img" onClick={ () => navigate('/dashboard/my-profile')} src={url} alt="" />
            // </div>
          )}
          <Link className='humburger-light' onClick={humburgerHandler}><Hamburger toggled={isOpen} toggle={setOpen} /></Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarLight;
