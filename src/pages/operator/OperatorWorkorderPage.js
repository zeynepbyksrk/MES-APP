
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OperatorWorkorderPage = () => {
  const [workorders, setWorkorders] = useState([]);
  const [selectedWorkorder, setSelectedWorkorder] = useState(null);
  const [scodeGroups, setScodeGroups] = useState({});
  const [selectedScode, setSelectedScode] = useState(10); 
  const [operatorId, setOperatorId] = useState(1); 
  const navigate = useNavigate();

  const workstationId = localStorage.getItem("workstationId");

  useEffect(() => {
    if (!workstationId) return;

    const fetchWorkorders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5031/api/workstations/${workstationId}/workorders`
        );
        setWorkorders(res.data);
      } catch (err) {
        console.error("Failed to load workorders:", err);
      }
    };

    const predefinedScodes = {
      "STARTUP DOWNTIME": [
        { id: 10, description: "STARTUP" }
      ],
      "PLANNED DOWNTIME": [
        { id: 21, description: "MAINTENANCE" },
        { id: 22, description: "MEAL BREAK" }
      ],
      "UNPLANNED DOWNTIME": [
        { id: 31, description: "MACHINE FAILURE" },
        { id: 32, description: "LACK OF STAFF" }
      ],
      PRODUCTION: [
        { id: 33, description: "PRODUCTION" }
      ]
    };

    setScodeGroups(predefinedScodes);
    setSelectedScode(10);
    fetchWorkorders();
  }, [workstationId]);

  const handleStartWorkorder = async () => {
    if (!selectedWorkorder || !selectedScode) {
      alert("Please select a workorder and SCODE.");
      return;
    }

    try {
      const payload = {
        workstationId: parseInt(workstationId),
        workorderId: selectedWorkorder.workorderId,
        initialScode: selectedScode,
        operatorId: operatorId,
        reason: "Started manually from UI"
      };

      await axios.post(
        `http://localhost:5031/api/operator/${workstationId}/activate-workorder`,
        payload
      );

      navigate(`/operator/workorders/${selectedWorkorder.workorderId}`);
    } catch (error) {
      console.error("Failed to start workorder:", error);
      alert("Failed to start workorder.");
    }
  };

  return (
    <div className="p-6 md:flex gap-6 font-sans">
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

      <div className="md:w-1/2 bg-white rounded border shadow p-6 mt-6 md:mt-0">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Start Selected Workorder</h3>

        {!selectedWorkorder ? (
          <p className="text-gray-500">
            📄 Please select a workorder from the left panel to begin.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <label className="block font-medium text-sm text-gray-700 mb-1">
                Starting Event (SCODE)
              </label>
              <select
                value={selectedScode}
                onChange={(e) => setSelectedScode(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {Object.entries(scodeGroups).map(([category, items]) => (
                  <optgroup key={category} label={category}>
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
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
