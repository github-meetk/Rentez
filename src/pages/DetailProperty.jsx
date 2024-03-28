import React, { useEffect, useState } from "react";
import NavbarLight from "../components/NavbarLight";
import Footer from "../components/Footer";
import { getPropertyDetail } from "../services/operations/propertyAPI";
import { useParams } from "react-router-dom";
import ReviewModal from "../components/ReviewModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { useSelector } from "react-redux";
import InquiryForm from "../components/InquiryForm";

const DetailProperty = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  const { token } = useSelector((state) => state.auth);
  const [reviewModal, setReviewModal] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [loading, setLoading] = useState(true);

  const { propertyId } = useParams();
  const [images, setImages] = useState([]);
  const [activeImg, setActiveImage] = useState("");
  const [detail, setDetail] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getPropertyDetail(propertyId);
      if (response && response.photos) {
        const newImages = [response.thumbnail, ...response.photos];
        setImages(newImages);
        setActiveImage(newImages[0]);
        setDetail(response);
      }
      setLoading(false);
    };

    fetchData();
  }, [propertyId]);

  // const date = new Date(detail.createdAt).toDateString();
  return (
    <>
      <NavbarLight />
      <div className="detail-property-bg">
        {loading ? (
          <div className="spinner-loader-wrapper">
            <div className="spinner" />
          </div>
        ) : (
          <>
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
                    <h3>
                      Total Rooms : <span>{detail?.bhk}</span>
                    </h3>
                    <h3>
                      Total Bathrooms : <span>{detail?.bathrooms}</span>
                    </h3>
                    <h3>
                      Listed at :{" "}
                      <span>{new Date(detail?.createdAt).toDateString()}</span>
                    </h3>
                    <p>
                      Address :{" "}
                      <span>
                        {detail?.address} {detail?.city} {detail?.state}{" "}
                        {detail?.pincode}
                      </span>
                    </p>
                    <p>
                      {" "}
                      Description : <span>{detail?.description}</span>
                    </p>
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
                  <InquiryForm
                    token={token}
                    setReviewModal={setReviewModal}
                    setConfirmationModal={setConfirmationModal}
                    sellerEmail={detail?.seller?.email}
                  />
                </div>
              </div>
            </div>
            <Footer />
          </>
        )}
      </div>
      {reviewModal && <ReviewModal modalData={reviewModal} />}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default DetailProperty;
