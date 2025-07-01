import React, { useEffect, useState } from "react";
import QuienesSomos from "../quienes-somos/QuienesSomos";
import contaminacion from "@assets/img/contaminacion_1.jpg";
import ExhibitIntro from "./components/ExhibitIntro";
import MarineExhibit from "./components/MarineExhibit";
import { getTickets } from "@api/tickets";
import EducationPrograms from "./components/EducationPrograms";
/* import EducationalMaterials from './components/EducationalMaterials' */
/* import materialsData from './data/materialsData' */
import FeatureCard from "./../FeatureCard";
import { Link } from "react-router-dom";
import { Calendar, Users, ShoppingCart, Fish, Award, BookOpen,} from "lucide-react";
import { getServiciosEducativos } from "@api/servicesEducation";


function Servicios_Educativos() {
  const [educationData, setEducationData] = useState([]);
  const [ticketsData, setTicketsData] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await getServiciosEducativos();
        setEducationData(services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await getTickets();
        setTicketsData(tickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  console.log(educationData);
  console.log(ticketsData);

  return (
    <div className="mt-23">
      <QuienesSomos
        title={"Servicios Educativos"}
        description={"Programas educativos para los jovenes"}
        img={contaminacion}
      />
      <ExhibitIntro
        description={
          "El Parque Marino ofrece una variedad de talleres educativos diseñados para crear conciencia y promover la protección de los ecosistemas marino-costeros, el objetivo de estos talleres es que los niños y jóvenes aprendan jugando."
        }
        title={"Nuestros Servicios Educativos"}
      />
      {educationData.length > 0 && <MarineExhibit data={educationData} />}
      <EducationPrograms />
      {/*  <EducationalMaterials data={materialsData} /> */}

      {/*Cards de Precios / Horarios / Compra Ticket */}
      <div className="grid grid-cols-3 gap-4 mb-10 mr-10 ml-10">
        <FeatureCard
          icon={<Calendar className="text-teal-500 w-5 h-5" />}
          title="Horario"
          description={
            <>
              <p className="text-gray-500">Martes a Domingo</p>
              <p className="text-gray-700 font-medium text-base">
                9:00am - 4:30pm
              </p>
              <p className="text-red-500 text-xs mt-1.5">Cerrado los Lunes</p>
            </>
          }
        />
        <FeatureCard
          icon={<Users className="w-5 h-5 text-teal-500" />}
          title="Tarifas"
          description={
            <>
              {ticketsData.length > 0 ? (
                <ul className="space-y-1.5 text-gray-500 text-sm">
                  {ticketsData.map((ticket, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{ticket.name}:</span>
                      <span className="text-gray-700 font-medium">
                        ₡{ticket.price}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  No hay tarifas disponibles.
                </p>
              )}
            </>
          }
        />
        <FeatureCard
          icon={<ShoppingCart className="w-5 h-5 text-teal-500" />}
          title="COMPRA DE ENTRADAS"
          description={
            <>
              <p className="text-gray-500 text-sm mb-2.5">
                Adquiere tus entradas en línea y evita filas
              </p>
              <button className="w-full bg-teal-500 text-white py-1.5 px-4 rounded hover:bg-teal-600 transition-colors text-sm">
                <Link to="/purchase-form/ticketera"> Comprar Ahora</Link>
              </button>
            </>
          }
        />
      </div>
    </div>
  );
}

export default Servicios_Educativos;