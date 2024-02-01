import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Nav-LOGO.svg";
import logoLight from "../assets/rentez-svg.svg";
import { NavbarLinks } from "../data/NavbarLinks";
import Hamburger from 'hamburger-react'

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();
  const navigate = useNavigate();

  const currentNav = [
    {
      textDecoration : "underline white",
      textUnderlineOffset : "10px", 
      textDecorationThickness : "2px",
    }, {
      textDecoration : "underline black",
      textUnderlineOffset : "10px", 
      textDecorationThickness : "2px",
    }
  ]

  const [isOpen, setOpen] = useState(false)
//   console.log(location.pathname);
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [curr, setCurr] = useState(currentNav[0])
  const[wrapper, setWrapper] = useState('navbar-wrapper')
  const[loginbtn, setLoginbtn] = useState('nav-button-dark');
  const[signupbtn, setSignupbtn] = useState('nav-button-dark');
  const[logoImage, setLogoImage] = useState(logo);
  const[humburger, sethumburger] = useState('humburger');

  const url = user?.image;

  const humburgerHandler = () => {
    const nav = document.getElementById("nav");
    nav.classList.toggle("active");

    if(!isOpen){
      setWrapper('navbar-wrapper-light')
      setLoginbtn('nav-button-login-light')
      setSignupbtn('nav-button-signup-light')
      sethumburger('humburger-light')
      setLogoImage(logoLight)
      setCurr(currentNav[1]);
    }
    else{
      setWrapper('navbar-wrapper')
      setLoginbtn('nav-button-dark')
      setSignupbtn('nav-button-dark')
      sethumburger('humburger')
      setLogoImage(logo)
      setCurr(currentNav[0]);
    }
  }

  

  return (
    <div className={wrapper}>
      <div className="navbar">
        <img onClick={ () => navigate("/")} className="navbar-img" src={logoImage} alt="" />
        <div id="nav" className="navbar-links">
          {NavbarLinks.map((nav, index) => {
            return (
              <Link style={matchRoute(nav.path) ? (curr) : (currentNav[2])} key={index} className="navlink" to={nav.path}>
                {nav.title}
              </Link>
            );
          })}
        </div>
        <div className="navbar-buttons">
          {token === null && (
            <Link to={"/login"}>
              <button className={loginbtn}>Login</button>
            </Link>
          )}

          {token === null && (
            <Link to={"/signup"}>
              <button className={signupbtn}>Sign up</button>
            </Link>
          )}

          {token !== null && (
            // <div className="profile-img">
            <img className="profile-img" onClick={ () => navigate('/dashboard/my-profile')} src={url} alt="" />
            // </div>
          )}
        <Link className={humburger} onClick={humburgerHandler}><Hamburger toggled={isOpen} toggle={setOpen} /></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
