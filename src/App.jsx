import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardEmpleado from "./components/DashboardEmpleado";
import ResetPassword from "./components/ResetPassword";
import RecoverPassword from "./components/RecoverPassword";
import NavbarAdmin from "./components/NavbarAdmin";

function App() {
  return (
    <Router>
      <Routes>
        {/* //Rutas publicas */}
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/recover-password" element={<RecoverPassword />} />

        {/* //Rutas que requieren autenticación (usuario logueado) */}


        {/* //Rutas protegidas para Administradores */}
        <Route path="/register" element={<><NavbarAdmin /><Register /></>} />
        <Route path="/dashboardAdmin" element={<><NavbarAdmin /><DashboardAdmin /></>} />

        {/* //Rutas protegidas para Empleados */}
        <Route path="/dashboardEmpleado" element={<DashboardEmpleado />} />

      </Routes>
    </Router>
  );
}

export default App
