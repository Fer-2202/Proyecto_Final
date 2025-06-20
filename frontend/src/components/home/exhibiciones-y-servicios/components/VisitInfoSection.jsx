// src/components/VisitInfoSection.jsx
import FeatureCard from "../../FeatureCard";
import { Calendar, Users, ShoppingCart, Fish, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function VisitInfoSection() {
  return (
    <section className="my-12 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

<<<<<<< HEAD
        {/* Horarios de Visita */}
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h3 className="text-lg font-bold text-teal-600 mb-4">Horarios de Visita</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <span className="font-medium">Lunes:</span> <span className="text-red-600 font-semibold">Cerrado</span>
            </li>
            <li>
              <span className="font-medium">Martes - Domingo:</span> <span className="font-semibold">9:00 - 16:30</span>
            </li>
          </ul>
        </div>

        {/* Tarifas */}
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h3 className="text-lg font-bold text-teal-600 mb-4">Tarifas</h3>
          <ul className="space-y-2 text-gray-700">
            <li><span className="font-medium">Adultos:</span> ₡2900</li>
            <li><span className="font-medium">Niños (4 años-11 años):</span> ₡1600</li>
            <li><span className="font-medium">Estudiantes:</span> ₡1300</li>
            <li><span className="font-medium">Adultos mayores:</span> ₡700</li>
            <li><span className="font-medium">Extranjeros:</span> $10 / $5</li>
          </ul>
        </div>

        {/* Recomendaciones */}
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h3 className="text-lg font-bold text-teal-600 mb-4">Recomendaciones</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Usar ropa y calzado cómodos</li>
            <li>Traer protector solar y repelente</li>
            <li>Traer una botella de agua reutilizable</li>
            <li>No alimentar a los animales</li>
            <li>No usar flash en las fotografías</li>
            <li>Seguir las indicaciones del personal</li>
          </ul>
        </div>
=======
>>>>>>> a448edf3276c0b9ea21c6bdf8378b9cc26a16c95

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
