import React from 'react'
import { Users, Fish, Award, BookOpen } from 'lucide-react'
import { motion } from "framer-motion"


const stats = [
  {
    icon: <Users className="h-8 w-8 text-[#1CB6B0]" />,
    value: "25000",
    label: "Visitantes anuales",
  },
  {
    icon: <Fish className="h-8 w-8 text-[#1CB6B0]" />,
    value: "150",
    label: "Especies marinas",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-[#1CB6B0]" />,
    value: "45",
    label: "Programas educativos",
  },
  {
    icon: <Award className="h-8 w-8 text-[#1CB6B0]" />,
    value: "12",
    label: "Años de conservación",
  },
];

function Impact() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
              NUESTRO IMPACTO
            </h2>
            <p className="text-lg text-gray-600">
              Trabajamos diariamente por la conservación marina y la educación ambiental
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <div className="bg-teal-50/70 p-3 rounded-lg w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
      </div>
    </>
  )
}

export default Impact