import React, { useEffect, useState } from "react";
import { FaPause, FaCheck } from "react-icons/fa";

const OperatorScadaPage = () => {
  const [scodeGroups, setScodeGroups] = useState({});
  const [selectedScode, setSelectedScode] = useState("");
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedNewWorkorder, setSelectedNewWorkorder] = useState("");
  const [runningWorkorders, setRunningWorkorders] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
   
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
      "PRODUCTION": [
        { id: 8, description: "PRODUCTION" }
      ]
    });

   
    setRunningWorkorders([
      { workorderId: 1063 },
      { workorderId: 1214 },
      { workorderId: 2120 }
    ]);

    
    setSummary({
      planned: 200,
      taktTime: 10,
      produced: 120,
      scrap: 8,
      cycleTime: 9.5,
      oee: 80,
      performance: 80,
      quality: 80,
      availability: 70,
    });

    setSelectedScode("MATERIAL AND EQUIPMENT PREPARATION");
  }, []);

  const handleChangeEvent = () => {
    if (!reason.trim()) {
      alert("Please enter a reason.");
      return;
    }
    alert(`Event changed to "${selectedScode}" with reason: "${reason}"`);
  };

  const handleSuspendWorkorder = () => {
    setShowModal(true);
  };

  const handleStartNewWorkorder = () => {
    if (!selectedNewWorkorder || !selectedScode) {
      alert("Please select workorder and SCODE.");
      return;
    }
    alert(`Started workorder #${selectedNewWorkorder} with SCODE "${selectedScode}"`);
    setShowModal(false);
  };

  const handleFinishWorkorder = () => {
    alert("Workorder finished!");
  };

  return (
    <div className="p-6 font-sans grid grid-cols-12 gap-6">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-[90%] md:w-[500px]">
            <h2 className="text-xl font-bold mb-4">Suspend Current Workorder</h2>
            <label className="block text-sm font-medium mb-1">New Workorder</label>
            <select
              value={selectedNewWorkorder}
              onChange={(e) => setSelectedNewWorkorder(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            >
              <option value="">Select a workorder</option>
              {runningWorkorders.map(({ workorderId }) => (
                <option key={workorderId} value={workorderId}>
                  #{workorderId}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium mb-1">Starting Event</label>
            <select
              value={selectedScode}
              onChange={(e) => setSelectedScode(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            >
              {Object.entries(scodeGroups).map(([group, items]) => (
                <optgroup key={group} label={group}>
                  {items.map((item) => (
                    <option key={item.id} value={item.description}>
                      {item.description}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            <div className="flex justify-end space-x-3 mt-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={handleStartNewWorkorder} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Start Workorder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sol Panel - Event değiştirme */}
      <div className="col-span-3 bg-white p-6 rounded shadow space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2">🔧 Change Event</h3>
        <label className="text-sm font-medium">Event Type</label>
        <select
          value={selectedScode}
          onChange={(e) => setSelectedScode(e.target.value)}
          className="w-full border p-2 rounded"
        >
          {Object.entries(scodeGroups).map(([group, items]) => (
            <optgroup key={group} label={group}>
              {items.map((item) => (
                <option key={item.id} value={item.description}>
                  {item.description}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <label className="text-sm font-medium">Reason</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          placeholder="Enter reason for the event change..."
          className="w-full border p-2 rounded"
        />

        <button onClick={handleChangeEvent} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Change Event
        </button>
      </div>

      {/* Sağ Panel - SCADA Metriği */}
      <div className="col-span-9 space-y-6">
        {/* Üst Butonlar */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleSuspendWorkorder}
            className="flex items-center gap-2 border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50"
          >
            <FaPause /> Suspend Workorder
          </button>
          <button
            onClick={handleFinishWorkorder}
            className="flex items-center gap-2 border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50"
          >
            <FaCheck /> Finish Workorder
          </button>
        </div>

        {/* Süre metrikleri */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Total", "Startup Downtime", "Planned Downtime", "Unplanned Downtime", "Net Available", "Net Operation"].map((label, i) => (
            <div key={i} className="bg-gray-900 text-white text-center rounded p-4">
              <h4 className="text-sm font-medium">⏱ {label.toUpperCase()}</h4>
              <p className="text-xl font-bold mt-1">0h 0m 0s</p>
            </div>
          ))}
        </div>

        {/* Üretim metrikleri */}
        <div>
          <h4 className="font-semibold mb-2">Production Metrics</h4>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-black h-2.5 rounded-full" style={{ width: `${(summary.produced / summary.planned) * 100}%` }}></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <MetricBox label="Planned Quantity" value={summary.planned} />
            <MetricBox label="Takt Time" value={`${summary.taktTime} s`} />
            <MetricBox label="Produced" value={summary.produced} />
            <MetricBox label="Scrap" value={summary.scrap} />
            <MetricBox label="Cycle Time" value={`${summary.cycleTime} s`} />
          </div>
        </div>

        {/* Performans göstergeleri */}
        <div>
          <h4 className="font-semibold mb-2">Performance Indicators</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Availability", value: summary.availability, color: "bg-yellow-500" },
              { label: "Performance", value: summary.performance, color: "bg-blue-500" },
              { label: "Quality", value: summary.quality, color: "bg-green-500" },
              { label: "OEE", value: summary.oee, color: "bg-red-500" },
            ].map((item, i) => (
              <div key={i} className={`${item.color} text-white text-center rounded p-4`}>
                <h4 className="text-sm font-semibold">{item.label}</h4>
                <p className="text-2xl font-bold">{item.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const MetricBox = ({ label, value }) => (
  <div className="bg-white rounded p-4 shadow">
    <h4 className="text-sm font-semibold text-gray-500">{label}</h4>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default OperatorScadaPage;
