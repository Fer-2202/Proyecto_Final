// src/components/MarineExhibit.jsx

import * as Tabs from '@radix-ui/react-tabs';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import ReptileImage from './../../../assets/img/Figuras_turismo/Figura_turismo_1.jpg';
import IslaDelCocoImage from './../../../assets/img/Figuras_turismo/Figura_turismo_4.jpg';
import AquariumImage from './../../../assets/img/Figuras_turismo/Figura_turismo_8.jpeg';
import RayImage from './../../../assets/img/_MG_0086.jpg';
import TurtleImage from './../../../assets/img/_MG_0086.jpg';
import SharkImage from './../../../assets/img/_MG_0086.jpg';

export default function MarineExhibit() {
  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      {/* Tabs */}
      <Tabs.Root defaultValue="reptiles">
        <Tabs.List className="flex flex-wrap gap-4 border-b border-gray-200 mb-6 text-gray-600">
          {[
            ['reptiles', 'Reptiles'],
            ['isla-del-coco', 'Isla del Coco'],
            ['acuarios', 'Acuarios'],
            ['rayas', 'Rayas'],
            ['tortugas', 'Tortugas'],
            ['tiburones', 'Tiburones'],
          ].map(([value, label]) => (
            <Tabs.Trigger
              key={value}
              value={value}
              className="py-2 px-3 text-sm font-medium hover:text-teal-600 data-[state=active]:text-teal-600 border-b-2 border-transparent data-[state=active]:border-teal-600 transition-colors cursor-pointer"
            >
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Reptiles */}
        <Tabs.Content value="reptiles">
          <Section
            title="Exhibición de Reptiles"
            description={[
              '¡Descubre el fascinante mundo de los reptiles! En esta área podrás conocer sobre cocodrilo, caimán y tortugas terrestres. Aprende sobre sus comportamientos, hábitats naturales y la importante función que cumplen en el ecosistema',
            ]}
            facts={[
              'En nuestra Área de Reptiles te invitamos a conocer a:',
              'Morita, un cocodrilo (familia Crocodylidae)',
              'Calipso un curioso caimán (familia Alligatoridae)',
              'Ambos forman parte de nuestros pacientes residentes del centro de rescate',
              'Podrás observar diferentes especies de tortugas terrestres y así generar conciencia para la tenencia responsable de animales silvestres',
            ]}
            images={[ReptileImage, ReptileImage]} // Array
          />
        </Tabs.Content>

        {/* Isla del Coco */}
        <Tabs.Content value="isla-del-coco">
          <Section
            title="Exhibición Isla del Coco"
            description={[
              'Una ventana al ecosistema marino de la famosa Isla del Coco.',
              'Descubre la biodiversidad única de este parque nacional patrimonio natural de la humanidad.',
            ]}
            facts={[
              'La Isla del Coco alberga más de 200 especies de peces.',
              'Es un sitio clave para la investigación marina.',
              'Sus aguas son hogar de tiburones martillo y mantarrayas gigantes.',
            ]}
            images={[IslaDelCocoImage, IslaDelCocoImage]} // Array
          />
        </Tabs.Content>

        {/* Acuarios */}
        <Tabs.Content value="acuarios">
          <Section
            title="Acuarios del Parque"
            description={[
              'Nuestros acuarios presentan ecosistemas marinos costeros y de arrecifes.',
              'Explora la vida submarina de Costa Rica en tanques diseñados para replicar hábitats naturales.',
            ]}
            facts={[
              'Albergan más de 50 especies de peces.',
              'Contamos con programas de reproducción en cautiverio.',
            ]}
            images={[AquariumImage, AquariumImage]} // Array
          />
        </Tabs.Content>

        {/* Rayas */}
        <Tabs.Content value="rayas">
          <Section
            title="Exhibición de Rayas"
            description={[
              'Observa de cerca diferentes especies de rayas y conoce sus curiosas formas de desplazamiento.',
              'Participa en sesiones interactivas para aprender más sobre ellas.',
            ]}
            facts={[
              'Las rayas pueden detectar campos eléctricos en el agua.',
              'Algunas especies son venenosas.',
              'Su esqueleto está formado por cartílago, no huesos.',
            ]}
            images={[RayImage, RayImage]} // Array
          />
        </Tabs.Content>

        {/* Tortugas */}
        <Tabs.Content value="tortugas">
          <Section
            title="Exhibición de Tortugas"
            description={[
              'Conoce el ciclo de vida de las tortugas marinas y las amenazas que enfrentan.',
              'Participa en nuestros programas de conservación y liberación de tortugas.',
            ]}
            facts={[
              'Las tortugas marinas pueden vivir más de 80 años.',
              'Las crías enfrentan numerosos depredadores.',
              'Varias especies están en peligro crítico de extinción.',
            ]}
            images={[TurtleImage, TurtleImage]} // Array
          />
        </Tabs.Content>

        {/* Tiburones */}
        <Tabs.Content value="tiburones">
          <Section
            title="Exhibición de Tiburones"
            description={[
              'Desmitifica la imagen de los tiburones y aprende su papel esencial en los océanos.',
              'Nuestros tanques permiten observar de manera segura distintas especies de tiburones.',
            ]}
            facts={[
              'Los tiburones han existido por más de 400 millones de años.',
              'Algunas especies nunca dejan de nadar.',
              'Son clave para mantener el equilibrio de los ecosistemas marinos.',
            ]}
            images={[SharkImage, SharkImage]} // Array
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

// Reusable Section component
function Section({ title, description, facts, images }) {
  // If images is not array, convert it
  const imgs = Array.isArray(images) ? images : [images];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Image or Carousel */}
      <div className="flex-1 bg-gray-100 h-64 flex items-center justify-center rounded-md border border-gray-300">
        {imgs.length > 1 ? (
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            {imgs.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`${title} - Image ${index + 1}`}
                  className="object-cover h-full w-full rounded-md"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <img
            src={imgs[0]}
            alt={title}
            className="object-cover h-full w-full rounded-md"
          />
        )}
      </div>

      {/* Text content */}
      <div className="flex-1 space-y-4 text-gray-700">
        <h2 className="text-2xl font-semibold text-teal-700">{title}</h2>
        {description.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}

        {/* Datos interesantes */}
        <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
          <h3 className="font-semibold text-teal-700 mb-2">Datos Interesantes:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {facts.map((fact, idx) => (
              <li key={idx}>{fact}</li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors">
            Horarios de Alimentación
          </button>
          <button className="border border-teal-600 text-teal-600 px-4 py-2 rounded hover:bg-teal-50 transition-colors">
            Programa de Adopción
          </button>
        </div>
      </div>
    </div>
  );
}
