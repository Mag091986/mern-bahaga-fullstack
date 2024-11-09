import React from 'react';
import { FaGlassCheers, FaGlobe, FaHeart } from "react-icons/fa";


export default function About() {
  return (
    <div className="text-center text-white">
      {/* Header Section */}
      <div className="text-gray-600 py-16 font-bold text-4xl">
        Nosotros
      </div>

      {/* Mission, Elegance, and Vision Content */}
      <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16">

        {/* Mission Section */}
        <div className="text-sm md:text-base flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-600">Misión</h3>
          <div className="border-t-2 text-gray-600 w-10 mb-4"></div>
          <p className="text-gray-600">
            Nuestra misión es ofrecer un servicio excepcional en la planificación y organización de eventos familiares y empresariales, proporcionando espacios y servicios de alta calidad que superen las expectativas de nuestros clientes.
          </p>
        </div>

        {/* Elegance and Distinction Section */}
        <div className="text-sm md:text-base flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-600">Elegancia y distinción</h3>
          <div className="border-t-2 text-gray-600 w-10 mb-4"></div>
          <p className="text-gray-600">
            ¡Nuestro compromiso y profesionalismo es con usted! ¡Ofrecemos una amplia gama de productos y servicios, la mejor asesoría en eventos y espacios!
          </p>
        </div>

        {/* Vision Section */}
        <div className="text-sm md:text-base flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-600">Visión</h3>
          <div className="border-t-2 text-gray-600 w-10 mb-4"></div>
          <p className="text-gray-600">
            Nuestra visión es ser reconocidos como la principal empresa en la organización de eventos, destacando por nuestra excelencia, innovación y dedicación en cada detalle, y por brindar experiencias memorables y satisfactorias a nuestros clientes.
          </p>
        </div>

      </div>

      {/* Header Section */}
      <div className="bg-orange-500 py-16 font-bold text-4xl">
        Nuestros Servicios
      </div>

      {/* Mission, Elegance, and Vision Content */}
      <div className="bg-orange-500 py-6 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16">

        {/* Mission Section */}
        <div className="text-sm md:text-base flex flex-col items-center">
          <FaGlassCheers size={50} />
          <h3 className="text-2xl font-bold mb-4">Eventos Familiares</h3>
          <div className="border-t-2 border-white w-10 mb-4"></div>
          <p>
            Celebra momentos especiales con tus seres queridos en nuestro espacio diseñado para eventos familiares.ofrecemos un ambiente acogedor y servicios personalizados para garantizar que tu evento sea memorable.
          </p>
        </div>

        {/* Elegance and Distinction Section */}
        <div className="text-sm md:text-base flex flex-col items-center">
          <FaGlobe size={40} />
          <h3 className="text-2xl font-bold mb-4">Eventos Empresariales</h3>
          <div className="border-t-2 border-white w-10 mb-4"></div>
          <p>
            Impresiona a tus clientes y empleados con nuestro espacio para eventos empresariales. Desde conferencias hasta cenas de gala, ofrecemos instalaciones modernas y servicios profesionales para satisfacer todas tus necesidades corporativas.
          </p>
        </div>

        {/* Vision Section */}
        <div className="text-sm md:text-base flex flex-col items-center">
          <FaHeart size={40}/>
          <h3 className="text-2xl font-bold mb-4">Planeación de Bodas</h3>
          <div className="border-t-2 border-white w-10 mb-4"></div>
          <p>
            Haz realidad la boda de tus sueños con la ayuda de nuestro experimentado equipo de wedding planners.
          </p>
        </div>

      </div>


    </div>

  );
}
