// src/components/educationData.js

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

const educationData = [
  {
    value: 'don-pulpo',
    label: 'Don Pulpo',
    title: '',
    description: ['Enseñar a los niños sobre características distintivas de los pulpos mediante actividades.'],
    facts: [
      'Generalidades del pulpo.',
      'Dirigido para niños de 5 a 6 años.',
      'Máximo 10 a 15 personas.',
      'Tiempo:30 minutos.'
    ],
    images: [pulpo, pulpo2],
    buttons: [
      { label: 'Inscribirse', link: '/inscripcion-don-pulpo' },
      { label: 'Ver Guía', link: '/guia-don-pulpo.pdf' }
    ],
  },
  {
    value: 'contaminacion-de-los-oceanos',
    label: 'Contaminación de los océanos',
    title: '',
    description: ['Enseñar a los niños las consecuencias que traen los desechos sólidos en el océano al no estar clasificados'],
    facts: [
      'Animales y mamíferos marinos.',
      'Estratos del océano.',
      'Problemática que enfrentan las especies marinas.',
      'Contaminación de los océanos.',
      'Clasificación de los desechos sólidos.'
    ],
    images: [Contaminacion, Contaminacion2],
    // sin botones (opcional)
  },
  {
    value: 'que-paso-con-la-tortuga-julia',
    label: '¿Qué pasó con la Tortuga Julia?',
    title: '',
    description: ['Enseñar a niños mediante imágenes y dramatización el ciclo de vida de la tortuga marina.'],
    facts: [
      'Ciclo de vida de las especies.',
      'Diferencias entre tortugas marinas de Costa Rica.',
      'Clasificación de los residuos.',
      'Formas de reutilizar algunos residuos valorizables.'
    ],
    images: [Julia, Julia2],
    buttons: [
      { label: 'Inscribirse', link: '/inscripcion-tortuga-julia' }
    ],
  },
  {
    value: 'monitoreo-de-residuos',
    label: 'Monitoreo de Residuos',
    title: '',
    description: ['Analizar la contaminación frente a la playa frente al Parque Marino mediante un monitoreo al azar de residuos sólidos con el fin de generar conciencia ambiental.'],
    facts: [
      'Recolección de residuos sólidos en la playa.',
      'Clasificación valorización y no valorizables.',
      'Ciencia ciudadana.'
    ],
    images: [Monitoreo, Monitoreo2],
    // sin botones
  },
  {
    value: 'biologo-por-un-dia',
    label: 'Biólogo por un día',
    title: '',
    description: ['El objetivo de este taller es explicar la diferencia entre un vertebrado e invertebrado también de poder identificar tanto las partes externas como internas de las dos especies que se van a tomar como ejemplo para la disección, además explicar las funciones de las partes de estos animales'],
    facts: [
      'Diferencias entre vertebrados e invertebrados.',
      'Características generales de un pez.',
      'Disección de un atún y calamar.',
      'Características generales de un molusco.',
      'Enfermedades comunes de los peces.'
    ],
    images: [Biologo, Biologo2],
    buttons: [
      { label: 'Solicitar Taller', link: '/solicitar-biologo' }
    ],
  },
];

export default educationData;
