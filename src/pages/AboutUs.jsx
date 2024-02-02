import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import aboutHero from "../assets/community-people.webp";
import aboutVision from "../assets/about-hero.webp";
import benefit from "../assets/benefit.avif"
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiconnector";
import { contactusEndpoint } from "../services/apis";
import Subscibe from "../components/Subscibe";

const AboutUs = () => {
  // document.body.scrollTop = document.documentElement.scrollTop = 0;

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

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        formData
      )

      if (!response.data.success) {
        toast.dismiss(toastId);
        return
      }

      toast.success("Message Sent Successfully");

    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      error.response.data.message ? toast.error(error.response.data.message) : toast.error(error)
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
    <div>
      <Navbar />
      <div className="about-wrapper">
      <div className="about-hero-wrapper">
        <h1>Welcome to Rentez</h1>
        <p>
          At Rentez, we seamlessly connect property owners with tenants,
          bridging the gap between listings and those in search of the perfect
          rental.
        </p>
        <img src={aboutHero} alt=""></img>
      </div>
      <div className="about-vision-wrapper">
        <h1>Our Vision</h1>
        <img src={aboutVision} alt="" />
        <p>
          In our vision, we see a world where finding the perfect property or
          listing your space becomes a seamless and enjoyable experience.
          <br />
          <br /> Rentez is not just a platform; it's a commitment to redefine
          how you rent, transforming the process into a journey of meaningful
          connections.
          <br /> <br />
          We go beyond traditional transactions, aiming to make renting more
          than just a transaction but a meaningful and enriching connection with
          the spaces that matter most to you. Welcome to Rentez, where we
          redefine renting with a focus on seamless experiences and meaningful
          connections.
        </p>
      </div>
      <Subscibe/>
      <div className="about-benefit-wrapper">
        <div className="about-benefit-left">
          <h1>What are the benefits of being at Rentez?</h1>
          <ul>
            <li>Simplified, efficient rental process from listing to finding the perfect space.</li>
            <li>Diverse property options for apartments, houses, and commercial spaces.</li>
            <li>User-friendly interface for smooth navigation.</li>
            <li>Transparency and trust in every aspect of the rental process.</li>
            <li>Property owners enjoy an efficient listing process.</li>
          </ul>
        </div>
          <img className="about-benefit-right" src={benefit} alt=""/>
      </div>
      <div className="contact-form-wrapper">
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
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Email"
            >
            </input>
            <input
              required
              type="number"
              name="phoneNo"
              value={phoneNo}
              onChange={handleOnChange}
              placeholder="Mobile no."
            >
            </input>
            <textarea
                name="message"
                value={message}
                onChange={handleOnChange}
                placeholder="Enter your message here..."
              />
            <button className="special-btn" type="submit">Send Message</button>
        </form>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
