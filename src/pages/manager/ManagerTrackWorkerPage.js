import React, { useEffect, useState } from "react";

const ManagerTrackWorkerPage = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    
    const mockWorkers = [
      { id: 1, name: "Ali Yılmaz", scode: 33, workorderId: 1001, isActive: true },
      { id: 2, name: "Elif Demir", scode: 42, workorderId: 1002, isActive: false },
      { id: 3, name: "Mehmet Kaya", scode: 21, workorderId: 1003, isActive: true },
    ];

    setWorkers(mockWorkers);
  }, []);

  return (
    <div className="p-6 max-w-screen-xl mx-auto font-sans">
      <h2 className="text-3xl font-bold mb-6">👷 Worker Activity Tracking</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white rounded shadow-sm">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="text-left px-4 py-3 border-b border-gray-200">👤 Name</th>
              <th className="text-center px-4 py-3 border-b border-gray-200">⚙️ SCODE</th>
              <th className="text-center px-4 py-3 border-b border-gray-200">📄 Workorder</th>
              <th className="text-center px-4 py-3 border-b border-gray-200">🔄 Status</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker, index) => (
              <tr
                key={worker.id}
                className={`text-sm transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50`}
              >
                <td className="text-left px-4 py-3 border-b border-gray-100 font-medium text-gray-800">
                  {worker.name}
                </td>
                <td className="text-center px-4 py-3 border-b border-gray-100">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {worker.scode}
                  </span>
                </td>
                <td className="text-center px-4 py-3 border-b border-gray-100 font-medium text-gray-700">
                  {worker.workorderId}
                </td>
                <td className="text-center px-4 py-3 border-b border-gray-100">
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                      worker.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {worker.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerTrackWorkerPage;
