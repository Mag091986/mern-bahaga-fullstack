import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/img/portada-1-2.jpg";

export default function SignIn() {
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
    setError(null);
    try {
      const res = await fetch('/api/auth/signin', {
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
      navigate('/');



    } catch (err) {
      console.error('Error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] justify-center items-center gap-6">
      <div className="flex flex-col">
        <h1 className="text-3xl text-center font-semibold my-7">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email" placeholder="Correo electrónico" className="border p-3 rounded-lg" id="email" onChange={handleChange} />
          <input type="password" placeholder="Contraseña" className="border p-3 rounded-lg" id="password" onChange={handleChange} />
          <button disabled={loading} className="bg-sky-500 border text-white p-3 rounded-lg hover:bg-orange-600 disabled:opacity-50">
            {loading ? 'Loading...' : 'Iniciar sesión'}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>¿No tienes una cuenta?</p>
          <Link to="/sign-up">
            <span className="text-sky-500">Regístrate aquí</span>
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}  {/* Show error */}
      </div>
      <div className="h-full">
        <img src={image} alt="Copas" className="object-cover w-full h-full" />
      </div>
    </div>
  );
}
