import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4"];

const ManagerHomePage = () => {
  const [summary, setSummary] = useState({});
  const [performanceTrend, setPerformanceTrend] = useState([]);
  const [scodeDist, setScodeDist] = useState([]);
  const [recentWorkorders, setRecentWorkorders] = useState([]);

  useEffect(() => {
    
    setSummary({
      totalStations: 4,
      activeWorkorders: 3,
      avgOee: 82.3,
      statusCounts: {
        Running: 2,
        Idle: 1,
        Error: 1,
      },
    });

    setPerformanceTrend([
      { day: "01 May", oee: 80 },
      { day: "02 May", oee: 82 },
      { day: "03 May", oee: 79 },
      { day: "04 May", oee: 84 },
      { day: "05 May", oee: 87 },
    ]);

    setScodeDist([
      { name: "Setup", value: 25 },
      { name: "Meal Break", value: 20 },
      { name: "Failure", value: 30 },
      { name: "Material Delay", value: 15 },
      { name: "Education", value: 10 },
    ]);

    setRecentWorkorders([
      { id: 1001, operator: "Ali Yılmaz", qty: 120, oee: 85 },
      { id: 1002, operator: "Elif Demir", qty: 110, oee: 82 },
      { id: 1003, operator: "Mehmet Kaya", qty: 130, oee: 88 },
      { id: 1004, operator: "Ayşe T.", qty: 95, oee: 76 },
      { id: 1005, operator: "Burak T.", qty: 105, oee: 81 },
    ]);
  }, []);

  return (
    <div className="p-6 font-sans max-w-screen-xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold mb-2">📊 Manager Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <DashboardCard icon="🏭" label="Total Stations" value={summary.totalStations} />
        <DashboardCard icon="🧾" label="Active Workorders" value={summary.activeWorkorders} />
        <DashboardCard icon="📈" label="Avg. OEE" value={`${summary.avgOee}%`} />
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-sm text-gray-500 mb-2">⚙️ Running / Idle / Error</h3>
          <div className="flex justify-center gap-2">
            <span className="px-2 py-1 rounded bg-green-100 text-green-800 font-semibold text-sm">
              {summary.statusCounts?.Running}
            </span>
            <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-semibold text-sm">
              {summary.statusCounts?.Idle}
            </span>
            <span className="px-2 py-1 rounded bg-red-100 text-red-800 font-semibold text-sm">
              {summary.statusCounts?.Error}
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-2">📊 OEE Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="oee" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-2">🧩 SCODE Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={scodeDist} dataKey="value" nameKey="name" outerRadius={80} label>
                {scodeDist.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center mt-2 text-xs text-gray-600 gap-3">
            {scodeDist.map((entry, index) => (
              <div key={index} className="flex items-center space-x-1">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-3">📋 Recent Workorders</h3>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Operator</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">OEE</th>
            </tr>
          </thead>
          <tbody>
            {recentWorkorders.map((wo, idx) => (
              <tr
                key={wo.id}
                className={`text-center ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}
              >
                <td className="p-2 border">{wo.id}</td>
                <td className="p-2 border">{wo.operator}</td>
                <td className="p-2 border">{wo.qty}</td>
                <td className="p-2 border">{wo.oee}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, label, value }) => (
  <div className="bg-white shadow rounded-lg p-4 text-center">
    <h3 className="text-sm text-gray-500 mb-1">
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default ManagerHomePage;
