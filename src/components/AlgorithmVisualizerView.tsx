import React, { useState, useEffect, useRef } from 'react';
import { AlgorithmItem, AlgoCategory } from '../types';
import { ALGORITHMS_DATA, ALGO_CATEGORIES } from '../data/algorithmsData';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Search,
  Sparkles,
  Code,
  Terminal,
  Cpu,
  Zap,
  CheckCircle2,
  Lightbulb,
  Copy,
  Check,
  ChevronRight,
  BarChart2,
  Sliders,
  Layers,
  HelpCircle,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CSyntaxHighlighter } from './CSyntaxHighlighter';
import { MarkdownRenderer } from './MarkdownRenderer';

interface AlgorithmVisualizerViewProps {
  onSelectAlgorithm?: (algoId: string) => void;
}

export const AlgorithmVisualizerView: React.FC<AlgorithmVisualizerViewProps> = () => {
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>(ALGORITHMS_DATA[0].id);
  const [activeCategory, setActiveCategory] = useState<AlgoCategory | 'todas'>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [codeLang, setCodeLang] = useState<'c' | 'cpp' | 'python'>('c');

  // Animation player state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(800); // interval ms
  const [customInputArray, setCustomInputArray] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const selectedAlgo: AlgorithmItem =
    ALGORITHMS_DATA.find((a) => a.id === selectedAlgoId) || ALGORITHMS_DATA[0];

  // Generated steps state
  const [steps, setSteps] = useState(() => selectedAlgo.generateSteps());

  // Regenerate steps when algorithm or input changes
  useEffect(() => {
    setSteps(selectedAlgo.generateSteps());
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [selectedAlgoId]);

  // Animation timer loop
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, speedMs]);

  // Current visual step data
  const currentStep = steps[currentStepIndex] || steps[0];

  // Filter algorithms
  const filteredAlgos = ALGORITHMS_DATA.filter((algo) => {
    const matchesCategory = activeCategory === 'todas' || algo.category === activeCategory;
    const matchesSearch =
      algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      algo.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      algo.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCustomInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputArray.trim()) return;
    const parsed = customInputArray
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));

    if (parsed.length >= 2) {
      setSteps(selectedAlgo.generateSteps(parsed));
      setCurrentStepIndex(0);
      setIsPlaying(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex-1 bg-[#F9F8F6] text-[#1A1A1A] overflow-y-auto p-4 sm:p-6 lg:p-10 space-y-8">
      {/* Top Banner Header */}
      <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold px-3 py-1 bg-[#C2410C] text-white rounded-full uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-white" />
              <span>Módulo Interactivo • Visualizador de Algoritmos</span>
            </span>
            <span className="text-xs text-[#C2410C] font-semibold font-mono uppercase tracking-wider">
              {ALGORITHMS_DATA.length} Algoritmos Famosos
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1A1A1A] tracking-tight">
            Visualizador Interactivo de Algoritmos
          </h1>
          <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed">
            Aprende algoritmos mediante simulaciones paso a paso en tiempo real. Explora su lógica interna, analogías del mundo real, análisis de complejidad y código ejecutable en <strong className="text-[#C2410C]">Lenguaje C, C++ y Python</strong>.
          </p>
        </div>

        {/* Quick Category Stats */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
          {ALGO_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 border ${
                activeCategory === cat.id
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                  : 'bg-[#F9F8F6] hover:bg-[#F2F1EE] border-[#E5E2DE] text-[#4A4742]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace: Left Algorithm Picker, Right Visualizer Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Search & List of 30+ Algorithms */}
        <div className="lg:col-span-4 bg-white border border-[#E5E2DE] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col space-y-4 max-h-[750px]">
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8C8882] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar algoritmo (Bubble, Dijkstra, Quick, BFS)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2410C] transition"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#8C8882]">
              <span>Mostrando {filteredAlgos.length} de {ALGORITHMS_DATA.length} algoritmos</span>
              {activeCategory !== 'todas' && (
                <button
                  onClick={() => setActiveCategory('todas')}
                  className="text-[#C2410C] hover:underline font-semibold"
                >
                  Ver todos
                </button>
              )}
            </div>
          </div>

          {/* List Scroll Area */}
          <div className="overflow-y-auto flex-1 space-y-2 pr-1">
            {filteredAlgos.map((algo) => {
              const isSelected = algo.id === selectedAlgoId;
              return (
                <button
                  key={algo.id}
                  onClick={() => setSelectedAlgoId(algo.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 group ${
                    isSelected
                      ? 'bg-[#FFF7ED] border-[#FDBA74] text-[#C2410C] font-semibold shadow-xs'
                      : 'bg-[#F9F8F6]/60 hover:bg-[#F2F1EE] border-[#E5E2DE] text-[#4A4742]'
                  }`}
                >
                  <span className="text-xl mt-0.5 shrink-0">{algo.icon}</span>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-white/80 border border-[#E5E2DE] text-[#4A4742]">
                        {algo.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono text-[#C2410C] font-semibold">
                        {algo.complexity.timeAverage}
                      </span>
                    </div>

                    <h3 className={`text-xs font-serif ${isSelected ? 'font-bold text-[#1A1A1A] text-sm' : 'text-[#1A1A1A]'}`}>
                      {algo.name}
                    </h3>

                    <p className="text-[10px] text-[#8C8882] line-clamp-1 leading-relaxed">
                      {algo.subtitle}
                    </p>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 self-center transition-transform ${isSelected ? 'text-[#C2410C] translate-x-0.5' : 'text-[#C5C2BD]'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Visualizer Stage & Controls */}
        <div className="lg:col-span-8 space-y-6">
          {/* Visualizer Canvas Box */}
          <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 shadow-xs space-y-6">
            {/* Stage Title & Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F2F1EE]">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-[#FFF7ED] rounded-xl border border-[#FDBA74]">
                  {selectedAlgo.icon}
                </span>
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">
                    {selectedAlgo.name}
                  </h2>
                  <p className="text-xs text-[#8C8882]">
                    {selectedAlgo.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-[#1A1A1A] text-white px-3 py-1 rounded-full">
                  Dificultad: {selectedAlgo.difficulty}
                </span>
                <span className="text-xs font-mono font-bold bg-[#FFF7ED] text-[#C2410C] px-3 py-1 rounded-full border border-[#FDBA74]">
                  O({selectedAlgo.complexity.timeAverage.replace('O(', '')}
                </span>
              </div>
            </div>

            {/* Interactive Visual Canvas */}
            <div className="bg-[#1A1A1A] text-white p-6 rounded-2xl border border-stone-800 min-h-[320px] flex flex-col justify-between relative overflow-hidden">
              {/* Step Counter Indicator */}
              <div className="flex items-center justify-between border-b border-stone-800 pb-3 text-xs font-mono">
                <span className="text-[#FDBA74] font-bold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Paso {currentStepIndex + 1} de {steps.length}</span>
                </span>

                <div className="w-48 bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C2410C] h-full transition-all duration-300"
                    style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Description Toast */}
              <div className="my-4 p-3 bg-stone-900/90 border border-stone-800 rounded-xl text-xs text-stone-200 font-mono">
                <span className="text-[#10B981] font-bold mr-2">[Ejecución]</span>
                {currentStep?.description}
              </div>

              {/* RENDER CANVAS BASED ON DATA TYPE */}
              <div className="flex-1 my-4 flex items-center justify-center min-h-[200px]">
                {/* 1. ARRAY / BAR CHART VISUALIZER */}
                {currentStep?.arrayState && (
                  <div className="w-full flex items-end justify-center gap-2 sm:gap-3 h-48 pt-6">
                    {currentStep.arrayState.map((val, idx) => {
                      const isHighlighted = currentStep.highlightIndices?.includes(idx);
                      const isSorted = currentStep.sortedIndices?.includes(idx);
                      const isSwapping = currentStep.swapIndices?.includes(idx);

                      // Determine pointers on this index
                      const pointer = currentStep.activePointers?.find((p) => p.index === idx);

                      let barColor = 'bg-stone-700';
                      if (isSorted) barColor = 'bg-[#10B981]';
                      if (isHighlighted) barColor = 'bg-[#3B82F6]';
                      if (isSwapping) barColor = 'bg-[#C2410C] animate-pulse';

                      const maxVal = Math.max(...currentStep.arrayState, 100);
                      const heightPercent = Math.max(15, Math.round((val / maxVal) * 100));

                      return (
                        <div key={idx} className="flex flex-col items-center flex-1 max-w-[48px] h-full justify-end relative">
                          {/* Pointer Label above bar */}
                          {pointer && (
                            <span
                              className="absolute -top-6 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded text-white shadow-xs"
                              style={{ backgroundColor: pointer.color || '#C2410C' }}
                            >
                              {pointer.label}
                            </span>
                          )}

                          {/* Value label on top */}
                          <span className="text-[10px] font-mono text-stone-300 mb-1">
                            {val}
                          </span>

                          {/* Animated Bar */}
                          <motion.div
                            layout
                            className={`w-full rounded-t-lg transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white shadow-md ${barColor}`}
                            style={{ height: `${heightPercent}%` }}
                          />

                          {/* Index Label */}
                          <span className="text-[9px] font-mono text-stone-500 mt-1">
                            [{idx}]
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 2. GRAPH VISUALIZER */}
                {currentStep?.graphNodes && (
                  <div className="w-full h-56 relative flex items-center justify-center border border-stone-800 rounded-xl bg-stone-950 p-4">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {currentStep.graphEdges?.map((edge, i) => {
                        const fromNode = currentStep.graphNodes?.find((n) => n.id === edge.from);
                        const toNode = currentStep.graphNodes?.find((n) => n.id === edge.to);
                        if (!fromNode || !toNode) return null;
                        return (
                          <g key={i}>
                            <line
                              x1={fromNode.x || 100}
                              y1={fromNode.y || 100}
                              x2={toNode.x || 200}
                              y2={toNode.y || 100}
                              stroke={edge.highlighted ? '#C2410C' : '#475569'}
                              strokeWidth={edge.highlighted ? 3 : 1.5}
                              strokeDasharray={edge.highlighted ? '4' : 'none'}
                            />
                            {edge.weight && (
                              <text
                                x={((fromNode.x || 0) + (toNode.x || 0)) / 2}
                                y={((fromNode.y || 0) + (toNode.y || 0)) / 2 - 5}
                                fill="#94A3B8"
                                fontSize="10"
                                fontFamily="monospace"
                                textAnchor="middle"
                              >
                                {edge.weight}
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </svg>

                    {currentStep.graphNodes.map((node) => {
                      let nodeStyle = 'bg-slate-800 border-slate-600 text-slate-200';
                      if (node.state === 'current') nodeStyle = 'bg-[#C2410C] border-orange-400 text-white shadow-lg ring-4 ring-orange-500/30';
                      if (node.state === 'visiting') nodeStyle = 'bg-blue-600 border-blue-400 text-white';
                      if (node.state === 'visited') nodeStyle = 'bg-emerald-600 border-emerald-400 text-white';

                      return (
                        <div
                          key={node.id}
                          className={`absolute w-12 h-12 rounded-full border-2 flex flex-col items-center justify-center font-mono text-xs font-bold transition-all duration-300 z-10 ${nodeStyle}`}
                          style={{ left: `${(node.x || 100) - 24}px`, top: `${(node.y || 100) - 24}px` }}
                        >
                          <span>{node.id}</span>
                          {node.distance && (
                            <span className="text-[8px] opacity-90">{node.distance}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 3. STACK / QUEUE VISUALIZER */}
                {currentStep?.stackQueueState && (
                  <div className="flex items-center gap-2 overflow-x-auto p-4 bg-stone-900 border border-stone-800 rounded-xl">
                    {currentStep.stackQueueState.map((st, i) => (
                      <div
                        key={i}
                        className={`px-4 py-3 rounded-xl border font-mono text-xs font-bold transition-all ${
                          st.active
                            ? 'bg-[#C2410C] border-orange-400 text-white shadow-md'
                            : 'bg-stone-800 border-stone-700 text-stone-300'
                        }`}
                      >
                        {st.value}
                      </div>
                    ))}
                    {currentStep.stackQueueState.length === 0 && (
                      <span className="text-xs text-stone-500 font-mono italic">Estructura vacía</span>
                    )}
                  </div>
                )}

                {/* 4. DP GRID MATRIX VISUALIZER */}
                {currentStep?.dpGrid && (
                  <div className="overflow-x-auto bg-stone-950 p-4 border border-stone-800 rounded-xl w-full">
                    <table className="w-full text-center text-xs font-mono border-collapse">
                      <thead>
                        <tr>
                          <th className="p-2 text-stone-500 border-b border-stone-800">Filas / Cols</th>
                          {currentStep.dpGrid.colLabels.map((cLabel, cIdx) => (
                            <th key={cIdx} className="p-2 text-[#FDBA74] border-b border-stone-800">
                              {cLabel}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentStep.dpGrid.matrix.map((row, rIdx) => (
                          <tr key={rIdx}>
                            <td className="p-2 text-stone-400 font-bold border-r border-stone-800">
                              {currentStep.dpGrid?.rowLabels[rIdx]}
                            </td>
                            {row.map((val, cIdx) => {
                              const isActive =
                                currentStep.dpGrid?.activeCell?.[0] === rIdx &&
                                currentStep.dpGrid?.activeCell?.[1] === cIdx;

                              return (
                                <td
                                  key={cIdx}
                                  className={`p-2 border border-stone-800/60 transition ${
                                    isActive
                                      ? 'bg-[#C2410C] text-white font-bold ring-2 ring-orange-400'
                                      : 'text-stone-300'
                                  }`}
                                >
                                  {val}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Playback Controls Bar */}
              <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCurrentStepIndex(0);
                      setIsPlaying(false);
                    }}
                    className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl transition"
                    title="Reiniciar Simulación"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStepIndex((prev) => Math.max(0, prev - 1));
                    }}
                    disabled={currentStepIndex === 0}
                    className="p-2 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-300 rounded-xl transition"
                    title="Paso Anterior"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-5 py-2 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isPlaying ? 'Pausar' : 'Reproducir'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
                    }}
                    disabled={currentStepIndex === steps.length - 1}
                    className="p-2 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-300 rounded-xl transition"
                    title="Siguiente Paso"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                {/* Speed Controls & Custom Input Form */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-stone-900 px-3 py-1.5 rounded-xl border border-stone-800 text-xs text-stone-300 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#FDBA74]" />
                    <span>Velocidad:</span>
                    <button
                      onClick={() => setSpeedMs(1200)}
                      className={`px-2 py-0.5 rounded text-[10px] ${speedMs === 1200 ? 'bg-[#C2410C] text-white' : 'hover:text-white'}`}
                    >
                      0.5x
                    </button>
                    <button
                      onClick={() => setSpeedMs(800)}
                      className={`px-2 py-0.5 rounded text-[10px] ${speedMs === 800 ? 'bg-[#C2410C] text-white' : 'hover:text-white'}`}
                    >
                      1x
                    </button>
                    <button
                      onClick={() => setSpeedMs(400)}
                      className={`px-2 py-0.5 rounded text-[10px] ${speedMs === 400 ? 'bg-[#C2410C] text-white' : 'hover:text-white'}`}
                    >
                      2x
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Input Form */}
            {selectedAlgo.initialVisualData.defaultArray && (
              <form onSubmit={handleCustomInputSubmit} className="flex items-center gap-3 pt-2">
                <input
                  type="text"
                  placeholder="Probar con tu propio arreglo (ej: 42, 12, 9, 88, 3)..."
                  value={customInputArray}
                  onChange={(e) => setCustomInputArray(e.target.value)}
                  className="flex-1 bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl px-4 py-2 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#C2410C]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#33312E] text-white rounded-xl text-xs font-bold transition shrink-0"
                >
                  Simular con estos Datos
                </button>
              </form>
            )}
          </div>

          {/* Real Life Analogy Card */}
          <div className="bg-[#FFF7ED] border border-[#FDBA74] p-6 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#C2410C] font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Analogía del Mundo Real</span>
            </div>

            <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">
              {selectedAlgo.analogy.title}
            </h3>

            <p className="text-xs text-[#4A4742] leading-relaxed">
              {selectedAlgo.analogy.description}
            </p>

            <div className="pt-2 border-t border-[#FDBA74]/40 text-xs text-[#C2410C] font-semibold">
              <strong>Ejemplo práctico:</strong> {selectedAlgo.analogy.realLifeExample}
            </div>
          </div>

          {/* Complexity Table Card */}
          <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#C2410C]" />
              <span>Análisis de Complejidad Algorítmica (Big O)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#F9F8F6] p-3 rounded-xl text-center border border-[#E5E2DE]">
                <span className="text-[10px] text-[#8C8882] font-bold uppercase block">
                  Mejor Caso (Time)
                </span>
                <span className="text-sm font-mono font-bold text-[#10B981] mt-1 block">
                  {selectedAlgo.complexity.timeBest}
                </span>
              </div>

              <div className="bg-[#FFF7ED] p-3 rounded-xl text-center border border-[#FDBA74]">
                <span className="text-[10px] text-[#C2410C] font-bold uppercase block">
                  Caso Promedio (Time)
                </span>
                <span className="text-sm font-mono font-bold text-[#C2410C] mt-1 block">
                  {selectedAlgo.complexity.timeAverage}
                </span>
              </div>

              <div className="bg-[#F9F8F6] p-3 rounded-xl text-center border border-[#E5E2DE]">
                <span className="text-[10px] text-[#8C8882] font-bold uppercase block">
                  Peor Caso (Time)
                </span>
                <span className="text-sm font-mono font-bold text-[#1A1A1A] mt-1 block">
                  {selectedAlgo.complexity.timeWorst}
                </span>
              </div>

              <div className="bg-[#F9F8F6] p-3 rounded-xl text-center border border-[#E5E2DE]">
                <span className="text-[10px] text-[#8C8882] font-bold uppercase block">
                  Espacio (Space)
                </span>
                <span className="text-sm font-mono font-bold text-[#2563EB] mt-1 block">
                  {selectedAlgo.complexity.spaceWorst}
                </span>
              </div>
            </div>
          </div>

          {/* Multi-Language Code Snippets (C, C++, Python) */}
          <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#F2F1EE]">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-[#C2410C]" />
                <h3 className="text-base font-serif font-bold text-[#1A1A1A]">
                  Implementaciones en Código Fuente
                </h3>
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex items-center gap-1.5 bg-[#F2F1EE] p-1 rounded-xl">
                <button
                  onClick={() => setCodeLang('c')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    codeLang === 'c'
                      ? 'bg-[#C2410C] text-white shadow-xs'
                      : 'text-[#4A4742] hover:text-[#1A1A1A]'
                  }`}
                >
                  Lenguaje C
                </button>
                <button
                  onClick={() => setCodeLang('cpp')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    codeLang === 'cpp'
                      ? 'bg-[#1A1A1A] text-white shadow-xs'
                      : 'text-[#4A4742] hover:text-[#1A1A1A]'
                  }`}
                >
                  C++
                </button>
                <button
                  onClick={() => setCodeLang('python')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    codeLang === 'python'
                      ? 'bg-[#3B82F6] text-white shadow-xs'
                      : 'text-[#4A4742] hover:text-[#1A1A1A]'
                  }`}
                >
                  Python
                </button>
              </div>
            </div>

            {/* Code Viewer Container */}
            <div className="relative">
              <button
                onClick={() => handleCopyCode(selectedAlgo.codeImplementations[codeLang])}
                className="absolute right-3 top-3 p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs transition flex items-center gap-1.5 z-10"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? '¡Copiado!' : 'Copiar'}</span>
              </button>

              <div className="bg-[#1A1A1A] text-white p-4 rounded-xl border border-stone-800 text-xs overflow-x-auto font-mono">
                <CSyntaxHighlighter
                  code={selectedAlgo.codeImplementations[codeLang]}
                  language={codeLang === 'python' ? 'python' : 'c'}
                />
              </div>
            </div>
          </div>

          {/* Algorithm Markdown Explanation */}
          <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#C2410C]" />
              <span>Explicación Teórica en Detalle</span>
            </h3>

            <div className="text-xs text-[#33312E] leading-relaxed">
              <MarkdownRenderer content={selectedAlgo.explanationMarkdown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
