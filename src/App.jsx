import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardEmpleado from "./components/DashboardEmpleado";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/dashboardEmpleado" element={<DashboardEmpleado />} />
      </Routes>
    </Router>
  );
}

export default App
