import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OperatorWorkorderPage = () => {
  const [workorders, setWorkorders] = useState([]);
  const [selectedWorkorder, setSelectedWorkorder] = useState(null);
  const [scodeGroups, setScodeGroups] = useState({});
  const [selectedScode, setSelectedScode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  
    setWorkorders([
      { workorderId: 1001, isActive: true, currentScodeValue: 42 },
      { workorderId: 1002, isActive: false, currentScodeValue: 10 },
      { workorderId: 1003, isActive: false, currentScodeValue: 33 },
    ]);

    setScodeGroups({
      "STARTUP DOWNTIME": [
        { id: 1, description: "MATERIAL AND EQUIPMENT PREPARATION" },
        { id: 2, description: "SETUP" },
      ],
      "PLANNED DOWNTIME": [
        { id: 3, description: "MAINTENANCE" },
        { id: 4, description: "MEAL BREAK" },
        { id: 5, description: "EDUCATION" },
      ],
      "UNPLANNED DOWNTIME": [
        { id: 6, description: "MACHINE FAILURE" },
        { id: 7, description: "LACK OF STAFF" },
      ],
    });

    
    setSelectedScode("MATERIAL AND EQUIPMENT PREPARATION");
  }, []);

  const handleStartWorkorder = () => {
    if (!selectedWorkorder || !selectedScode) {
      alert("Please select a workorder and SCODE.");
      return;
    }

    navigate(`/operator/workorders/${selectedWorkorder.workorderId}`);
  };

  return (
    <div className="p-6 md:flex gap-6 font-sans">
      {/* İş Emri Listesi */}
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold mb-2">Workorders</h2>
        {workorders.map((wo) => (
          <div
            key={wo.workorderId}
            onClick={() => setSelectedWorkorder(wo)}
            className={`cursor-pointer rounded border px-4 py-3 shadow-sm hover:shadow-md transition flex justify-between items-center ${
              selectedWorkorder?.workorderId === wo.workorderId
                ? "bg-blue-50 border-blue-400"
                : "bg-white border-gray-200"
            }`}
          >
            <div>
              <div className="text-lg font-semibold text-gray-800">#{wo.workorderId}</div>
              <div className="text-sm text-gray-600">SCODE: {wo.currentScodeValue}</div>
            </div>
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                wo.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              {wo.isActive ? "Active" : "Passive"}
            </span>
          </div>
        ))}
      </div>

      {/* Başlatma Paneli */}
      <div className="md:w-1/2 bg-white rounded border shadow p-6 mt-6 md:mt-0">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Start Selected Workorder</h3>

        {!selectedWorkorder ? (
          <p className="text-gray-500">📄 Please select a workorder from the left panel to begin.</p>
        ) : (
          <>
            <div className="mb-4">
              <label className="block font-medium text-sm text-gray-700 mb-1">
                Starting Event (SCODE)
              </label>
              <select
                value={selectedScode}
                onChange={(e) => setSelectedScode(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {Object.entries(scodeGroups).map(([category, items]) => (
                  <optgroup key={category} label={category}>
                    {items.map((item) => (
                      <option key={item.id} value={item.description}>
                        {item.description}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="text-right">
              <button
                onClick={handleStartWorkorder}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Start Workorder
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OperatorWorkorderPage;
