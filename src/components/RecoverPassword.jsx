import { useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function RecoverPassword() {

    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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
                                className="form-control border-dark"
                                id="token"
                                placeholder='Ingrese codigo de recuperacion'
                                onChange={(e) => setToken(e.target.value)}
                                required />
                        </div>
                        <div className="mb-3 position-relative">
                            <label htmlFor="newPassword" className="form-label">Nueva contraseña</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control border border-dark"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required />
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
                                className='form-control border border-dark'
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
