import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import MessageBox from '../components/MessageBox';
import  {API_BASE_URL } from '../utils/config';

const ProfilePage = ({ navigate }) => {
  const { currentUser, token, setCurrentUser, isLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (isLoading || !token) {
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setProfile(data);
          setNewName(data.name);
          setNewEmail(data.email);
        } else {
          setMessage(data.message || 'Failed to fetch profile');
          if (response.status === 401 || response.status === 403) {
            setCurrentUser(null);
            localStorage.removeItem('jwtToken');
            navigate('login');
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage('Network error or server unavailable');
      }
    };

    fetchProfile();
  }, [token, isLoading, setCurrentUser, navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    setMessage('');
    if (!token) {
      setMessage('Not authenticated.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newName, email: newEmail })
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data.student);
        setCurrentUser(prev => ({ ...prev, name: data.student.name, email: data.student.email }));
        setMessage('Profile updated successfully!');
        setIsEditing(false);
      } else {
        setMessage(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Network error or server unavailable');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <p className="text-gray-700">Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your profile.</h2>
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <p className="text-gray-700">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-xl shadow-xl mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          ) : (
            <p className="text-gray-800 text-lg font-medium">{profile.name}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Email:</label>
          {isEditing ? (
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          ) : (
            <p className="text-gray-800 text-lg font-medium">{profile.email}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Fees Paid Status:</label>
          <span className={`px-4 py-2 rounded-full text-lg font-bold ${
            profile.feesPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {profile.feesPaid ? 'Yes' : 'No'}
          </span>
        </div>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveProfile}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
            >
              Save Changes
            </button>
            <button
              onClick={handleEditToggle}
              className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200 shadow-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEditToggle}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
            >
              Edit Details
            </button>
            {!profile.feesPaid && (
              <button
                onClick={() => navigate('payFees')}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-200 shadow-md"
              >
                Pay Fees
              </button>
            )}
          </>
        )}
      </div>
      <MessageBox message={message} onClose={() => setMessage('')} />
    </div>
  );
};

export default ProfilePage;