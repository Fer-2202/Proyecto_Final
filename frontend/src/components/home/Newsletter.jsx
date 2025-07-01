import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-[#1CB6B0] py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Texto izquierdo */}
        <div className="text-white max-w-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            Mantente Informado
          </h3>
          <p className="text-white mt-2">
            Suscríbete a nuestro boletín para recibir noticias, eventos y
            novedades del Parque Marino.
          </p>
        </div>

        {/* Formulario */}
        <form className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="w-full px-4 py-2 rounded-md border border-white text-white placeholder-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="bg-white text-[#1CB6B0] hover:bg-gray-100 px-6 py-2 rounded-md font-semibold flex items-center gap-2 transition"
          >
            Suscribirse <Mail className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}