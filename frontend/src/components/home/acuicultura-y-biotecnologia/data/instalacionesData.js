// src/data/instalacionesData.js
import placeholder from '../../../../assets/placeholder.svg';

export const piscinas = {
    titulo: 'Piscinas y Tanques de Rehabilitación',
    descripcion:
      'Espacios con agua controlada donde los animales pueden recuperarse, nadar, y rehabilitarse gradualmente. Para las tortugas marinas, esto es crucial.',
    listaTitulo: 'Equipamiento:',
    items: [
      'Equipo de radiografía digital',
      'Ultrasonido portátil',
      'Analizador hematológico',
      'Microscopios de alta resolución',
      'Equipos de monitoreo vital'
    ],
    img: placeholder,
  };
  
  export const hospital = {
    titulo: 'Áreas de Cuarentena y Primeros Auxilios',
    descripcion:
      'Espacios aislados donde los animales recién llegados o gravemente heridos pueden ser evaluados, estabilizados y recibir tratamiento inicial sin riesgo de contagio a otros.',
    listaTitulo: 'Características:',
    items: [
      'Piscinas individuales para cuarentena',
      'Piscinas de agua dulce',
      'Sistemas de recirculación y tratamiento de agua',
      'Monitoreo continuo de parámetros del agua'
    ],
    img: placeholder
  };

  export const lab_Clinico = {
    titulo: 'Laboratorio Veterinario o Clínico',
    descripcion:
      'Para realizar diagnósticos, análisis de sangre, y otros procedimientos médicos.',
    listaTitulo: 'Características:',
    items: [
      'Piscinas individuales para cuarentena',
      'Piscinas grupales para socialización',
      'Piscinas de agua dulce',
      'Sistemas de recirculación y tratamiento de agua',
      'Monitoreo continuo de parámetros del agua'
    ],
    img: placeholder
  }
  
  export const espacio_Observarcion = {
    titulo: 'Espacios de Observación (exhibición externa)',
    descripcion:
      'Algunos animales que no son aptos para la liberación definitiva pueden permanecer en exhibición para fines educativos, como se mencionó anteriormente, y estas áreas son parte de su cuidado continuo.',
    listaTitulo: 'Características:',
    items: [
      'Piscinas individuales para cuarentena',
      'Piscinas grupales para socialización',
      'Piscinas de agua dulce y salada',
      'Sistemas de recirculación y tratamiento de agua',
      'Monitoreo continuo de parámetros del agua'
    ],
    img: placeholder
  }
  export const areas = [
    {
      nombre: 'Área de Tortugas',
      descripcion: 'Este es un espacio especializado y crucial para la rehabilitación de tortugas marinas. Aquí se reciben, evalúan y brindan cuidados a tortugas que han sido encontradas heridas, enfermas, varadas o con problemas de conservación',
      icon: 'Turtle'
    },
    {
      nombre: 'Área de Aves',
      descripcion: ' Este espacio está adaptado para aves marinas y costeras que necesitan rescate. Esto puede incluir aves como pelícanos, fragatas, gaviotas o cormoranes que han sido afectadas.', 
      /* descripcion:'El área proporciona aviarios seguros donde las aves pueden recuperarse, recibir alimentación y atención veterinaria hasta que estén listas para ser liberadas.', */
      icon: 'Feather'
    },
    {
      nombre: 'Laboratorio',
      descripcion: 'Es un laboratorio equipado para análisis clínicos esenciales para el proceso de rescate y rehabilitación. Aquí se realizan pruebas de sangre, heces, análisis de tejidos, identificación de parásitos y otras pruebas diagnósticas',
      icon: 'FlaskConical'
    },
    {
      nombre: 'Sala de Necropsia',
      descripcion: 'Esta es un área dedicada a realizar necropsias (autopsias en animales) con fines científicos. La necropsia es vital para determinar la causa de la muerte.',
      icon: 'Microscope'
    },
    {
      nombre: 'Unidad Móvil',
      descripcion: 'Se trata de un vehículo equipado para rescates y transporte especializado de animales marinos. Esta unidad es fundamental para responder rápidamente a llamadas de animales varados o heridos en diferentes puntos de la costa.',
      icon: 'Truck'
    }
  ];
  