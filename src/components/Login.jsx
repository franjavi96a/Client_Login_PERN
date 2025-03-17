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
            if (decoded.role_id === "491debd8-1105-43c1-8e7e-bc3a805d6ba9") {
                navigate("/register");
            } else if (decoded.role_id === "13f0c2e0-8f78-48b6-b9ff-a9aa618eb004") {
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
        <div className="container mt-5">
            <h2>Login</h2>
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
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Cargando...' : 'Login'}
                </button>
            </form>
        </div>
    )
}

