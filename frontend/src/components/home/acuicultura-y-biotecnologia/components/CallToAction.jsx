import React from 'react';

 function CallToAction() {
  return (
    <section className="py-12 px-6 text-center">
      <h2 className="text-2xl font-bold text-teal-600 mb-4">
        <span className="text-3xl">¿</span>Interesado en Nuestros Servicios<span className="text-3xl">?</span>
      </h2>
      <p className="text-gray-700 max-w-xl mx-auto mb-6">
        Si está interesado en nuestros servicios de capacitación, asistencia técnica o colaboración en investigación, contáctenos para obtener más información.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <button className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 transition-colors">
          Solicitar Información
        </button>
        <button className="border border-teal-500 text-teal-600 px-6 py-2 rounded hover:bg-teal-50 transition-colors">
          Agendar una Visita
        </button>
      </div>
    </section>
  );
}

export default CallToAction;
