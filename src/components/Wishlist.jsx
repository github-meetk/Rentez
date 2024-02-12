import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { resetList } from "../slices/cartSlice";
import { clearoutWishlist } from "../services/operations/propertyAPI";
import toast from "react-hot-toast";

const Wishlist = () => {
  const { cart, totalItems } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const handleReset = async() => {
      dispatch(resetList())
      await clearoutWishlist(token);
      toast.success("Wishlist Reset Successfully");
  }
  return (
    <div className="my-listings-wrapper">
      {totalItems > 0 ? (
        <>
          <div className="wishlist-heading">
            <h1>Wishlist</h1>
            <button className='delete-profile-button' onClick={handleReset}>clear</button>
          </div>
          
          <div className="my-listings">
            {cart?.map((property, index) => {
              return (
                <Card
                  key={index}
                  propertyId={property?.propertyId}
                  img={property?.thumbnail}
                  bhk={property?.bhk}
                  bath={property?.bathrooms}
                  size={property?.size}
                  price={property?.price}
                  pricePer={property?.pricePer}
                  city={property?.city}
                  state={property?.state}
                  type={property?.propertyType}
                />
              );
            })}
          </div>
        </>
      ) : (
        <h2 className="wishlist-empty">Your Wishlist is Empty</h2>
      )}
    </div>
  );
};

export default Wishlist;
