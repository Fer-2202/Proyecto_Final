import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Fish, Turtle, Globe, BookOpen } from "lucide-react";
import * as api from "../../api/api";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import placeholder from "../../assets/placeholder.svg";

// Puedes ajustar este mapeo según los datos que recibas de la API
const iconMap = {
  reptil: <Turtle className="text-[#1CB6B0] w-8 h-8 mb-2" />,
  isla: <Globe className="text-[#1CB6B0] w-8 h-8 mb-2" />,
  tiburon: <Fish className="text-[#1CB6B0] w-8 h-8 mb-2" />,
  default: <BookOpen className="text-[#1CB6B0] w-8 h-8 mb-2" />,
};

export default function WhatToFindCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [navReady, setNavReady] = useState(false);
  const [exhibits, setExhibits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExhibits() {
      try {
        // Cambia esto por el método correcto de tu API si es necesario
        const data = await api.getExhibits();
        setExhibits(data);
      } catch (error) {
        setExhibits([]);
      } finally {
        setLoading(false);
      }
    }
    fetchExhibits();
  }, []);

  console.log(exhibits);

  return (
    <section className="py-16 bg-white overflow-visible">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Título */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 uppercase mb-2">
          Qué podrás encontrar
        </h2>
        <div className="w-24 h-1 bg-[#1CB6B0] mx-auto my-4 rounded"></div>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Descubre la increíble biodiversidad marina de Costa Rica a través de nuestras
          exhibiciones interactivas y educativas
        </p>

        {/* Carrusel */}
        {loading ? (
          <div className="text-gray-500">Cargando...</div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            onInit={() => setNavReady(true)}
            navigation={
              navReady
                ? {
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }
                : false
            }
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-6 overflow-visible"
          >
            {exhibits.map((item, index) => (
              <SwiperSlide key={item.id || index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-2xl hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition-all overflow-visible text-left"
                >
                  <img
                    src={item.images[0] || placeholder}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5 mb-4">
                    {iconMap[item.icon] || iconMap.default}
                    <h3 className="text-[#1CB6B0] font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    {item.links && item.links.length > 0 && (
                      item.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          to={link.link}
                          className="bg-[#1CB6B0] text-white text-sm px-4 py-2 rounded-md hover:bg-[#139a95] transition font-medium"
                        >
                          {link.title}
                        </Link>
                      ))
                    )}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Flechas */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            ref={prevRef}
            className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-500 hover:bg-gray-100"
          >
            ←
          </button>
          <button
            ref={nextRef}
            className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-500 hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}