import React, { useState } from 'react';
import { Layers } from 'lucide-react';

export const RecursionTreeVisualizer: React.FC = () => {
  const [numN, setNumN] = useState<number>(4);

  // Generate call stack frames for factorial(N)
  const stackFrames = [];
  for (let i = numN; i >= 1; i--) {
    stackFrames.push({
      n: i,
      label: `factorial(${i})`,
      expr: i === 1 ? '1 (Caso Base)' : `${i} * factorial(${i - 1})`,
    });
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-lg text-slate-100">
            Simulador de Pila de Llamadas (Call Stack) Recursiva
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400">N = {numN}:</label>
          <input
            type="range"
            min="1"
            max="6"
            value={numN}
            onChange={(e) => setNumN(Number(e.target.value))}
            className="w-24 accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        {/* Call Stack Tower */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Pila de Memoria (Call Stack)</span>
            <span className="text-slate-500 font-mono font-normal">Top of Stack ⬇</span>
          </h4>

          <div className="flex flex-col-reverse gap-2 min-h-[200px] justify-start">
            {stackFrames.map((frame, idx) => (
              <div
                key={frame.n}
                className="bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-lg flex items-center justify-between font-mono text-xs shadow-md transition-all duration-300"
              >
                <div>
                  <span className="font-bold text-emerald-300">{frame.label}</span>
                  <span className="text-slate-400 block text-[11px]">{frame.expr}</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-900/60 text-emerald-200 text-[10px] rounded border border-emerald-700">
                  Frame #{numN - idx}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Unwinding Explanation */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">
              Flujo de Ejecución Paso a Paso
            </h4>
            <ol className="text-xs text-slate-300 space-y-2 font-mono">
              <li className="p-2 bg-slate-900/80 rounded border border-slate-800">
                1. <span className="text-emerald-400 font-bold">Llamada Inicial</span>: factorial({numN}) se coloca en la Pila.
              </li>
              <li className="p-2 bg-slate-900/80 rounded border border-slate-800">
                2. <span className="text-cyan-400 font-bold">Apilamiento</span>: Se agregan llamadas recursivas hasta $n=1$.
              </li>
              <li className="p-2 bg-slate-900/80 rounded border border-slate-800">
                3. <span className="text-amber-400 font-bold">Caso Base</span>: factorial(1) retorna 1.
              </li>
              <li className="p-2 bg-slate-900/80 rounded border border-slate-800">
                4. <span className="text-purple-400 font-bold">Desapilamiento</span>: Se desapila retornando el resultado final.
              </li>
            </ol>
          </div>

          <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-lg text-center">
            <span className="text-xs text-slate-400 block font-mono">Resultado Final:</span>
            <span className="text-xl font-extrabold text-emerald-300 font-mono">
              {numN}! = {Array.from({ length: numN }, (_, i) => i + 1).reduce((a, b) => a * b, 1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
