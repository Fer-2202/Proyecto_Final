// src/components/VisitInfoSection.jsx
import FeatureCard from "../../FeatureCard";
import { Calendar, Users, ShoppingCart, Fish, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function VisitInfoSection() {
  return (
    <section className="my-12 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">


                  <FeatureCard
            icon={<Calendar className="text-teal-500 w-5 h-5"/>}
            title="Horario"
            description={<>
              <p className="text-gray-500">Martes a Domingo</p>
              <p className="text-gray-700 font-medium text-base">9:00am - 4:30pm</p>
              <p className="text-red-500 text-xs mt-1.5">Cerrado los Lunes</p>
            </>} 
          />
          <FeatureCard 
            icon={<Users className="w-5 h-5 text-teal-500"/>}
            title="Tarifas"
            description={<>
              <ul className="space-y-1.5 text-gray-500 text-sm">
                <li className="flex justify-between items-center">
                  <span>Adultos:</span>
                  <span className="text-gray-700 font-medium">₡2900</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Niños (4-11):</span>
                  <span className="text-gray-700 font-medium">₡1600</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Adulto mayor / Discapacitado:</span>
                  <span className="text-gray-700 font-medium">₡1600</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Extranjeros adultos:</span>
                  <span className="text-gray-700 font-medium">$10</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Extranjeros niños (4-11):</span>
                  <span className="text-gray-700 font-medium">$5</span>
                </li>
              </ul>
            </>} 
          />
          <FeatureCard
            icon={<ShoppingCart className="w-5 h-5 text-teal-500"/>}
            title="COMPRA DE ENTRADAS"
            description={<>
              <p className="text-gray-500 text-sm mb-2.5">Adquiere tus entradas en línea y evita filas</p>
              <button className="w-full bg-teal-500 text-white py-1.5 px-4 rounded hover:bg-teal-600 transition-colors text-sm">
                <Link to="/purchase-form/ticketera"> Comprar Ahora</Link>
              </button>
            </>}
          />
      </div>

      {/* CTA */}
      <div className="bg-teal-600 text-white text-center py-8 rounded-lg shadow">
        <h2 className="text-xl md:text-2xl font-bold mb-2">¡Planifica tu Visita Hoy!</h2>
        <p className="mb-4">
          Descubre la fascinante biodiversidad marina de Costa Rica en nuestras exhibiciones.
          Compra tus entradas en línea y evita filas.
        </p>
        <button className="bg-white text-teal-600 font-semibold px-6 py-2 rounded shadow hover:bg-gray-100 transition">
          Comprar Entradas
        </button>
      </div>
    </section>
  );
}
