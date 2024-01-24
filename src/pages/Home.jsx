import React, { useEffect, useState } from "react";
import image1 from "../assets/objcet_1.png";
import image2 from "../assets/object_2.png";
import image3 from "../assets/object_3.png";
import image4 from "../assets/object_4.png";
import { FaArrowRightLong } from "react-icons/fa6";
import step1 from "../assets/step1.svg";
import step2 from "../assets/step2.svg";
import step3 from "../assets/step3.svg";
import step4 from "../assets/step4.svg";
import no1 from "../assets/no1.svg";
import no2 from "../assets/no2.svg";
import no3 from "../assets/no3.svg";
import no4 from "../assets/no4.svg";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAllProperty } from "../services/operations/propertyAPI";
import Card from "../components/Card";
import { useSelector } from "react-redux";

const Home = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  const [properties, setProperties] = useState([]);
  const { loading } = useSelector((state) => state.auth);

  const api = async () => {
    const response = await getAllProperty();
    const result = response.slice(0,6);
    setProperties(result);
  };
  useEffect(() => {
    api();
  }, []);

  const navigate = useNavigate();
  return (
    <>
      {loading ? (
        <div className="home-loader-wrapper">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="container">
          <Navbar />
          <div className="hero-section-wrapper-shadow">
            <div className="hero-section-wrapper">
              <img className="img1" src={image1} alt="" />
              <img className="img2" src={image2} alt="" />
              <img className="img3" src={image3} alt="" />
              <img className="img4" src={image4} alt="" />
              <div className="hero-section">
                <h1 className="hero-section-heading">
                  Find a perfect property <br></br> Where you'll love to live.
                </h1>
                <p className="hero-section-para">
                  We helps businesses customize, automate and scale up their ad
                  production and delivery.
                </p>
                <div className="hero-section-box">
                  <h1>
                    Simple & easy way to find <br /> your dream Appointment
                  </h1>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing <br /> and
                    typesetting industry.
                  </p>
                  <button>
                    Get Started <FaArrowRightLong />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="steps-section-wrapper">
            <div className="steps-section">
              <div className="steps-section-left">
                <div className="step">
                  <img src={step1} alt="Img"></img>
                  <h3>Search your location</h3>
                </div>
                <div className="step-line"></div>

                <div className="step">
                  <img src={step2} alt="Img"></img>
                  <h3>Visit Appointment</h3>
                </div>
                <div className="step-line"></div>

                <div className="step">
                  <img src={step3} alt="Img"></img>
                  <h3>Get your dream house</h3>
                </div>
                <div className="step-line"></div>

                <div className="step">
                  <img src={step4} alt="Img"></img>
                  <h3>Enjoy your Appointment</h3>
                </div>
              </div>
              <div className="steps-section-right">
                {/* <img src={house1}></img> */}
              </div>
            </div>
          </div>
          <div className="numbers-section-wrapper">
            <div className="number">
              <img src={no4} alt="Img"></img>
              <h1>20K+</h1>
              <h3>Happy Customers</h3>
            </div>
            <div className="number">
              <img src={no1} alt="Img"></img>
              <h1>600+</h1>
              <h3>Regular Sellers</h3>
            </div>
            <div className="number">
              <img src={no2} alt="Img"></img>
              <h1>100K+</h1>
              <h3>Properties Listed for Rent</h3>
            </div>
            <div className="number">
              <img src={no3} alt="Img" className="logo-img"></img>
              <h1>500</h1>
              <h3>Daily Completed Transactions</h3>
            </div>
          </div>

          <div className="featured-section-wrapper">
            <div className="featured-section-heading">
              <h1>Featured Properties</h1>
              <div>
                <Link
                  className="featured-section-explore-link"
                  to={"/properties"}
                >
                  Explore All
                </Link>
                <FaArrowRightLong />
              </div>
            </div>
            <div className="featured-section-cards">
              {properties?.map((property, index) => {
                return (
                  <Card
                    key={index}
                    propertyId={property._id}
                    img={property.thumbnail}
                    bhk={property.bhk}
                    bath={property.bathrooms}
                    size={property.size}
                    price={property.price}
                    pricePer={property.pricePer}
                    city={property.city}
                    state={property.state}
                    type={property.propertyType}
                  />
                );
              })}
            </div>
          </div>

          <div className="home-info-section-wrapper">
            <div className="home-info-section1">
              <div className="home-info-section-left1">
                <h1>Simple & easy way to find your dream Appointment</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. In a free hour, when our power of choice
                  is untrammelled and when nothing prevents our being able to do
                  what we like best, every pleasure is to be welcomed.
                </p>
                <button>Get Started</button>
              </div>
              <div className="home-info-section-right1"></div>
            </div>
            <div className="home-info-section2">
              <div className="home-info-section-left2">
                <h1>Best rated host on popular rental sites</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <h4>✓ Find excellent deals</h4>
                <h4>✓ Friendly UI & Fast support</h4>
                <h4>✓ Secure payment system</h4>
                <button>Get Started</button>
              </div>
              <div className="home-info-section-right2"></div>
            </div>
          </div>
          <div className="home-signup-section-wrapper">
            <div className="home-signup-section">
              <h1>Get started with Rentez</h1>
              <button onClick={() => navigate("/signup")}>
                Signup for free
              </button>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
