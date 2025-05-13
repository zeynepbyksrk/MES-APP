import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OperatorWorkorderDetailPage = () => {
  const { workorderId } = useParams();
  const navigate = useNavigate();
  const [performanceLogs, setPerformanceLogs] = useState([]);
  const [stateLogs, setStateLogs] = useState([]);

  useEffect(() => {
  
    const mockPerformance = [
      {
        recordedAt: new Date().toISOString(),
        oee: 87.5,
        performance: 89.2,
        quality: 94.1,
        availability: 81.6,
      },
      {
        recordedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        oee: 83.4,
        performance: 86.3,
        quality: 90.7,
        availability: 77.9,
      },
    ];

    
    const mockStates = [
      {
        changedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        oldScodeId: 10,
        newScodeId: 42,
        changedByOperatorId: 1001,
        reason: "Startup: Material and Equipment Preparation",
      },
      {
        changedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        oldScodeId: 42,
        newScodeId: 33,
        changedByOperatorId: 1001,
        reason: "Downtime: Lack of Staff",
      },
    ];

    setPerformanceLogs(mockPerformance);
    setStateLogs(mockStates);
  }, [workorderId]);

  return (
    <div className="p-6 font-sans max-w-screen-xl mx-auto">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded shadow-sm"
        >
          ← Back
        </button>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">Workorder #{workorderId}</h2>

      {/* Performance Logs Table */}
      <section className="mb-10">
        <div className="bg-gray-50 border px-4 py-2 rounded font-semibold text-gray-700 mb-4">
          📊 Performance Logs
        </div>
        {performanceLogs.length === 0 ? (
          <p className="text-gray-500">No performance data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-center">OEE</th>
                  <th className="p-3 text-center">Performance</th>
                  <th className="p-3 text-center">Quality</th>
                  <th className="p-3 text-center">Availability</th>
                </tr>
              </thead>
              <tbody>
                {performanceLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 border-t">
                    <td className="p-2 text-left text-gray-800">
                      {new Date(log.recordedAt).toLocaleString()}
                    </td>
                    <td className="p-2 text-center font-medium">{log.oee.toFixed(1)}%</td>
                    <td className="p-2 text-center font-medium">{log.performance.toFixed(1)}%</td>
                    <td className="p-2 text-center font-medium">{log.quality.toFixed(1)}%</td>
                    <td className="p-2 text-center font-medium">{log.availability.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* SCODE State Logs */}
      <section>
        <div className="bg-gray-50 border px-4 py-2 rounded font-semibold text-gray-700 mb-4">
          📄 SCODE Change History
        </div>
        {stateLogs.length === 0 ? (
          <p className="text-gray-500">No SCODE history found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-center">Old SCODE</th>
                  <th className="p-3 text-center">New SCODE</th>
                  <th className="p-3 text-center">Operator ID</th>
                  <th className="p-3 text-left">Reason</th>
                </tr>
              </thead>
              <tbody>
                {stateLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 border-t">
                    <td className="p-2 text-left text-gray-800">
                      {new Date(log.changedAt).toLocaleString()}
                    </td>
                    <td className="p-2 text-center">{log.oldScodeId}</td>
                    <td className="p-2 text-center">{log.newScodeId}</td>
                    <td className="p-2 text-center">{log.changedByOperatorId}</td>
                    <td className="p-2 text-left truncate max-w-xs" title={log.reason}>
                      {log.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default OperatorWorkorderDetailPage;
