import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRouteAdmin() {
    const token = localStorage.getItem('token');

    try {
        if (!token) return <Navigate to="/" replace />
        //Decodificar el token
        const decoded = jwtDecode(token);
        return decoded.role_id === "491debd8-1105-43c1-8e7e-bc3a805d6ba9" ? <Outlet /> : <Navigate to="/" />
    } catch (error) {
        console.log(error);
        return <Navigate to="/" replace />
    }
}