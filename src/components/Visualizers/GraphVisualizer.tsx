import React, { useState } from 'react';
import { Share2, Play } from 'lucide-react';

export const GraphVisualizer: React.FC = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState<'bfs' | 'dfs' | 'dijkstra'>('bfs');
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Graph nodes with coordinates and weights
  // A (50, 40)
  // B (180, 20) weight 4
  // C (180, 100) weight 2
  // D (300, 60) weight 3

  const runTraversal = async () => {
    setIsRunning(true);
    setVisitedNodes([]);

    let order = [];
    if (activeAlgorithm === 'bfs') {
      order = ['A', 'B', 'C', 'D'];
    } else if (activeAlgorithm === 'dfs') {
      order = ['A', 'B', 'D', 'C'];
    } else {
      order = ['A', 'C', 'D', 'B']; // Dijkstra shortest path order
    }

    for (let node of order) {
      setVisitedNodes((prev) => [...prev, node]);
      await new Promise((r) => setTimeout(r, 600));
    }

    setIsRunning(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-rose-400" />
          <h3 className="font-semibold text-lg text-slate-100">
            Simulador de Algoritmos de Grafos
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={activeAlgorithm}
            onChange={(e) => setActiveAlgorithm(e.target.value as any)}
            disabled={isRunning}
            className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-semibold text-white"
          >
            <option value="bfs">BFS (Búsqueda en Anchura)</option>
            <option value="dfs">DFS (Búsqueda en Profundidad)</option>
            <option value="dijkstra">Dijkstra (Camino Mínimo)</option>
          </select>

          <button
            onClick={runTraversal}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-700 text-white rounded-lg text-xs font-semibold transition"
          >
            <Play className="w-3.5 h-3.5" />
            {isRunning ? 'Ejecutando...' : 'Animar Recorrido'}
          </button>
        </div>
      </div>

      {/* SVG Graph rendering */}
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex justify-center my-4 overflow-x-auto">
        <svg width="360" height="150" className="overflow-visible">
          {/* Edges with weights */}
          <line x1="60" y1="75" x2="180" y2="35" stroke="#475569" strokeWidth="2" />
          <text x="110" y="45" fill="#f43f5e" fontSize="11" fontWeight="bold">
            w=4
          </text>

          <line x1="60" y1="75" x2="180" y2="115" stroke="#475569" strokeWidth="2" />
          <text x="110" y="110" fill="#f43f5e" fontSize="11" fontWeight="bold">
            w=2
          </text>

          <line x1="180" y1="35" x2="300" y2="75" stroke="#475569" strokeWidth="2" />
          <text x="240" y="45" fill="#f43f5e" fontSize="11" fontWeight="bold">
            w=3
          </text>

          <line x1="180" y1="115" x2="300" y2="75" stroke="#475569" strokeWidth="2" />
          <text x="240" y="110" fill="#f43f5e" fontSize="11" fontWeight="bold">
            w=1
          </text>

          {/* Nodes */}
          {[
            { id: 'A', x: 60, y: 75 },
            { id: 'B', x: 180, y: 35 },
            { id: 'C', x: 180, y: 115 },
            { id: 'D', x: 300, y: 75 },
          ].map((n) => {
            const isVisited = visitedNodes.includes(n.id);
            return (
              <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                <circle
                  r="18"
                  fill={isVisited ? '#f43f5e' : '#1e293b'}
                  stroke={isVisited ? '#fecdd3' : '#475569'}
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                />
                <text fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" dy="4">
                  {n.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-rose-300 flex items-center justify-between">
        <span>Nodos Visitados:</span>
        <span className="font-bold text-white">[ {visitedNodes.join(' ➔ ')} ]</span>
      </div>
    </div>
  );
};
