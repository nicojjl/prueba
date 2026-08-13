import React, { useState } from 'react';
import { GitFork, Eye } from 'lucide-react';

export const BinaryTreeVisualizer: React.FC = () => {
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');

  // Static BST tree structure
  //        10
  //       /  \
  //      5    15
  //     / \   / \
  //    2   7 12  20

  const inorderSequence = [2, 5, 7, 10, 12, 15, 20];
  const preorderSequence = [10, 5, 2, 7, 15, 12, 20];
  const postorderSequence = [2, 7, 5, 12, 20, 15, 10];

  const currentSequence =
    traversalType === 'inorder'
      ? inorderSequence
      : traversalType === 'preorder'
      ? preorderSequence
      : postorderSequence;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <GitFork className="w-5 h-5 text-amber-400" />
          <h3 className="font-semibold text-lg text-slate-100">
            Visualizador de Árbol Binario de Búsqueda (BST)
          </h3>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setTraversalType('inorder')}
            className={`px-3 py-1.5 rounded-md transition ${
              traversalType === 'inorder'
                ? 'bg-amber-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Inorden (Inorder)
          </button>
          <button
            onClick={() => setTraversalType('preorder')}
            className={`px-3 py-1.5 rounded-md transition ${
              traversalType === 'preorder'
                ? 'bg-amber-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Preorden (Preorder)
          </button>
          <button
            onClick={() => setTraversalType('postorder')}
            className={`px-3 py-1.5 rounded-md transition ${
              traversalType === 'postorder'
                ? 'bg-amber-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Postorden (Postorder)
          </button>
        </div>
      </div>

      {/* SVG Tree rendering */}
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex justify-center my-4 overflow-x-auto">
        <svg width="400" height="200" className="overflow-visible">
          {/* Edges */}
          <line x1="200" y1="30" x2="100" y2="80" stroke="#475569" strokeWidth="2" />
          <line x1="200" y1="30" x2="300" y2="80" stroke="#475569" strokeWidth="2" />

          <line x1="100" y1="80" x2="50" y2="150" stroke="#475569" strokeWidth="2" />
          <line x1="100" y1="80" x2="150" y2="150" stroke="#475569" strokeWidth="2" />

          <line x1="300" y1="80" x2="250" y2="150" stroke="#475569" strokeWidth="2" />
          <line x1="300" y1="80" x2="350" y2="150" stroke="#475569" strokeWidth="2" />

          {/* Root Node 10 */}
          <g transform="translate(200, 30)">
            <circle r="20" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
            <text fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle" dy="4">
              10
            </text>
          </g>

          {/* Level 1: 5 & 15 */}
          <g transform="translate(100, 80)">
            <circle r="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            <text fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" dy="4">
              5
            </text>
          </g>
          <g transform="translate(300, 80)">
            <circle r="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            <text fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" dy="4">
              15
            </text>
          </g>

          {/* Level 2: 2, 7, 12, 20 */}
          <g transform="translate(50, 150)">
            <circle r="16" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
            <text fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle" dy="4">
              2
            </text>
          </g>
          <g transform="translate(150, 150)">
            <circle r="16" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
            <text fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle" dy="4">
              7
            </text>
          </g>
          <g transform="translate(250, 150)">
            <circle r="16" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
            <text fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle" dy="4">
              12
            </text>
          </g>
          <g transform="translate(350, 150)">
            <circle r="16" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
            <text fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle" dy="4">
              20
            </text>
          </g>
        </svg>
      </div>

      {/* Traversal Result Display */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
            Secuencia Resultante:
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono font-bold text-amber-300">
          [ {currentSequence.join(', ')} ]
        </div>
      </div>
    </div>
  );
};
