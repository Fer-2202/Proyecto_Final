import React from "react"
import Carousel from "../../components/Carrousel/Carousel"
import FeatureCard from "../../components/home/FeatureCard"
import Impact from "../../components/home/Impact"
import WhatToFind from "../../components/home/WhatToFind"
import TestimonialsCarousel from "../../components/home/TestimonialsCarousel"
import EducationalServices from "../../components/home/EducationalServices"
import CallToAction from "../../components/home/CallToAction"
import ContactSection from "../../components/home/ContacSection"
import Newsletter from "../../components/home/Newsletter"
import { Calendar, Users, ShoppingCart, Fish, Award, BookOpen } from "lucide-react"
import { Link } from "react-router-dom"




function Home() {
  return (
    <>
      <header>
      </header>
      <main>
        <Carousel />
        <section className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto mt-8 px-4">
          <FeatureCard
            icon={<Calendar className="text-teal-500 w-5 h-5"/>}
            title="Horario"
            description={<>
              <p className="text-gray-500">Martes a Domingo</p>
              <p className="text-gray-700 font-medium text-base">9:00am - 4:30pm</p>
              <p className="text-red-500 text-xs mt-1.5">Cerrado los Lunes</p>
            </>} 
          />
          <FeatureCard 
            icon={<Users className="w-5 h-5 text-teal-500"/>}
            title="Tarifas"
            description={<>
              <ul className="space-y-1.5 text-gray-500 text-sm">
                <li className="flex justify-between items-center">
                  <span>Adultos:</span>
                  <span className="text-gray-700 font-medium">₡2900</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Niños (4-11):</span>
                  <span className="text-gray-700 font-medium">₡1600</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Extranjeros:</span>
                  <span className="text-gray-700 font-medium">$10 / $5</span>
                </li>
              </ul>
            </>} 
          />
          <FeatureCard
            icon={<ShoppingCart className="w-5 h-5 text-teal-500"/>}
            title="COMPRA DE ENTRADAS"
            description={<>
              <p className="text-gray-500 text-sm mb-2.5">Adquiere tus entradas en línea y evita filas</p>
              <button className="w-full bg-teal-500 text-white py-1.5 px-4 rounded hover:bg-teal-600 transition-colors text-sm">
                <Link to="/purchase-form/ticketera"> Comprar Ahora</Link>
              </button>
            </>}
          />
        </section>

        <section className="bg-gray-50 py-16 mt-10">
          <Impact />
        </section>

        <WhatToFind />
        <TestimonialsCarousel />
        <EducationalServices />
        <CallToAction />
        <ContactSection />
        <Newsletter  />
      </main>
    </>
  )
}

export default Home