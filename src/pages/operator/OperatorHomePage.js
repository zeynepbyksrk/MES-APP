import React, { useEffect, useState } from "react";

const MetricCard = ({ label, value }) => (
  <div className="bg-gray-50 rounded-md border px-3 py-4">
    <div className="text-xs text-gray-500 mb-1">{label}</div>
    <div className="text-lg font-bold text-blue-900">
      {value !== null && value !== undefined ? value.toFixed(1) : "—"}
    </div>
  </div>
);

const OperatorHomePage = () => {
  const [workstations, setWorkstations] = useState([]);

  useEffect(() => {
    
    const mockWorkstations = [
      {
        workstationName: "Assembly Line A",
        serialNumber: "SN-001",
        activeWorkorderId: 1001,
        activeScode: 42,
        oee: 88.4,
        quality: 93.2,
        performance: 85.6,
        availability: 87.9,
      },
      {
        workstationName: "Assembly Line B",
        serialNumber: "SN-002",
        activeWorkorderId: null,
        activeScode: null,
        oee: null,
        quality: null,
        performance: null,
        availability: null,
      },
      {
        workstationName: "Packaging Unit",
        serialNumber: "SN-003",
        activeWorkorderId: 1005,
        activeScode: 33,
        oee: 78.9,
        quality: 89.5,
        performance: 81.2,
        availability: 75.3,
      },
    ];

    setWorkstations(mockWorkstations);
  }, []);

  const getStatusDot = (oee) => {
    if (oee >= 85) return "bg-green-500";
    if (oee >= 70) return "bg-yellow-400";
    if (oee !== null) return "bg-red-400";
    return "bg-gray-300";
  };

  const getStatusLabel = (active) =>
    active ? (
      <span className="bg-green-100 text-green-800 px-3 py-1 text-xs rounded-full">Active</span>
    ) : (
      <span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs rounded-full">Passive</span>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4">
      {workstations.map((ws, idx) => (
        <div
          key={idx}
          className={`bg-white rounded-lg shadow-md border p-6 relative hover:shadow-xl transition-transform duration-200 hover:-translate-y-1 ${
            !ws.activeWorkorderId ? "opacity-70" : ""
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${getStatusDot(ws.oee)}`}></span>
              <h2 className="text-xl font-semibold text-gray-800">{ws.workstationName}</h2>
            </div>
            {getStatusLabel(!!ws.activeWorkorderId)}
          </div>

          <div className="text-sm text-gray-600 space-y-1 mb-4">
            <p>
              <span className="font-medium text-gray-800">Serial No:</span> {ws.serialNumber}
            </p>
            <p>
              <span className="font-medium text-gray-800">Active Workorder:</span>{" "}
              {ws.activeWorkorderId ?? "No active workorder"}
            </p>
            <p>
              <span className="font-medium text-gray-800">SCODE:</span>{" "}
              {ws.activeScode ?? "—"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <MetricCard label="OEE" value={ws.oee} />
            <MetricCard label="Quality" value={ws.quality} />
            <MetricCard label="Performance" value={ws.performance} />
            <MetricCard label="Availability" value={ws.availability} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OperatorHomePage;
