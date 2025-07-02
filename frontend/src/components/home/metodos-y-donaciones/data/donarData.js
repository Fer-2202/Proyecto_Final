import placeholder from '@assets/placeholder.svg'

const donarTabs = [
  {
    value: 'donacion-monetaria',
    label: 'Donación Monetaria',
    title: 'Donaciones Monetarias',
    description: ['Tu contribución económica nos permite financiar nuestros programas de conservación, investigación y educación ambiental.', 'Puedes realizar una donación única o convertirte en donante recurrente.'],
    title_facts: "Métodos de Donación:",
    facts: [
      'Transferencia bancaria',
      'Tarjeta de crédito/débito.',
      'Paypal.',
      'Depósito Bancario.'
    ],
    images: [placeholder, placeholder],
    buttons: [
      { label: 'Donar Ahora' },
    ],
  },
  {
    value: 'donacion-especie',
    label: 'Donación en Especies',
    title: 'Donaciones en Especies',
    description: ['Además de las donaciones monetarias, también aceptamos donaciones en especie que nos ayudan a mantener nuestras instalaciones y programas.','Todos los materiales donados son utilizados directamente en nuestros programas de conservación, investigación y educación.'],
    title_facts: "Métodos de Donación:",
    facts: [
      'Transferencia bancaria',
      'Tarjeta de crédito/débito.',
      'Paypal.',
      'Depósito Bancario.'
    ],
    images: [placeholder, placeholder],
    buttons: [
      { label: 'Contactar para donar' },
    ],
  },
  {
    value: "voluntariado",
    label: "Voluntariado",
    title: "Voluntariado",
    description: ["Otra forma de apoyar nuestra labor es a través del voluntariado. Ofrecemos diferentes programas de voluntariado para personas interesadas en contribuir con su tiempo y habilidades a la conservación marina.", "Los voluntarios pueden participar en actividades como el cuidado de animales, mantenimiento de instalaciones, apoyo en programas educativos y asistencia en proyectos de investigación."],
    title_facts: "Materiales que necesitamos",
    facts: [
      'Equipos de laboratorio',
      'Materiales de construcción',
      'Equipos de buceo',
      'Materiales educativos',
      'Alimentos para animales',
      'Equipos de oficina'
    ],
    images: [placeholder, placeholder],
    buttons: [
      { label: 'Aplicar como voluntario' },
    ],
  }
];

export default donarTabs;
