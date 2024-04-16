import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifySeller } from "../services/operations/propertyAPI";

const InquiryForm = ({
  token,
  setReviewModal,
  setConfirmationModal,
  sellerEmail,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    contactNumber: "",
    msg: "",
  });

  const { email, fullName, contactNumber, msg } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to Purchase Course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    } else {
      await notifySeller(sellerEmail, email, fullName, contactNumber, msg);
      setFormData({
        email: "",
        fullName: "",
        contactNumber: "",
        msg: "",
      });

      setReviewModal({
        cancelBtnHandler: () => setReviewModal(null),
      });
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h1>Request Inquiry</h1>
      <input
        required
        type="text"
        name="fullName"
        value={fullName}
        onChange={handleOnChange}
        placeholder="Full Name"
      />
      <input
        required
        type="email"
        name="email"
        value={email}
        onChange={handleOnChange}
        placeholder="Email"
      ></input>
      <input
        type="tel"
        pattern="[0-9]{10}"
        required
        name="contactNumber"
        value={contactNumber}
        onChange={handleOnChange}
        placeholder="Contact Number"
      />
      <input
        required
        type="text"
        name="msg"
        value={msg}
        onChange={handleOnChange}
        placeholder="Message"
      />
      <button type="submit" className="send-btn">
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              />
            </svg>
          </div>
        </div>
        <span>Send Request</span>
      </button>
    </form>
  );
};

export default InquiryForm;
