import { useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert2'

export default function Register() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role_name: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');
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
            // Comprar las contraseñas
            if (confirmPassword !== formData.password) {
                swal.fire('Error', 'Las contraseñas no coinciden', 'error');
                return;
            }

            const response = await axios.post(import.meta.env.VITE_API_URL + '/register', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            swal.fire('Registrado', response.data.message || 'El usuario ha sido registrado exitosamente', 'success').then(() => {
                //Limpiar el formulario
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    role_name: '',
                });
                setConfirmPassword('');
            })
        } catch (error) {
            swal.fire('Error', error.response?.data?.message || 'No se pudo registrar el usuario', 'error');
            setLoading(false);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center p-4">
            <div className="card shadow-lg p-4 w-100 w-100" style={{ maxWidth: '50%', width: '100%' }}>
                <h2 className='text-center'>Registro Nuevo Usuario</h2>
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
                            value={formData.username}
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
                            value={formData.email}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Contraseña</label>
                        <input
                            type='password'
                            name='password'
                            className='form-control'
                            value={formData.password}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Confirmar Contraseña</label>
                        <input
                            className='form-control'
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Rol</label>
                        <select name="role_name" className='form-select' onChange={handleChange}>
                            <option value=" ">...Seleccione un rol...</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Empleado">Empleado</option>
                        </select>
                    </div>
                    <button type='submit' className='btn btn-primary w-100' disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrar'}
                    </button>
                </form>
            </div>
        </div>

    );
}
