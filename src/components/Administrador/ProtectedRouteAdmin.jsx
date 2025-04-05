import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRouteAdmin() {
    const token = localStorage.getItem('token');

    try {
        if (!token) return <Navigate to="/" replace />
        //Decodificar el token
        const decoded = jwtDecode(token);
        return decoded.role_id === `${import.meta.env.VITE_ADMIN_ROLE_ID}` ? <Outlet /> : <Navigate to="/" />
    } catch (error) {
        console.log(error);
        return <Navigate to="/" replace />
    }
}