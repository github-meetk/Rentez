import React, { useState } from 'react'
import { FaQuoteLeft, FaStar } from "react-icons/fa6";
import { FaQuoteRight } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const ReviewCard = (props) => {
    const [index, setIndex] = useState(0)
    const card = props.review[index]

    const leftClickHandler = () => {
        if(index - 1 < 0){
            setIndex(props.review.length - 1);
        }
        else {
            setIndex(index - 1);
        }
    }

    const rightClickHandler = () => {
        if(index + 1 >= props.review.length){
            setIndex(0);
        }
        else {
            setIndex(index + 1);
        }
    }

    
  return (
    <div className='review-section-card'>
      <div className='review-img'>
        <img src={card.user.image} alt=''/>
      </div>
      <h3>{card.user.firstName} {card.user.lastName}</h3>
      <div className='rating'>
      {
        [...Array(5)].map((star, i) => {
            return (
                <FaStar
                key={i}
                className="star"
                color={
                  card.rating > i ? "#ffc107" : "#e4e5e9"
                }
                size={50}
              />
            );
          })
      }
      </div>
      <div className='review-section-p'>
        <FaQuoteLeft size={20} />
        {card.review}
        <FaQuoteRight size={20} />
      </div>
      <div className='review-section-buttons'>
        <button onClick={leftClickHandler}><IoIosArrowBack size={25} /></button>
        <button onClick={rightClickHandler}><IoIosArrowForward size={25}/></button>
      </div>
    </div>
  )
}

export default ReviewCard
