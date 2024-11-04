import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contacto: <span className='font-semibold'>{landlord.username}</span>{' '}
            Asunto: {' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Escriba su mensaje aquí...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
          to={`mailto:${landlord.email}?subject=Alquilar ${listing.name}&body=${message}`}
          className='bg-blue-900 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Enviar mensaje          
          </Link>
        </div>
      )}
    </>
  );
}