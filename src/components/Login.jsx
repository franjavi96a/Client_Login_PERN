import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/login`,
                { username, password }
            );
            const { token } = response.data;
            if (!token) {
                throw new Error('Token no recibido');
            }
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);

            // Redirigir según el role_id obtenido del token
            if (decoded.role_id === `${import.meta.env.VITE_ADMIN_ROLE_ID}`) {
                navigate("/dashboardAdmin");
            } else if (decoded.role_id === `${import.meta.env.VITE_EMPLEADO_ROLE_ID}`) {
                navigate("/dashboardEmpleado");
            } else {
                setErrorMessage("Rol de usuario no reconocido");
            }
        } catch (error) {
            setErrorMessage('Credenciales incorrectas');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}  >
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body">
                    <h2 className='text-center'>Login</h2>
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="container d-flex flex-column align-items-center mt-3 gap-3">
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? 'Cargando...' : 'Login'}
                            </button>
                            <a href="/reset-password" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

