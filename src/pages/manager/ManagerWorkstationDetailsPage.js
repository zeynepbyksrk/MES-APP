import React, { useEffect, useState } from "react";
import { FaMicrochip } from "react-icons/fa";

const ManagerWorkstationDetailsPage = () => {
  const [workstations, setWorkstations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [workorders, setWorkorders] = useState([]);

  useEffect(() => {
   
    const mockWorkstations = [
      {
        id: 1,
        name: "WS-TUR-PRD01",
        serialNumber: "SN-001",
        status: "Running",
        activeWorkorderId: 1063,
        sensor1Percent: 70,
        sensor2Percent: 45,
      },
      {
        id: 2,
        name: "WS-TUR-CR020",
        serialNumber: "SN-002",
        status: "Idle",
        activeWorkorderId: null,
        sensor1Percent: 50,
        sensor2Percent: 60,
      },
    ];
    setWorkstations(mockWorkstations);
  }, []);

  useEffect(() => {
    if (!selectedStation) {
      setWorkorders([]);
      return;
    }

    const mockWorkorders = [
      {
        workorderId: 1001,
        operatorName: "Ali Yılmaz",
        startTime: "2024-05-01T08:00:00",
        endTime: "2024-05-01T14:30:00",
        quantity: 120,
        scrap: 5,
      },
      {
        workorderId: 1002,
        operatorName: "Elif Demir",
        startTime: "2024-04-30T09:15:00",
        endTime: "2024-04-30T15:45:00",
        quantity: 110,
        scrap: 3,
      },
    ];

    setWorkorders(mockWorkorders);
  }, [selectedStation]);

  const handleStationClick = (ws) => {
    setSelectedStation((prev) => (prev?.id === ws.id ? null : ws));
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Running: "bg-green-100 text-green-700",
      Idle: "bg-yellow-100 text-yellow-700",
      Error: "bg-red-100 text-red-700",
    };
    return (
      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto font-sans">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaMicrochip className="text-indigo-600" /> Workstation Overview
      </h2>

      {/* Workstation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {workstations.map((ws) => (
          <div
            key={ws.id}
            onClick={() => handleStationClick(ws)}
            className={`cursor-pointer border p-5 rounded-xl transition duration-300 ease-in-out hover:shadow-md ${
              selectedStation?.id === ws.id ? "border-indigo-600 bg-indigo-50" : "bg-white"
            }`}
          >
            <h3 className="font-semibold text-lg mb-1 text-gray-800">{ws.name}</h3>
            <p className="text-sm text-gray-500 mb-1">Serial: {ws.serialNumber}</p>
            <p className="text-sm text-gray-500 mb-1">Status: {getStatusBadge(ws.status)}</p>
            <p className="text-sm text-gray-500 mb-1">
              Active Workorder: {ws.activeWorkorderId ?? "—"}
            </p>
            <div className="mt-4">
              {[1, 2].map((num) => (
                <div className="mb-2" key={num}>
                  <p className="text-xs font-semibold mb-1">Sensor {num}</p>
                  <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ease-in-out ${
                        num === 1 ? "bg-green-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${ws[`sensor${num}Percent`]}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{ws[`sensor${num}Percent`]}%</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Workorder History Table */}
      {selectedStation && (
        <>
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            📘 Workorder History for {selectedStation.name}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border bg-white shadow-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-3 py-2 border">ID</th>
                  <th className="px-3 py-2 border">Operator</th>
                  <th className="px-3 py-2 border">Start</th>
                  <th className="px-3 py-2 border">End</th>
                  <th className="px-3 py-2 border">Qty</th>
                  <th className="px-3 py-2 border">Scrap</th>
                </tr>
              </thead>
              <tbody>
                {workorders.map((w, i) => (
                  <tr key={i} className="text-center hover:bg-blue-50 transition">
                    <td className="px-3 py-2 border">{w.workorderId}</td>
                    <td className="px-3 py-2 border">{w.operatorName}</td>
                    <td className="px-3 py-2 border">{new Date(w.startTime).toLocaleString()}</td>
                    <td className="px-3 py-2 border">{new Date(w.endTime).toLocaleString()}</td>
                    <td className="px-3 py-2 border">{w.quantity}</td>
                    <td className="px-3 py-2 border">{w.scrap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ManagerWorkstationDetailsPage;
