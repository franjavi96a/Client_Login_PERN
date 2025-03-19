import React from 'react'
import { Link, Links } from 'react-router-dom'
import { FaSignOutAlt } from "react-icons/fa"; // Import the FaSignOutAlt icon

export default function NavbarAdmin() {
    return (
        <div className='navbar navbar-expand-lg navbar-light bg-primary mb-4'>
            <div className='container-fluid'>
                <a className='navbar-brand' href='/dashboardAdmin'>
                    <img src='/public/logo.svg'
                        width='30' height='30' className='d-inline-block align-top' alt='' />
                    {/* Aqui agregar nombre de la Apliacacion */}
                </a>

                {/* Menu */}
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <Link className='nav-link active' aria-current='page' to='/register'>Registrar Usuario</Link>
                        </li>
                    </ul>
                </div>

                {/* Salida de la Aplicacion */}
                <a className='navbar-brand' href='/'>
                    Salir
                    <img width="24" height="24" src="https://img.icons8.com/forma-thin-filled/24/exit.png" alt="exit" />
                </a>

            </div>
        </div>
    )
}

