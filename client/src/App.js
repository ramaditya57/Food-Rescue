import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import DonateFood from './components/pages/DonateFood';
import RecentDonations from './components/pages/RecentDonations';
import MyDonations from './components/pages/MyDonations';
import UserDonations from './components/pages/UserDonations';
import AvailableDonations from './components/pages/AvailableDonations';
import DonorDashboard from './components/pages/DonorDashboard';
import VolunteerDashboard from './components/pages/VolunteerDashboard';
import ShelterDashboard from './components/pages/ShelterDashboard';
import RequestPickup from './components/pages/RequestPickup';
import Navbar from './components/Navbar';
import WhatWeDo from './components/pages/WhatWeDo';
import GetInvolved from './components/pages/GetInvolved';
import AdminDashboard from './components/pages/AdminDashboard'; // ✅ NEW IMPORT
import DonateMoney from './components/pages/DonateMoney';
import Footer from './components/pages/Footer';

import React from 'react';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donate-food" element={<DonateFood />} />
        <Route path="/recent-donations" element={<RecentDonations />} />
        <Route path="/my-donations" element={<MyDonations />} />
        <Route path="/dashboard/my-donations" element={<UserDonations />} />
        <Route path="/available-donations" element={<AvailableDonations />} />
        <Route path="/dashboard/donor" element={<DonorDashboard />} />
        <Route path="/dashboard/volunteer" element={<VolunteerDashboard />} />
        <Route path="/dashboard/shelter" element={<ShelterDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} /> {/* ✅ NEW ADMIN ROUTE */}
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/request-pickup" element={<RequestPickup />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/donate-money" element={<DonateMoney />} />
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;