import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // ✅ using centralized api instance

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", formData);
      setMessage("✅ Registered successfully! Redirecting...");
      setUser(res.data.user);
    } catch (err) {
      setMessage("❌ Registration failed. " + (err.response?.data?.message || "Please try again."));
    }
  };

  useEffect(() => {
    if (user) {
      const role = user.role?.toLowerCase();
      if (role === "donor") navigate("/dashboard/donor");
      else if (role === "volunteer") navigate("/dashboard/volunteer");
      else if (role === "shelter") navigate("/dashboard/shelter");
    }
  }, [user, navigate]);

  return (
    <div
      className="flex items-center justify-center min-h-[100vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/register.webp')" }}
    >
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-md mx-4 my-10">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Register for FoodRescue</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="donor">Donor</option>
            <option value="volunteer">Volunteer</option>
            <option value="shelter">Shelter</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition duration-200"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-green-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Register;