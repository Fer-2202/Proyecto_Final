// src/components/exhibitsData.js

import pulpo from './../../../assets/img/pul.jpg';
import pulpo2 from './../../../assets/img/Pulpo.jpg';
import Contaminacion from './../../../assets/img/conta2.jpg';
import Contaminacion2 from './../../../assets/img/contaminacion_1.jpg';
import Julia from './../../../assets/img/julia.jpg';
import Julia2 from './../../../assets/img/Tjulia.jpg';
import Monitoreo from './../../../assets/img/monitoreo.jpg';
import Monitoreo2 from './../../../assets/img/monitoreo_2.jpg';
import Biologo from './../../../assets/img/massi.jpg';
import Biologo2 from './../../../assets/img/Pes.jpg';
import Tortuga_M from './../../../assets/img/Figuras_turismo/Figura_turismo_11.jpg';
import Tortuga_M2 from './../../../assets/img/Figuras_turismo/Figura_turismo_12.jpg';
import Tiburon from './../../../assets/img/Figuras_turismo/Figura_turismo_13.jpg';
import Tiburon2 from './../../../assets/img/Figuras_turismo/Figura_turismo_14.jpg';

const educationData = [
  {
    value: 'don-pulpo',
    label: 'Don Pulpo',
    title: 'Enseñar a los niños sobre características distintivas de los pulpos mediante actividades.',
    description: [
      '',
    ],
    facts: [
      'Generalidades del pulpo.',
      'Dirigido para niños de 5 a 6 años.',
      'Máximo 10 a 15 personas.',
      'Tiempo:30 minutos.'
    ],
    images: [pulpo, pulpo2],
  },
  {
    value: 'Contaminación-de-los-océanos',
    label: 'Contaminación de los océanos',
    title: 'Enseñar a los niños las consecuencias que traen los desechos sólidos en el océano al no estar clasificados.',
    description: [
      '',
    ],
    facts: [
      'Animales y mamíferos marinos.',
      'Estratos del océano.',
      'Problemática que enfrentan las especies marinas.',
      'Contaminación de los océanos.',
      'Clasificación de los desechos sólidos.',
    ],
    images: [Contaminacion, Contaminacion2],
  },
  {
    value: 'que-paso-con-la-tortuga-julia',
    label: '¿Qué pasó con la Tortuga Julia?',
    title: 'Enseñar a niños mediante imágenes y dramatización el ciclo de vida de la tortuga marina.',
    description: [
      '',
    ],
    facts: [
      'Ciclo de vida de las especies.',
      'Diferencias entre tortugas marinas de Costa Rica.',
      'Clasificación de los residuos.',
      'Formas de reutilizar algunos residuos valorizables.'
    ],
    images: [Julia, Julia2],
  },
  {
    value: 'monitoreo-de-residuos',
    label: 'Monitoreo de Residuos',
    title: 'Analizar la contaminación frente a la playa frente al Parque Marino mediante un monitoreo al azar de residuos sólidos con el fin de generar conciencia ambiental.',
    description: [
      ''
    ],
    facts: [
      'Recolección de residuos sólidos en la playa.',
      'Clasificación valorización y no valorizables.',
      'Ciencia ciudadana.'
    ],
    images: [Monitoreo, Monitoreo2],
  },
  {
    value: 'biologo-por-un-dia',
    label: 'Biólogo por un día',
    title: 'El objetivo de este taller es explicar la diferencia entre un vertebrado e invertebrado también de poder identificar tanto las partes externas como internas de las dos especies que se van a tomar como ejemplo para la disección, además explicar las funciones de las partes de estos animales',
    description: [
      '',
    ],
    facts: [
      'Diferencias entre vertebrados e invertebrados.',
      'Características generales de un pez.', 
      'Disección de un atún y calamar.',
      'Características generales de un molusco.',
      'Enfermedades comunes de los peces.'
    ],
    images: [Biologo, Biologo2],
  },
];

export default educationData;
