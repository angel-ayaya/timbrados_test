import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  const isLoggedIn = () => {
    return localStorage.getItem('accessToken'); // Verificar si el token de acceso está almacenado
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Eliminar el token de acceso
    localStorage.removeItem('refreshToken'); // Eliminar el token de refresco
    navigate('/login'); // Redirigir al usuario a la página de login
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        {isLoggedIn() ? (
          <>
            <li><button onClick={() => navigate('/')}>Home</button></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li><button onClick={() => navigate('/login')}>Login</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;