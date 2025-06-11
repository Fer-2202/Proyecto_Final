import React from 'react'
import { GraduationCap, FlaskConical, Handshake } from 'lucide-react'

function OportunidadesYCiencia() {
  return (
    <div className="px-4 md:px-16 py-16 space-y-24">

      {/* Oportunidades de Investigación */}
      <div className="space-y-10">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Oportunidades de Investigación
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            {
              titulo: 'Tesis de Grado y Posgrado',
              descripcion:
                'Ofrecemos oportunidades para estudiantes universitarios que deseen desarrollar sus tesis de grado o posgrado en temas relacionados con nuestras líneas de investigación.',
              icono: GraduationCap,
            },
            {
              titulo: 'Pasantías de Investigación',
              descripcion:
                'Programa de pasantías para estudiantes y profesionales interesados en adquirir experiencia en investigación marina aplicada a la conservación.',
              icono: FlaskConical,
            },
            {
              titulo: 'Voluntariado Científico',
              descripcion:
                'Oportunidades para participar como voluntario en nuestros proyectos de investigación, apoyando en trabajo de campo y laboratorio.',
              icono: Handshake,
            },
          ].map(({ titulo, descripcion, icono: Icon }, i) => (
            <div key={i} className="rounded-lg p-6 text-center bg-white shadow-sm">
              <div className="flex justify-center text-4xl text-teal-600 mb-4">
                <Icon />
              </div>
              <h3 className="text-teal-700 font-bold text-base mb-2">{titulo}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{descripcion}</p>
              <button className="bg-teal-500 hover:bg-teal-600 text-white text-sm px-6 py-2 rounded font-semibold">
                Aplicar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Ciencia Ciudadana */}
      <div className="border-2 border-teal-300 rounded-md px-6 md:px-12 py-10 bg-white">
        <h2 className="text-center text-2xl font-bold text-teal-700 mb-8">Ciencia Ciudadana</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-teal-700 font-semibold text-base mb-2">Participa en Nuestros Proyectos</h3>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              La ciencia ciudadana es una herramienta valiosa para la investigación y conservación marina. A través de
              nuestros programas de ciencia ciudadana, personas de todas las edades y formaciones pueden contribuir a
              la generación de conocimiento científico.
            </p>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">
              Actualmente contamos con varios proyectos en los que puedes participar, desde el monitoreo de playas de
              anidación de tortugas marinas hasta el registro de avistamientos de especies marinas y la recolección de
              datos sobre contaminación en playas.
            </p>
            <button className="bg-teal-500 hover:bg-teal-600 text-white text-sm px-6 py-2 rounded font-semibold">
              Unirse a un Proyecto
            </button>
          </div>
          <div>
            <h3 className="text-teal-700 font-semibold text-base mb-4">Proyectos Actuales</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>
                <strong className="text-teal-700">Monitoreo de Playas:</strong> Registro de anidaciones de tortugas
                marinas y amenazas en playas.
              </li>
              <li>
                <strong className="text-teal-700">Avistamientos Marinos:</strong> Registro de avistamientos de
                tiburones, rayas, delfines y otras especies marinas.
              </li>
              <li>
                <strong className="text-teal-700">Monitoreo de Arrecifes:</strong> Evaluación de la salud de arrecifes
                de coral por buceadores recreativos.
              </li>
              <li>
                <strong className="text-teal-700">Basura Marina:</strong> Recolección y clasificación de desechos en
                playas y zonas costeras.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OportunidadesYCiencia;
