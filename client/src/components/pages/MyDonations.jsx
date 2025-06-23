import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaClock, FaUtensils, FaInfoCircle } from 'react-icons/fa';

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMyDonations = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/food/my-donations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDonations(res.data);
      } catch (err) {
        console.error('Failed to fetch my donations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyDonations();
  }, [token]);

  if (loading) return <p className="text-center text-lg mt-24">Loading your donations...</p>;

  return (
    <div className="bg-green-50 min-h-screen pt-24 pb-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-green-800 mb-4 text-center">My Food Donations</h2>

        {/* Motivational Quote */}
        <p className="text-center italic text-gray-600 text-lg mb-10">
          “Your kindness feeds not just stomachs, but souls. Thank you for making a difference.”
        </p>

        {donations.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">You have not made any donations yet.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white p-6 rounded-xl shadow-md border border-green-100 hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-semibold text-green-700 mb-2 flex items-center gap-2">
                  <FaUtensils className="text-green-600" /> {donation.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 flex items-start gap-2">
                  <FaInfoCircle className="mt-1 text-gray-500" /> {donation.description || 'No description provided.'}
                </p>

                <div className="space-y-2 text-gray-700 text-sm">
                  <p className="flex items-center gap-2">
                    <strong className="text-gray-800">Quantity:</strong> {donation.quantity}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-500" />
                    <span><strong>Pickup:</strong> {donation.pickupAddress}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-blue-500" />
                    <span><strong>Expires:</strong> {new Date(donation.expiryTime).toLocaleString()}</span>
                  </p>
                </div>

                {/* Optional Status Badge */}
                {donation.status && (
                  <span
                    className={`inline-block mt-4 px-3 py-1 text-xs font-semibold rounded-full 
                      ${
                        donation.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : donation.status === 'picked'
                          ? 'bg-blue-100 text-blue-800'
                          : donation.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    {donation.status.toUpperCase()}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDonations;