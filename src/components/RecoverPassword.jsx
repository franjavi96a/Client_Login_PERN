import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function RecoverPassword() {

    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/reset-password`, { token, newPassword });
            alert('Contraseña cambiada exitosamente');
            setToken('');
            setNewPassword('');
            window.location.href = '/';
        } catch (error) {
            setErrorMessage('Error al cambiar la contraseña');
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
                    {errorMessage && (

                        <div className='alert alert-danger' role='alert'>{errorMessage}</div>

                    )}
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
                                onChange={(e) => setNewPassword(e.target.value)}
                                required />
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
