import React, { useState } from 'react';
import { ArrowUpDown, Play, RotateCcw } from 'lucide-react';

export const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([45, 20, 85, 10, 60, 30, 95, 50]);
  const [algorithm, setAlgorithm] = useState<'bubble' | 'insertion' | 'selection'>('insertion');
  const [isSorting, setIsSorting] = useState<boolean>(false);

  const resetArray = () => {
    const newArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 10);
    setArray(newArr);
  };

  const runSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    if (algorithm === 'bubble') {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            setArray([...arr]);
            await new Promise((r) => setTimeout(r, 200));
          }
        }
      }
    } else if (algorithm === 'insertion') {
      for (let j = 1; j < arr.length; j++) {
        let key = arr[j];
        let i = j - 1;
        while (i >= 0 && arr[i] > key) {
          arr[i + 1] = arr[i];
          i = i - 1;
          setArray([...arr]);
          await new Promise((r) => setTimeout(r, 200));
        }
        arr[i + 1] = key;
        setArray([...arr]);
      }
    } else if (algorithm === 'selection') {
      for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }
        if (minIdx !== i) {
          let temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;
          setArray([...arr]);
          await new Promise((r) => setTimeout(r, 200));
        }
      }
    }

    setIsSorting(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold text-lg text-slate-100">
            Simulador de Algoritmos de Ordenamiento
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as any)}
            disabled={isSorting}
            className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-semibold text-white"
          >
            <option value="insertion">Insertion Sort (O(n²))</option>
            <option value="bubble">Bubble Sort (O(n²))</option>
            <option value="selection">Selection Sort (O(n²))</option>
          </select>

          <button
            onClick={resetArray}
            disabled={isSorting}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={runSort}
            disabled={isSorting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
          >
            <Play className="w-3.5 h-3.5" />
            {isSorting ? 'Ordenando...' : 'Iniciar Ordenamiento'}
          </button>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-end justify-center gap-3 h-52 my-4">
        {array.map((val, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1.5 w-8">
            <span className="text-[10px] font-mono text-slate-400">{val}</span>
            <div
              className="w-full bg-blue-500 rounded-t-md transition-all duration-300 shadow-lg shadow-blue-900/30"
              style={{ height: `${val * 1.5}px` }}
            />
          </div>
        ))}
      </div>

      <div className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono">
        Arreglo actual: <code className="text-blue-300">[{array.join(', ')}]</code>
      </div>
    </div>
  );
};
