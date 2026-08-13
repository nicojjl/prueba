import React, { useState } from 'react';
import { Network, Plus, Trash2, ArrowRight } from 'lucide-react';

interface NodeItem {
  id: string;
  valor: number;
}

export const LinkedListVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<NodeItem[]>([
    { id: '1', valor: 12 },
    { id: '2', valor: 99 },
    { id: '3', valor: 37 },
  ]);
  const [inputVal, setInputVal] = useState<string>('50');

  const handleInsertHead = () => {
    const val = Number(inputVal) || Math.floor(Math.random() * 100);
    setNodes([{ id: Date.now().toString(), valor: val }, ...nodes]);
  };

  const handleRemoveHead = () => {
    if (nodes.length > 0) {
      setNodes(nodes.slice(1));
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-purple-400" />
          <h3 className="font-semibold text-lg text-slate-100">
            Visualizador de Lista Enlazada Simple
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-16 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white"
          />
          <button
            onClick={handleInsertHead}
            className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold transition"
          >
            <Plus className="w-3.5 h-3.5" />
            Insertar en HEAD O(1)
          </button>
          <button
            onClick={handleRemoveHead}
            className="flex items-center gap-1 px-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Eliminar HEAD O(1)
          </button>
        </div>
      </div>

      {/* Nodes visual rendering */}
      <div className="overflow-x-auto py-6 min-h-[120px] flex items-center gap-3">
        <div className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-500/40 px-2.5 py-2 rounded shrink-0">
          HEAD ➔
        </div>

        {nodes.length === 0 ? (
          <div className="text-sm text-slate-500 italic font-mono">
            Lista vacía (head == NULL)
          </div>
        ) : (
          nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <div className="flex items-center bg-slate-950 border border-purple-500/50 rounded-xl p-2 shrink-0 shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="px-3 py-2 bg-purple-900/40 rounded-lg text-center border-r border-purple-800">
                  <span className="text-[10px] text-purple-300 font-mono block">dato</span>
                  <span className="text-base font-bold text-white font-mono">{node.valor}</span>
                </div>
                <div className="px-3 py-2 text-center">
                  <span className="text-[10px] text-slate-400 font-mono block">next</span>
                  <span className="text-xs font-bold text-purple-400 font-mono">
                    {index === nodes.length - 1 ? 'NULL' : '➔'}
                  </span>
                </div>
              </div>

              {index < nodes.length - 1 && (
                <ArrowRight className="w-5 h-5 text-purple-400 shrink-0" />
              )}
            </React.Fragment>
          ))
        )}
      </div>

      <div className="mt-2 text-xs text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono">
        Inserción al inicio: <code className="text-purple-300">nuevoNodo.next = head; head = nuevoNodo;</code> (O(1))
      </div>
    </div>
  );
};
