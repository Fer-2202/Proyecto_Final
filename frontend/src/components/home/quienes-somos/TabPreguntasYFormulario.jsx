import React, { useState } from "react";

export default function TabPreguntasYFormulario() {
  const [active, setActive] = useState(null);

  const faqs = [
    {
      pregunta: "¿Cómo puedo acceder a los informes financieros del parque?",
      respuesta: "Todos los informes están disponibles en la pestaña de Documentos, ordenados por año y tipo. Puedes verlos, descargarlos o compartirlos directamente desde la plataforma.",
    },
    {
      pregunta: "¿Con qué frecuencia se actualiza la información pública?",
      respuesta: "La información institucional se actualiza trimestralmente o cuando hay nuevas resoluciones, convenios o informes relevantes.",
    },
    {
      pregunta: "¿Puedo solicitar acceso a documentos no publicados?",
      respuesta: "Sí. Puedes hacer una solicitud formal mediante el formulario de esta sección. Evaluaremos tu petición de acuerdo con nuestras políticas de acceso a la información.",
    },
    {
      pregunta: "¿Qué requisitos debo cumplir para presentar una solicitud?",
      respuesta: "Debes completar todos los campos del formulario, justificar la necesidad del documento y proporcionar un medio de contacto.",
    },
  ];

  const toggle = (i) => setActive(active === i ? null : i);

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-8">
      {/* Preguntas Frecuentes */}
      <section>
        <h3 className="text-teal-600 font-bold text-sm mb-2">Preguntas Frecuentes</h3>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, i) => (
            <div key={i} className="py-4">
              <button
                onClick={() => toggle(i)}
                className="w-full text-left font-semibold text-gray-800 flex justify-between items-center"
              >
                {faq.pregunta}
                <span className="text-teal-600 text-xl">
                  {active === i ? "−" : "+"}
                </span>
              </button>
              {active === i && <p className="text-sm text-gray-600 mt-2">{faq.respuesta}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Formulario de Solicitud */}
      <section>
        <h3 className="text-teal-600 font-bold text-sm mb-2">Formulario de Solicitud de Información</h3>
        <p className="text-sm text-gray-600 mb-4">Completa este formulario para realizar una solicitud oficial de acceso a la información pública.</p>
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre completo"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Motivo de la solicitud"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
          <textarea
            placeholder="Descripción detallada de la información requerida"
            className="border border-gray-300 rounded px-4 py-2 w-full min-h-[100px]"
            required
          />
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
          >
            Enviar solicitud
          </button>
        </form>
      </section>
    </div>
  );
}
