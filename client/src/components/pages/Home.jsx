import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [showModal, setShowModal] = useState(true);

  // Optional: show only once per session
  useEffect(() => {
    const seen = sessionStorage.getItem('seenIntro');
    if (seen) setShowModal(false);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    sessionStorage.setItem('seenIntro', 'true');
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 relative">
      {/* 🌟 Intro Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative text-center">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-green-700 mb-4">Welcome to FoodRescue!</h2>
            <p className="text-gray-700 mb-3">
              “<span className="italic">Har thali bhar jaaye, har pet muskaraaye.</span>” <br />
              Together, we've served over <span className="text-green-700 font-semibold">12,000+</span> meals so far!
            </p>
            <p className="text-gray-600 text-sm mb-3">
              Built with ❤️ by <span className="text-green-800 font-bold">Ramaditya Chaudhary</span> — a passionate developer
              driven to make a real difference in society.
            </p>
            <p className="text-sm text-gray-600 italic">
              “Main badlaav lana chahta hoon. Apne code se, apni soch se — ek behtar kal ke liye.”
              <br />
              For a better experience, please open this website on a desktop or laptop.
            </p>
          </div>
        </div>
      )}

      {/* 🍽️ Hero Section */}
      <div
        className="h-[100vh] bg-cover bg-center flex flex-col justify-center items-center px-4 text-white"
        style={{ backgroundImage: `url('/poster.webp')` }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center drop-shadow-lg">
          Rescue Food. Restore Lives.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-center drop-shadow-sm">
          Help end hunger by donating or redistributing surplus food — every meal counts.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link to="/register">
            <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-100 transition">
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-green-700 text-white border border-green-800 px-6 py-3 rounded-lg hover:bg-green-800 transition">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* 🌿 Mission Section */}
      <section className="px-6 py-20 bg-white flex flex-col items-center text-center">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6 leading-snug">
            When we share food, we share hope.
          </h2>
          <p className="text-lg md:text-xl mb-6 text-gray-700">
            Every day, surplus meals go to waste while many go to sleep hungry. At <span className="font-semibold text-green-700">FoodRescue</span>, we turn this waste into <em>daan</em> — food donations that bring dignity to the <em>zaruratmand</em>.
          </p>
          <p className="text-base md:text-lg mb-4 text-gray-600">
            Whether you're a restaurant, event host, or caring individual — your small act of sharing can create a big change.
          </p>
          <p className="text-base md:text-lg text-gray-600">
            It's not just about food — it's about <em>sneh</em> (compassion), respect, and second chances.
          </p>

          <Link to="/about">
            <button className="mt-8 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition">
              Learn More About Us
            </button>
          </Link>
        </div>
      </section>

      {/* 💚 5 Ways to Support Section */}
      <section className="px-6 py-20 bg-green-50 space-y-16">

        {/* 1. Donate Surplus Food */}
        <SupportCard
          img="/poster1.webp"
          title="Donate Surplus Food"
          description="Have leftover food at your restaurant, wedding, or event? Share it before it goes to waste and bring smiles to the hungry. Your one act of *daan* can change someone’s entire day."
        />

        {/* 2. Volunteer for Pickups */}
        <SupportCard
          img="/poster5.webp"
          title="Volunteer for Pickups"
          description="Join our network of kind-hearted volunteers who collect and deliver food to those who need it the most. A few minutes of your time can feed a family."
          reverse
        />

        {/* 3. Spread Awareness */}
        <SupportCard
          img="/poster2.webp"
          title="Spread Awareness"
          description="Talk about food waste and how we can prevent it together. Share your support on social media, at your workplace, or within your community — awareness is the first step toward impact."
        />

        {/* 4. Support Local Shelters */}
        <SupportCard
          img="/poster3.webp"
          title="Support Local Shelters"
          description="Partner with or donate essentials to nearby shelters and NGOs who work with us. Together, we build a chain of care and nourishment."
          reverse
        />

        {/* 5. Be a FoodRescue Ambassador */}
        <SupportCard
          img="/poster4.webp"
          title="Be a FoodRescue Ambassador"
          description="Become the voice of this movement in your city or college. Organize drives, workshops, and food collections — because leadership begins with kindness."
        />

      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-green-100 via-green-50 to-green-200 text-center rounded-t-3xl shadow-inner">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6 leading-snug">
            Let’s Build a Hunger-Free Tomorrow 🌍
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            A small plate, a little effort, a kind gesture — that’s all it takes.  
            Be a part of the <em>badlaav</em> (change) that feeds not just stomachs, but also souls.
          </p>

          <Link to="/register">
            <button className="bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-800 transition-all shadow-lg hover:shadow-xl">
              Join the Movement
            </button>
          </Link>

          <p className="mt-6 text-sm text-gray-600">
            Already a member? <Link to="/login" className="text-green-700 underline hover:text-green-900">Login here</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

// 🔁 Reusable SupportCard component
const SupportCard = ({ img, title, description, reverse }) => (
  <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center gap-10`}>
    <img
      src={img}
      alt={title}
      className="w-full md:w-1/2 rounded-xl shadow-md transform transition duration-300 hover:scale-105 hover:brightness-90"
    />
    <div className="md:w-1/2 text-center md:text-left">
      <h3 className="text-3xl font-bold text-green-800 mb-4">{title}</h3>
      <p className="text-gray-700 text-lg">{description}</p>
    </div>
  </div>
);

export default Home;