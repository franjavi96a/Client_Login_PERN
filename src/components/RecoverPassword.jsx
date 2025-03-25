import { useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert2';

export default function RecoverPassword() {

    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (newPassword !== password) {
                swal.fire('Error', 'Las contraseñas no coinciden', 'error');
                return;
            };
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/reset-password`, { token, newPassword });
            swal.fire('¡Exito!', response.data.message || 'La contraseña ha sido cambiada exitosamente', 'success').then(() => { //.then para esperar que se cierre la alerta
                setToken('');
                setNewPassword('');
                window.location.href = '/';
            })

        } catch (error) {
            swal.fire('Error', error.response?.data?.message || 'No se pudo cambiar la contraseña', 'error');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body">
                    <h5 className="card-title text-center">Cambiar Contraseña</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="token" className="form-label">Codigo de recuperacion</label>
                            <input
                                type="text"
                                className="form-control"
                                id="token"
                                placeholder='Ingrese codigo de recuperacion'
                                onChange={(e) => setToken(e.target.value)}
                                required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">Nueva contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required />
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
                        <div className="container d-flex flex-column align-items-center mt-2 gap-2">
                            <button
                                type="submit"
                                className="btn btn-success w-100"
                                disabled={loading}
                            >
                                {loading ? 'Cambiando contraseña...' : 'Cambiar contraseña'}
                            </button>
                            <a href="/" className="text-decoration-none">Volver</a>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
