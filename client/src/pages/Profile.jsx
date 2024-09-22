import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({ avatar: '' });
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress)); // Update file upload percentage
      },
      (error) => {
        console.error('Error durante la carga:', error); // Handle upload error
      },
      () => {
        // On successful upload, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL }); // Update form data with avatar URL
          console.log('File available at:', downloadURL); // Log the download URL
        });
      }
    );
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Perfil de Usuario</h1>
      <form className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Foto de perfil" className='rounded-full h-20 w-20 object-cover cursor-pointer self-center mt-2' />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-600'>
              Error de carga (El archivo debe pesar menos de 2 mb)
            </span>) :
                filePerc > 0 && filePerc < 100 ? (
          <span className='text-slate-600'> 
            {`Carga al ${filePerc} %`}</span>
          ) :
          filePerc === 100 ? (
          <span className='text-green-600'>¡Carga completa!</span>
  ) : ('')}
        </p>
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
