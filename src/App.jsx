import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardEmpleado from "./components/DashboardEmpleado";
import ResetPassword from "./components/ResetPassword";
import RecoverPassword from "./components/RecoverPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/dashboardEmpleado" element={<DashboardEmpleado />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
      </Routes>
    </Router>
  );
}

export default App
