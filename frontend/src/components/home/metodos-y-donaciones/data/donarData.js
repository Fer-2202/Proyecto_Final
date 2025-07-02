import placeholder from '@assets/placeholder.svg'

const donarTabs = [
  {
    value: 'donacion-monetaria',
    label: 'Donación Monetaria',
    title: 'Donaciones Monetarias',
    description: ['Tu contribución económica nos permite financiar nuestros programas de conservación, investigación y educación ambiental. Puedes realizar una donación única o convertirte en donante recurrente.'],
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
];

export default donarTabs;
