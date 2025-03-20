import { useState } from 'react'
import axios from 'axios';

export default function Register() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role_name: '',
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('No estas autenticado');
                setLoading(false);
                return;
            }
            await axios.post(import.meta.env.VITE_API_URL + '/register', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Usuario registrado exitosamente');
            //Limpiar el formulario
            setFormData({
                username: '',
                email: '',
                password: '',
                role_name: '',
            });

        } catch (error) {
            setErrorMessage('Error al registrar usuario');
            setLoading(false);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container mt-5'>
            <h2>Registro Nuevo Usuario</h2>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label'>Username</label>
                    <input
                        type='text'
                        name='username'
                        className='form-control'
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Email</label>
                    <input
                        type='email'
                        name='email'
                        className='form-control'
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input
                        type='password'
                        name='password'
                        className='form-control'
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Rol</label>
                    <select name="role_name" className='form-select' onChange={handleChange}>
                        <option value="">...Seleccione un rol...</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Empleado">Empleado</option>
                    </select>
                </div>
                <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrar'}
                </button>
            </form>
        </div>
    );
}
