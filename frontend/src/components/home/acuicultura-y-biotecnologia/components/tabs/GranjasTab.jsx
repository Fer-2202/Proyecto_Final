import { useState } from "react";
import Intro from "./Intro";
import GranjaDetails from "./GranjaDetails";
import GranjasListComponent from "./GranjasListComponent";

import placeholder from "../../../../../assets/placeholder.svg";

const placeholderArray = [placeholder, placeholder, placeholder];

const intro = [
  {
    title: "Granjas Marinas",
    description:
      "Impulsamos proyectos de maricultura en pequeña escala en el litoral pacífico, a través del Programa de Escalamiento de Maricultura en Pequeña Escala en el Litoral Pacífico. Trabajamos junto a comunidades pesqueras, universidades e instituciones públicas para fomentar el cultivo de peces en el mar abierto.",
    imgs: placeholderArray,
  },
];

const granjas = [
  {
    nombre: "Granja Isla Venado",
    descripcion:
      "En Isla Venado, apoyamos a la comunidad local para cultivar peces marinos y camarones en el mar. Esta granja marina está asociada a un restaurante flotante y es un ejemplo de cómo la maricultura puede generar empleo y desarrollo sostenible en zonas costeras.",
    img: placeholder,
    img_species_cultivadas: placeholderArray,
    abaste: placeholder,
    abaste_desc:
      "Desde el LABM criamos peces marinos hasta su etapa juvenil y los entregamos a las granjas marinas. Con esta iniciativa, impulsamos el crecimiento del sector acuícola y promovemos el uso sostenible de nuestros recursos marinos",
    turismo_imgs: placeholderArray,
    turismo_desc:
      "Gracias a este proyecto, el turismo en Isla Venado experimentó un crecimiento exponencial, aumentando la oferta de hospedaje de tan solo 5 cabinas a un total de 49",
  },
  {
    nombre: "Granja Paquera",
    descripcion:
      "Ubicada en el Golfo de Nicoya, esta es una granja que demuestra el potencial de la maricultura comercial responsable en Costa Rica.",
    img: placeholder,
    species: ["Pez", "Camarones", "Algas"],
    img_species_cultivadas: placeholderArray,
    abaste: placeholder,
    abaste_desc:
      "Desde el LABM criamos peces marinos hasta su etapa juvenil y los entregamos a las granjas marinas. Con esta iniciativa, impulsamos el crecimiento del sector acuícola y promovemos el uso sostenible de nuestros recursos marinos",
    turismo_imgs: placeholderArray,
    turismo_desc:
      "El cultivo de especies marinas contribuye al turismo sostenible al reducir la presión sobre la pesca extractiva y generar oportunidades para la educación ambiental y la sensibilización del público.",
  },
  {
    nombre: "Granja MUDECOOP",
    descripcion:
      "Liderada por mujeres, en Manzanillo, Costa de Pájaros se ubica el primer proyecto de la II Etapa del Proyecto de Escalamiento. (En desarrollo).",
    img: placeholder,
    avance: {
      img: placeholder,
      desc: "La plataforma de atención al cliente ya está en pie, construida por manos de mujeres comprometidas con el desarrollo sostenible y la inclusión.",
    },
    avance2: {
      img: placeholder,
      desc: "Las estructuras para las jaulas marinas avanzan con firmeza, gracias al liderazgo técnico y operativo de mujeres de la comunidad.",
    },
    avance3: {
      img: placeholder,
      desc: "La cocina del restaurante toma forma poco a poco, reflejando el esfuerzo colectivo de las mujeres que impulsan este proyecto productivo.",
    },
  },
];

export default function GranjasTab() {
  const [selectedGranja, setSelectedGranja] = useState(null);

  const handleGranjaSelect = (granja) => {
    setSelectedGranja(granja);
  };

  const handleCloseGranjaDetails = () => {
    setSelectedGranja(null);
  };

  return (
    <section className="px-6 py-10 md:px-12 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">{intro[0].title}</h2>
        <Intro data={intro} />
        <hr className="border-t border-gray-300 my-8" />

        {selectedGranja ? (
          <GranjaDetails granja={selectedGranja} onClose={handleCloseGranjaDetails} />
        ) : (
          <GranjasListComponent granjas={granjas} onSelect={handleGranjaSelect} />
        )}
      </div>
    </section>
  );
}
