import React, { useState } from 'react';
import { InteractiveAnimationContainer } from './InteractiveAnimationContainer';
import { motion } from 'motion/react';
import { CheckCircle2, RefreshCw } from 'lucide-react';

export const AlgoClass1Animation2: React.FC = () => {
  // Initial array input state editable by user
  const [arrayInput, setArrayInput] = useState<number[]>([42, 15, 88, 7, 23]);
  const [customVal, setCustomVal] = useState<string>('99');

  const stepsCount = arrayInput.length + 2;

  const stepExplanations = [
    `FASE 1: Carga de Datos en Memoria RAM. Arreglo de Entrada [${arrayInput.join(', ')}].`,
    ...arrayInput.map((val, idx) => `FASE 2: Procesando elemento A[${idx}] = ${val}. Evaluando condición de filtro/transformación.`),
    `FASE 3: Algoritmo Finalizado. Salida producida en orden transformado/ordenado: [${[...arrayInput].sort((a,b) => a - b).join(', ')}].`
  ];

  const codeSnippet = `// Algoritmo de Transformación y Ordenación
#include <stdio.h>

void procesarEntrada(int input[], int n) {
    printf("Procesando %d elementos en RAM...\\n", n);
    for (int i = 0; i < n; i++) {
        // Transformación elemental
        printf("Elemento[%d] = %d\\n", i, input[i]);
    }
}`;

  const addItem = () => {
    const num = parseInt(customVal, 10);
    if (!isNaN(num) && arrayInput.length < 8) {
      setArrayInput([...arrayInput, num]);
    }
  };

  const removeItem = (index: number) => {
    if (arrayInput.length > 2) {
      setArrayInput(arrayInput.filter((_, i) => i !== index));
    }
  };

  const resetArray = () => {
    setArrayInput([42, 15, 88, 7, 23]);
  };

  return (
    <InteractiveAnimationContainer
      title="Animación 1.2: Máquina de Transformación Algorítmica (Entrada → CPU → Salida)"
      conceptTag="Definición Formal de Algoritmo"
      description="Un algoritmo es una secuencia finita de instrucciones bien definidas que transforma una entrada en una salida determinista."
      totalSteps={stepsCount}
      stepExplanations={stepExplanations}
      codeSnippet={codeSnippet}
      extraControls={
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            value={customVal}
            onChange={(e) => setCustomVal(e.target.value)}
            className="w-14 bg-white border border-[#E5E2DE] text-[#1A1A1A] font-mono text-xs px-2 py-1 rounded-lg outline-hidden"
          />
          <button
            onClick={addItem}
            className="px-2.5 py-1 bg-[#1A1A1A] text-white rounded-lg text-xs font-mono font-bold hover:bg-black"
          >
            + Agregar
          </button>
          <button
            onClick={resetArray}
            className="p-1 bg-[#F2F1EE] text-[#4A4742] rounded-lg text-xs hover:bg-[#E5E2DE]"
            title="Restablecer Entrada"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      }
    >
      {({ step }) => {
        const sortedArray = [...arrayInput].sort((a, b) => a - b);
        const currentActiveIdx = step > 0 && step <= arrayInput.length ? step - 1 : -1;
        const isCompleted = step === stepsCount - 1;

        return (
          <div className="space-y-6">
            {/* Visual Pipeline Stage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Box 1: Entrada */}
              <div className="p-4 bg-white border-2 border-[#E5E2DE] rounded-2xl space-y-3 relative">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C8882] block">
                  1. Entrada (RAM Input)
                </span>
                <div className="flex flex-wrap gap-2">
                  {arrayInput.map((val, idx) => (
                    <div
                      key={idx}
                      className={`px-3 py-2 rounded-xl font-mono text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        currentActiveIdx === idx
                          ? 'bg-[#FFF7ED] border-[#C2410C] text-[#C2410C] scale-110 shadow-sm'
                          : 'bg-[#F9F8F6] border-[#E5E2DE] text-[#1A1A1A]'
                      }`}
                    >
                      <span>{val}</span>
                      {step === 0 && (
                        <button
                          onClick={() => removeItem(idx)}
                          className="text-gray-400 hover:text-red-500 text-[10px] ml-1"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow / CPU Process */}
              <div className="p-4 bg-[#FFF7ED] border border-[#FDBA74] rounded-2xl text-center space-y-2 relative">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C2410C] block flex items-center justify-center gap-1">
                  <RefreshCw className={`w-3.5 h-3.5 ${step > 0 && !isCompleted ? 'animate-spin text-[#C2410C]' : ''}`} />
                  2. Procesador CPU
                </span>
                <div className="text-xs font-mono font-bold text-[#1A1A1A] py-1 bg-white border border-[#FDBA74] rounded-xl shadow-xs">
                  {step === 0
                    ? 'Esperando Inicio...'
                    : isCompleted
                    ? '¡Procesamiento Exitoso!'
                    : `Evaluando A[${currentActiveIdx}] = ${arrayInput[currentActiveIdx]}`}
                </div>
              </div>

              {/* Box 3: Salida Transformada */}
              <div className="p-4 bg-white border-2 border-[#E5E2DE] rounded-2xl space-y-3 relative">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#10B981] block flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  3. Salida Determinista
                </span>
                <div className="flex flex-wrap gap-2">
                  {isCompleted ? (
                    sortedArray.map((val, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="px-3 py-2 rounded-xl font-mono text-xs font-bold bg-[#ECFDF5] border border-[#6EE7B7] text-[#065F46]"
                      >
                        {val}
                      </motion.div>
                    ))
                  ) : (
                    <span className="text-xs text-[#8C8882] font-mono italic">
                      [Resultado se generará al finalizar]
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </InteractiveAnimationContainer>
  );
};
