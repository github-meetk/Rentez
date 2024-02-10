import React, { useState } from "react";
import { FaBath } from "react-icons/fa";
import { IoBedSharp } from "react-icons/io5";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { createWishlist, deleteProperty, deleteWishlist } from "../services/operations/propertyAPI";
import ConfirmationModal from "./ConfirmationModal";
import toast from "react-hot-toast";
import { addToList, removeFromList } from "../slices/cartSlice";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";

const Card = ({
  img,
  city,
  state,
  bhk,
  size,
  bath,
  price,
  pricePer,
  type,
  propertyId,
  isSeller = false,
}) => {
  const { token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToList = async () => {
    if (token) {
      if (cart?.some((item) => item?.propertyId === propertyId)) {
        await deleteWishlist(token, propertyId);
        dispatch(removeFromList(propertyId));
      } else {
        const result = await createWishlist(token, propertyId);
        const card = {
          thumbnail: result.data.propertyDetails.thumbnail,
          city: result.data.propertyDetails.city,
          state: result.data.propertyDetails.state,
          bhk: result.data.propertyDetails.bhk,
          size: result.data.propertyDetails.size,
          bath: result.data.propertyDetails.bathrooms,
          price: result.data.propertyDetails.price,
          pricePer: result.data.propertyDetails.pricePer,
          type: result.data.propertyDetails.propertyType,
          propertyId: propertyId,
        };
        dispatch(addToList(card));
        // toast.success("Course added to Wishlist");
      }
    } else {
      toast.error("Login Required!!");
    }
  };

  return (
    <div className="card">
      <div className="card-img">
        <img src={img} alt="" />
        <button className="wishlist-btn" onClick={handleAddToList}>
          {cart?.some((item) => item?.propertyId === propertyId) ? (
            <FcLike />
          ) : (
            <FcLikePlaceholder />
          )}
        </button>
      </div>

      <div className="card-info">
        <div className="card-price">
          ₹{price}
          <span>/{pricePer}</span>
        </div>
        <div className="card-location">
          {city}, {state}
        </div>
        <div className="card-property-details">
          <span>
            <IoBedSharp />
            {bhk}
          </span>
          <span>
            <FaBath />
            {bath}
          </span>
          <span>
            <FaExternalLinkSquareAlt />
            {size}sqft
          </span>
          <span>| {type}</span>
        </div>
        {!isSeller ? (
          <button
            className="card-button"
            onClick={() => navigate(`/property/${propertyId}`)}
          >
            View Details
          </button>
        ) : (
          <div className="card-buttons">
            <button
              className="card-button"
              onClick={() => navigate(`/property/${propertyId}`)}
            >
              View Details
            </button>
            <button
              className="card-delete-btn"
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "After this you cannot access this Listing.",
                  btn1Text: "Delete",
                  btn2Text: "Cancel",
                  btn1Handler: () =>
                    dispatch(deleteProperty(token, propertyId)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
            >
              <RiDeleteBinLine />
            </button>
          </div>
        )}
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Card;
