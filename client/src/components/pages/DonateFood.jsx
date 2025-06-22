import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DonateFood = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    pickupAddress: '',
    expiryTime: null,
    contactNumber: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, expiryTime: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5002/api/food/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          expiryTime: formData.expiryTime?.toISOString() || ''
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Donation submitted successfully!');
        setFormData({
          title: '',
          description: '',
          quantity: '',
          pickupAddress: '',
          expiryTime: null,
          contactNumber: ''
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit donation.');
    }
  };

  return (
    <div className="bg-green-50 min-h-screen py-12 px-4 sm:px-8">
      <div className="mt-24">
        {/* Header Quote and Intro */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Donate Food & Make an Impact</h1>
          <p className="text-lg text-gray-700 mb-4 italic">
            “खाली पेट को भरना सबसे बड़ा पुण्य है।” <br />
            <span className="not-italic">Every meal you give is a promise of hope and dignity to someone in need.</span>
          </p>
          <p className="text-gray-600">
            Fill out the form below to donate surplus food from your home, event, or restaurant.
            Let’s reduce waste and spread kindness — one plate at a time.
          </p>
        </div>

        {/* Donation Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-green-200">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Food Donation Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Food Title *</label>
              <input
                type="text"
                name="title"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="E.g. Veg Biryani, Sandwiches, Dal-Rice..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                name="description"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.description}
                onChange={handleChange}
                placeholder="Any additional details (e.g. spicy, packed separately, etc.)"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                <input
                  type="text"
                  name="quantity"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  placeholder="E.g. 10 plates, 5 boxes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                <input
                  type="text"
                  name="contactNumber"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  placeholder="Your phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address *</label>
              <input
                type="text"
                name="pickupAddress"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.pickupAddress}
                onChange={handleChange}
                required
                placeholder="Complete address with landmarks if any"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Time *</label>
              <DatePicker
                selected={formData.expiryTime}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select date & time"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-full font-semibold text-lg hover:bg-green-800 transition"
            >
              Submit Donation
            </button>
          </form>
        </div>

        {/* Additional Motivational Content */}
        <div className="max-w-4xl mx-auto mt-20 bg-white shadow-md rounded-xl p-8 border border-green-200">
          <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">Why Your Contribution Matters</h2>
          <p className="text-gray-700 mb-4 text-lg">
            Hunger isn’t just a lack of food — it’s a lack of hope. And by donating what would otherwise go to waste,
            you're not just reducing landfill waste, you're building a bridge between abundance and need.
          </p>
          <ul className="list-disc text-gray-600 pl-6 space-y-2">
            <li>💚 <strong>1 Meal = 1 Life Touched:</strong> Every plate you donate is someone's nourishment.</li>
            <li>🌱 <strong>Environmental Impact:</strong> Prevent food waste, reduce greenhouse emissions.</li>
            <li>🧑‍🍳 <strong>Small Acts, Big Changes:</strong> Even 5 extra meals can bring joy to a shelter or street family.</li>
            <li>🤝 <strong>Community Kindness:</strong> Be an example. Inspire others to share more, waste less.</li>
          </ul>
          <p className="mt-6 text-center text-green-600 font-semibold">
            “आपका एक छोटा योगदान किसी की पूरी उम्मीद बन सकता है।” <br />
            Thank you for choosing to give!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonateFood;