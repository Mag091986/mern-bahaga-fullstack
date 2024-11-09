import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [hourListings, setHourListings] = useState([]);
  const [dayListings, setDayListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=3');
        const data = await res.json();
        setOfferListings(data);
        fetchHourListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchHourListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=hour&limit=3');
        const data = await res.json();
        setHourListings(data);
        fetchDayListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDayListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=day&limit=3');
        const data = await res.json();
        setDayListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/*Encabezado del Home*/}
      <div className="flex flex-col gap-4 p-20 px-10 max-w-6xl mx-auto">
        <h1 className="text-gray-600 font-bold text-5xl">Nuestro sello es la <span className="text-orange-500">Excelencia</span></h1>
        <div className="text-gray-500 text-s sm:text-m">En Bahaga Eventos, nos comprometemos a superar tus expectativas en cada interacción.
          <br />
          <br />Desde nuestra atención personalizada hasta nuestra meticulosa atención al detalle, nos esforzamos por brindar un servicio excepcional que garantice la plena satisfacción de nuestros clientes.</div>
        <Link to={"/search"} className="text-l sm:text-m text-orange-500 font-bold hover:underline">
          Ver más...
        </Link>
      </div>

      {/*Carrusel*/}

      <Swiper navigation>
      {
        offerListings && offerListings.length > 0 && offerListings.map((listing) => (
          <SwiperSlide>
<div style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:"cover"}} className="h-[500px]" key={listing._id}></div>
          </SwiperSlide>
        )        
        )
      }
      </Swiper>

      {/*Galería de Salones*/}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-6 my-10">
        {offerListings && offerListings.length > 0 && (
            <div className="font-semibold">
              <div className="font-bold my-3">
                <h2 className="text-2xl font-bold text-gray-600">Salones en Descuento</h2>
                <Link className="text-sm text-orange-600 hover:underline" to={'/search?offer=true'}>Ver más ofertas...</Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )}
        {dayListings && dayListings.length > 0 && (
            <div className="font-semibold">
              <div className="font-bold my-3">
                <h2 className="text-2xl font-bold text-gray-600">Salones por dias</h2>
                <Link className="text-sm text-orange-600 hover:underline" to={'/search?type=day'}>Ver más salones...</Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  dayListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )}
        {hourListings && hourListings.length > 0 && (
            <div className="font-semibold">
              <div className="font-bold my-3">
                <h2 className="text-2xl font-bold text-gray-600">Alquiler por horas</h2>
                <Link className="text-sm text-orange-600 hover:underline" to={'/search?type=hour'}>Ver más salones...</Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  hourListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
