import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { createReview } from "../services/operations/ReviewAPI";

const ReviewModal = ({ modalData }) => {
  const { token } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const [formData, setFormData] = useState({
    review: "",
  });

  const { review } = formData;

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if(!token){
        toast.error("Please Login first")
        return
    }
    createReview(token, { ...formData.review, rating });
    toast.success("Thank you for your precious time")
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <div className="modal-wrapper">
      <div className="review-box">
        <h2>Rate and Review</h2>
        <div className="rating-container">
            Rating {hover || rating} out of 5
            <div className="rating">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label>
                <input
                style={{display: "none"}}
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  className="star"
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  size={70}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
          </div>
        </div>
        <label className="review">
          Review
          <textarea
            value={review}
            name="review"
            onChange={handleChange}
          />
        </label>

        <div className="review-buttons">
          <button
            onClick={modalData.cancelBtnHandler}
            className="clear-filter-btn"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSubmit();
              modalData.cancelBtnHandler();
            }}
            className="modal-button-1"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
