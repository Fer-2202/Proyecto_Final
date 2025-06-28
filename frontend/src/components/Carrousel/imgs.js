import img3 from "./../../assets/img/_MG_0086.jpg"
import img2 from "./../../assets/img/482961798_1037281651765728_3492099263986454664_n.jpg"
import img1 from "./../../assets/img/486175245_29175038435443319_583041807967260808_n.jpg"

const images = [
    {
      src: img1,
      title: "Bienvenidos al Parque Marino",
      description: "Conservando la biodiversidad marina de Costa Rica",
      alt: "Imagen de ejemplo",
      cta: {
        label: "ver mas",
        link: "/quienes-somos/informacion-institucional"
      }
    },
    {
      src: img2,
      title: "Ven a nuestras exhibiciones",
      description: "Una descripción clara de esta imagen",
      cta: {
        label: "ver mas",
        link: "/"
      }
    },
    {
      src: img3,
      title: "Tercera imagen",
      description: "Un texto explicativo o informativo sobre la imagen",
      cta: {
        label: "ver mas",
        link: "https://www.google.com/"
      }
    },
  ]
  
  export default images
