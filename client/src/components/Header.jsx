import { useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='bg-orange-600 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        {/* Seccion del Logo */}
        <Link to='/' className='flex justify-between items-center'>
          <img src={logo} alt='Logo' className='w-10 mr-4' />
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-white'>Bahaga</span>
          </h1>
        </Link>

        {/* Barra de busqueda */}
        <form className='bg-orange-100 p-2 rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <FaSearch className='text-gray-500' />
        </form>

        {/* Icono hamburguesa para mobile */}
        <button className='sm:hidden text-white' onClick={toggleMenu}>
          <FaBars className='w-6 h-6' />
        </button>

        {/* Version de esritorio */}
        <ul className='hidden sm:flex gap-4 items-center'>
          <Link to='/'><li className='text-white hover:underline'>Inicio</li></Link>
          <Link to='/about'><li className='text-white hover:underline'>Nosotros</li></Link>
          <Link to='/profile'>
            {currentUser ? (
              <li>
                <img
                  src={currentUser.avatar}
                  alt= 'Foto de perfil'
                  className='w-8 h-8 rounded-full' //Estilo de avatar redondo
                />
              </li>
            ) : (
              <li className='text-white hover:underline'>Inicia sesión</li>
            )}
          </Link>
        </ul>
      </div>

      {/*Menu para mobile (visible when toggled) */}
      {isOpen && (
        <ul className='flex flex-col bg-orange-600 p-4 sm:hidden'>
          <Link to='/' onClick={toggleMenu}>
            <li className='text-white hover:underline'>Inicio</li>
          </Link>
          <Link to='/about' onClick={toggleMenu}>
            <li className='text-white hover:underline'>Nosotros</li>
          </Link>
          <Link to='/profile' onClick={toggleMenu}>
            {currentUser ? (
              <li className='flex items-center'>
                <img
                  src={currentUser.avatar}
                  alt= 'Foto de perfil'
                  className='w-8 h-8 rounded-full' // Version para mobile
                />
                <span className='ml-2 text-white'>{currentUser.name}</span>
              </li>
            ) : (
              <li className='text-white hover:underline'>Inicia sesión</li>
            )}
          </Link>
        </ul>
      )}
    </header>
  );
}
