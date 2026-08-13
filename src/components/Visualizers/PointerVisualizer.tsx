import React, { useState } from 'react';
import { MemoryStick, ArrowRight, RefreshCw } from 'lucide-react';

export const PointerVisualizer: React.FC = () => {
  const [valX, setValX] = useState<number>(42);
  const [addressP] = useState<string>('0x7FFF5F00');
  const [ptrVal, setPtrVal] = useState<number>(42);

  const handleModifyPtr = () => {
    const newVal = Math.floor(Math.random() * 90) + 10;
    setPtrVal(newVal);
    setValX(newVal); // *ptr = newVal modifies x!
  };

  return (
    <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 text-[#1A1A1A] shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-[#F2F1EE]">
        <div className="flex items-center gap-2">
          <MemoryStick className="w-5 h-5 text-[#C2410C]" />
          <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
            Simulador de Memoria RAM y Punteros en C
          </h3>
        </div>
        <button
          onClick={handleModifyPtr}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-full text-xs font-bold uppercase tracking-wider transition shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Modificar por Puntero (`*ptr = ...`)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-4">
        {/* Variable X Block */}
        <div className="bg-[#F9F8F6] p-5 rounded-xl border border-[#E5E2DE] relative">
          <div className="text-xs text-[#8C8882] mb-1.5 font-mono">Dirección: {addressP}</div>
          <div className="bg-white border border-[#FDBA74] p-5 rounded-lg text-center shadow-xs">
            <span className="text-xs text-[#C2410C] font-mono font-bold block mb-1">int x</span>
            <span className="text-3xl font-extrabold text-[#1A1A1A] font-mono">{valX}</span>
          </div>
          <div className="mt-2.5 text-center text-xs text-[#8C8882]">
            Variable entera en pila (Stack)
          </div>
        </div>

        {/* Pointer PTR Block */}
        <div className="bg-[#F9F8F6] p-5 rounded-xl border border-[#E5E2DE] relative">
          <div className="text-xs text-[#8C8882] mb-1.5 font-mono">Dirección: 0x7FFF5F08</div>
          <div className="bg-white border border-[#E5E2DE] p-5 rounded-lg text-center shadow-xs">
            <span className="text-xs text-[#1A1A1A] font-mono font-bold block mb-1">int *ptr</span>
            <span className="text-xl font-bold text-[#C2410C] font-mono">{addressP}</span>
          </div>
          <div className="mt-2.5 text-center text-xs text-[#8C8882]">
            Puntero que almacena la dirección <code className="text-[#C2410C] font-semibold">&x</code>
          </div>
        </div>
      </div>

      <div className="bg-[#181818] p-3.5 rounded-xl border border-[#252525] text-xs font-mono text-[#E5E5E5] flex items-center gap-2">
        <ArrowRight className="w-4 h-4 text-[#10B981] shrink-0" />
        <span>
          En C: <code className="text-[#FDBA74] font-bold">int x = {valX};</code> |{' '}
          <code className="text-[#FDBA74] font-bold">int *ptr = &amp;x;</code> |{' '}
          <code className="text-[#10B981] font-bold">*ptr = {ptrVal};</code>
        </span>
      </div>
    </div>
  );
};
