import { useSelector } from "react-redux"

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Perfil de Usuario</h1>
      <form className="flex flex-col gap-4"> 
        <img src={currentUser.avatar} alt="Foto de perfil" className='rounded-full h-20 w-20 object-cover cursor-pointer self-center mt-2' />
      <input type="text" placeholder="Nombre de Usuario" id="username" className="border p-3 rounded-lg" />
      <input type="email" placeholder="Correo electrónico" id="email" className="border p-3 rounded-lg" />
      <input type="text" placeholder="Contraseña" id="password" className="border p-3 rounded-lg" />
      <button className="bg-sky-500 border uppercase text-white p-3 rounded-lg hover:bg-orange-600 disabled:opacity-50">Actualizar</button>
      
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-600 cursor-pointer">Eliminar cuenta</span>
        <span className="text-red-600 cursor-pointer">Cerrar sesión</span>
      </div>
    </div>
  )
}
