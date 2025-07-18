import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 

const Navbar = ({ navigate }) => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (page) => {
    navigate(page);
    setIsMenuOpen(false); 
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg rounded-b-xl">
      <div className="container mx-auto flex justify-between items-center">

        <div className="text-white text-2xl font-bold font-inter">
          Fee Management System
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-2"
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? (
             
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
      
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

  
        <div className="hidden md:flex space-x-6 items-center">
          <button
            onClick={() => handleNavigation('allStudents')}
            className="text-white hover:text-blue-200 transition duration-200 text-lg font-medium"
          >
            All Students
          </button>
          <button
            onClick={() => handleNavigation('profile')}
            className="text-white hover:text-blue-200 transition duration-200 text-lg font-medium"
          >
            Profile
          </button>
          {currentUser ? (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 shadow-md"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => handleNavigation('login')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 shadow-md"
            >
              Login
            </button>
          )}
        </div>
      </div>

     
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-3 px-2 pb-3 pt-2 bg-blue-700 rounded-lg shadow-inner">
          <button
            onClick={() => handleNavigation('allStudents')}
            className="block w-full text-left px-3 py-2 text-white hover:bg-blue-600 rounded-md transition duration-200"
          >
            All Students
          </button>
          <button
            onClick={() => handleNavigation('profile')}
            className="block w-full text-left px-3 py-2 text-white hover:bg-blue-600 rounded-md transition duration-200"
          >
            Profile
          </button>
          {currentUser ? (
            <button
              onClick={logout}
              className="block w-full text-left px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 mt-2"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => handleNavigation('login')}
              className="block w-full text-left px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 mt-2"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;