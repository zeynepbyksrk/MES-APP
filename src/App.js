import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

// Operator Pages
import OperatorHomePage from "./pages/operator/OperatorHomePage";
import OperatorWorkorderPage from "./pages/operator/OperatorWorkorderPage";
import OperatorWorkorderDetailPage from "./pages/operator/OperatorWorkorderDetailPage";
import OperatorScadaPage from "./pages/operator/OperatorScadaPage";

// Manager Pages
import ManagerHomePage from "./pages/manager/ManagerHomePage";
import ManagerTrackWorkerPage from "./pages/manager/ManagerTrackWorkerPage";
import ManagerWorkstationDetailsPage from "./pages/manager/ManagerWorkstationDetailsPage";

// MPS Page (tek sayfa var)
import MpsPanel from "./pages/mps/MpsPanel";

// Layout
import MainLayout from "./components/layouts/MainLayout";

const getUserRole = () => localStorage.getItem("role");

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = getUserRole();
  return allowedRoles.includes(role) ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Operator Panel */}
      <Route
        path="/operator"
        element={
          <ProtectedRoute allowedRoles={["operator"]}>
            <MainLayout><OperatorHomePage /></MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/operator/workorders"
        element={
          <ProtectedRoute allowedRoles={["operator"]}>
            <MainLayout><OperatorWorkorderPage /></MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/operator/workorders/:workorderId"
        element={
          <ProtectedRoute allowedRoles={["operator"]}>
            <MainLayout><OperatorWorkorderDetailPage /></MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/operator/scada"
        element={
          <ProtectedRoute allowedRoles={["operator"]}>
            <MainLayout><OperatorScadaPage /></MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Manager Panel */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={["manager"]}>
            <MainLayout><ManagerHomePage /></MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/workstations"
        element={
          <ProtectedRoute allowedRoles={["manager"]}>
            <MainLayout><ManagerWorkstationDetailsPage /></MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/workers"
        element={
          <ProtectedRoute allowedRoles={["manager"]}>
            <MainLayout><ManagerTrackWorkerPage /></MainLayout>
          </ProtectedRoute>
        }
      />

      {/* MPS Panel */}
      <Route
        path="/mps"
        element={
          <ProtectedRoute allowedRoles={["mps"]}>
            <MainLayout><MpsPanel /></MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
