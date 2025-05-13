import React, { useState, useEffect } from "react";

const MpsWorkordersPage = () => {
  const [workorders, setWorkorders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTargetId, setEditTargetId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setWorkorders([
      {
        id: 1,
        productName: "Piston",
        quantity: 120,
        dueDate: "2024-06-01",
      },
      {
        id: 2,
        productName: "Valve",
        quantity: 80,
        dueDate: "2024-06-10",
      },
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
    setWorkorders((prev) => prev.filter((wo) => wo.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setWorkorders((prev) =>
        prev.map((wo) =>
          wo.id === editTargetId ? { ...wo, ...formData } : wo
        )
      );
    } else {
      setWorkorders((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          productName: formData.productName || "Unnamed",
          quantity: parseInt(formData.quantity) || 0,
          dueDate: formData.dueDate || new Date().toISOString().slice(0, 10),
        },
      ]);
    }
    setModalOpen(false);
    setFormData({});
    setEditMode(false);
  };

  return (
    <div className="p-6 max-w-screen-md mx-auto font-sans">
      <h2 className="text-3xl font-bold mb-6">📋 Workorders</h2>

      {/* Add Button */}
      <div className="mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Workorder
        </button>
      </div>

      {/* Table */}
      <table className="w-full border text-sm bg-white shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border text-left">Product</th>
            <th className="p-2 border text-left">Quantity</th>
            <th className="p-2 border text-left">Due Date</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workorders.map((wo) => (
            <tr key={wo.id} className="hover:bg-gray-50 transition">
              <td className="p-2 border">{wo.productName}</td>
              <td className="p-2 border">{wo.quantity}</td>
              <td className="p-2 border">{wo.dueDate}</td>
              <td className="p-2 border text-center space-x-2">
                <button onClick={() => handleEdit(wo)} className="text-blue-600">✏️</button>
                <button onClick={() => handleDelete(wo.id)} className="text-red-600">🗑️</button>
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
              {editMode ? "Edit Workorder" : "Add Workorder"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.productName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
                className="border rounded w-full p-2"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity || ""}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="border rounded w-full p-2"
                required
              />
              <input
                type="date"
                value={formData.dueDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
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

export default MpsWorkordersPage;
