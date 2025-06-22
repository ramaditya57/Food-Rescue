import React from 'react';

const WhatWeDo = () => {
  return (
    <div className="min-h-screen bg-green-50 text-gray-800 px-6 py-12 md:px-20 pt-36"> 
      {/* Added pt-36 to push content down below navbar */}
      <div className="max-w-6xl mx-auto">
        
        {/* Quote Section */}
        <p className="text-xl md:text-2xl italic text-center font-semibold text-green-700 mb-10">
          “हर रात, हजारों लोग भूखे पेट सो जाते हैं। जिनमें अनाथ बच्चे, अकेले बुज़ुर्ग और बेसहारा लोग शामिल हैं।<br />
          हम उनके परिवार हैं, और हमारा कर्तव्य है कि कोई भी भूखा न सोए।”
        </p>

        {/* Duties Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Our Duties</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            As human beings and responsible members of society, it's our duty to ensure that the most vulnerable among us are cared for.
            At <span className="font-bold text-green-700">FoodRescue</span>, we consider ourselves as a family to those in need — the children in orphanages,
            the elderly in shelters who have no family, and the homeless who are often forgotten. Our foremost duty is to make sure that not a single person goes
            to sleep hungry when surplus food is available around us.
          </p>
        </div>

        {/* Focus Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Our Focus</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our focus is on bridging the gap between food excess and food scarcity. We provide a seamless platform for restaurants, events,
            households, and businesses to donate leftover food. Through our network of volunteers, this food is picked up and delivered to shelters,
            orphanages, and elderly homes. We prioritize food safety, timely delivery, and respect for the dignity of every individual we serve.
          </p>
        </div>

        {/* Expectations Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Our Expectations From Society</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe change happens when everyone contributes. We expect society to recognize the privilege of access to food and be mindful of waste.
            Whether it's a home-cooked meal, leftover catering, or untouched supplies — it can save a life. We urge communities to participate,
            raise awareness, and take initiative. A shared sense of responsibility can transform lives.
          </p>
        </div>

        {/* Our Model Section */}
<div className="mt-24 mb-20"> {/* Added margin-top here */}
  <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-10 text-center">
    How FoodRescue Works
  </h2>
  <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
    Our model brings together <span className="text-green-700 font-semibold">Donors</span>, 
    <span className="text-green-700 font-semibold"> Volunteers</span>, and 
    <span className="text-green-700 font-semibold"> Shelters</span> to form a connected network.
    Every step is built on trust, action, and care — ensuring that extra food reaches those who need it the most.
  </p>

  <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
    {/* Donor Block */}
    <div className="bg-white border-2 border-green-200 p-6 rounded-lg shadow-lg text-center w-72 hover:shadow-xl transition">
      <img src="/involved1.webp" alt="Donor" className="h-16 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-green-700 mb-2">Donor</h3>
      <p className="text-gray-600">
        Individuals, restaurants, and events register excess food via the platform from any location.
      </p>
    </div>

    {/* Arrow */}
    <div className="hidden md:block text-4xl text-green-700 font-bold">→</div>

    {/* Volunteer Block */}
    <div className="bg-white border-2 border-green-200 p-6 rounded-lg shadow-lg text-center w-72 hover:shadow-xl transition">
      <img src="/involved.webp" alt="Volunteer" className="h-16 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-green-700 mb-2">Volunteer</h3>
      <p className="text-gray-600">
        Verified volunteers accept pickup requests and safely transport food to shelters.
      </p>
    </div>

    {/* Arrow */}
    <div className="hidden md:block text-4xl text-green-700 font-bold">→</div>

    {/* Shelter Block */}
    <div className="bg-white border-2 border-green-200 p-6 rounded-lg shadow-lg text-center w-72 hover:shadow-xl transition">
      <img src="/involved2.webp" alt="Shelter" className="h-16 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-green-700 mb-2">Shelter</h3>
      <p className="text-gray-600">
        Shelters receive food deliveries, confirm receipt, and ensure it reaches people in need.
      </p>
    </div>
  </div>
</div>
    {/* Hindi Conclusion Section */}
<div className="mt-24 mb-16 text-center px-4">
  <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-6">
    हमारा संकल्प
  </h2>
  <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
    जब किसी भूखे को खाना मिलता है, तो सिर्फ उसकी भूख नहीं मिटती — उसका आत्मसम्मान भी बना रहता है। <br />
    हमारा प्रयास सिर्फ भोजन देना नहीं है, बल्कि एक संदेश देना है कि <span className="text-green-700 font-semibold">"आप अकेले नहीं हैं।"</span> <br />
    अनाथ बच्चों से लेकर बुज़ुर्गों तक, हम सब उनके लिए एक परिवार हैं।
  </p>

  <p className="mt-6 text-xl md:text-2xl italic font-semibold text-green-700">
    “एक थाली खाना किसी के चेहरे पर मुस्कान ला सकती है — चलिए हम मिलकर वो मुस्कान फैलाएं।”
  </p>
</div>
      </div>
    </div>
  );
};

export default WhatWeDo;