

import React from 'react';

 function OurApproach({
  title,
  paragraphs,
  workAreasTitle,
  workAreas,
  buttonText,
  onButtonClick,
  imageSrc,
  imageAlt
}) {
  return (
    <section className="flex flex-col md:flex-row items-start justify-center gap-8 p-8">
      
      {/* Imagen de la izquierda */}
      <div className="w-[160px] h-[350px] md:w-1/2 bg-gray-200 flex items-center justify-center rounded-lg shadow-sm overflow-hidden">
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500">[Imagen aquí]</span>
        )}
      </div>

      {/* Texto de la derecha */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        
        <h2 className="text-teal-600 font-bold text-xl mb-4">{title}</h2>
        
        {paragraphs && Array.isArray(paragraphs) && paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-700 mb-4">
            {paragraph}
          </p>
        ))}
        
        {/* Áreas de Trabajo */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-teal-600 font-semibold mb-2">{workAreasTitle}</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {workAreas && Array.isArray(workAreas) && workAreas.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </div>
        
        {/* Botón */}
        <button
          className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 transition-colors self-start"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>

    </section>
  );
}

export default OurApproach;
