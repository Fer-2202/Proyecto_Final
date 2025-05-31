import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="bg-[#1CB6B0] text-white text-center py-16 rounded-lg px-4">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-4 uppercase">
        ¡Ayúdanos a conservar nuestros océanos!
      </h2>
      <p className="text-lg max-w-3xl mx-auto mb-8">
        Tu apoyo es fundamental para continuar con nuestra labor de conservación,
        investigación y educación ambiental.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link
          to="/donar"
          className="bg-white text-[#1CB6B0] font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
        >
          Hacer una Donación
        </Link>
        <Link
          to="/apoyo/voluntariado"
          className="border border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-[#1CB6B0] transition"
        >
          Ser Voluntario
        </Link>
      </div>
      <div className="mt-8 flex justify-center">
        <Heart className="w-6 h-6 text-white opacity-80" />
      </div>
    </section>
  );
}
