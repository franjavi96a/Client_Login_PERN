import { useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            //validar contraseñas
            const validatePassword = (password) => {
                const validations = [
                    {
                        test: password.length >= 8,
                        error: 'Las contraseñas deben tener 8 caracteres como mínimo y contener al menos uno de los siguientes elementos: mayúsculas, minúsculas, números y símbolos',
                    },
                    {
                        test: /[A-Z]/.test(password),
                        error: 'La contraseña debe contener al menos una letra mayúscula',
                    },
                    {
                        test: /[0-9]/.test(password),
                        error: 'La contraseña debe contener al menos un número',
                    },
                    {
                        test: /[a-z]/.test(password),
                        error: 'La contraseña debe contener al menos una letra minúscula',
                    },
                    {
                        test: /[@$!%*?&]/.test(password),
                        error: 'La contraseña debe contener al menos un carácter especial',
                    },
                ];

                // Iterar sobre las validaciones y mostrar el primer error
                for (const validation of validations) {
                    if (!validation.test) {
                        swal.fire('Error', validation.error, 'error');
                        return false;
                    }
                }

                return true; // Si todas las validaciones pasan
            };

            // Ejemplo de uso
            if (!validatePassword(password)) {
                return; // Termina la ejecución si la validación falla
            }

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
            swal.fire('¡Exito!', response.data.message || 'La contraseña ha sido cambiada exitosamente', 'success')
            .then(()=>{//limpiar campos
                setPassword('');
                setNewPassword('');
            })
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
                        <div className='mb-3 position-relative'>
                            <label className='form-label'>Nueva Contraseña</label>
                            <input
                                className='form-control'
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="position-absolute"
                                style={{
                                    top: '60%',
                                    right: '5px',
                                    transform: 'translate(-50%, 10%)', // Ajusta el centrado tanto vertical como horizontal
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        <div className='mb-3 position-relative'>
                            <label className='form-label'>Confirmar Contraseña</label>
                            <input
                                className='form-control'
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="position-absolute"
                                style={{
                                    top: '60%',
                                    right: '5px',
                                    transform: 'translate(-50%, 10%)', // Ajusta el centrado tanto vertical como horizontal
                                    display: 'flex', // Asegura el centramiento interno del ícono
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
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
