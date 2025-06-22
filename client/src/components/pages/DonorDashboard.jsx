import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <>
      {/* Hero Banner with Poster */}
      <div
        className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/donor1.webp')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-snug mb-6 max-w-4xl">
            Thank you for being part of the <span className="text-green-300">FoodRescue</span> family.
          </h1>
          <p className="text-white text-lg md:text-xl max-w-3xl leading-relaxed">
            Your contributions make a real difference in the lives of the hungry and homeless.
            The food you share becomes someone's lifeline. Every action matters. Every donation counts.
            Together, we bring change.
          </p>
        </div>
      </div>

      {/* Donor Information Section */}
      <div className="bg-green-50 py-20 px-6 md:px-20 text-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 text-center mb-12">
            Your Role as a Donor: बदलाव की शुरुआत
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img
                src="/donor2.webp"
                alt="Donor Process"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">Why Every Meal Matters</h3>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Donating food isn’t just about leftovers — it’s about saving lives, building community,
                and restoring hope. <span className="font-semibold text-green-800">हर एक थाली किसी की भूख मिटा सकती है।</span>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Easy-to-fill donation form, ready in seconds</li>
                <li>Verified volunteers coordinate timely pickups</li>
                <li>Shelters confirm receipt with updates to you</li>
                <li>Real-time tracking and notifications</li>
              </ul>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white p-10 rounded-xl shadow-lg mb-20">
            <h3 className="text-3xl font-bold text-green-700 mb-6 text-center">Impact You Make</h3>
            <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-10 leading-relaxed">
              With every donation, you’re not just reducing food waste — you’re fighting hunger head-on.
              <span className="text-green-700 font-semibold"> आप बदलाव का हिस्सा हैं।</span> These numbers are a reflection of your generosity.
            </p>

            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div>
                <h4 className="text-3xl font-bold text-green-800">1,20,000+</h4>
                <p className="text-gray-600">Meals Donated</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-green-800">6,500+</h4>
                <p className="text-gray-600">Families Served</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-green-800">2,000+</h4>
                <p className="text-gray-600">Volunteers Supporting</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-green-800 mb-4">साथ मिलकर भूख मिटाएँ</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              Whether you’re a restaurant, event host, or household with extra food — your action can fill a stomach.
              आइए, इस यात्रा का हिस्सा बनें। Change begins with a single plate shared.
            </p>
            <Link
              to="/donate-food"
              className="inline-block bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-800 transition"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;