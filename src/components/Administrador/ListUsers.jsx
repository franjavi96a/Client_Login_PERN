import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';

export default function ListUsers() {
    const [users, setUsers] = useState([]);

    // Función para listar los usuarios
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/list-users`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, [])

    // Función para eliminar un usuario
    const handleDeleteUser = async (userId) => {
        const token = localStorage.getItem('token');
        // Confirmar la eliminación
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar al usuario ${users.find(user => user.user_id === userId).username}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        })
        if (!result.isConfirmed) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/delete-user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user.user_id !== userId));
        } catch (error) {
            console.log(error);
        }
    };

    // Función para cambiar el rol de un usuario
    const handleRoleChange = async (userId, newRoleId) => {
        if (!userId || !newRoleId) {
            Swal.fire("Error", "Datos inválidos para actualizar el rol", "error");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/assign-role`,
                { user_id: userId, role_id: newRoleId }, // Enviar el JSON correcto
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Si la actualización es exitosa, actualizar el estado localmente
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.user_id === userId ? { ...user, role_id: newRoleId } : user
                )
            );

            Swal.fire("¡Éxito!", response.data.message || "El rol del usuario ha sido actualizado.", "success");
        } catch (error) {
            console.error("Error al actualizar el rol:", error);
            Swal.fire("Error", error.response?.data?.message || "No se pudo actualizar el rol del usuario.", "error");
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center p-4">
            <div className="card shadow-lg p-4 w-100">
                <h2 className="text-center mb-4">Lista de Usuarios</h2>

                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className='text-center'>
                            <tr>
                                <th>Usuario</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Creado</th>
                                <th>Actualizado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-light">
                            {users.length > 0 ? (   /* Mapeo de los usuarios */
                                users.map((user) => (
                                    <tr key={user.user_id} className="text-center" >
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role_name}</td>
                                        <td>{user.created_at}</td>
                                        <td>{user.updated_at}</td>
                                        <td className="d-flex justify-content-around align-items-center">
                                            {/* Selección de rol */}
                                            <select
                                                className="form-select form-select-sm w-auto"
                                                value={user.role_id}
                                                onChange={(e) => handleRoleChange(user.user_id, e.target.value)}
                                            >
                                                <option >
                                                    ... Seleccionar Rol ...
                                                </option>
                                                <option value={import.meta.env.VITE_ADMIN_ROLE_ID}>
                                                    Administrador
                                                </option>
                                                <option value={import.meta.env.VITE_EMPLEADO_ROLE_ID}>
                                                    Empleado
                                                </option>
                                            </select>

                                            {/* Botón eliminar */}
                                            <button className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteUser(user.user_id)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No hay usuarios disponibles.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >

    )
}
