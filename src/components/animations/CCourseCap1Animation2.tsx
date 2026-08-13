import React, { useState } from 'react';
import { InteractiveAnimationContainer } from './InteractiveAnimationContainer';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

export const CCourseCap1Animation2: React.FC = () => {
  const [maxN, setMaxN] = useState<number>(5);

  const stepsCount = maxN + 2;

  const stepExplanations = [
    `FASE 1: Inicialización 'int i = 0', 'int suma = 0'. Se crean las variables locales en la pila de llamadas C.`,
    ...Array.from({ length: maxN }).map(
      (_, idx) =>
        `FASE 2 (Iteración ${
          idx + 1
        }): 'i = ${idx}'. Evaluando 'i < ${maxN}' (VERDADERO). Ejecutando 'suma += ${
          idx + 1
        }'. Imprimiendo en stdout.`
    ),
    `FASE 3: Bucle finalizado. Condición 'i < ${maxN}' es FALSA (i = ${maxN}). Imprimiendo resultado final en consola.`
  ];

  const codeSnippet = `#include <stdio.h>

int main() {
    int suma = 0;
    int limit = ${maxN};

    for (int i = 1; i <= limit; i++) {
        suma += i;
        printf("Paso %d: suma parcial = %d\\n", i, suma);
    }

    printf("Suma total final = %d\\n", suma);
    return 0;
}`;

  return (
    <InteractiveAnimationContainer
      title="Animación 2.2: Evaluador Interactivo de Flujo de Bucles C (for/while) y Consola `stdout`"
      conceptTag="Lenguaje C - Flujo de Control"
      description="Observa paso a paso la evaluación de la condición del bucle, la actualización de variables en la pila RAM y la escritura en la consola estándar."
      totalSteps={stepsCount}
      stepExplanations={stepExplanations}
      codeSnippet={codeSnippet}
      extraControls={
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[#C2410C] font-bold">Límite N:</span>
          <select
            value={maxN}
            onChange={(e) => setMaxN(parseInt(e.target.value, 10))}
            className="bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C] font-bold text-xs px-2 py-1 rounded-lg outline-hidden"
          >
            <option value={3}>3 Iteraciones</option>
            <option value={5}>5 Iteraciones</option>
            <option value={8}>8 Iteraciones</option>
          </select>
        </div>
      }
    >
      {({ step }) => {
        // Calculate state at current step
        const isInit = step === 0;
        const isDone = step === maxN + 1;
        const currentI = isInit ? 0 : isDone ? maxN + 1 : step;

        // Calculate cumulative sum at step
        let currentSuma = 0;
        const logs: string[] = [];

        if (!isInit) {
          for (let k = 1; k <= Math.min(step, maxN); k++) {
            currentSuma += k;
            logs.push(`Paso ${k}: i = ${k}, suma acumulada = ${currentSuma}`);
          }
        }
        if (isDone) {
          logs.push(`----------------------------------------`);
          logs.push(`¡BUCLE FINALIZADO! Suma Total = ${currentSuma}`);
        }

        return (
          <div className="space-y-6">
            {/* Split View: Stack Variables vs Flow Chart & Stdout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box 1: Memory Variables Stack */}
              <div className="p-4 bg-white border border-[#E5E2DE] rounded-2xl space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C8882] block">
                  1. Variables Locales en Pila RAM (Stack)
                </span>

                <div className="space-y-2 font-mono text-xs">
                  <div className="p-3 bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl flex items-center justify-between">
                    <span className="text-gray-600 font-bold">`int limit`</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E5E2DE] text-[#1A1A1A] font-bold">
                      {maxN}
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                      !isInit && !isDone
                        ? 'bg-[#FFF7ED] border-[#C2410C] text-[#C2410C] font-bold'
                        : 'bg-[#F9F8F6] border-[#E5E2DE] text-[#1A1A1A]'
                    }`}
                  >
                    <span className="font-bold">`int i` (Contador)</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#C2410C] text-white font-bold">
                      {currentI}
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                      !isInit
                        ? 'bg-[#ECFDF5] border-[#10B981] text-[#065F46] font-bold'
                        : 'bg-[#F9F8F6] border-[#E5E2DE] text-[#1A1A1A]'
                    }`}
                  >
                    <span className="font-bold">`int suma` (Acumulador)</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#10B981] text-white font-bold">
                      {currentSuma}
                    </span>
                  </div>
                </div>
              </div>

              {/* Box 2: Terminal Output stdout */}
              <div className="p-4 bg-[#0D0E11] border border-[#2A2D35] rounded-2xl space-y-2 text-white font-mono flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-gray-400 pb-2 border-b border-[#2A2D35]">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Terminal className="w-4 h-4" />
                    Consola Estándar stdout
                  </span>
                  <span className="text-[10px] text-gray-500">printf() stream</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-1 my-2 text-xs text-emerald-300 min-h-[120px]">
                  {logs.length === 0 ? (
                    <span className="text-gray-600 italic">// Esperando ejecución del bucle...</span>
                  ) : (
                    logs.map((log, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="leading-relaxed"
                      >
                        {log}
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="pt-2 border-t border-[#2A2D35] text-[10px] text-gray-500 flex items-center justify-between">
                  <span>Proceso C ejecutado</span>
                  <span className="text-emerald-400">Exit code: 0</span>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </InteractiveAnimationContainer>
  );
};
