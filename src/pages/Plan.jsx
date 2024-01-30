import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tab from "../components/Tab";
import { TiTick } from "react-icons/ti";
import image1 from "../assets/objcet_1.png";
import image2 from "../assets/object_2.png";
import image3 from "../assets/object_3.png";
import image4 from "../assets/object_4.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal"
import { buyCourse } from "../services/operations/paymentAPI";


const Plan = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null)

  const tab = [
    {
      name: "Monthly",
    },
    {
      name: "Yearly",
    },
  ];

  const [field, setField] = useState(tab[0].name);

  const handleBuyCourse = (plan) => {
    if (token) {
      buyCourse(token, plan, user, navigate)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }


  return (
    <>
    <div>
      <Navbar />
      <div className="plan-section-wrapper">
        <img className="img1" src={image1} alt="" />
        <img className="img2" src={image2} alt="" />
        <img className="img3" src={image3} alt="" />
        <img className="img4" src={image4} alt="" />
        <h1 className="plan-heading">Switch to Rentez</h1>
        <Tab field={field} setField={setField} tab={tab} />
        <p className="pricing-discount">Save 15% with yearly</p>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h1 className="standard">Standard</h1>
            <h3>For individuals who want to list their property</h3>
            {field === "Monthly" ? (
              <div className="price-card">
                <h2>₹ 499</h2>
                <p>per month</p>
              </div>
            ) : (
              <div className="price-card">
                <h2>₹ 4999</h2>
                <p>per year</p>
              </div>
            )}
            <p>
              <TiTick />  Budget-friendly option
            </p>
            <p>
              <TiTick />  List up to 20 properties
            </p>
            <p>
              <TiTick />  Essential features included
            </p>
            {
              field === "Monthly" ? (
                <button className="special-btn" onClick={() => handleBuyCourse(499)}>Get Started</button>
              ) : (
                <button className="special-btn" onClick={() => handleBuyCourse(4999)}>Get Started</button>
              )
            }
          </div>
          <div className="pricing-card">
            <h1 className="premium">Premium</h1>
            <h3>For professionals who want to list their properties</h3>
            {field === "Monthly" ? (
              <div className="price-card">
                <h2>₹ 999</h2>
                <p>per month</p>
              </div>
            ) : (
              <div className="price-card">
                <h2>₹ 10999</h2>
                <p>per year</p>
              </div>
            )}
            <p>
              <TiTick />  Budget-friendly option
            </p>
            <p>
              <TiTick />  List up to 20 properties
            </p>
            <p>
              <TiTick />  Essential features included
            </p>
            {
              field === "Monthly" ? (
                <button className="special-btn" onClick={() => handleBuyCourse(999)}>Get Started</button>
              ) : (
                <button className="special-btn" onClick={() => handleBuyCourse(10999)}>Get Started</button>
              )
            }
          </div>
          <div className="pricing-card">
            <h1 className="gold">Gold</h1>
            <h3>For Organizations who want to list their properties</h3>
            {field === "Monthly" ? (
              <div className="price-card">
                <h2>₹ 1499</h2>
                <p>per month</p>
              </div>
            ) : (
              <div className="price-card">
                <h2>₹ 13999</h2>
                <p>per year</p>
              </div>
            )}
            <p>
              <TiTick />  Budget-friendly option
            </p>
            <p>
              <TiTick />  List up to 20 properties
            </p>
            <p>
              <TiTick />  Essential features included
            </p>
            {
              field === "Monthly" ? (
                <button className="special-btn" onClick={ () => handleBuyCourse(1499)}>Get Started</button>
              ) : (
                <button className="special-btn" onClick={ () => handleBuyCourse(13999)}>Get Started</button>
              )
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
    {
      confirmationModal && <ConfirmationModal modalData = {confirmationModal} />
    }
    </>
  );
};

export default Plan;
