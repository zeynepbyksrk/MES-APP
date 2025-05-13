import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const MpsHomePage = () => {
  const [stats, setStats] = useState({});
  const [lowStocks, setLowStocks] = useState([]);
  const [distribution, setDistribution] = useState([]);

  useEffect(() => {

    const mockStats = {
      users: 15,
      stocks: 22,
      workstations: 5,
    };
    const mockLowStocks = [
      { product: "Piston", quantity: 45, threshold: 80 },
      { product: "Gasket", quantity: 30, threshold: 60 },
    ];
    const mockDistribution = [
      { name: "Pieces", value: 500 },
      { name: "Kilograms", value: 300 },
      { name: "Liters", value: 200 },
    ];
    setStats(mockStats);
    setLowStocks(mockLowStocks);
    setDistribution(mockDistribution);
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="p-6 max-w-screen-xl mx-auto font-sans">
      <h2 className="text-3xl font-bold mb-8">📊 MPS Dashboard</h2>

      {/* 🟦 Kartlar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-5 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-blue-700">Users</h3>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>
        <div className="bg-green-100 p-5 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-green-700">Stocks</h3>
          <p className="text-3xl font-bold">{stats.stocks}</p>
        </div>
        <div className="bg-yellow-100 p-5 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-yellow-800">Workstations</h3>
          <p className="text-3xl font-bold">{stats.workstations}</p>
        </div>
      </div>

      {/* 🟥 Low Stocks */}
      <div className="bg-white rounded shadow p-5 mb-8">
        <h4 className="text-xl font-semibold mb-4">⚠️ Low Stock Items</h4>
        {lowStocks.length === 0 ? (
          <p className="text-gray-500">No low stocks found.</p>
        ) : (
          <table className="w-full border text-sm text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Threshold</th>
              </tr>
            </thead>
            <tbody>
              {lowStocks.map((item, i) => (
                <tr key={i}>
                  <td className="p-2 border">{item.product}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">{item.threshold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 🟪 Pie Chart */}
      <div className="bg-white rounded shadow p-5">
        <h4 className="text-xl font-semibold mb-4">📦 Stock Distribution by Unit</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={distribution}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {distribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MpsHomePage;
