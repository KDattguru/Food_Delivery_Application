import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>

    <div className="footer-content">
      <div className="footer-content-left">
        <img className='img-logo' src={assets.logo} alt="" />
        <p>Hii this is food delivery for cravers </p>
        <div className="footer-social-icons">
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.instagram_icon} alt="" />
          <img src={assets.youtube_icon} alt="" />
        </div>
      </div>
      <div className="footer-content-center">
      <h2>COMPANY</h2>
      <ul>
     <a href="/"><li>Home</li></a> 
      <li>About us</li>
      <li>Delivery</li>
      <li>Privacy Policy</li>

      </ul>
      </div>
      <div className="footer-content-right">
       <h2>GET IN TOUCH</h2>
       <ul>
        <li>+91 9373613568</li>
       <li>Cloudkitchen@gmail.com</li></ul>
      </div>
    </div>
    <hr/>
    <p className='footer-copyright'>Copyright 2024 &copy;Cloud Kitchen.com  All rights reserved.</p>
      </div>
  )
}

export default Footer