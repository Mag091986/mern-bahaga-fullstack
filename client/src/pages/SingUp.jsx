import { Link } from "react-router-dom";
import image from "../assets/img/nuevouser.jpg";

export default function SignUp() {
  return (
    <div className="flex h-[calc(100vh-100px)] justify-center items-center gap-6">
      <div className='flex flex-col'>
      <h1 className='text-3xl text-center font-semibold my-7'>Registro</h1>
      <form className='flex flex-col gap-4'>
<input type="text" placeholder="Nombre de usuario" className='border p-3 rounded-lg' id='username' />
<input type="email" placeholder="Correo electrónico" className='border p-3 rounded-lg' id='email' />
<input type="password" placeholder="Contraseña" className='border p-3 rounded-lg' id='password' />
<button className='bg-sky-500 border text-white p-3 rounded-lg hover:bg-orange-600 disabled:opacity-50'>Registrar</button>
    </form>
    <div className="flex gap-2 mt-5">
      <p>¿Tiene una cuenta?</p>
      <Link to={"/sign-in"}>
      <span className="text-sky-500">Iniciar sesión</span>
      </Link>
    </div>
      </div>
    <div className="h-full">
        <img src={image} alt="Cartagena" className="object-cover w-full h-full" />
      </div>
    </div>

  )
}

