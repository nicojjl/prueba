import React, { useState } from 'react';
import { Activity, Info } from 'lucide-react';

export const BigOChartVisualizer: React.FC = () => {
  const [maxN, setMaxN] = useState<number>(20);

  // Generate points for different complexity functions
  const nValues = Array.from({ length: maxN }, (_, i) => i + 1);

  const curves = [
    { name: 'O(1) - Constante', color: '#10b981', fn: (n: number) => 1 },
    { name: 'O(log n) - Logarítmico', color: '#0ea5e9', fn: (n: number) => Math.log2(n) },
    { name: 'O(n) - Lineal', color: '#2563eb', fn: (n: number) => n },
    { name: 'O(n log n) - Lineal-Log', color: '#7c3aed', fn: (n: number) => n * Math.log2(n) },
    { name: 'O(n²) - Cuadrático', color: '#d97706', fn: (n: number) => n * n },
    { name: 'O(2ⁿ) - Exponencial', color: '#dc2626', fn: (n: number) => Math.pow(2, n) },
  ];

  // SVG Chart Dimensions
  const svgWidth = 600;
  const svgHeight = 320;
  const margin = 40;
  const chartW = svgWidth - margin * 2;
  const chartH = svgHeight - margin * 2;

  const maxValY = Math.min(250, Math.pow(2, maxN > 10 ? 10 : maxN));

  return (
    <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 text-[#1A1A1A] shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-[#F2F1EE]">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#C2410C]" />
          <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
            Simulador Gráfico de Notaciones Asintóticas (Big-O)
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs text-[#8C8882] font-semibold uppercase tracking-wider">
            Rango de Entrada (N = {maxN}):
          </label>
          <input
            type="range"
            min="5"
            max="25"
            value={maxN}
            onChange={(e) => setMaxN(Number(e.target.value))}
            className="w-32 accent-[#C2410C] cursor-pointer"
          />
        </div>
      </div>

      <div className="relative overflow-x-auto flex justify-center bg-[#F9F8F6] p-4 rounded-xl border border-[#E5E2DE]">
        <svg width={svgWidth} height={svgHeight} className="overflow-visible">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = margin + chartH * (1 - ratio);
            return (
              <g key={i}>
                <line
                  x1={margin}
                  y1={y}
                  x2={margin + chartW}
                  y2={y}
                  stroke="#E5E2DE"
                  strokeDasharray="4 4"
                />
                <text x={margin - 10} y={y + 4} fill="#8C8882" fontSize="10" textAnchor="end">
                  {Math.round(ratio * maxValY)}
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line
            x1={margin}
            y1={margin}
            x2={margin}
            y2={margin + chartH}
            stroke="#1A1A1A"
            strokeWidth="1.5"
          />
          <line
            x1={margin}
            y1={margin + chartH}
            x2={margin + chartW}
            y2={margin + chartH}
            stroke="#1A1A1A"
            strokeWidth="1.5"
          />

          {/* Axis Labels */}
          <text
            x={margin + chartW / 2}
            y={svgHeight - 8}
            fill="#4A4742"
            fontSize="11"
            fontWeight="600"
            textAnchor="middle"
          >
            Tamaño de la entrada (N)
          </text>
          <text
            x={12}
            y={margin + chartH / 2}
            fill="#4A4742"
            fontSize="11"
            fontWeight="600"
            textAnchor="middle"
            transform={`rotate(-90 12 ${margin + chartH / 2})`}
          >
            Operaciones / Tiempo
          </text>

          {/* Plot curves */}
          {curves.map((curve) => {
            const points = nValues
              .map((n) => {
                const valY = curve.fn(n);
                const clampedY = Math.min(valY, maxValY);
                const x = margin + ((n - 1) / (maxN - 1)) * chartW;
                const y = margin + chartH * (1 - clampedY / maxValY);
                return `${x},${y}`;
              })
              .join(' ');

            return (
              <polyline
                key={curve.name}
                fill="none"
                stroke={curve.color}
                strokeWidth="2.5"
                points={points}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 text-xs">
        {curves.map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-2 p-2.5 bg-[#F9F8F6] rounded-lg border border-[#E5E2DE]"
          >
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: c.color }}
            />
            <span className="font-semibold text-[#4A4742] truncate">{c.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-[#C2410C] bg-[#FFF7ED] border border-[#FDBA74] p-3 rounded-xl">
        <Info className="w-4 h-4 text-[#C2410C] shrink-0" />
        <span className="leading-relaxed">
          Observa cómo las curvas exponenciales y cuadráticas se elevan velozmente a medida que aumenta N, mientras que las logarítmicas se mantienen estables.
        </span>
      </div>
    </div>
  );
};
