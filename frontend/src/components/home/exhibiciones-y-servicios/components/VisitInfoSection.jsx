// src/components/VisitInfoSection.jsx

export default function VisitInfoSection() {
  return (
    <section className="my-12 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

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
            <li>
              <span className="font-medium">Alimentación de Manatíes:</span> <span className="font-semibold">11:00 y 14:00</span>
            </li>
            <li>
              <span className="font-medium">Alimentación de Rayas:</span> <span className="font-semibold">10:30 y 15:00</span>
            </li>
          </ul>
        </div>

        {/* Tarifas */}
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h3 className="text-lg font-bold text-teal-600 mb-4">Tarifas</h3>
          <ul className="space-y-2 text-gray-700">
            <li><span className="font-medium">Adultos:</span> ₡2900</li>
            <li><span className="font-medium">Niños (4-11):</span> ₡1600</li>
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
