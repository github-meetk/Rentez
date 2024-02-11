import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getAllProperty } from "../services/operations/propertyAPI";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";

const Featured = () => {
  const [properties, setProperties] = useState([]);

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const api = async () => {
    const response = await getAllProperty();
    const result = response.slice(0, 6);
    setProperties(result);
  };
  useEffect(() => {
    api();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <div className="featured-section-heading">
        <h1>Featured Properties</h1>
        <Link to={"/properties"} className="cta">
          <span>Explore all</span>
          <svg width="15px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5" />
            <polyline points="8 1 12 5 8 9" />
          </svg>
        </Link>
      </div>
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {properties?.map((property, index) => {
          return (
            <div key={index} className="card-wrap">
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
            </div>
          );
        })}
      </Slider>
      <div className="slider-btn">
        <button className="button" onClick={previous}>
          <FaArrowLeftLong />
        </button>
        <button className="button" onClick={next}>
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};

export default Featured;
