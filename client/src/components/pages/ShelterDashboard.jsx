import React, { useEffect, useState } from 'react';
import api from '../../api';
import { FaBoxOpen, FaClock } from 'react-icons/fa';

const ShelterDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchIncoming = async () => {
      try {
        const res = await api.get('/api/food/incoming');
        setDonations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIncoming();
  }, []);

  const handleAcknowledge = async (id) => {
    try {
      await api.patch(`/api/food/food/${id}/acknowledge`);
      setMessage('✅ Delivery acknowledged');
      setDonations((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      setMessage('❌ Failed to acknowledge');
    }
  };

  const handleFeedback = async (id, rating, notes) => {
    try {
      await api.post(`/api/food/feedback/${id}`, { rating, notes });
      setMessage('✅ Feedback submitted');
    } catch (err) {
      setMessage(`❌ Could not submit feedback`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Background Poster */}
      <div
        className="w-full h-[900px] bg-cover bg-center flex items-center justify-center text-center px-6"
        style={{
          backgroundImage: `url('/donor.webp')`,
        }}
      >
        <div className="bg-black bg-opacity-60 p-8 rounded-3xl text-white max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-snug">
            हम सिर्फ दाता नहीं, <span className="text-green-300">आपका परिवार</span> हैं।
          </h1>
          <p className="text-xl italic">“हर भोजन एक वादा है — कि आप अकेले नहीं हैं।”</p>
        </div>
      </div>

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center text-emerald-700 mb-10">🏠 Shelter Dashboard</h2>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md text-center shadow">
            {message}
          </div>
        )}

        {donations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center text-gray-600">
            <p className="text-2xl font-semibold mb-2">No deliveries right now.</p>
            <p className="text-lg italic">“इंतज़ार की घड़ी छोटी होती है, जब उम्मीद साथ होती है।”</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white border border-gray-200 shadow-md rounded-2xl overflow-hidden flex flex-col transition-transform hover:scale-[1.02]"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <FaBoxOpen /> {donation.title || "Food Item"}
                  </h3>
                  <p className="text-sm italic">“किसी के चेहरे पर मुस्कान लाना सेवा है।”</p>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div className="text-sm text-gray-700 space-y-2 mb-4">
                    <p><strong>Donor:</strong> {donation.user?.name || 'Anonymous'}</p>
                    <p><strong>Delivered By:</strong> {donation.volunteer?.name || 'Volunteer'}</p>
                    <p><strong>Quantity:</strong> {donation.quantity}</p>
                    <p><strong>Status:</strong> {donation.status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</p>
                    <p><strong><FaClock className="inline-block mr-1 text-gray-500" /> Delivered At:</strong> {donation.deliveredAt ? new Date(donation.deliveredAt).toLocaleString() : 'N/A'}</p>
                  </div>

                  {/* Acknowledge Button */}
                  <button
                    onClick={() => handleAcknowledge(donation._id)}
                    className="w-full py-2 mb-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    ✅ Acknowledge Delivery
                  </button>

                  {/* Feedback */}
                  <div className="bg-gray-50 p-3 rounded-xl border">
                    <h4 className="text-md font-semibold mb-2">📝 Feedback</h4>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const rating = e.target.rating.value;
                        const notes = e.target.notes.value;
                        handleFeedback(donation._id, rating, notes);
                        e.target.reset();
                      }}
                      className="space-y-2"
                    >
                      <select
                        name="rating"
                        className="w-full p-2 border rounded focus:ring-emerald-400"
                        required defaultValue=""
                      >
                        <option value="" disabled>Rate the food quality</option>
                        <option value="Excellent">🌟 Excellent</option>
                        <option value="Good">👍 Good</option>
                        <option value="Average">👌 Average</option>
                        <option value="Poor">👎 Poor</option>
                      </select>

                      <textarea
                        name="notes"
                        placeholder="Any message..."
                        rows={2}
                        className="w-full p-2 border rounded"
                      />

                      <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        📤 Submit Feedback
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-16 text-center text-gray-400 text-sm">
          End of feed — more family meals on their way soon 🍲
        </p>
      </div>
    </div>
  );
};

export default ShelterDashboard;