import React from 'react'
import { jwtDecode } from 'jwt-decode';

export default function DashboardEmpleado() {

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const username = decoded.username;


    return (
        <div>
            <h2 className='text-center'>Bienvenido Empleado: {username}</h2>
        </div>
    )
}
