import React, { useState, useEffect } from "react";

const MpsUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTargetId, setEditTargetId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    
    setUsers([
      { id: 1, name: "Ali Yılmaz", username: "aliy", role: "operator" },
      { id: 2, name: "Elif Demir", username: "elifd", role: "manager" },
    ]);
  }, []);

  const handleAdd = () => {
    setFormData({});
    setEditMode(false);
    setEditTargetId(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditMode(true);
    setEditTargetId(user.id);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editTargetId ? { ...u, ...formData } : u
        )
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: formData.name || "Unnamed",
          username: formData.username || "user",
          role: formData.role || "operator",
        },
      ]);
    }
    setModalOpen(false);
    setFormData({});
    setEditMode(false);
  };

  return (
    <div className="p-6 max-w-screen-md mx-auto font-sans">
      <h2 className="text-3xl font-bold mb-6">👤 Users</h2>

      {/* Add Button */}
      <div className="mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      <table className="w-full border text-sm bg-white shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border text-center space-x-2">
                <button onClick={() => handleEdit(user)} className="text-blue-600">✏️</button>
                <button onClick={() => handleDelete(user.id)} className="text-red-600">🗑️</button>
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
              {editMode ? "Edit User" : "Add User"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border rounded w-full p-2"
                required
              />
              <input
                type="text"
                placeholder="Username"
                value={formData.username || ""}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="border rounded w-full p-2"
                required
              />
              <select
                value={formData.role || ""}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="border rounded w-full p-2"
                required
              >
                <option value="">Select Role</option>
                <option value="operator">Operator</option>
                <option value="manager">Manager</option>
                <option value="mps">MPS</option>
              </select>
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

export default MpsUsersPage;
