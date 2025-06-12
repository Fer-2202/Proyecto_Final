import React from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function TabFinanzas() {
  const pieData = {
    labels: [
      "Donaciones privadas (25%)",
      "Subvenciones gubernamentales (25%)",
      "Ingresos por entradas (30%)",
      "Servicios educativos (15%)",
      "Otros ingresos (5%)"
    ],
    datasets: [
      {
        data: [25, 25, 30, 15, 5],
        backgroundColor: [
          "#ec4899", // rosa
          "#3b82f6", // azul
          "#10b981", // verde
          "#f59e0b", // amarillo
          "#6366f1"  // púrpura
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Tendencia del Presupuesto Anual (Millones de €)",
        data: [307, 346, 380, 420, 450],
        borderColor: "#14b8a6",
        backgroundColor: "rgba(20,184,166,0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Pie chart y Gastos */}
      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <div>
          <h3 className="text-teal-600 font-bold text-sm mb-1">Fuentes de Financiamiento</h3>
          <p className="text-gray-600 text-sm mb-4 leading-snug">
            Nuestras principales fuentes de financiamiento nos permiten llevar a cabo nuestra misión de conservación y educación.
          </p>
          <div className="max-w-xs mx-auto">
            <Pie data={pieData} />
          </div>
        </div>

        <div>
          <h3 className="text-teal-600 font-bold text-sm mb-2">Gastos por Programa</h3>
          <p className="text-gray-600 text-sm mb-4 leading-snug">
            Detalle de cómo distribuimos nuestros recursos en los diferentes programas y áreas de trabajo.
          </p>
          {[
            { label: "Programas de conservación", value: 40, color: "bg-teal-600" },
            { label: "Investigación científica", value: 25, color: "bg-blue-600" },
            { label: "Educación ambiental", value: 20, color: "bg-green-600" },
            { label: "Administración", value: 10, color: "bg-yellow-500" },
            { label: "Recaudación de fondos", value: 5, color: "bg-purple-500" },
          ].map((item) => (
            <div key={item.label} className="mb-2">
              <div className="flex justify-between text-sm font-medium">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className={`h-2 rounded ${item.color}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Línea + tabla */}
      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <div>
          <h3 className="text-teal-600 font-bold text-sm mb-2">Evolución del Presupuesto</h3>
          <p className="text-gray-600 text-sm mb-4">
            Visualización de la evolución de nuestro presupuesto a lo largo de los últimos años.
          </p>
          <Line data={lineData} height={220} />
        </div>

        <div>
          <h4 className="text-teal-600 font-bold text-sm mb-1">Comparativa Anual</h4>
          <p className="text-gray-600 text-sm mb-2">Comparación de indicadores clave a lo largo de los años.</p>

          <div className="flex gap-2 text-xs text-white font-semibold mb-2">
            {["2021", "2022", "2023"].map((year) => (
              <span key={year} className="bg-teal-600 px-2 py-1 rounded">{year}</span>
            ))}
          </div>

          <table className="w-full text-sm text-left border border-gray-200 rounded overflow-hidden">
            <thead className="bg-teal-100 text-teal-700">
              <tr>
                <th className="px-3 py-2">Indicador</th>
                <th className="px-3 py-2">2021</th>
                <th className="px-3 py-2">2022</th>
                <th className="px-3 py-2">2023</th>
                <th className="px-3 py-2">Variación</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Presupuesto Total", vals: ["380 millones €", "420 millones €", "450 millones €"], var: "+18.4%" },
                { label: "Donaciones Recibidas", vals: ["120 millones €", "145 millones €", "158 millones €"], var: "+31.7%" },
                { label: "Proyectos Ejecutados", vals: [15, 18, 22], var: "+46.7%" },
                { label: "Beneficiarios Directos", vals: [12500, 15800, 18200], var: "+45.6%" },
                { label: "Índice de Transparencia", vals: ["8.7 / 10", "9.2 / 10", "9.8 / 10"], var: "+12.6%" },
              ].map((item, idx) => (
                <tr key={idx} className="border-t text-gray-700">
                  <td className="px-3 py-2 font-medium">{item.label}</td>
                  {item.vals.map((val, i) => (
                    <td key={i} className="px-3 py-2">{val}</td>
                  ))}
                  <td className="px-3 py-2 text-green-600 font-bold">{item.var}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
