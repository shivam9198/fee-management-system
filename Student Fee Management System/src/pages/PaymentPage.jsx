import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import MessageBox from '../components/MessageBox';
import {API_BASE_URL } from '../utils/config';

const PaymentPage = ({ navigate }) => {
  const { currentUser, token, setCurrentUser } = useAuth();
  const [message, setMessage] = useState('');

  const handlePayNow = async () => {
    setMessage('');
    if (!token) {
      setMessage('Not authenticated.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/profile/pay-fees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Payment  successfully! Your fees status has been updated.');
        setCurrentUser(prev => ({ ...prev, feesPaid: true }));
        setTimeout(() => {
          setMessage('');
          navigate('profile');
        }, 2000);
      } else {
        setMessage(data.message || 'Failed to simulate payment');
      }
    } catch (error) {
      console.error('Error simulating payment:', error);
      setMessage('Network error or server unavailable');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to make a payment.</h2>
          <button
            onClick={() => navigate('login')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Payment Gateway</h2>
        <p className="text-gray-700 mb-8">
          This is a payment page. Click "Pay Now" to update your fee status.
        </p>
        <button
          onClick={handlePayNow}
          className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
        >
          Pay Now
        </button>
        <button
          onClick={() => navigate('profile')}
          className="w-full py-3 mt-4 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition duration-200 shadow-md"
        >
          Cancel
        </button>
        <MessageBox message={message} onClose={() => setMessage('')} />
      </div>
    </div>
  );
};

export default PaymentPage;