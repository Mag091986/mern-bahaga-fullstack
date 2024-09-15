import React from 'react'

export default function SignIn() {
  return (
    <div>
      <h1 className='text-3xl text-center font-semibold my-7'>Registro</h1>
      <form className='flex flex-col gap-4'>
<input type="text" placeholder="Nombre de usuario" className='border p-3 rounded-lg' id='username' />
<input type="email" placeholder="Correo electrónico" className='border p-3 rounded-lg' id='email' />
<input type="password" placeholder="Contraseña" className='border p-3 rounded-lg' id='password' />
    </form>
    </div>

  )
}
