// src/components/MarineExhibit.jsx

import * as Tabs from '@radix-ui/react-tabs';

export default function MarineExhibit() {
  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      {/* Tabs */}
      <Tabs.Root defaultValue="manatees">
        <Tabs.List className="flex flex-wrap gap-4 border-b border-gray-200 mb-6 text-gray-600">
          {[
            ['manatees', 'Manatíes'],
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

        {/* Manatíes */}
        <Tabs.Content value="manatees">
          <Section
            title="Exhibición de Manatíes"
            description={[
              'Nuestra exhibición de manatíes es una de las más populares del parque. Estos gentiles gigantes, también conocidos como "vacas marinas", son mamíferos acuáticos en peligro de extinción.',
              'En el Parque Marino, contamos con un programa de rescate y rehabilitación de manatíes, y nuestra exhibición alberga ejemplares que han sido rescatados y no pueden ser reintroducidos en su hábitat natural debido a lesiones o enfermedades.',
              'Aprende sobre su comportamiento, alimentación y los esfuerzos de conservación que realizamos para proteger a esta especie emblemática.',
            ]}
            facts={[
              'Los manatíes pueden vivir hasta 60 años en cautiverio.',
              'Se alimentan principalmente de plantas acuáticas.',
              'Pueden consumir hasta el 10% de su peso corporal en vegetación al día.',
              'Son parientes cercanos de los elefantes.',
            ]}
          />
        </Tabs.Content>

        {/* Reptiles */}
        <Tabs.Content value="reptiles">
          <Section
            title="Exhibición de Reptiles"
            description={[
              'La zona de reptiles alberga serpientes, iguanas y cocodrilos. Aprende sobre sus adaptaciones, comportamientos y su importancia en el ecosistema.',
              'Nuestro equipo de cuidadores garantiza ambientes seguros tanto para los animales como para los visitantes.',
            ]}
            facts={[
              'Algunas serpientes pueden vivir más de 20 años en cautiverio.',
              'Las iguanas verdes son excelentes trepadoras.',
              'Los cocodrilos tienen la mordida más potente del reino animal.',
            ]}
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
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

// Reusable Section component
function Section({ title, description, facts }) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Image placeholder */}
      <div className="flex-1 bg-gray-100 h-64 flex items-center justify-center rounded-md border border-gray-300">
        <span className="text-gray-400">Imagen no disponible</span>
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
