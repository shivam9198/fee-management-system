import React, { useState, useEffect } from 'react';
import { useAuth } from './utils/AuthContext';
import Navbar from './components/Navbar';
import AllStudentsPage from './pages/AllStudentsPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import PaymentPage from './pages/PaymentPage';

const App = () => {
  const { currentUser, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('allStudents');

  useEffect(() => {
    if (!isLoading && !currentUser && (currentPage === 'profile' || currentPage === 'payFees')) {
      setCurrentPage('login');
    }
  }, [currentUser, currentPage, isLoading]);

  const navigate = (page) => {
    setCurrentPage(page);
  };

  

  return (
    <div className="min-h-screen bg-gray-50 font-inter antialiased">
      <Navbar navigate={navigate} />
      <main className="p-4">
        {currentPage === 'allStudents' && <AllStudentsPage />}
        {currentPage === 'profile' && <ProfilePage navigate={navigate} />}
        {currentPage === 'login' && <AuthPage navigate={navigate} />}
        {currentPage === 'payFees' && <PaymentPage navigate={navigate} />}
      </main>
    </div>
  );
};

export default App;