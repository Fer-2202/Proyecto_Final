import React from "react";

const teamMembers = [
  {
    name: "Dr. Carlos Jiménez",
    role: "Director General",
    description:
      "Biólogo marino con más de 20 años de experiencia en conservación marina.",
  },
  {
    name: "Dra. María Fernández",
    role: "Directora de Investigación",
    description:
      "Especialista en ecología marina y conservación de arrecifes de coral.",
  },
  {
    name: "Lic. Roberto Méndez",
    role: "Coordinador de Educación",
    description:
      "Educador ambiental con amplia experiencia en programas educativos.",
  },
  {
    name: "Dra. Laura Campos",
    role: "Veterinaria",
    description:
      "Especialista en medicina de fauna marina y rehabilitación de especies.",
  },
];

export default function Team() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-center font-semibold text-xl mb-8">Nuestro Equipo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {teamMembers.map(({ name, role, description }, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            {/* Imagen placeholder */}
            <div className="bg-gray-200 aspect-square flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-teal-600 font-semibold text-lg">{name}</h3>
              <p className="text-gray-600 text-sm mb-2">{role}</p>
              <p className="text-gray-800 text-sm flex-grow">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
