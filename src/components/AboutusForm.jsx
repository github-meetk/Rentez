import React, { useState } from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiconnector";
import { contactusEndpoint } from "../services/apis";

const AboutusForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    message: "",
  });

  const { firstName, lastName, email, phoneNo, message } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        formData
      );

      if (!response.data.success) {
        toast.dismiss(toastId);
        return;
      }

      toast.success("Message Sent Successfully");
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error(error);
    }
    toast.dismiss(toastId);

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      message: "",
    });
  };

  return (
    <>
      <form className="contact-form" onSubmit={handleOnSubmit}>
        <h1>Get In Touch</h1>
        <p>We'd love to here for you, Please fill out this form.</p>
        <input
          required
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleOnChange}
          placeholder="First Name"
          className="signup-firstname"
        ></input>
        <input
          required
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleOnChange}
          placeholder="Last Name"
          className="signup-lastname"
        ></input>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Email"
        ></input>
        <input
          required
          type="number"
          name="phoneNo"
          value={phoneNo}
          onChange={handleOnChange}
          placeholder="Mobile no."
        ></input>
        <textarea
          name="message"
          value={message}
          onChange={handleOnChange}
          placeholder="Enter your message here..."
        />
        <button className="special-btn" type="submit">
          Send Message
        </button>
      </form>
    </>
  );
};

export default AboutusForm;
