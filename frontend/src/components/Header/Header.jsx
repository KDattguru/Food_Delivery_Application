import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourites</h2>
        <p>Destination of Cravers</p>
        <button>View menu</button>
      </div>
    </div>
  );
};

export default Header;
