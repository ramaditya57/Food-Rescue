import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestPickup = () => {
  const [donations, setDonations] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [loading, setLoading] = useState(false);
  const [acknowledged, setAcknowledged] = useState({});
  const [feedbackSubmitted, setFeedbackSubmitted] = useState({});

  const fetchIncomingDonations = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/food/incoming`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDonations(res.data);
    } catch (err) {
      console.error("Error fetching incoming donations:", err.message);
    }
    setLoading(false);
  };

  const handleAcknowledge = async (donationId) => {
    try {
      await axios.patch(`/api/food/acknowledge/${donationId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("✅ Delivery acknowledged.");
      setAcknowledged((prev) => ({ ...prev, [donationId]: true }));
      fetchIncomingDonations();
    } catch (err) {
      console.error("Failed to acknowledge:", err.message);
    }
  };

  const handleFeedbackSubmit = async (donationId) => {
    try {
      if (!feedbacks[donationId]) {
        alert("Please write feedback before submitting.");
        return;
      }

      await axios.post(`/api/food/feedback/${donationId}`, {
        feedback: feedbacks[donationId],
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("✍️ Feedback submitted.");
      setFeedbackSubmitted((prev) => ({ ...prev, [donationId]: true }));
      setFeedbacks((prev) => ({ ...prev, [donationId]: "" }));
      fetchIncomingDonations();
    } catch (err) {
      console.error("Failed to submit feedback:", err.message);
    }
  };

  useEffect(() => {
    fetchIncomingDonations();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📦 Incoming Food Donations</h2>
      {loading ? (
        <p>Loading...</p>
      ) : donations.length === 0 ? (
        <p>No incoming deliveries at the moment.</p>
      ) : (
        donations.map((donation) => (
          <div
            key={donation._id}
            className="border rounded-xl shadow-md p-4 mb-6 bg-white"
          >
            <h3 className="text-xl font-semibold">{donation.foodType}</h3>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
            <p><strong>Donor:</strong> {donation.donorName}</p>
            <p><strong>Volunteer:</strong> {donation.volunteerName}</p>
            <p><strong>Delivered At:</strong> {new Date(donation.deliveredAt).toLocaleString()}</p>

            <div className="mt-4 flex gap-3 items-center">
              <button
                className={`py-1 px-3 rounded text-white ${
                  acknowledged[donation._id] ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={() => handleAcknowledge(donation._id)}
                disabled={acknowledged[donation._id]}
              >
                ✅ {acknowledged[donation._id] ? "Acknowledged" : "Acknowledge Delivery"}
              </button>
            </div>

            <div className="mt-4">
              <textarea
                placeholder="Write feedback..."
                value={feedbacks[donation._id] || ""}
                onChange={(e) =>
                  setFeedbacks({ ...feedbacks, [donation._id]: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
                rows={3}
                disabled={feedbackSubmitted[donation._id]}
              />
              <button
                className={`py-1 px-3 rounded text-white ${
                  feedbackSubmitted[donation._id] ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={() => handleFeedbackSubmit(donation._id)}
                disabled={feedbackSubmitted[donation._id]}
              >
                ✍️ {feedbackSubmitted[donation._id] ? "Feedback Submitted" : "Submit Feedback"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RequestPickup;