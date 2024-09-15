import { useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='bg-orange-600 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        {/* Logo Section */}
        <Link to='/' className='flex justify-between items-center'>
          <img src={logo} alt="Logo" className="w-10 mr-4" />
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-white'>Bahaga</span>
          </h1>
        </Link>

        {/* Search Form */}
        <form className='bg-orange-100 p-2 rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <FaSearch className='text-gray-500' />
        </form>

        {/* Hamburger Icon for Mobile */}
        <button className="sm:hidden text-white" onClick={toggleMenu}>
          <FaBars className="w-6 h-6" />
        </button>

        {/* Navigation Links for Desktop */}
        <ul className='hidden sm:flex gap-4'>
          <Link to='/'><li className='text-white hover:underline'>Inicio</li></Link>
          <Link to='/about'><li className='text-white hover:underline'>Nosotros</li></Link>
          <Link to='/sign-in'><li className='text-white hover:underline'>Registro</li></Link>
        </ul>
      </div>

      {/* Mobile Menu (visible when toggled) */}
      {isOpen && (
        <ul className='flex flex-col bg-orange-600 p-4 sm:hidden'>
          <Link to='/' onClick={toggleMenu}><li className='text-white hover:underline'>Inicio</li></Link>
          <Link to='/about' onClick={toggleMenu}><li className='text-white hover:underline'>Nosotros</li></Link>
          <Link to='/sign-in' onClick={toggleMenu}><li className='text-white hover:underline'>Registro</li></Link>
        </ul>
      )}
    </header>
  );
}
