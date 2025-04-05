import { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'


export default function ResetPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/recover-password', { email });
            await swal.fire('Email enviado', response.data.message || 'El email ha sido enviado', 'success')
                .then(() => {
                    setEmail('');
                })
        } catch (error) {
            swal.fire('Error', error.response?.data?.message || 'No se pudo enviar el email', 'error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body">
                    <h5 className="card-title text-center">Recuperar Contraseña</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Introduce tu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="container d-flex flex-column align-items-center mt-2 gap-2">
                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? 'Enviando...' : 'Enviar Codigo'}
                            </button>

                            <a href="/recover-password" className="btn btn-outline-secondary w-100">
                                Tengo un código
                            </a>

                            <a href="/" className="text-decoration-none">Volver</a>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    )
}
