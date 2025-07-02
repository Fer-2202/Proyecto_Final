import React, { useEffect, useState } from 'react'
import * as api from '@api/api'

function Test() {
  const [exhibitImage, setExhibitImage] = useState([])

  useEffect(() => {
    const fetchExhibitsImgs = async () => {
      try {
        const exhibitImgs = await api.getImageExhibit();
        setExhibitImage(exhibitImgs);
        console.log("Se recibe las imagenes correctamente")
      } catch (error) {
        console.error('Error fetching exhibitImgs')
      }
    }
    fetchExhibitsImgs();
  }, []);

  console.log(exhibitImage)

  return (
    <div>
    {exhibitImage && exhibitImage.length > 0 ? (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {exhibitImage.map((img, idx) => (
          <div key={img.id || idx} className="border rounded shadow p-2 flex flex-col items-center">
            <img
              src={img.imagen || img.url || img.image}
              alt={img.nombre || img.name || `Imagen ${idx + 1}`}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <p className="text-sm text-center">{img.nombre || img.name}</p>
          </div>
        ))}
      </div>
    ) : (
      <p>No hay imágenes para mostrar.</p>
    )}
    </div>
  )
}

export default Test