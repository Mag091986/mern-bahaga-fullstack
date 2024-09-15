import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/img/nuevouser.jpg";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);  // Reset error on new submission
    try {
      console.log('Form data:', formData);  // Log form data to check

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Registro Fallido');
      }

      const data = await res.json();
      console.log(data);
      navigate('/sign-in');

      // Redirect or show success message
      // You could add navigation to a different page or show a success message here

    } catch (err) {
      console.error('Error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);  // Always set loading to false when done
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] justify-center items-center gap-6">
      <div className="flex flex-col">
        <h1 className="text-3xl text-center font-semibold my-7">Registro</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" placeholder="Nombre de usuario" className="border p-3 rounded-lg" id="username" onChange={handleChange} />
          <input type="email" placeholder="Correo electrónico" className="border p-3 rounded-lg" id="email" onChange={handleChange} />
          <input type="password" placeholder="Contraseña" className="border p-3 rounded-lg" id="password" onChange={handleChange} />
          <button disabled={loading} className="bg-sky-500 border text-white p-3 rounded-lg hover:bg-orange-600 disabled:opacity-50">
            {loading ? 'Loading...' : 'Registrar'}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>¿Tiene una cuenta?</p>
          <Link to="/sign-in">
            <span className="text-sky-500">Iniciar sesión</span>
          </Link>
        </div>
      {error && <p className="text-red-500">{error}</p>}  {/* Show error */}
      </div>
      <div className="h-full">
        <img src={image} alt="Cartagena" className="object-cover w-full h-full" />
      </div>
    </div>
  );
}
