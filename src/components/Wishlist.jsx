import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const Wishlist = () => {
  const { cart, totalItems } = useSelector((state) => state.cart);
  return (
    <div className="my-listings-wrapper">
      {totalItems > 0 ? (
        <>
          <h1>Wishlist</h1>
          <div className="my-listings">
            {cart?.map((property, index) => {
              return (
                <Card
                  key={index}
                  propertyId={property.propertyId}
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
        </>
      ) : (
        <h1 style={{margin: "auto", color: "gray"}}>Your Wishlist is Empty</h1>
      )}
    </div>
  );
};

export default Wishlist;
