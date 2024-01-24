import React from 'react'
import { FaBath } from "react-icons/fa";
import { IoBedSharp } from "react-icons/io5";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Card = ({img, city, state, bhk, size, bath, price, pricePer, type, propertyId}) => {

  const navigate = useNavigate();

  return (
    <div className='card'>
      <div className='card-img'>
        <img src={img} alt='' />
      </div>
      <div className='card-info'>
        <div className='card-price'>₹{price}<span>/{pricePer}</span></div>
        <div className='card-location'>{city}, {state}</div>
        <div className='card-property-details'>
            <span><IoBedSharp />{bhk}</span>
            <span><FaBath />{bath}</span>
            <span><FaExternalLinkSquareAlt/>{size}sqft</span>
            <span>| {type}</span>
        </div>
        <button className='card-button' onClick={ () => navigate(`/property/${propertyId}`)}>View Details</button>
      </div>
    </div>
  )
}

export default Card
