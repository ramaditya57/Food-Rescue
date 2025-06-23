import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyDonations = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/food/my-donations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDonations(res.data);
      } catch (err) {
        console.error('Failed to fetch your donations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyDonations();
  }, []);

  if (loading) return <p>Loading your donations...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Food Donations</h2>
      {donations.length === 0 ? (
        <p>You have not donated any food yet.</p>
      ) : (
        <ul className="space-y-4">
          {donations.map((donation) => (
            <li key={donation._id} className="p-4 bg-white shadow rounded">
              <h3 className="text-xl font-semibold">{donation.title}</h3>
              <p className="text-sm text-gray-600">{donation.description}</p>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
              <p><strong>Pickup Address:</strong> {donation.pickupAddress}</p>
              <p><strong>Expires At:</strong> {new Date(donation.expiryTime).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDonations;