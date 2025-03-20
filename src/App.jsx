import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Publicas
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import RecoverPassword from "./components/RecoverPassword";
//con token
import ChangePassword from "./components/ChangePassword";
// Administrador
import ProtectedRouteAdmin from "./components/Administrador/ProtectedRouteAdmin";
import Register from "./components/Administrador/Register";
import DashboardAdmin from "./components/Administrador/DashboardAdmin";
import NavbarAdmin from "./components/Administrador/NavbarAdmin";
// Empleado
import ProtectedRouteEmpleado from "./components/Empleado/ProtectedRouteEmpleado";
import NavBarEmpleado from "./components/Empleado/NavBarEmpleado";
import DashboardEmpleado from "./components/Empleado/DashboardEmpleado";



function App() {
  return (
    <Router>
      <Routes>
        {/* //Rutas publicas */}
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/recover-password" element={<RecoverPassword />} />

        {/* //Rutas protegidas para Administrador*/}
        <Route element={<ProtectedRouteAdmin />}>
          <Route path="/register" element={<><NavbarAdmin /><Register /></>} />
          <Route path="/dashboardAdmin" element={<><NavbarAdmin /><DashboardAdmin /></>} />
          <Route path="/admin/change-password" element={<><NavbarAdmin /><ChangePassword /></>} />
        </Route>

        {/* //Rutas protegidas para Empleados */}
        <Route element={<ProtectedRouteEmpleado />}>
          <Route path="/dashboardEmpleado" element={<><NavBarEmpleado /><DashboardEmpleado /></>} />
          <Route path="/empleado/change-password" element={<><NavBarEmpleado /><ChangePassword /></>} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App
