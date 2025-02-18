import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {  NavLink, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../assets/context/StoreContext';
const Navbar = ({setShowLogin}) => {
  const [menu,setMenu]=useState("home")
  const{getTotalCartAmount,token,setToken}=useContext(StoreContext);
  const navigate = useNavigate()

  const logout=()=>{
 localStorage.removeItem("token")
 setToken("")
 navigate("/")
  }
  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className="logo"   />
       <ul className="navbar-menu">
        <NavLink  to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</NavLink >
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
        <a href='#app-download'onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>

       </ul>
       <div className="navbar-right">
     
        <div className='navbar-search-icon'>
        <NavLink to="/cart"> <img src={assets.basket_icon} alt="" /></NavLink>   
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
            
        </div>
        {!token ? (
  <button onClick={() => setShowLogin(true)}>Sign In</button>
) : (
  <div className='navbar-profile'>
    <img src={assets.profile_icon} alt="Profile" className="profile-icon" />
    <ul className='navbar-profile-dropdown'>
      <li onClick={()=>navigate("/myorders")}>
        <img src={assets.bag_icon} alt="Orders" className="dropdown-icon" />
        <p>Orders</p>
      </li>
      <hr />
      <li onClick={logout}>
        <img src={assets.logout_icon} alt="Logout" className="dropdown-icon" />
        <p>Logout</p>
      </li>
    </ul>
  </div>
)}

       
        
       </div>
    </div>
  )
}

export default Navbar