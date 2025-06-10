// src/data/historiasData.js

import lunaImg from '../../../../assets/placeholder.svg';
import Moa from '../../../../assets/img/Moana_Ei17/IMG_20170808_145752.jpg'
import Rome from '../../../../assets/img/Romelia_Lo62/IMG_9401.JPG'
import Care from '../../../../assets/img/Carey_Ei56/pro-L7kipeIW.jpeg'



export const historias = [
  {
    nombre: 'Caso Moana CRR-010817Ei17',
    estado: 'Liberada',
    historia:
      'Esta tortuga carey de más de 40 kg fue encontrada flotando cerca del muelle en Golfito, en  la zona Sur del país. Su caparazón estaba cubierto por gran cantidad de algas, cirripedios o broma en su plastrón, el cual se encontraba ligeramente hundido lo que reflejaba una baja condición corporal. Una vez valorada por el veterinario se procedió a realizarle tratamiento con antibióticos, analgésicos, hierro y suero. A los pocos días de haber iniciado su tratamiento, Moana comienza a comer y a recuperarse. Moana nos brindó gran cantidad de información sobre sus movimientos en el sur, ya que se le pudo colocar un transmisor que permitía ver su ubicación. Gracias a esto pudimos ver que a Moana le gustaba moverse en los manglares del Golfo Dulce. Este transmisor se obtuvo gracias a las gestiones de la Dra. Heidemeyer investigadora científica.',
    tratamiento: [
      'Antibióticos',
      'Analgésicos',
      'Hierro',
      'Suero'
    ],
    img: Moa
  },
  { 
    nombre: 'Caso Romelia CRR-191115Lo62',
    estado: 'Liberada',
    historia:
      'Romelia es una tortuga lora, especie Lepidochelys olivacea, que fue encontrada cerca de Montezuma y llevada al Refugio Mixto de Vida Silvestre Romelia desde donde se coordinó en conjunto con Guardacostas su traslado al Parque Marino del Pacífico, dada las heridas que presentaba. Romelia tenía de 3 a 4 fracturas antiguas en su caparazón, tenía además muchas marcas de heridas y su aleta superior derecha tenía una herida penetrante causada por algún desecho que se le enredó en su aleta. Dado esto, Romelia ya había perdido la irrigación sanguínea en esta aleta por lo cual se tuvo que amputar la misma. Una vez realizado el procedimiento por el veterinario, se procedió a realizarle tratamiento con antibióticos, analgésicos, hierro y suero.Rápidamente Romelia empieza a recuperarse. Romelia es un claro ejemplo de cómo las actividades humanas mal gestionadas pueden causar importantes daños a la salud de los animales marinos. Recuerda que desde tu casa, escuela y barrio puedes ayudar haciendo un buen manejo de los residuos.',
    tratamiento: [
      'Amputación de la aleta superior derecha (debido a la pérdida de irrigación sanguínea causada por una herida penetrante por desechos)',
      'Antibióticos',
      'Analgésicos',
      'Hierro',
      'Suero'
    ],
    img: Rome
  },
  { 
    nombre: 'Caso Tortuga Carey CRR-290125Ei56',
    estado: 'Liberada',
    historia:
      'Esta tortuga carey de apenas 8 kg fue encontrada varada en la Playa de Montezuma y fue rescatada por el Refugio Mixto de Vida Silvestre Romelia y traslada al Centro de Rescate Wild Sun Rescue quienes se contactaron con el Parque Marino para coordinar su traslado. Gracias a gestiones del SINAC, la tortuga ingresó al Parque Marino. La tortuga venía sumamente decaída con gran cantidad de epibiota como cirrípedos y algas en caparazón, aletas y cuello. La gran cantidad de epibiota en las tortugas marinas es signo de que la misma se encuentra sumamente débil y que posiblemente tenga alguna enfermedad o infección que deba tratarse. Después de haber sido valorada por el veterinario se procedió a realizarle tratamiento con antibióticos y hierro. Poco tiempo después la tortuga comienza a alimentarse y con ella ir ganando peso para su pronta recuperación.',
    tratamiento: [
      'Antibióticos',
      'Hierro',
    ],
    img: Care
  }
];
