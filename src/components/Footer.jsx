import React from 'react'
import logo from "../assets/rentez-svg.svg"
import { ImFacebook2 } from "react-icons/im";
import { SiYoutube } from "react-icons/si";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <div className='footer-wrapper'>
      <div className='footer-left'>
        <img src={logo} alt=''></img>
        <p>Rent Smarter, Live Better.</p>
      </div>
      <div className='footer-middle'>
        <h3>Quick Links</h3>
        <Link to={"/"}>Home</Link>
        <Link to={"/aboutus"}>About</Link>
        <Link to={"/plan"}>Get a plan</Link>
        <Link to={"/properties"}>See Property</Link>
        <Link to={"/dashboard/my-profile"}>Profile</Link>
      </div>
      <div className='footer-right'>
        <h3>Follow Us</h3>
        <div className='footer-logos'>
            <span><ImFacebook2 /></span>
            <span><SiYoutube/></span>
            <span><FaSquareInstagram/></span>
            <span><FaXTwitter/></span>
            <span><FaLinkedin/></span>
        </div>
      </div>
    </div>
  )
}

export default Footer
