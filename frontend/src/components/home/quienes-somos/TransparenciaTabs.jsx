import React, { useRef, useState } from "react";
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
  const chartRef = useRef();
  const [showDetails, setShowDetails] = useState(true);

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
          "#ec4899",
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#6366f1"
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

  const indicadores = [
    { label: "Presupuesto Total", vals: ["380 millones €", "420 millones €", "450 millones €"], var: "+18.4%" },
    { label: "Donaciones Recibidas", vals: ["120 millones €", "145 millones €", "158 millones €"], var: "+31.7%" },
    { label: "Proyectos Ejecutados", vals: [15, 18, 22], var: "+46.7%" },
    { label: "Beneficiarios Directos", vals: [12500, 15800, 18200], var: "+45.6%" },
    { label: "Índice de Transparencia", vals: ["8.7 / 10", "9.2 / 10", "9.8 / 10"], var: "+12.6%" },
  ];

  const exportCSV = () => {
    const csv = [
      ["Indicador", "2021", "2022", "2023", "Variación"],
      ...indicadores.map(row => [row.label, ...row.vals, row.var])
    ]
      .map(e => e.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "indicadores_financieros.csv";
    a.click();
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 rounded-2xl font-sans">
      {/* Pie chart y Gastos */}
      <article className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 space-y-10 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
        <header>
          <h2 className="text-2xl font-bold text-teal-700 mb-2">Fuentes de Financiamiento</h2>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            Nuestras principales fuentes de financiamiento nos permiten llevar a cabo nuestra misión de conservación y educación.
          </p>
          <div className="max-w-xs mx-auto">
            <Pie data={pieData} />
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-bold text-teal-700 mb-2">Gastos por Programa</h2>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            Distribución de recursos en programas estratégicos para el desarrollo sostenible.
          </p>
          {[{ label: "Programas de conservación", value: 40, color: "bg-teal-600" },
            { label: "Investigación científica", value: 25, color: "bg-blue-600" },
            { label: "Educación ambiental", value: 20, color: "bg-green-600" },
            { label: "Administración", value: 10, color: "bg-yellow-500" },
            { label: "Recaudación de fondos", value: 5, color: "bg-purple-500" }
          ].map((item) => (
            <div key={item.label} className="mb-5">
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="w-full bg-gray-200 h-3 rounded-full mt-1">
                <div
                  className={`h-3 rounded-full ${item.color}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </section>
      </article>

      {/* Línea + tabla */}
      <article className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 space-y-10 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
        <header>
          <h2 className="text-2xl font-bold text-teal-700 mb-2">Evolución del Presupuesto</h2>
          <p className="text-gray-600 text-base mb-6">
            Visualización interactiva del crecimiento presupuestario anual.
          </p>
          <Line ref={chartRef} data={lineData} height={220} />
        </header>

        <section>
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-teal-700">Indicadores Clave</h3>
              <p className="text-gray-600 text-sm">Seguimiento de metas institucionales.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-sm bg-gray-100 border border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                {showDetails ? "Ocultar Detalles" : "Mostrar Detalles"}
              </button>
              <button
                onClick={exportCSV}
                className="text-sm bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition shadow-md"
              >
                Exportar CSV
              </button>
            </div>
          </div>

          {showDetails && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-gray-200 rounded-xl">
                <thead className="bg-teal-100 text-teal-700">
                  <tr>
                    <th className="px-4 py-2">Indicador</th>
                    <th className="px-4 py-2">2021</th>
                    <th className="px-4 py-2">2022</th>
                    <th className="px-4 py-2">2023</th>
                    <th className="px-4 py-2">Variación</th>
                  </tr>
                </thead>
                <tbody>
                  {indicadores.map((item, idx) => (
                    <tr key={idx} className="border-t text-gray-700 hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium whitespace-nowrap">{item.label}</td>
                      {item.vals.map((val, i) => (
                        <td key={i} className="px-4 py-2 whitespace-nowrap">{val}</td>
                      ))}
                      <td className="px-4 py-2 text-green-600 font-bold whitespace-nowrap">{item.var}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </article>
    </section>
  );
}
