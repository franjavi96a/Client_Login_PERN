import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRouteEmpleado() {
    const token = localStorage.getItem('token');

    try {
        if (!token) return <Navigate to="/" replace />
        //Decodificar el token
        const decoded = jwtDecode(token);
        return decoded.role_id === "13f0c2e0-8f78-48b6-b9ff-a9aa618eb004" ? <Outlet /> : <Navigate to="/" />
    } catch (error) {
        console.log(error);
        return <Navigate to="/" replace />
    }
}
