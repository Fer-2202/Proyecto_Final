import { motion } from "framer-motion"
import { Link } from "react-router-dom"

function Slide({ img, isActive }) {
  return (
    <div className={`keen-slider__slide relative h-full ${!isActive ? 'filter blur-sm' : ''}`}>
      <img
        src={img.src}
        alt={img.alt || img.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="p-4 flex items-center justify-center  flex-col gap-2  bg-gradient-to-t from-black/70 to-black/70 text-white dark:from-black/90 bg-backdrop-blur-md h-[600px]">
          <h2 className="text-xl font-bold">{img.title}</h2>
          <p className="text-sm text-gray-300 dark:text-gray-200">{img.description}</p>
            {img.cta && (
              
              <Link to={img.cta.link} className="mt-2 inline-block text-sm font-semibold rounded-3xl bg-blue-300 dark:bg-blue-100 hover:bg-blue-100 px-4 py-2 text-center">
              {img.cta.label}
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Slide