import React from 'react';
import { useAuth } from '../utils/AuthContext';

const Navbar = ({ navigate }) => {
  const { currentUser, logout } = useAuth();
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg rounded-b-xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold font-inter">
          Fee Management System
        </div>
        <div className="flex space-x-6">
          <button
            onClick={() => navigate('allStudents')}
            className="text-white hover:text-blue-200 transition duration-200 text-lg font-medium"
          >
            All Students
          </button>
          <button
            onClick={() => navigate('profile')}
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
              onClick={() => navigate('login')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 shadow-md"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;