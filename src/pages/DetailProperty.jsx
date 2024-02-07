import React, { useEffect, useState } from "react";
import NavbarLight from "../components/NavbarLight";
import Footer from "../components/Footer";
import {
  getPropertyDetail,
  notifySeller,
} from "../services/operations/propertyAPI";
import { useParams } from "react-router-dom";

const DetailProperty = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;

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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    notifySeller(detail?.seller?.email, email, fullName, contactNumber, msg);
    // navigate("/");
    setFormData({
      email: "",
      fullName: "",
      contactNumber: "",
      msg: "",
    });
  };

  const { propertyId } = useParams();
  const [images, setImages] = useState([]);
  const [activeImg, setActiveImage] = useState("");
  const [detail, setDetail] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPropertyDetail(propertyId);
      if (response && response.photos) {
        const newImages = [response.thumbnail, ...response.photos];
        setImages(newImages);
        setActiveImage(newImages[0]);
        setDetail(response);
      }
    };

    fetchData();
  }, [propertyId]);

  // const date = new Date(detail.createdAt).toDateString();
  return (
    <>
      <NavbarLight />
      <div className="detail-property-bg">
        <div className="detail-property-wrapper">
          <div className="property-image-section">
            <div className="active-image">
              <img src={activeImg} alt="" />
            </div>
            <div className="non-active-images">
              {images.map((image, index) => {
                return (
                  <img
                    style={
                      activeImg === image
                        ? { border: "3px solid #6B53FF" }
                        : { border: "none" }
                    }
                    key={index}
                    src={image}
                    alt=""
                    onClick={() => setActiveImage(image)}
                  />
                );
              })}
            </div>
          </div>
          <div className="property-details-section">
            <div className="property-details-section-left">
              <div className="property-details">
                <div className="property-details-heading">
                  <h1>Property Information : </h1>
                </div>
                <h2>
                  {detail?.size} Sqft {detail?.propertyType}
                </h2>
                <div className="property-details-price">
                  <h1>
                    {detail?.price} <span>/ {detail?.pricePer}</span>
                  </h1>{" "}
                  <p>Rent</p>
                </div>
                <h3>Total Rooms : {detail?.bhk}</h3>
                <h3>Total Bathrooms : {detail?.bathrooms}</h3>
                <h3>
                  Listed at : {new Date(detail?.createdAt).toDateString()}
                </h3>
                <p>
                  Address : {detail?.address} {detail?.city} {detail?.state}{" "}
                  {detail?.pincode}
                </p>
                <p> Description : {detail?.description}</p>
              </div>

              <div className="seller-details">
                <h1>Seller Information</h1>
                <div className="seller-info">
                  <div className="seller-detail-left">
                    <img src={detail?.seller?.image} alt="" />
                  </div>
                  <div className="seller-detail-right">
                    <h2>
                      {detail?.seller?.firstName} {detail?.seller?.lastName}
                    </h2>
                    <p>{detail?.seller?.email}</p>
                    <p>{detail?.seller?.additionalDetails?.about}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="property-details-section-right">
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
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Email"
                />
                <input
                  required
                  type="number"
                  name="contactNumber"
                  value={contactNumber}
                  onChange={handleOnChange}
                  placeholder="Phone Number"
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailProperty;
