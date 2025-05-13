import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!role || !username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    localStorage.setItem("role", role);
    localStorage.setItem("username", username);

    switch (role) {
      case "operator":
        navigate("/operator");
        break;
      case "manager":
        navigate("/manager");
        break;
      case "mps":
        navigate("/mps");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <img src="/unopro-logo.png" alt="UnoPro Logo" className="h-16 mb-2" />
       
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md space-y-5">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select Role</option>
            <option value="operator">Operator</option>
            <option value="manager">Manager</option>
            <option value="mps">MPS</option>
          </select>

          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
