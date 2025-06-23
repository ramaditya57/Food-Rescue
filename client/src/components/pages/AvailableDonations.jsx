import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUtensils, FaMapMarkerAlt, FaClock, FaPhoneAlt, FaInfoCircle } from 'react-icons/fa';

const AvailableDonations = () => {
  const [donations, setDonations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAvailable = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/food/pending`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDonations(res.data);
      } catch (err) {
        console.error('Error fetching donations –', err);
        setMessage('❌ Failed to load available donations');
      }
    };

    fetchAvailable();
  }, []);

  const handleClaim = async (id) => {
    try {
      const token = localStorage.getItem('token');

      await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/food/claim/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('✅ Pickup claimed');
      setDonations((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err);
      setMessage('❌ Could not claim this donation');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-8">
      {/* Motivational Quote */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-700 mb-2">Volunteers Change the World</h1>
        <p className="text-lg text-gray-600 italic max-w-2xl mx-auto">
          “हर कदम किसी की भूख मिटा सकता है। सेवा करें, समाज को संजीवनी दें।” 💚
        </p>
      </div>

      {/* Status Message */}
      {message && (
        <div className="mb-6 max-w-2xl mx-auto p-4 bg-blue-100 text-blue-800 rounded text-center shadow">
          {message}
        </div>
      )}

      {/* If no donations */}
      {donations.length === 0 ? (
        <div className="text-center mt-12">
          <p className="text-xl text-gray-600 font-medium mb-4">😔 No food donations are available at the moment.</p>
          <p className="text-gray-500">Please check back soon — someone may need your help any moment now!</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-2xl border border-green-100 shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-green-800 flex items-center gap-2 mb-2">
                  <FaUtensils className="text-green-600" /> {donation.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 flex items-start gap-2">
                  <FaInfoCircle className="mt-1 text-gray-400" /> {donation.description || 'No description provided.'}
                </p>

                <div className="text-sm text-gray-700 space-y-2">
                  <p className="flex items-center gap-2">
                    <strong>Quantity:</strong> {donation.quantity}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-500" />
                    <span><strong>Address:</strong> {donation.pickupAddress}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-blue-500" />
                    <span><strong>Expires:</strong> {new Date(donation.expiryTime).toLocaleString()}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhoneAlt className="text-yellow-600" />
                    <span><strong>Contact:</strong> {donation.contactNumber}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleClaim(donation._id)}
                className="mt-6 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Claim Pickup
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableDonations;