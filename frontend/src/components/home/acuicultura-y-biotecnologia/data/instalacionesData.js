// src/data/instalacionesData.js
import placeholder from '../../../../assets/placeholder.svg';

export const hospital = {
    titulo: 'Hospital Veterinario',
    descripcion:
      'Nuestro hospital veterinario está equipado con tecnología de punta para el diagnóstico y tratamiento de fauna marina. Contamos con sala de cirugía, laboratorio clínico, equipo de diagnóstico por imagen y unidad de cuidados intensivos.',
    listaTitulo: 'Equipamiento:',
    items: [
      'Equipo de radiografía digital',
      'Ultrasonido portátil',
      'Analizador hematológico',
      'Microscopios de alta resolución',
      'Equipos de monitoreo vital'
    ],
    img: placeholder
  };
  
  export const piscinas = {
    titulo: 'Piscinas de Rehabilitación',
    descripcion:
      'Disponemos de un complejo de piscinas de diferentes tamaños y profundidades para la rehabilitación de distintas especies marinas...',
    listaTitulo: 'Características:',
    items: [
      'Piscinas individuales para cuarentena',
      'Piscinas grupales para socialización',
      'Piscinas de agua dulce y salada',
      'Sistemas de recirculación y tratamiento de agua',
      'Monitoreo continuo de parámetros del agua'
    ],
    img: placeholder
  };
  
  export const areas = [
    {
      nombre: 'Área de Tortugas',
      descripcion: 'Espacio especializada para la rehabilitación de tortugas marinas...',
      icon: 'Turtle'
    },
    {
      nombre: 'Área de Mamíferos',
      descripcion: 'Instalaciones diseñadas para mamíferos marinos...',
      icon: 'Dog'
    },
    {
      nombre: 'Área de Aves',
      descripcion: 'Espacio adaptado para aves marinas y costeras...',
      icon: 'Feather'
    },
    {
      nombre: 'Laboratorio',
      descripcion: 'Laboratorio equipado para análisis clínicos...',
      icon: 'FlaskConical'
    },
    {
      nombre: 'Sala de Necropsia',
      descripcion: 'Área para realizar necropsias con fines científicos...',
      icon: 'Microscope'
    },
    {
      nombre: 'Unidad Móvil',
      descripcion: 'Vehículo equipado para rescates y transporte especializado...',
      icon: 'Truck'
    }
  ];
  