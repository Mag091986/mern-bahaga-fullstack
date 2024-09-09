import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className='bg-orange-600 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-white'>Bahaga</span>
            </h1>
            </Link>
                <form className='bg-orange-100 p-2 rounded-lg flex items-center'>
                    <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
                    <FaSearch className='text-gray-500' />
                </form>
                <ul className='flex gap-4'>
                    <Link to='/'><li className='hidden sm:inline text-white hover:underline'>Inicio</li></Link>
                    <Link to='/about'><li className='hidden sm:inline text-white hover:underline'>Nosotros</li></Link>
                    <Link to='/sign-in'><li className='sm:inline text-white hover:underline'>Registro</li></Link>
                </ul>
            </div>
        </header>
    )
}
