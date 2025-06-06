// src/components/exhibitsData.js

import Cocodrilo from './../../../assets/img/Figuras_turismo/Figura_turismo_1.jpg';
import Tortuga_T from './../../../assets/img/Figuras_turismo/Figura_turismo_2.jpg';
import Caiman from './../../../assets/img/Figuras_turismo/Figura_turismo_3.jpg';
import IslaDelCoco from './../../../assets/img/Figuras_turismo/Figura_turismo_4.jpg';
import IslaDelCoco2 from './../../../assets/img/Figuras_turismo/Figura_turismo_5.jpg';
import IslaDelCoco3 from './../../../assets/img/Figuras_turismo/Figura_turismo_6.jpg';
import Acuario from './../../../assets/img/Figuras_turismo/Figura_turismo_7.jpeg';
import Acuario2 from './../../../assets/img/Figuras_turismo/Figura_turismo_8.jpeg';
import Raya from './../../../assets/img/Figuras_turismo/Figura_turismo_9.jpg';
import Raya2 from './../../../assets/img/Figuras_turismo/Figura_turismo_10.jpg';
import Tortuga_M from './../../../assets/img/Figuras_turismo/Figura_turismo_11.jpg';
import Tortuga_M2 from './../../../assets/img/Figuras_turismo/Figura_turismo_12.jpg';
import Tiburon from './../../../assets/img/Figuras_turismo/Figura_turismo_13.jpg';
import Tiburon2 from './../../../assets/img/Figuras_turismo/Figura_turismo_14.jpg';

const exhibitsData = [
  {
    value: 'reptiles',
    label: 'Reptiles',
    title: 'Exhibición de Reptiles',
    description: [
      '¡Descubre el fascinante mundo de los reptiles! En esta área podrás conocer sobre cocodrilo, caimán y tortugas terrestres. Aprende sobre sus comportamientos, hábitats naturales y la importante función que cumplen en el ecosistema',
    ],
    facts: [
      'En nuestra Área de Reptiles te invitamos a conocer a:',
      'Morita, un cocodrilo (familia Crocodylidae)',
      'Calipso un curioso caimán (familia Alligatoridae)',
      'Ambos forman parte de nuestros pacientes residentes del centro de rescate',
      'Podrás observar diferentes especies de tortugas terrestres y así generar conciencia para la tenencia responsable de animales silvestres',
    ],
    images: [Cocodrilo, Caiman, Tortuga_T],
    buttons: [
      { label: 'Visita nuestra exhicion de reptiles', link: '/horario-alimento' }
    ],
  },
  {
    value: 'isla-del-coco',
    label: 'Isla del Coco',
    title: 'Exhibición Isla del Coco',
    description: [
      'Te invitamos a vivir una experiencia única en nuestra exhibición “Travesía por la Isla del Coco”. Explora la riqueza natural y la historia de esta emblemática isla a través de una detallada maqueta y un vídeo que muestra su impresionante biodiversidad.',
    ],
    facts: [
      'Te invitamos a conocer la Isla del Coco, uno de los tesoros naturales más valiosos de Costa Rica',
      'En nuestra exhibición “Travesía por la Isla del Coco”, descubrirás la extraordinaria biodiversidad de este Parque Nacional',
      'Declarado Patrimonio Natural de la Humanidad por su importancia ecológica',
      'A través de una maqueta interactiva, podrás observar cómo transcurre un día y una noche en la isla',
      'Apreciando sus paisajes y hábitats. Además, un video inmersivo que mostrará las especies más emblemáticas que habitan este paraíso natural',
    ],
    images: [IslaDelCoco, IslaDelCoco2, IslaDelCoco3],
    buttons: [
      { label: 'Visita nuestra exhibicion', link: '/exhibicion' }
    ],
  },
  {
    value: 'acuarios',
    label: 'Acuarios',
    title: 'Acuarios del Parque',
    description: [
      'En nuestro acuario vas a encontrar más de 20 peceras con diferentes especies del Pacifico, además de la pecera de agua salada más grande de Costa Rica en exhibición.',
    ],
    facts: [
      'Nuestro acuario está orientado a la fauna marina, donde se fomente la educación ambiental, la sensibilización y la conservación de la vida silvestre.',
    ],
    images: [Acuario, Acuario2],
    buttons: [
      { label: 'Visita nuestra acuarios', link: '/acuarios' }
    ],
  },
  {
    value: 'rayas',
    label: 'Rayas',
    title: 'Exhibición de Rayas',
    description: [
      'En nuestro estanque de rayas tendrás la oportunidad única de conocer de cerca a estas asombrosas criaturas marinas. ¿Conoces la diferencia entre rayas y manta rayas?',
    ],
    facts: [
      'Las rayas son animales tranquilos, que se deslizan por el agua con movimientos suaves',
      'Observarlas de cerca es una experiencia inolvidable, ideal tanto para quienes visitan por primera vez como para amantes del mundo marino',
      '¿Sabías que muchas personas confunden a las rayas con las mantarrayas? Aunque a simple vista puedan parecer similares, en realidad son especies diferentes con características únicas.',
    ],
    images: [Raya, Raya2],
    buttons: [
      { label: 'Visita nuestra exhibicion de rayas', link: '/exhibicion-rayas' }
    ],
  },
  {
    value: 'tortugas',
    label: 'Tortugas',
    title: 'Exhibición de Tortugas',
    description: [
      'Ven a descubrir las tortugas marinas en el Parque Marino del Pacifico.',
    ],
    facts: [
      'Las tortugas marinas son unos de los seres más fascinantes y antiguos de nuestro planeta',
      'Con sus habilidades excepcionales y su increíble resistencia',
      'Desde su capacidad para navegar miles de kilómetros hasta su sorprendente longevidad',
      '¡Conoce y aprende cómo podemos protegerlas para garantizar su supervivencia en nuestros océanos!',
    ],
    images: [Tortuga_M2, Tortuga_M],
    buttons: [
      { label: 'Visita nuestra exhibicion de tortugas', link: '/exhibicion-tortugas' }
    ],
  },
  {
    value: 'tiburones',
    label: 'Tiburones',
    title: 'Exhibición de Tiburones',
    description: [
      '¡Conoce más sobre los tiburones Nodriza junto a nosotros!',
    ],
    facts: [
      'El Tiburón gata nodriza (Ginglymostoma cirratum) son una especie caracterizada por tener un comportamiento tranquilo',
      'El nombre "nodriza" se debe a su forma de cuidar a sus crías, y "gata" a las protuberancias en su morro, que recuerdan a los bigotes de un gato',
      'Vive en una variedad de hábitat costeros poco profundos como aguas insulares, arrecifes rocosos o coralinos, áreas arenosas, entre otras, desde la zona entre mareas hasta los 15 metros.',
    ],
    images: [Tiburon, Tiburon2],
    buttons: [
      { label: 'Visita nuestra exhibicion de tiburones', link: '/exhibicion-tiburones' }
    ],
  },
];

export default exhibitsData;
