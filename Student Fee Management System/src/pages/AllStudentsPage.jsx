import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import MessageBox from '../components/MessageBox';
import  {API_BASE_URL } from '../utils/config';

const AllStudentsPage = () => {
  const { isLoading } = useAuth();
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      if (isLoading) return;

      try {
        const response = await fetch(`${API_BASE_URL}/students`);
        const data = await response.json();
        if (response.ok) {
          setStudents(data);
        } else {
          setMessage(data.message || 'Failed to fetch students');
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        setMessage('Network error or server unavailable');
      }
    };

    fetchStudents();
  }, [isLoading]);

  return (
    <div className="container mx-auto p-6 bg-white rounded-xl shadow-xl mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Students</h2>
      {students.length === 0 && <p className="text-center text-gray-600">No students found.</p>}
      {students.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider rounded-tl-lg">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider rounded-tr-lg">Fees Paid Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">{student.name}</td>
                  <td className="py-3 px-4 text-gray-800">{student.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      student.feesPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {student.feesPaid ? 'Yes' : 'No'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <MessageBox message={message} onClose={() => setMessage('')} />
    </div>
  );
};

export default AllStudentsPage;