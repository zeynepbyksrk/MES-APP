import React, { useState, useEffect } from "react";

const MpsOperationsPage = () => {
  const [operations, setOperations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTargetId, setEditTargetId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
  
    setOperations([
      { id: 1, name: "Assembly" },
      { id: 2, name: "Welding" },
      { id: 3, name: "Painting" },
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
    setOperations((prev) => prev.filter((op) => op.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setOperations((prev) =>
        prev.map((op) =>
          op.id === editTargetId ? { ...op, ...formData } : op
        )
      );
    } else {
      setOperations((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: formData.name || "Unnamed",
        },
      ]);
    }
    setModalOpen(false);
    setFormData({});
    setEditMode(false);
  };

  return (
    <div className="p-6 max-w-screen-md mx-auto font-sans">
      <h2 className="text-3xl font-bold mb-6">⚙️ Operations</h2>

      {/* Add Button */}
      <div className="mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Operation
        </button>
      </div>

      {/* Operations Table */}
      <table className="w-full border text-sm bg-white shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border text-left">Name</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((op) => (
            <tr key={op.id} className="hover:bg-gray-50 transition">
              <td className="p-2 border">{op.name}</td>
              <td className="p-2 border text-center space-x-2">
                <button onClick={() => handleEdit(op)} className="text-blue-600">
                  ✏️
                </button>
                <button onClick={() => handleDelete(op.id)} className="text-red-600">
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
              {editMode ? "Edit Operation" : "Add Operation"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Operation Name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
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

export default MpsOperationsPage;
