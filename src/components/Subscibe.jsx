import React from 'react'
import ss from "../assets/download.png"
import { useNavigate } from 'react-router-dom'

const Subscibe = () => {
  const navigate = useNavigate()
  return (
    <div className="subscription-section-wrapper">
        <h1>Get started with Rentez</h1>
        <button onClick={() => navigate("/plan")}>Subscribe</button>
        <div className="ss"><img src={ss} alt='' ></img></div>
    </div>
  )
}

export default Subscibe
