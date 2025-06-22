import React from "react";
import { Link } from "react-router-dom";

const GetInvolved = () => {
  return (
    <div className="min-h-screen bg-green-50 text-gray-800 px-6 py-12 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        

        {/* Intro Paragraph */}
        <p className=" mt-28 text-lg md:text-xl text-center mb-20 font-semibold text-green-700  leading-relaxed">
          हर किसी के पास समाज में बदलाव लाने की शक्ति होती है। हम सभी किसी न किसी रूप में इस मिशन में योगदान दे सकते हैं। 
          Whether you are a restaurant owner, a student, a working professional, or someone who cares — <span className="font-semibold text-green-700">FoodRescue</span> is your platform to make a real impact. 
          आइए जानें कि आप कैसे हमारे साथ जुड़ सकते हैं।
        </p>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Donor */}
          <div className="bg-white shadow-lg p-6 rounded-lg text-center hover:shadow-xl transition">
            <img src="/1.webp" alt="Donor" className="h-16 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-700 mb-2">Become a Donor</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              आपके द्वारा बचाया गया भोजन किसी के लिए जीवनदायी हो सकता है। Individuals, restaurants, or events can donate extra food.
              Just register, submit a donation, and our volunteers will handle the rest.
            </p>
            <Link
              to="/register"
              className="inline-block bg-green-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-800 transition"
            >
              Register as Donor
            </Link>
          </div>

          {/* Volunteer */}
          <div className="bg-white shadow-lg p-6 rounded-lg text-center hover:shadow-xl transition">
            <img src="/2.webp" alt="Volunteer" className="h-16 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-700 mb-2">Volunteer with Us</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              अगर आपके पास समय और सेवा का भाव है, तो आप हमारे साथ मिलकर भोजन को shelters तक पहुँचा सकते हैं। 
              You’ll receive pickup alerts and become a hero in someone’s day.
            </p>
            <Link
              to="/register"
              className="inline-block bg-green-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-800 transition"
            >
              Join as Volunteer
            </Link>
          </div>

          {/* Shelter */}
          <div className="bg-white shadow-lg p-6 rounded-lg text-center hover:shadow-xl transition">
            <img src="/3.webp" alt="Shelter" className="h-16 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-700 mb-2">Shelters & Homes</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              यदि आप किसी अनाथालय, वृद्धाश्रम, या shelter से जुड़े हैं, तो हम आपके लिए भोजन की आपूर्ति सुनिश्चित करते हैं। 
              Register and begin receiving nutritious food delivered by our trusted volunteers.
            </p>
            <Link
              to="/register"
              className="inline-block bg-green-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-800 transition"
            >
              Register Your Shelter
            </Link>
          </div>
        </div>

        {/* Community Message */}
        <div className="bg-white rounded-xl shadow-md px-8 py-10 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4 text-center">
            We All Can Make a Difference
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            किसी भी बदलाव की शुरुआत एक कदम से होती है। जब हम भोजन का सम्मान करते हैं, तो हम इंसानियत का भी सम्मान करते हैं।
            Your contribution — big or small — builds a world where no one sleeps hungry.
            Our model depends on compassionate people like you stepping forward with food, time, or resources.
            Together, we are building a community where kindness is a habit.
          </p>
        </div>

        {/* Scroll Down Extension - More Engagement */}
<div className="mt-20 bg-white p-10 rounded-xl shadow-lg">
  <h2 className="text-2xl md:text-3xl font-bold text-green-800 text-center mb-8">
    Your One Step Can Feed Many
  </h2>

  {/* Steps to Get Involved */}
  <div className="grid md:grid-cols-3 gap-8 mb-12">
    <div className="text-center">
      <img src="/ok3.webp" alt="Sign Up" className="h-20 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-green-700 mb-2">1. Sign Up</h3>
      <p className="text-gray-600">
        Register as a donor, volunteer, or shelter. It takes less than 2 minutes.
      </p>
    </div>
    <div className="text-center">
      <img src="/ok1.webp" alt="Connect" className="h-20 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-green-700 mb-2">2. Get Connected</h3>
      <p className="text-gray-600">
        Once registered, you'll start receiving opportunities and matches instantly.
      </p>
    </div>
    <div className="text-center">
      <img src="/ok2.webp" alt="Impact" className="h-20 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-green-700 mb-2">3. Make an Impact</h3>
      <p className="text-gray-600">
        Your donation or effort helps feed a real person. Every act matters.
      </p>
    </div>
  </div>

  {/* Testimonial Section */}
  <div className="mt-16">
    <h2 className="text-2xl font-bold text-green-800 text-center mb-6">
      सुनिए उन्हीं की ज़ुबानी जिन्हें आपने मदद की
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-green-50 p-6 rounded-lg shadow-md">
        <p className="italic text-gray-700">
          “हमारे वृद्धाश्रम में कई बार भोजन की कमी हो जाती थी। अब जब से हमने FoodRescue से जुड़ना शुरू किया है, हमारे बुज़ुर्गों को समय पर खाना मिलता है।”
        </p>
        <p className="mt-4 font-bold text-green-700">– शुभा मैडम, वृंदावन वृद्धाश्रम</p>
      </div>
      <div className="bg-green-50 p-6 rounded-lg shadow-md">
        <p className="italic text-gray-700">
          “मैं एक छात्र हूँ और पार्ट टाइम वॉलंटियर करता हूँ। किसी को खाना पहुँचाने के बाद जो मुस्कान दिखती है, वो मेरे दिन की सबसे बड़ी खुशी बन जाती है।”
        </p>
        <p className="mt-4 font-bold text-green-700">– रोहित शर्मा, वॉलंटियर</p>
      </div>
    </div>
  </div>

  {/* Final Push Message */}
  <div className="mt-16 text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
      जब हर हाथ जुड़ेगा, कोई भूखा नहीं रहेगा।
    </h2>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
      हमारा सपना एक ऐसे भारत का है जहाँ खाना ज़रूरतमंदों तक पहुँचे और कोई भी रात भूखे पेट न गुज़ारे। 
      आप इस सपने को हकीकत में बदलने में हमारी सबसे बड़ी ताकत हैं।
    </p>
    <Link
      to="/register"
      className="inline-block bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition"
    >
      Be a Part of the Movement
    </Link>
  </div>
</div>
      </div>
    </div>
  );
};

export default GetInvolved;