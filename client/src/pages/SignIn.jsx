import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/img/portada-1-2.jpg";
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user); // Get loading and error from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart()); // Start the loading state
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message)); // Dispatch failure with the error message
        return;        
      }
      dispatch(signInSuccess(data)); // Dispatch success with user data
      navigate('/'); // Navigate to the home page
    } catch (err) {
      dispatch(signInFailure(err.message)); // Catch and dispatch the error
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] justify-center items-center gap-6 p-3">
      <div className="flex flex-col">
        <h1 className="text-3xl text-center font-semibold my-7">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading} // Disable button when loading
            className="bg-sky-500 border text-white p-3 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
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
