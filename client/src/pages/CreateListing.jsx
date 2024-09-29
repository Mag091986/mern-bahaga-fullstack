import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { app } from '../firebase';

export default function CreateListing() {
  const [files, setfiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length < 7) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
      });
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`${progress}% cargado`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        })
    });
  }
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Crear Servicio</h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input type="text" placeholder='Nombre del Salón' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required />
          <textarea type="text" placeholder='Descripción' className='border p-3 rounded-lg' id='description' required />
          <input type="text" placeholder='Dirección' className='border p-3 rounded-lg' id='address' required />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type="checkbox" id='offer' className='w-5' /> <span>Por días</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='parking' className='w-5' /> <span>Parqueadero</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='catering' className='w-5' /> <span>Cáterin</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id='decoration' className='w-5' /> <span>Decoración</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input type="number" id='guests' min='10' max='500' required className='p-3 border border-gray-300 rounded-lg' />
              <p>Invitados</p>
            </div>
            <div className='flex items-center gap-2'>
              <input type="number" id='bathrooms' min='0' max='10' required className='p-3 border border-gray-300 rounded-lg' />
              <p>Baños</p>
            </div>
            <div className='flex items-center gap-2'>
              <input type="number" id='regularPrice' min='10' max='500' required className='p-3 border border-gray-300 rounded-lg' />
              <div className='flex flex-col items-center'>
                <p>Precio</p>
                <span className='text-xs'>($ / Hora)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input type="number" id='discountPrice' min='10' max='500' required className='p-3 border border-gray-300 rounded-lg' />
              <div className='flex flex-col items-center'>
                <p>Precio</p>
                <span className='text-xs'>($ / Día)</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Fotografías:
            <span className='font-normal text-gray-600 ml-3'>La primera imagen será la portada (max 6)</span>
          </p>
          <div className='flex gap-4'>
            <input onChange={(e) => setfiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
            <button type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Cargar</button>
          </div>
          <button className='p-3 bg-blue-900 text-white rounded-lg uppercase hover:opacity-80 disabled:opacity-50'>Publicar Servicio</button>
        </div>
      </form>
    </main>
  )
}
