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
  const [loading, setLoading] = useState(true);

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const api = async () => {
    setLoading(true);
    const response = await getAllProperty();
    const result = response.slice(0, 6);
    setProperties(result);
    if (result.length !== 0) setLoading(false);
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
          <span>Explore</span>
          <svg width="15px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5" />
            <polyline points="8 1 12 5 8 9" />
          </svg>
        </Link>
      </div>
      {loading ? (
        <Slider
          ref={(slider) => {
            sliderRef = slider;
          }}
          {...settings}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card-wrap">
              <div className="loaderr" key={index}>
                <div className="wrapper">
                  <div className="circle"></div>
                  <div className="line-1"></div>
                  <div className="line-2"></div>
                  <div className="line-3"></div>
                  <div className="line-4"></div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <>
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
            <button onClick={previous}>
              <FaArrowLeftLong />
            </button>
            <button onClick={next}>
              <FaArrowRightLong />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
