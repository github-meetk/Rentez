import React, { useEffect, useState } from "react";
import { getSellersListings } from "../services/operations/propertyAPI";
import Card from "./Card";
import { useSelector } from "react-redux";

const Mylistings = () => {
  const { token } = useSelector((state) => state.auth);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const scheleton = [0, 1, 2, 3, 4, 5];

  const fetchApi = async () => {
    setLoading(true);
    const response = await getSellersListings(token);
    setListings(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="my-listings-wrapper">
      <h1>My Listings</h1>
      <div className="my-listings">
        {loading
          ? scheleton.map((card, index) => {
              return (
                <div key={index} className="loaderr">
                  <div className="wrapper">
                    <div className="circle" />
                    <div className="line-1" />
                    <div className="line-2" />
                    <div className="line-3" />
                    <div className="line-4" />
                  </div>
                </div>
              );
            })
          : listings?.map((property, index) => {
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
    </div>
  );
};

export default Mylistings;
