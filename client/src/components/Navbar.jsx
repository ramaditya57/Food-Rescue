import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // Clear localStorage + context
    navigate('/');      // Redirect to homepage
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 px-6 py-3 flex justify-between items-center bg-transparent">
      {/* Left: Logo (click to go home) */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src="/logo6.png" alt="Logo" className="w-20 h-20 rounded-full" />
      </div>

      {/* Right: Navigation */}
      <div className="flex flex-wrap gap-3 items-center text-sm font-semibold">
        <NavItem to="/" label="Home" />

        {user?.role === "donor" && (
          <>
            <NavItem to="/donate-food" label="Donate Food" />
            <NavItem to="/my-donations" label="My Donations" />
            <NavItem to="/dashboard/donor" label="Dashboard" />
            <NavItem to="/donate-money" label="Donate Money" />
          </>
        )}

        {user?.role === "volunteer" && (
          <>
            <NavItem to="/available-donations" label="Available Donations" />
            <NavItem to="/volunteer-dashboard" label="Dashboard" />
            <NavItem to="/donate-money" label="Donate Money" />
          </>
        )}

        {user?.role === "shelter" && (
          <NavItem to="/dashboard/shelter" label="Dashboard" />
        )}

        {/* Public Pages */}
        <NavItem to="/what-we-do" label="What We Do" />
        <NavItem to="/get-involved" label="Get Involved" />

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-white text-black px-4 py-1.5 rounded-full hover:bg-gray-200 transition font-bold"
          >
            Logout
          </button>
        ) : (
          <>
            <NavItem to="/login" label="Login" />
            <NavItem to="/register" label="Register" />
          </>
        )}
      </div>
    </nav>
  );
};

// ✅ Reusable NavItem Component
const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className="bg-white text-black px-4 py-1.5 rounded-full hover:bg-gray-200 transition font-bold"
  >
    {label}
  </NavLink>
);

export default Navbar;