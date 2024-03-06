import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/rentez-svg.svg";
import { NavbarLinks } from "../data/NavbarLinks";
import Hamburger from "hamburger-react";
import { navDashLinks } from "../data/navDash-links";
import { logout } from "../services/operations/authAPI";
import ConfirmationModal from "./ConfirmationModal";

const NavbarLight = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentNav = [
    {
      textDecoration: "underline black",
      textUnderlineOffset: "10px",
      textDecorationThickness: "2px",
    },
  ];

  const [isOpen, setOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const humburgerHandler = () => {
    const nav = document.getElementById("nav");
    nav.classList.toggle("active");
  };

  const closeNavbar = () => {
    const nav = document.getElementById("nav");
    nav.classList.toggle("active");
    setOpen(false);
  };

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  const url = user?.image;

  return (
    <div className="navbar-wrapper-light">
      <div className="navbar">
        <img
          onClick={() => navigate("/")}
          className="navbar-img"
          src={logo}
          alt=""
        />
        <div id="nav" className="navbar-links">
          {NavbarLinks.map((nav, index) => {
            return (
              <button
                style={matchRoute(nav.path) ? currentNav[0] : currentNav[1]}
                key={index}
                className="navlink-light"
                onClick={() => navigate(nav.path)}
              >
                {nav.title}
              </button>
            );
          })}
          {token !== null && (
            <Link
              className="navlink-light nav-logout"
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
            >
              Logout
            </Link>
          )}
          <div className="nav-dashboard-wrapper">
            {location.pathname.split("/")[1] === "dashboard" && (
              <Link className="nav-dashboard">Dashboard</Link>
            )}
            {location.pathname.split("/")[1] === "dashboard" &&
              navDashLinks?.map((link) => {
                if (link.type && link.type !== user?.accountType) return null;
                return (
                  <Link
                    style={
                      matchRoute(link.path) ? currentNav[0] : currentNav[1]
                    }
                    onClick={() => {
                      closeNavbar();
                      // Additional logic if needed
                    }}
                    className="navlink-light"
                    key={link.id}
                    to={`${link.path}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
          </div>
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
            <img
              className="profile-img"
              onClick={() => navigate("/dashboard/my-profile")}
              src={url}
              alt=""
            />
            // </div>
          )}
          <Link className="humburger-light" onClick={humburgerHandler}>
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </Link>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default NavbarLight;
