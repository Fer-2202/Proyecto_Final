import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import logo from "./../assets/img/LOGO.webp";

export default function Loading({ isVisible = true, text = "Preparando tu experiencia marina..." }) {
  // Bloquear scroll mientras está visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#c6f2f0] to-[#e0f7f6] z-[9999] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={logo}
            alt="Logo"
            className="w-32 h-32 mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="text-[#1CB6B0]"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 0.6 }}
          >
            <Loader2 className="w-10 h-10" />
          </motion.div>
          <motion.p
            className="mt-4 text-sm text-gray-600 tracking-wide font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {text}
          </motion.p>

          {/* Olas animadas */}
          <div className="absolute bottom-0 w-full h-40 overflow-hidden">
            {/* Ola lenta */}
            <motion.div
              className="absolute w-[200%] h-full"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            >
              <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                <path
                  fill="#1CB6B0"
                  fillOpacity="0.2"
                  d="M0,224L30,229.3C60,235,120,245,180,229.3C240,213,300,171,360,165.3C420,160,480,192,540,208C600,224,660,224,720,224C780,224,840,224,900,197.3C960,171,1020,117,1080,117.3C1140,117,1200,171,1260,197.3C1320,224,1380,224,1410,224L1440,224L1440,320L0,320Z"
                />
              </svg>
            </motion.div>

            {/* Ola rápida */}
            <motion.div
              className="absolute w-[200%] h-full"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            >
              <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                <path
                  fill="#1CB6B0"
                  fillOpacity="0.4"
                  d="M0,224L30,229.3C60,235,120,245,180,229.3C240,213,300,171,360,165.3C420,160,480,192,540,208C600,224,660,224,720,224C780,224,840,224,900,197.3C960,171,1020,117,1080,117.3C1140,117,1200,171,1260,197.3C1320,224,1380,224,1410,224L1440,224L1440,320L0,320Z"
                />
              </svg>
            </motion.div>
          </div>

          {/* Burbujas flotantes */}
          {Array.from({ length: 20 }).map((_, index) => {
            const size = Math.random() * 20 + 20;
            return (
              <motion.div
                key={index}
                className="absolute rounded-full bg-[#1CB6B0]/30 border border-[#1CB6B0] shadow-md"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 100}%`,
                  bottom: `-${Math.random() * 100}px`,
                  zIndex: 5,
                }}
                initial={{ y: 0, opacity: 0.8, scale: 0.9 }}
                animate={{ y: -400, opacity: 0, scale: 1.1 }}
                transition={{
                  delay: Math.random() * 3,
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
