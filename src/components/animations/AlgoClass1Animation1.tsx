import React, { useState } from 'react';
import { InteractiveAnimationContainer } from './InteractiveAnimationContainer';
import { motion } from 'motion/react';
import { Zap, Clock, Cpu } from 'lucide-react';

export const AlgoClass1Animation1: React.FC = () => {
  const [nValue, setNValue] = useState<number>(100);

  // Preset values for step playback
  const nPresets = [10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 1000000];

  const handleStepChange = (stepIndex: number) => {
    setNValue(nPresets[stepIndex] || 100);
  };

  const currentStepIndex = nPresets.findIndex((val) => val === nValue) !== -1
    ? nPresets.findIndex((val) => val === nValue)
    : 2;

  // Calculate operations
  const opO1 = 1;
  const opLogN = Math.round(Math.log2(nValue));
  const opN = nValue;
  const opNLogN = Math.round(nValue * Math.log2(nValue));
  const opN2 = nValue * nValue;

  const formatOps = (num: number) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(1)} Trillones`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)} Billones`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)} Millones`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)} mil`;
    return num.toLocaleString();
  };

  // Estimate CPU time at 1 GHz (10^9 ops / sec)
  const formatCpuTime = (ops: number) => {
    const seconds = ops / 1e9;
    if (seconds < 1e-6) return '< 1 µs';
    if (seconds < 1e-3) return `${(seconds * 1000).toFixed(2)} ms`;
    if (seconds < 1) return `${(seconds * 1000).toFixed(0)} ms`;
    if (seconds < 60) return `${seconds.toFixed(2)} seg`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(1)} min`;
    if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} horas`;
    return `${(seconds / 86400).toFixed(1)} días`;
  };

  const stepExplanations = nPresets.map((n) => {
    const opsN2 = n * n;
    const opsNlogN = Math.round(n * Math.log2(n));
    const factor = Math.round(opsN2 / Math.max(1, opsNlogN));
    return `Para n = ${n.toLocaleString()} elementos, un algoritmo O(n²) realiza ${formatOps(
      opsN2
    )} operaciones vs sólo ${formatOps(
      opsNlogN
    )} en O(n log n). ¡O(n log n) es ${factor.toLocaleString()}x más eficiente!`;
  });

  const codeSnippet = `// Comparativa de Bucles en C
// 1. Algoritmo O(n log n) - Merge Sort
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

// 2. Algoritmo O(n^2) - Bubble Sort
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - 1; j++) {
            if (arr[j] > arr[j + 1])
                swap(&arr[j], &arr[j + 1]);
        }
    }
}`;

  return (
    <InteractiveAnimationContainer
      title="Animación 1.1: Comparador de Crecimiento Asintótico O(n log n) vs O(n²)"
      conceptTag="Complejidad Asintótica"
      description="Observa cómo escala el número de operaciones ejecutadas por la CPU a medida que incrementas el tamaño de entrada (n)."
      totalSteps={nPresets.length}
      currentStep={currentStepIndex}
      onStepChange={handleStepChange}
      stepExplanations={stepExplanations}
      codeSnippet={codeSnippet}
      extraControls={
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#C2410C]">n =</span>
          <select
            value={nValue}
            onChange={(e) => setNValue(parseInt(e.target.value, 10))}
            className="bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C] font-mono font-bold text-xs px-2 py-1 rounded-lg outline-hidden"
          >
            {nPresets.map((val) => (
              <option key={val} value={val}>
                {val.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
      }
    >
      {() => (
        <div className="space-y-6">
          {/* Header Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl flex items-center gap-3">
              <div className="p-2.5 bg-[#FFF7ED] text-[#C2410C] rounded-lg border border-[#FDBA74]">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#8C8882] block uppercase tracking-wider">
                  Entrada (n)
                </span>
                <span className="text-lg font-mono font-bold text-[#1A1A1A]">
                  {nValue.toLocaleString()} items
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#ECFDF5] border border-[#6EE7B7] rounded-xl flex items-center gap-3">
              <div className="p-2.5 bg-[#10B981] text-white rounded-lg">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#065F46] block uppercase tracking-wider">
                  O(n log n) CPU
                </span>
                <span className="text-lg font-mono font-bold text-[#065F46]">
                  {formatCpuTime(opNLogN)}
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl flex items-center gap-3">
              <div className="p-2.5 bg-[#EF4444] text-white rounded-lg">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#991B1B] block uppercase tracking-wider">
                  O(n²) CPU
                </span>
                <span className="text-lg font-mono font-bold text-[#991B1B]">
                  {formatCpuTime(opN2)}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Bar Chart Visualization */}
          <div className="space-y-3 bg-[#F9F8F6] border border-[#E5E2DE] p-5 rounded-2xl">
            <h5 className="text-xs font-mono font-bold text-[#4A4742] uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#C2410C]" />
              Proporción Visual de Operaciones Computacionales
            </h5>

            {/* O(1) Constant */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-emerald-700">O(1) Acceso Directada</span>
                <span className="text-gray-500">{formatOps(opO1)} ops</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '2%' }} />
              </div>
            </div>

            {/* O(log n) Binary Search */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-teal-700">O(log n) Búsqueda Binaria</span>
                <span className="text-gray-500">{formatOps(opLogN)} ops</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: `${Math.min(100, Math.max(3, (opLogN / opN2) * 100))}%` }} />
              </div>
            </div>

            {/* O(n) Linear */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-blue-700">O(n) Recorrido Simple</span>
                <span className="text-gray-500">{formatOps(opN)} ops</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, Math.max(4, (opN / opN2) * 100))}%` }} />
              </div>
            </div>

            {/* O(n log n) Fast Sorting */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-[#C2410C]">O(n log n) MergeSort / QuickSort</span>
                <span className="text-[#C2410C] font-bold">{formatOps(opNLogN)} ops</span>
              </div>
              <div className="h-3.5 bg-gray-200 rounded-full overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-[#C2410C] rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(100, Math.max(6, (opNLogN / opN2) * 100))}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* O(n^2) Quadratic Sorting */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-bold text-red-600">O(n²) BubbleSort / SelectionSort</span>
                <span className="text-red-600 font-bold">{formatOps(opN2)} ops</span>
              </div>
              <div className="h-3.5 bg-gray-200 rounded-full overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-red-600 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </InteractiveAnimationContainer>
  );
};
