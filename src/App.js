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

// MPS Pages
import MpsHomePage from "./pages/mps/MpsHomePage";
import MpsStocksPage from "./pages/mps/MpsStocksPage";
import MpsOperationsPage from "./pages/mps/MpsOperationsPage";
import MpsUsersPage from "./pages/mps/MpsUsersPage";
import MpsWorkordersPage from "./pages/mps/MpsWorkordersPage";
import MpsWorkstationsPage from "./pages/mps/MpsWorkstationsPage";
import MpsManagementPage from "./pages/mps/MpsManagementPage"; 

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
            <MainLayout><MpsHomePage /></MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mps/stocks"
        element={
          <ProtectedRoute allowedRoles={["mps"]}>
            <MainLayout><MpsStocksPage /></MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mps/operations"
        element={
          <ProtectedRoute allowedRoles={["mps"]}>
            <MainLayout><MpsOperationsPage /></MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mps/users"
        element={
          <ProtectedRoute allowedRoles={["mps"]}>
            <MainLayout><MpsUsersPage /></MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mps/workorders"
        element={
          <ProtectedRoute allowedRoles={["mps"]}>
            <MainLayout><MpsWorkordersPage /></MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mps/workstations"
        element={
          <ProtectedRoute allowedRoles={["mps"]}>
            <MainLayout><MpsWorkstationsPage /></MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mps/management"
        element={
          <ProtectedRoute allowedRoles={["mps"]}>
            <MainLayout><MpsManagementPage /></MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
