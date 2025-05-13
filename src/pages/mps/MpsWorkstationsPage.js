import React, { useState, useEffect } from "react";

const MpsWorkstationsPage = () => {
  const [workstations, setWorkstations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTargetId, setEditTargetId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setWorkstations([
      { id: 1, name: "WS-TUR-PRD01", sensorSerial: "MZ800123" },
      { id: 2, name: "WS-TUR-CR020", sensorSerial: "MZ800456" },
    ]);
  }, []);

  const handleAdd = () => {
    setFormData({});
    setEditMode(false);
    setEditTargetId(null);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditMode(true);
    setEditTargetId(item.id);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setWorkstations((prev) => prev.filter((ws) => ws.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setWorkstations((prev) =>
        prev.map((ws) =>
          ws.id === editTargetId ? { ...ws, ...formData } : ws
        )
      );
    } else {
      setWorkstations((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: formData.name || "Unnamed",
          sensorSerial: formData.sensorSerial || "N/A",
        },
      ]);
    }
    setModalOpen(false);
    setFormData({});
    setEditMode(false);
  };

  return (
    <div className="p-6 max-w-screen-md mx-auto font-sans">
      <h2 className="text-3xl font-bold mb-6">🏭 Workstations</h2>

      {/* Add Button */}
      <div className="mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Workstation
        </button>
      </div>

      {/* Table */}
      <table className="w-full border text-sm bg-white shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border text-left">Name</th>
            <th className="p-2 border text-left">Sensor Serial</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workstations.map((ws) => (
            <tr key={ws.id} className="hover:bg-gray-50 transition">
              <td className="p-2 border">{ws.name}</td>
              <td className="p-2 border">{ws.sensorSerial}</td>
              <td className="p-2 border text-center space-x-2">
                <button
                  onClick={() => handleEdit(ws)}
                  className="text-blue-600"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(ws.id)}
                  className="text-red-600"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold">
              {editMode ? "Edit Workstation" : "Add Workstation"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Workstation Name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border rounded w-full p-2"
                required
              />
              <input
                type="text"
                placeholder="Sensor Serial Number"
                value={formData.sensorSerial || ""}
                onChange={(e) =>
                  setFormData({ ...formData, sensorSerial: e.target.value })
                }
                className="border rounded w-full p-2"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MpsWorkstationsPage;
