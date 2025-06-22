import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white text-center py-4">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} FoodRescue. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;