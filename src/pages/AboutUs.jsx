import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import aboutHero from "../assets/community-people.webp";
import aboutVision from "../assets/about-hero.webp";
import benefit from "../assets/benefit.avif";
import Subscibe from "../components/Subscibe";
import AboutusForm from "../components/AboutusForm";

const AboutUs = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;

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
            We see a world where finding the perfect property or listing your
            space becomes a seamless and enjoyable experience.
            <br />
            <br /> Rentez is not just a platform; it's a commitment to redefine
            how you rent, transforming the process into a journey of meaningful
            connections.
            <br /> <br />
            We go beyond traditional transactions, aiming to make renting more
            than just a transaction but a meaningful and enriching connection
            with the spaces that matter most to you. Welcome to Rentez, where we
            redefine renting with a focus on seamless experiences and meaningful
            connections.
          </p>
        </div>
        <Subscibe />
        <div className="about-benefit-wrapper">
          <div className="about-benefit-left">
            <h1>What are the benefits of being at Rentez?</h1>
            <ul>
              <li>
                Simplified, efficient rental process from listing to finding the
                perfect space.
              </li>
              <li>
                Diverse property options for apartments, houses, and commercial
                spaces.
              </li>
              <li>User-friendly interface for smooth navigation.</li>
              <li>
                Transparency and trust in every aspect of the rental process.
              </li>
              <li>Property owners enjoy an efficient listing process.</li>
            </ul>
          </div>
          <img className="about-benefit-right" src={benefit} alt="" />
        </div>
        <div className="contact-form-wrapper">
          <AboutusForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
