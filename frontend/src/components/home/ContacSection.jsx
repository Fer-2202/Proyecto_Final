import { MapPin, Mail, Phone, Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-[#f8f9fa] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 uppercase">
          Ubicación y Contacto
        </h2>
        <div className="w-20 h-1 bg-[#1CB6B0] mx-auto my-4 rounded"></div>
        <p className="text-center text-gray-600 mb-10">
          Visítanos y descubre la maravilla de la biodiversidad marina de Costa Rica
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mapa y detalles */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden p-6">
            <div className="rounded overflow-hidden mb-6">
              <iframe
                title="Mapa Parque Marino"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.4804406816743!2d-84.826716!3d9.977114000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa02eedbd317681%3A0x15f0d585edd74ae8!2sParque%20Marino%20del%20Pac%C3%ADfico!5e0!3m2!1ses-419!2scr!4v1748532098833!5m2!1ses-419!2scr"
                width="100%"
                height="250"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            

            <div className="space-y-5 text-gray-800">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#1CB6B0] w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Ubicación</h4>
                  <p className="text-sm text-gray-600">Puntarenas, Costa Rica</p>
                  <p className="text-sm text-gray-400">A 100 metros del muelle principal</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-[#1CB6B0] w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Teléfono</h4>
                  <p className="text-sm text-gray-600">+506 2661-5270</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-[#1CB6B0] w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Correo Electrónico</h4>
                  <p className="text-sm text-gray-600">info@parquemarino.co.cr</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-[#1CB6B0] font-semibold text-lg flex items-center gap-2 mb-6">
              <Mail className="w-5 h-5" /> Envíanos un Mensaje
            </h3>
            <form className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full border rounded-md px-4 py-2 text-sm outline-[#1CB6B0]"
                />
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  className="w-full border rounded-md px-4 py-2 text-sm outline-[#1CB6B0]"
                />
              </div>
              <input
                type="text"
                placeholder="Asunto"
                className="w-full border rounded-md px-4 py-2 text-sm outline-[#1CB6B0]"
              />
              <textarea
                placeholder="Mensaje"
                rows="4"
                className="w-full h-60 border rounded-md px-4 py-2 text-sm outline-[#1CB6B0]"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#1CB6B0] text-white py-3 rounded-md hover:bg-[#139a95] font-semibold flex items-center justify-center gap-2"
              >
                Enviar Mensaje <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
