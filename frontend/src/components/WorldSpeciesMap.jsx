// src/components/WorldSpeciesMap.jsx

import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Pega tu Mapbox Token aquí:
mapboxgl.accessToken = "pk.eyJ1Ijoia3JvbW0iLCJhIjoiY21iazhndmNoMG9mMzJqcHd6anJ1NHU0dSJ9.Zr4rMZDmc2aImqMaTGbQpA";

// Lista de especies con coordenadas
const speciesLocations = [
  {
    name: "Tiburón martillo",
    origin: "Pacífico Este Tropical",
    coordinates: [-80, 0]
  },
  {
    name: "Tortuga Carey",
    origin: "Caribe",
    coordinates: [-75, 15]
  },
  {
    name: "Caballito de mar",
    origin: "Atlántico",
    coordinates: [-30, 10]
  },
  {
    name: "Medusa luna",
    origin: "Índico",
    coordinates: [80, -10]
  },
  {
    name: "Mero gigante",
    origin: "Pacífico Oeste",
    coordinates: [150, -5]
  }
];

export default function WorldSpeciesMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Inicializa solo una vez

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [0, 0],
      zoom: 1.5
    });

    // Controles de navegación
    map.current.addControl(new mapboxgl.NavigationControl(), "top-left");

    // Añadir los markers
    speciesLocations.forEach(({ name, coordinates }) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundColor = "#14b8a6"; // tailwind-teal-500
      el.style.width = "12px";
      el.style.height = "12px";
      el.style.borderRadius = "50%";
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 0 5px rgba(0,0,0,0.5)";

      const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);

      new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(map.current);
    });
  }, []);

  return (
    <div className="my-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Origen mundial de nuestras especies</h2>
      <div
        ref={mapContainer}
        className="w-[1100px] h-[600px] md:w-[900px] lg:h-[600px] mx-auto rounded-lg overflow-hidden shadow"
      />
    </div>
  );
}
