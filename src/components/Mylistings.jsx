import React, { useEffect, useState } from "react";
import { getSellersListings } from "../services/operations/propertyAPI";
import Card from "./Card";
import { useSelector } from "react-redux";

const Mylistings = () => {
  const { token } = useSelector((state) => state.auth);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    // setLoading(true)
    const response = await getSellersListings(token);
    setListings(response);
  };

  useEffect(() => {
      fetchApi();
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="my-listings-wrapper">
      {loading ? (
        <span className="loader"></span>
      ) : (
        <>
          <h1>My Listings</h1>
          <div className="my-listings">
            {listings?.map((property, index) => {
              return (
                <Card
                  key={index}
                  isSeller="true"
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
        </>
      )}
    </div>
  );
};

export default Mylistings;
