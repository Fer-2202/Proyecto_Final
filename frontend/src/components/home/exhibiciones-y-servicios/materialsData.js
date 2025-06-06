// src/components/materialsData.js

import guiaImage from './../../../assets/placeholder.svg';
import librosImage from './../../../assets/placeholder.svg';
import recursosImage from './../../../assets/placeholder.svg';
import postersImage from './../../../assets/placeholder.svg';

const materialsData = [
  {
    title: 'Guías Didácticas',
    description: 'Materiales para docentes con actividades y contenidos sobre biología marina.',
    image: guiaImage,
    downloadLink: '/materiales/guias-didacticas.pdf',
  },
  {
    title: 'Libros Infantiles',
    description: 'Cuentos y libros ilustrados sobre el océano y sus habitantes.',
    image: librosImage,
    downloadLink: '/materiales/libros-infantiles.pdf',
  },
  {
    title: 'Recursos Digitales',
    description: 'Videos, presentaciones y juegos interactivos sobre conservación marina.',
    image: recursosImage,
    downloadLink: '/materiales/recursos-digitales.zip',
  },
  {
    title: 'Pósters Educativos',
    description: 'Materiales visuales sobre especies marinas y ecosistemas de Costa Rica.',
    image: postersImage,
    downloadLink: '/materiales/posters-educativos.pdf',
  },
];

export default materialsData;
