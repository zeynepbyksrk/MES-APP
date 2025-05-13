import React, { useState, useEffect } from "react";

const MpsStocksPage = () => {
  const [activeTab, setActiveTab] = useState("stocks");
  const [stocks, setStocks] = useState([]);
  const [stockUnits, setStockUnits] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTargetId, setEditTargetId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setStocks([
      { id: 1, product: "Motor Block", quantity: 150, threshold: 100 },
      { id: 2, product: "Piston", quantity: 75, threshold: 120 },
    ]);
    setStockUnits([
      { id: 1, name: "Kilogram", icon: "⚖️" },
      { id: 2, name: "Piece", icon: "🧩" },
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
    if (activeTab === "stocks") {
      setStocks((prev) => prev.filter((s) => s.id !== id));
    } else {
      setStockUnits((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "stocks") {
      if (editMode) {
        setStocks((prev) =>
          prev.map((item) =>
            item.id === editTargetId
              ? { ...item, ...formData }
              : item
          )
        );
      } else {
        setStocks((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            product: formData.product || "Unnamed",
            quantity: parseInt(formData.quantity) || 0,
            threshold: parseInt(formData.threshold) || 0,
          },
        ]);
      }
    } else {
      if (editMode) {
        setStockUnits((prev) =>
          prev.map((item) =>
            item.id === editTargetId
              ? { ...item, ...formData }
              : item
          )
        );
      } else {
        setStockUnits((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            name: formData.name || "Unnamed",
            icon: formData.icon || "📦",
          },
        ]);
      }
    }
    setModalOpen(false);
    setEditMode(false);
    setFormData({});
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto font-sans">
      <h2 className="text-3xl font-bold mb-6">📦 Stock Management</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === "stocks" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("stocks")}
        >
          Stocks
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "units" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("units")}
        >
          Stock Units
        </button>
      </div>

      {/* Add Button */}
      <div className="mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add {activeTab === "stocks" ? "Stock" : "Stock Unit"}
        </button>
      </div>

      {/* Stocks Table */}
      {activeTab === "stocks" && (
        <table className="w-full border text-sm bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Threshold</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((item) => {
              const isLow = item.quantity < item.threshold;
              return (
                <tr key={item.id} className={isLow ? "bg-red-100" : ""}>
                  <td className="p-2 border">{item.product}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">{item.threshold}</td>
                  <td className="p-2 border font-semibold">
                    {isLow ? (
                      <span className="text-red-600">Low</span>
                    ) : (
                      <span className="text-green-600">OK</span>
                    )}
                  </td>
                  <td className="p-2 border text-center space-x-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-600">✏️</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600">🗑️</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Stock Units Table */}
      {activeTab === "units" && (
        <table className="w-full border text-sm bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Icon</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockUnits.map((unit) => (
              <tr key={unit.id}>
                <td className="p-2 border text-lg">{unit.icon}</td>
                <td className="p-2 border">{unit.name}</td>
                <td className="p-2 border text-center space-x-2">
                  <button onClick={() => handleEdit(unit)} className="text-blue-600">✏️</button>
                  <button onClick={() => handleDelete(unit.id)} className="text-red-600">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold">
              {editMode ? "Edit" : "Add"} {activeTab === "stocks" ? "Stock" : "Stock Unit"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === "stocks" ? (
                <>
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={formData.product || ""}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="border rounded w-full p-2"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={formData.quantity || ""}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="border rounded w-full p-2"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Threshold"
                    value={formData.threshold || ""}
                    onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                    className="border rounded w-full p-2"
                    required
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Stock Unit Name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border rounded w-full p-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Icon (e.g. 📦)"
                    value={formData.icon || ""}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="border rounded w-full p-2"
                    required
                  />
                </>
              )}

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

export default MpsStocksPage;
