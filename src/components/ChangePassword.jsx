import { useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert2';

export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Comprobar las contraseñas
            if (newPassword !== password) {
                swal.fire('Error', 'Las contraseñas no coinciden', 'error');
                return;
            }
            // Cambiar la contraseña
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No estas autenticado');
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/change-password`, { newPassword },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            swal.fire('¡Exito!',response.data.message || 'La contraseña ha sido cambiada exitosamente', 'success');
        } catch (error) {
            alert(error)
            swal.fire('Error', error.response?.data?.message || 'No se pudo cambiar la contraseña', 'error');
            console.log(error)
        }
    }

    return (
        <div className='container d-flex justify-content-center align-items-center'>
            <div className="card shadow p-4" style={{ maxWidth: '50%', width: '100%' }}>
                <div className="card-body">
                    <h2 className='text-center'> Cambiar Contraseña</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Nueva Contraseña</label>
                            <input
                                className='form-control'
                                type="password"
                                id="password"
                                name="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Confirmar Contraseña</label>
                            <input
                                className='form-control'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='d-grid'>
                            <button type="submit" className='btn btn-primary'>Cambiar Contraseña</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
