import React from 'react';
import './Navbar.css';
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='container'>
        <img src={logo} alt="" className='logo' />
        <ul>
            <li>Home</li>
            <li>Courses</li>
            <li>Events</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <Link to={'/login'}><li><button className='btn'>LOGIN</button></li></Link>
        </ul>
    </nav>
    
  )
}

export default Navbar
