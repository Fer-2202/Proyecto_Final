// src/data/especiesData.js

import tortugaImg from '../../../../assets/placeholder.svg';
import mamiferoImg from '../../../../assets/placeholder.svg';
import avesImg from '../../../../assets/placeholder.svg';
import tiburonImg from '../../../../assets/placeholder.svg';
import pecesImg from '../../../../assets/placeholder.svg';
import invertebradoImg from '../../../../assets/placeholder.svg';

export const especies = [
  {
    nombre: 'Tortugas Marinas',
    descripcion: 'Atendemos principalmente tortugas lora, verde, carey y baula afectadas por enmallamiento en redes, ingestión de plásticos, golpes de embarcaciones y fibropapilomatosis.',
    img: tortugaImg
  },
  {
    nombre: 'Mamíferos Marinos',
    descripcion: 'Rescatamos y rehabilitamos delfines, ballenas varadas y manatíes heridos por colisiones con embarcaciones, enredamiento en artes de pesca o enfermedades.',
    img: mamiferoImg
  },
  {
    nombre: 'Aves Marinas y Costeras',
    descripcion: 'Brindamos atención a pelícanos, fragatas, piqueros y otras aves afectadas por contaminación por hidrocarburos, anzuelos o lesiones diversas.',
    img: avesImg
  },
  {
    nombre: 'Tiburones y Rayas',
    descripcion: 'Rescatamos especies de elasmobranquios varados o atrapados en zonas poco profundas, especialmente crías y juveniles en condición vulnerable.',
    img: tiburonImg
  },
  {
    nombre: 'Peces Arrecifales',
    descripcion: 'Recuperamos peces de arrecife afectados por eventos de blanqueamiento, contaminación o tráfico ilegal para el comercio de acuarios.',
    img: pecesImg
  },
  {
    nombre: 'Invertebrados Marinos',
    descripcion: 'Atendemos casos especiales de invertebrados marinos como pulpos, calamares y crustáceos de importancia ecológica o en peligro de extinción.',
    img: invertebradoImg
  }
];

export const estadisticas = [
  {
    valor: 523,
    etiqueta: 'Animales rescatados en 2023'
  },
  {
    valor: 412,
    etiqueta: 'Animales rehabilitados'
  },
  {
    valor: 378,
    etiqueta: 'Animales liberados'
  },
  {
    valor: '72%',
    etiqueta: 'Tasa de éxito'
  }
];
