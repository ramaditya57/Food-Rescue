import React, { useEffect, useState } from 'react';
import api from '../../api';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

const COLORS = ['#34D399', '#60A5FA', '#FBBF24', '#F87171'];

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [roleFilter, setRoleFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [usersRes, donationsRes] = await Promise.all([
          api.get('/api/admin/users', { headers }),
          api.get('/api/admin/donations', { headers })
        ]);

        setUsers(usersRes.data);
        setDonations(donationsRes.data);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    };

    fetchData();
  }, [refresh]);

  const handleApprove = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await api.patch(`/api/admin/approve-user/${userId}`, {}, { headers });
      setRefresh((prev) => !prev); // Trigger refetch
    } catch (err) {
      console.error('Approval failed:', err);
      alert('Failed to approve user');
    }
  };

  const filteredUsers = roleFilter === 'all' ? users : users.filter((u) => u.role === roleFilter);
  const pendingCount = users.filter(u => !u.isApproved && u.role !== 'admin').length;

  const filteredDonations = donations.filter(d => {
    const created = new Date(d.createdAt);
    const from = dateRange.from ? new Date(dateRange.from) : null;
    const to = dateRange.to ? new Date(dateRange.to) : null;
    return (!from || created >= from) && (!to || created <= to);
  });

  const countByRole = (role) => users.filter((u) => u.role === role).length;

  const roleData = [
    { name: 'Donors', value: countByRole('donor') },
    { name: 'Volunteers', value: countByRole('volunteer') },
    { name: 'Shelters', value: countByRole('shelter') }
  ];

  const statusData = filteredDonations.reduce((acc, donation) => {
    const key = donation.status;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(statusData).map((key) => ({
    name: key,
    value: statusData[key]
  }));

  const completedDeliveries = filteredDonations.filter(d => d.status === 'delivered');
  const avgDeliveryTime = (() => {
    const times = completedDeliveries.map(d => {
      if (!d.deliveredAt || !d.claimedAt) return null;
      return new Date(d.deliveredAt) - new Date(d.claimedAt);
    }).filter(Boolean);
    if (times.length === 0) return 'N/A';
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    return `${Math.round(avg / 60000)} mins`;
  })();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="mt-28 text-3xl font-bold text-green-800 mb-2">📊 Admin Dashboard</h1>
      {pendingCount > 0 && (
        <p className="text-sm text-red-600 mb-4">⚠️ {pendingCount} user(s) pending approval</p>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="all">All Roles</option>
          <option value="donor">Donors</option>
          <option value="volunteer">Volunteers</option>
          <option value="shelter">Shelters</option>
        </select>
        <input
          type="date"
          className="border p-2 rounded w-full md:w-1/3"
          value={dateRange.from}
          onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
        />
        <input
          type="date"
          className="border p-2 rounded w-full md:w-1/3"
          value={dateRange.to}
          onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <Card title="Total Users" value={users.length} />
        <Card title="Donors" value={countByRole('donor')} />
        <Card title="Volunteers" value={countByRole('volunteer')} />
        <Card title="Shelters" value={countByRole('shelter')} />
        <Card title="Total Donations" value={donations.length} />
        <Card title="Completed Deliveries" value={completedDeliveries.length} />
        <Card title="Avg Delivery Time" value={avgDeliveryTime} />
        <Card title="Pending Approvals" value={pendingCount} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">User Roles Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={roleData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">Donation Status Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#34D399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Users Table */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">👥 Filtered Users</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Registered At</th>
                <th className="p-3">Approval</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>
                  <td className="p-3">{new Date(u.createdAt).toLocaleString()}</td>
                  <td className="p-3">
                    {u.role !== 'admin' && !u.isApproved ? (
                      <button
                        className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                        onClick={() => handleApprove(u._id)}
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-green-700 font-semibold">Approved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Donations Table */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">🍱 Filtered Donations</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Donor</th>
                <th className="p-3">Volunteer</th>
                <th className="p-3">Status</th>
                <th className="p-3">Claimed</th>
                <th className="p-3">Delivered</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.slice(0, 10).map((d) => (
                <tr key={d._id} className="border-t">
                  <td className="p-3">{d.title}</td>
                  <td className="p-3">{d.user?.name}</td>
                  <td className="p-3">{d.volunteer?.name || '-'}</td>
                  <td className="p-3 capitalize">{d.status}</td>
                  <td className="p-3">{d.claimedAt ? new Date(d.claimedAt).toLocaleString() : '-'}</td>
                  <td className="p-3">{d.deliveredAt ? new Date(d.deliveredAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Settings */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">⚙️ Admin Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Email</label>
            <input
              type="email"
              value="admin@foodrescue.com"
              readOnly
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Change Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
            <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Update Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-center">
    <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
    <p className="text-xl font-bold text-green-700">{value}</p>
  </div>
);

export default AdminDashboard;