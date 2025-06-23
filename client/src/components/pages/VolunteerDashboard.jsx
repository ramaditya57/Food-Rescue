import React, { useEffect, useState } from 'react';
import api from '../../api';
import { FaClipboardCheck, FaTruck, FaCheckCircle } from 'react-icons/fa';

const VolunteerDashboard = () => {
  const [claimed, setClaimed] = useState([]);
  const [inTransit, setInTransit] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPickups();
  }, []);

  const fetchPickups = async () => {
    try {
      const res = await api.get('/api/food/volunteer-pickups');
      const data = res.data;
      setClaimed(data.filter(d => d.status === 'claimed'));
      setInTransit(data.filter(d => d.status === 'in_transit'));
      setDelivered(data.filter(d => d.status === 'delivered'));
    } catch (err) {
      console.error('Error loading pickups:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkInTransit = async (id) => {
    try {
      await api.patch(`/api/food/in-transit/${id}`);
      fetchPickups();
    } catch (err) {
      alert('Failed to mark as in transit');
    }
  };

  const handleMarkDelivered = async (id) => {
    try {
      await api.patch(`/api/food/${id}/delivered`);
      fetchPickups();
    } catch (err) {
      alert('Failed to mark as delivered');
    }
  };

  const renderCard = (item, showInTransitBtn, showDeliveredBtn) => (
    <div key={item._id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
      <h3 className="text-xl font-bold text-green-800 mb-2">{item.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{item.description || 'No description provided.'}</p>
      <div className="text-sm text-gray-700 space-y-1">
        <p><strong>Quantity:</strong> {item.quantity}</p>
        <p><strong>Address:</strong> {item.pickupAddress}</p>
        <p><strong>Status:</strong> <span className="capitalize">{item.status.replace('_', ' ')}</span></p>
        <p><strong>Expires:</strong> {new Date(item.expiryTime).toLocaleString()}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {showInTransitBtn && (
          <button
            onClick={() => handleMarkInTransit(item._id)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm"
          >
            Mark In Transit
          </button>
        )}
        {showDeliveredBtn && (
          <button
            onClick={() => handleMarkDelivered(item._id)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
          >
            Mark Delivered
          </button>
        )}
      </div>
    </div>
  );

  if (loading) return <p className="text-center mt-24 text-lg">Loading your assigned pickups...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Poster */}
      <div
        className="w-full h-[880px] bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: "url('volenteer.webp')",
        }}
      >
        <div className="bg-black bg-opacity-60 p-6 rounded-xl text-white max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">सेवा ही सबसे बड़ा धर्म है</h1>
          <p className="text-lg italic">"हर भोजन जो आप पहुँचाते हैं, किसी की भूख और उम्मीद दोनों मिटाता है।"</p>
        </div>
      </div>

      {/* Dashboard */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">🎯 Your Assigned Pickups</h2>

          {/* Claimed Donations */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <FaClipboardCheck className="text-yellow-600 text-xl" />
              <h3 className="text-2xl font-semibold text-yellow-700">📦 Claimed Donations</h3>
            </div>
            {claimed.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {claimed.map(d => renderCard(d, true, false))}
              </div>
            ) : (
              <p className="text-gray-500 ml-2">No claimed donations yet.</p>
            )}
          </div>

          {/* In Transit */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <FaTruck className="text-blue-600 text-xl" />
              <h3 className="text-2xl font-semibold text-blue-700">🚚 In Transit</h3>
            </div>
            {inTransit.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {inTransit.map(d => renderCard(d, false, true))}
              </div>
            ) : (
              <p className="text-gray-500 ml-2">No donations currently in transit.</p>
            )}
          </div>

          {/* Delivered */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaCheckCircle className="text-green-600 text-xl" />
              <h3 className="text-2xl font-semibold text-green-700">✅ Delivered</h3>
            </div>
            {delivered.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {delivered.map(d => renderCard(d, false, false))}
              </div>
            ) : (
              <p className="text-gray-500 ml-2">No delivered donations yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;