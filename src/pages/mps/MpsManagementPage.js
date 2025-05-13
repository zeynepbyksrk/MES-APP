import React, { useState } from "react";
import MpsOperationsPage from "./MpsOperationsPage";     
import MpsUsersPage from "./MpsUsersPage";                 
import MpsWorkstationsPage from "./MpsWorkstationsPage";
import MpsWorkordersPage from "./MpsWorkordersPage";

const MpsManagementPage = () => {
  const [activeTab, setActiveTab] = useState("operations");

  const tabs = [
    { id: "operations", label: "Operations" },
    { id: "users", label: "Users" },
    { id: "workstations", label: "Workstations" },
    { id: "workorders", label: "Workorders" },
  ];

  return (
    <div className="p-6 max-w-screen-xl mx-auto font-sans">
      <h2 className="text-3xl font-bold mb-6">🧩 MPS Management</h2>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded font-medium text-sm ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "operations" && <MpsOperationsPage />}         {/* ✅ */}
      {activeTab === "users" && <MpsUsersPage />}
      {activeTab === "workstations" && <MpsWorkstationsPage />}
      {activeTab === "workorders" && <MpsWorkordersPage />}
    </div>
  );
};

export default MpsManagementPage;
