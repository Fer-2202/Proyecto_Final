function GranjaListItem({ granja, index, onSelect }) {
  const isEven = index % 2 === 0;
  return (
    <div
      key={index}
      className={`flex ${
        isEven ? "flex-col md:flex-row" : "flex-col-reverse md:flex-row-reverse"
      } bg-gray-50 rounded-lg p-5 border border-gray-200 shadow-md`}
    >
      <img
        src={granja.img}
        alt={granja.nombre}
        className="w-full md:w-64 h-64 object-cover rounded mb-4 md:mb-0"
      />
      <div className="md:mx-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">{granja.nombre}</h3>
          <p className="text-sm text-gray-700">{granja.descripcion}</p>
        </div>
        <button
          className="text-sm bg-teal-500 text-white px-4 py-1 rounded hover:bg-teal-600 mt-4 md:mt-2 w-max"
          onClick={() => onSelect(granja)}
        >
          Ver más
        </button>
      </div>
    </div>
  );
}

export default GranjaListItem;
