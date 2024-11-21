import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHamburger } from "react-icons/fa";
import Sidebar from './Sidebar';
import axios from '../../axios';

const Navbar = () => {
  const [bgColor, setBgColor] = useState('linear-gradient(to right, #D84315, #6d28d9)'); // Default gradient
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState('user');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Fetch the navbar color from the backend
    const fetchNavbarColor = async () => {
      try {
        const response = await fetch('/api/navbar-color'); // Replace with your actual API endpoint
        const data = await response.json();
        setBgColor(data.color); // Assume backend returns an object like { color: "#ff7e5f" or gradient string }
      } catch (error) {
        console.error('Error fetching navbar color:', error);
      }
    };

    fetchNavbarColor();
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      
      try {
        const response = await axios.get('api/role'); // Replace with your actual API endpoint
        setRole(response.data.role);
        console.log(response.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    // Set the CSS variable for navbar background color
    document.documentElement.style.setProperty('--navbar-bg-color', bgColor);
  }, [bgColor]); // Update when bgColor changes

  return (
    <>
      

      <div
        div className="flex z-10 justify-between  items-center px-4 py-2 bg-gradient-to-r from-blue-700 to-purple-700 shadow-lg"
      >
        <button
          onClick={toggleSidebar}
          className="p-3 ml-3 mr-3 rounded-full bg-blue-800 hover:bg-blue-900 focus:outline-none border border-black  border-opacity-10"
        >
          <FaHamburger className='text-lg text-white'/>
        </button>
        <h1 className="text-lg font-bold text-white">miniChat</h1>
        <Link to="/cart">
        
        <button className="relative flex items-center ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l3.6 7.59L8 13H20a2 2 0 002-2V5a2 2 0 00-2-2H6L5 1H3"
            />
            <circle cx="9" cy="21" r="1" fill="currentColor" />
            <circle cx="17" cy="21" r="1" fill="currentColor" />
          </svg>
          <span className="text-white">
            Go to Cart
          </span>
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-3 w-3 bg-red-500 rounded-full"></span>
        </button>
        </Link>
      </div>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} type={role}/>
    </>

  );
};

export default Navbar;
