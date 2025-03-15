import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/login', { username, password });
            localStorage.setItem('token', response.data.token);
            //Aqui se podria decodificar el token y obtener el rol y redirecionar a la pagina correspondiente
            console.log(response.data);
            navigate('/dashboard');
        } catch (error) {
            alert('Credenciales incorrectas');
            console.log(error);
        }
    }

    return (
        <div className='container mt-5'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className='form-label'>Username</label>
                    <input
                        type='text'
                        className='form-control'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} required
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input
                        type='password'
                        className='form-control'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required
                    />

                </div>
                <button type='submit' className='btn btn-primary'>Login</button>
            </form>
        </div>
    )
}

