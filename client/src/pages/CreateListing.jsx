import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'hour',
    guests: 1,
    bathrooms: 1,
    regularPrice: 100000,
    discountPrice: 0,
    offer: false,
    parking: false,
    catering: false,
    decoration: false,
  });
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = async () => {
    if (files.length + formData.imageUrls.length > 6) {
      setImageUploadError('Puedes subir hasta 6 imágenes por publicación');
      return;
    }
    setUploading(true);
    setImageUploadError(null);

    try {
      const urls = await Promise.all(files.map(file => storeImage(file)));
      setFormData(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ...urls] }));
    } catch {
      setImageUploadError('Carga de imagen fallida (Máximo 2 Mb por imagen)');
    } finally {
      setUploading(false);
    }
  };

  const storeImage = (file) => {
    const storage = getStorage(app);
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`${progress}% cargado`);
        },
        error => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
      ...(id === 'day' || id === 'hour' ? { type: id } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.imageUrls.length < 1) return setError('Debes subir al menos una imagen');
    if (Number(formData.regularPrice) < Number(formData.discountPrice)) return setError('El precio de descuento debe ser menor al precio regular');

    try {
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      if (data.success) {
        navigate(`/listing/${data._id}`);
      } else {
        setError(data.message || 'Ocurrió un error al crear el salón');
      }
    } catch (err) {
      setError('No se pudo completar la solicitud. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Crear salón</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input type="text" placeholder="Nombre del Salón" className="border p-3 rounded-lg" id="name" required onChange={handleChange} value={formData.name} />
          {/* Other form elements */}
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Fotografías: <span className="font-normal text-gray-600 ml-3">La primera imagen será la portada (max 6)</span></p>
          <div className="flex gap-4">
            <input onChange={(e) => setFiles(Array.from(e.target.files))} className="p-3 border rounded w-full" type="file" accept="image/*" multiple />
            <button type="button" disabled={uploading} onClick={handleImageSubmit} className="p-3 text-green-700 border rounded uppercase">{uploading ? 'Cargando...' : 'Cargar'}</button>
          </div>
          {imageUploadError && <p className="text-red-700 text-sm">{imageUploadError}</p>}
          {formData.imageUrls.map((url, index) => (
            <div key={url} className="flex justify-between p-4 border items-center">
              <img src={url} alt="Lista de imágenes" className="w-20 h-20 object-contain rounded-lg" />
              <button type="button" onClick={() => handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase">Borrar</button>
            </div>
          ))}
          <button disabled={loading || uploading} className="p-3 bg-blue-900 text-white rounded-lg uppercase">{loading ? 'Creando...' : 'Crear salón'}</button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
