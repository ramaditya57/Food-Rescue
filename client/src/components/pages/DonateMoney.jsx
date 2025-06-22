import React, { useState } from 'react';
import api from '../../api';

const DonateMoney = () => {
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);

  const loadRazorpay = async () => {
    const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      alert('Razorpay Key is missing. Check your .env file and restart the server.');
      return;
    }

    try {
      const { data } = await api.post('/payment/create-order', { amount });

      const options = {
        key: razorpayKey,
        amount: data.amount,
        currency: 'INR',
        name: 'FoodRescue Donation',
        description: 'Support our humanitarian mission',
        order_id: data.id,
        handler: function (response) {
          setShowModal(true);
        },
        prefill: {
          name: 'Donor',
          email: 'donor@example.com',
        },
        theme: {
          color: '#22c55e',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment Error:', err);
      alert('Payment failed. Please try again.');
    }
  };

  const quickAmounts = [251, 501, 1001, 5001, 10001];

  return (
    <div className="min-h-screen bg-green-50 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="mt-20 text-5xl font-bold text-green-800 mb-8">🌍 Make a Difference Today</h1>

        <p className="text-xl italic text-gray-700 mb-6">
          "हर एक रुपया, किसी के लिए उम्मीद की किरण है। आइए मिलकर एक भूखे चेहरे पर मुस्कान लाएं।"
        </p>

        <div className="bg-white shadow-lg rounded-lg p-8 border border-green-200 mb-12 text-left space-y-4 text-gray-800">
          <p className="text-md leading-relaxed">
            Your donation supports multiple initiatives under FoodRescue:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Emergency Food Distribution:</strong> Delivering meals & groceries to the homeless.</li>
            <li><strong>Medical Aid:</strong> Providing first-aid kits, sanitary pads, and medicines.</li>
            <li><strong>School Nutrition:</strong> Supporting mid-day meals in schools & orphanages.</li>
            <li><strong>Shelter Care:</strong> Blankets, mats, and solar lamps for families on footpaths.</li>
            <li><strong>Women & Children Safety:</strong> Supporting vulnerable lives with partner NGOs.</li>
          </ul>
          <p className="italic">🌱 Every single rupee is a seed of hope, growing into a tree of change.</p>
        </div>

        <h2 className="text-3xl font-semibold text-green-700 mb-4">🙏 Donate From the Heart</h2>

        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              className="bg-green-100 hover:bg-green-200 text-green-700 font-semibold px-4 py-2 rounded-full border border-green-400"
            >
              ₹{amt}
            </button>
          ))}
        </div>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter custom amount (INR)"
          className="p-3 border border-gray-300 rounded-md mb-4 w-64 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <br />
        <button
          onClick={loadRazorpay}
          disabled={!amount}
          className={`px-8 py-3 text-lg rounded-full font-bold transition mb-12 shadow-lg ${
            amount ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          ❤️ Donate Now
        </button>

        <div className="space-y-12 text-left text-gray-800">
          <section>
            <h3 className="text-2xl font-bold text-green-800 mb-2">💡 Why Your Help Matters</h3>
            <p>
              Millions of people in India sleep hungry every night. With your contribution, we're able to reach these individuals and families with food, medicine, and love. We're not just filling stomachs — we're restoring dignity and offering a future.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-green-800 mb-2">📦 Transparency You Can Trust</h3>
            <p>
              100% of public donations are channeled directly to humanitarian causes. Administrative costs are covered by our partner organizations and private grants. Every quarter, we share reports on how funds are used.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-green-800 mb-2">🤝 Join Our Mission</h3>
            <p>
              You're not just donating — you're becoming part of a community. Volunteers, donors, and supporters like you have already made a difference in 25+ cities. Together, we’re proving that a compassionate society is possible.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-green-800 mb-2">🌟 Testimonials</h3>
            <p className="italic">
              "हमारे मोहल्ले में पहली बार किसी संस्था ने खाना पहुंचाया। बच्चों की मुस्कान देखकर आंखें नम हो गईं।"<br />
              – Rekha Devi, Slum Resident<br /><br />
              "FoodRescue के वॉलंटियर्स ने हमें सिर्फ खाना नहीं दिया, इज़्ज़त भी दी।"<br />
              – Rajesh Kumar, Shelter Volunteer
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-green-800 mb-2">📞 Want to Help More?</h3>
            <p>
              Interested in corporate sponsorships, monthly pledges, or food donation drives? Reach out to us at <strong>help@foodrescue.org</strong> or call <strong>+91 9876543210</strong>.
            </p>
          </section>
        </div>
      </div>

      {/* Thank You Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🎉 Thank You!</h2>
            <p className="text-gray-700 mb-6">
              आपकी सहायता हमारे लिए अमूल्य है। आपने आज किसी के जीवन में उम्मीद की लौ जलाई है।
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonateMoney;