import image1 from "../assets/objcet_1.png";
import image2 from "../assets/object_2.png";
import image3 from "../assets/object_3.png";
import image4 from "../assets/object_4.png";
import { FaArrowRightLong } from "react-icons/fa6";
import house1 from "../assets/benefit.avif";
import no1 from "../assets/no1.svg";
import no2 from "../assets/no2.svg";
import no3 from "../assets/no3.svg";
import no4 from "../assets/no4.svg";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Subscibe from "../components/Subscibe";
import Featured from "../components/Featured";
import ReviewCard from "../components/ReviewCard";
import { useEffect, useRef, useState } from "react";
import { getAllReviews } from "../services/operations/ReviewAPI";

const Home = () => {
  const { loading } = useSelector((state) => state.auth);
  const [review, setReview] = useState([]);

  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  const [isVisible2, setIsVisible2] = useState(false);
  const domRef2 = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const api = async () => {
      const result = await getAllReviews();
      setReview(result);
    };

    api();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    const observer2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible2(true);
            observer2.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    const currentRef = domRef.current;
    const currentRef2 = domRef2.current;

    if (currentRef) {
      observer.observe(currentRef);
    }
    if (currentRef2) {
      observer2.observe(currentRef2);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (currentRef2) {
        observer.unobserve(currentRef2);
      }
    };
  }, []);

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
                  Elevate Your Lifestyle! Rent Smart Rent Online, Unlock the
                  Door to Your Ideal Home Today
                </p>
                <div className="hero-section-box">
                  <h1>
                    Simple & easy way to find <br /> your dream Appointment
                  </h1>
                  <p>Your Rental Journey Starts Here: Find, Click, Move In!</p>
                  <button className="ui-btn">
                    <span onClick={() => navigate("/properties")}>
                      Get Started
                    </span>
                    <span>
                      <FaArrowRightLong />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`steps-section-wrapper ${isVisible ? "fade-in" : ""}`}
            ref={domRef}
          >
            <div className="steps-section">
              <div className="steps-section-left">
                <div className="step">
                  <div className="step-img">
                    <lord-icon
                      src="https://cdn.lordicon.com/kkvxgpti.json"
                      trigger="loop"
                      delay={100}
                      style={{ width: 45, height: 45 }}
                    ></lord-icon>
                  </div>

                  <h3>Search your location</h3>
                </div>
                <div className="step-line"></div>

                <div className="step">
                  <div className="step-img">
                    <lord-icon
                      src="https://cdn.lordicon.com/cnpvyndp.json"
                      trigger="loop"
                      delay={1000}
                      style={{ width: 45, height: 45 }}
                    ></lord-icon>
                  </div>
                  <h3>Visit Appointment</h3>
                </div>
                <div className="step-line"></div>

                <div className="step">
                  <div className="step-img">
                    <lord-icon
                      src="https://cdn.lordicon.com/ciawvzjk.json"
                      trigger="loop"
                      delay={1000}
                      style={{ width: 45, height: 45 }}
                    ></lord-icon>
                  </div>
                  <h3>Get your dream house</h3>
                </div>
                <div className="step-line"></div>

                <div className="step">
                  <div className="step-img">
                    <lord-icon
                      src="https://cdn.lordicon.com/utpmnzxz.json"
                      trigger="loop"
                      delay={1000}
                      style={{ width: 45, height: 45 }}
                    ></lord-icon>
                  </div>
                  <h3>Enjoy your Appointment</h3>
                </div>
              </div>
              <div className="steps-section-right">
                <img src={house1} alt=""></img>
              </div>
            </div>
          </div>
          <div
            className={`numbers-section-wrapper ${isVisible2 ? "fade-in" : ""}`}
            ref={domRef2}
          >
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

          <Featured />

          <div className="home-info-section-wrapper">
            <div className="home-info-section1">
              <div className="home-info-section-left1">
                <h1>Simple & easy way to find your dream Appointment</h1>
                <p>
                  Experience Seamless Living: Rent Your Dream Home Online, Where
                  Convenience Meets Comfort and Every Click Brings You Closer to
                  Your Ideal Lifestyle!
                </p>
                <button
                  className="special-btn"
                  onClick={() => navigate("/properties")}
                >
                  Get Started
                </button>
              </div>
              <div className="home-info-section-right1"></div>
            </div>
            <div className="home-info-section2">
              <div className="home-info-section-left2">
                <h1>Best rated host on popular rental sites</h1>
                <p>
                  Make Your Move Rent with Confidence Experience the Future of
                  Renting Today
                </p>
                <h4>✓ Find excellent deals</h4>
                <h4>✓ Friendly UI & Fast support</h4>
                <h4>✓ Secure payment system</h4>
              </div>
              <div className="home-info-section-right2"></div>
            </div>
          </div>
          <div className="review-section-wrapper">
            <h2>Our Customers</h2>
            {review.length > 0 && <ReviewCard review={review} />}
          </div>
          <Subscibe />

          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
