// ProgressIndicators.jsx
import { motion } from "framer-motion";

function ProgressIndicators({ progress }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex space-x-2 px-4 pt-2">
      {progress.map((value, idx) => (
        <div
          key={idx}
          className="flex-1 h-1 bg-white/30 dark:bg-white/20 rounded overflow-hidden"
        >
          <motion.div
            className="h-full bg-white dark:bg-blue-400 origin-left"
            style={{ transformOrigin: "left", scaleX: value }}
            animate={{ scaleX: value }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      ))}
    </div>
  );
}

export default ProgressIndicators;
