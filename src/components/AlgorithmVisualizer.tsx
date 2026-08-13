import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Clock,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Info,
  Sliders,
  CheckCircle,
  HelpCircle,
  BarChart2,
  ArrowRight,
  Zap,
  ListOrdered
} from 'lucide-react';
import { motion } from 'motion/react';
import { AlgoVisualStep } from '../types';

export interface VisualizerPreset<T = any> {
  id: string;
  label: string;
  description: string;
  input: T;
}

export interface AlgorithmVisualizerProps<TInput = any> {
  title: string;
  subtitle?: string;
  cormenChapter?: string;
  categoryLabel?: string;
  pseudocode: string;
  presets?: VisualizerPreset<TInput>[];
  defaultInput: TInput;
  generateSteps: (input: TInput) => AlgoVisualStep[];
  formatCustomInput?: (text: string) => TInput | null;
  customInputPlaceholder?: string;
  visualizerType?: 'array' | 'graph' | 'dp' | 'auto';
  allowCustomInput?: boolean;
}

export const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  title,
  subtitle,
  cormenChapter = 'CLRS Cormen',
  categoryLabel = 'Algoritmos',
  pseudocode,
  presets = [],
  defaultInput,
  generateSteps,
  formatCustomInput,
  customInputPlaceholder = 'Ingresa valores separados por coma...',
  visualizerType = 'auto',
  allowCustomInput = true
}) => {
  const [currentInput, setCurrentInput] = useState<any>(defaultInput);
  const [customInputText, setCustomInputText] = useState<string>('');
  const [activePresetId, setActivePresetId] = useState<string>(presets[0]?.id || 'default');

  // Animation player state
  const [steps, setSteps] = useState<AlgoVisualStep[]>(() => generateSteps(defaultInput));
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(800);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Split pseudocode into clean lines
  const pseudocodeLines = pseudocode.trim().split('\n');

  // Regenerate steps when input changes
  useEffect(() => {
    try {
      const generated = generateSteps(currentInput);
      setSteps(generated && generated.length > 0 ? generated : []);
      setCurrentStepIndex(0);
      setIsPlaying(false);
    } catch (err) {
      console.error('Error generating steps:', err);
    }
  }, [currentInput]);

  // Timer loop for play/pause
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

  const currentStep = steps[currentStepIndex] || steps[0] || {
    stepIndex: 0,
    description: 'Cargando simulación...'
  };

  const handleSelectPreset = (preset: VisualizerPreset) => {
    setActivePresetId(preset.id);
    setCurrentInput(preset.input);
    setCustomInputText('');
  };

  const handleCustomInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputText.trim()) return;

    if (formatCustomInput) {
      const formatted = formatCustomInput(customInputText);
      if (formatted) {
        setCurrentInput(formatted);
        setActivePresetId('custom');
      }
    } else if (Array.isArray(defaultInput)) {
      const parsed = customInputText
        .split(',')
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));

      if (parsed.length >= 2) {
        setCurrentInput(parsed);
        setActivePresetId('custom');
      }
    }
  };

  // Determine visualization mode
  const resolvedType =
    visualizerType !== 'auto'
      ? visualizerType
      : currentStep.dpGrid
      ? 'dp'
      : currentStep.graphNodes
      ? 'graph'
      : 'array';

  return (
    <div className="bg-white border border-[#E5E2DE] rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header Info Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-[#E5E2DE]">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 bg-[#C2410C] text-white rounded-md uppercase tracking-wider">
              {cormenChapter}
            </span>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74] rounded-md uppercase tracking-wider">
              {categoryLabel}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-[#4A4742] leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Input Preset Buttons */}
        {presets.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 bg-[#F9F8F6] p-1.5 rounded-xl border border-[#E5E2DE]">
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activePresetId === p.id
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'text-[#4A4742] hover:text-[#1A1A1A] hover:bg-[#E5E2DE]/50'
                }`}
                title={p.description}
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid: Left Visual Stage (8 cols), Right Pseudocode & Inspector (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Stage Container (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="bg-[#1A1A1A] text-white p-5 sm:p-6 rounded-2xl border border-stone-800 min-h-[380px] flex flex-col justify-between relative overflow-hidden shadow-md">
            {/* Top Bar: Progress & Step Counter */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 text-xs font-mono">
              <span className="text-[#FDBA74] font-bold flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#C2410C]" />
                <span>Paso {currentStepIndex + 1} de {steps.length}</span>
              </span>

              <div className="w-36 sm:w-56 bg-stone-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#C2410C] h-full transition-all duration-300"
                  style={{
                    width: `${((currentStepIndex + 1) / Math.max(1, steps.length)) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Description Callout Banner */}
            <div className="my-3 p-3 bg-stone-900/90 border border-stone-800 rounded-xl text-xs text-stone-200 font-mono flex items-start gap-2.5">
              <span className="text-[#10B981] font-bold shrink-0 mt-0.5">▶</span>
              <p className="leading-relaxed">{currentStep.description}</p>
            </div>

            {/* VISUAL CANVASES */}
            <div className="flex-1 my-3 flex flex-col items-center justify-center min-h-[220px]">
              {/* 1. ARRAY / BARS CANVASES (For Sorting & Array Algos) */}
              {resolvedType === 'array' && currentStep.arrayState && (
                <div className="w-full space-y-6">
                  {/* Active Subarray Highlight Frame */}
                  {currentStep.subarrayRange && (
                    <div className="text-center text-[10px] font-mono text-[#FDBA74] bg-stone-900/60 py-1 px-3 rounded-md border border-stone-800 w-fit mx-auto">
                      Subarreglo activo: <strong className="text-white">A[{currentStep.subarrayRange[0]}..{currentStep.subarrayRange[1]}]</strong>
                    </div>
                  )}

                  {/* Main Array Bars */}
                  <div className="w-full flex items-end justify-center gap-2 sm:gap-3.5 h-44 pt-6 px-2">
                    {currentStep.arrayState.map((val, idx) => {
                      const isHighlighted = currentStep.highlightIndices?.includes(idx);
                      const isSorted = currentStep.sortedIndices?.includes(idx);
                      const isSwapping = currentStep.swapIndices?.includes(idx);
                      const isInSubarray =
                        currentStep.subarrayRange &&
                        idx >= currentStep.subarrayRange[0] &&
                        idx <= currentStep.subarrayRange[1];

                      const pointer = currentStep.activePointers?.find((p) => p.index === idx);

                      let barColor = 'bg-stone-700';
                      if (isInSubarray) barColor = 'bg-stone-600 border border-stone-500';
                      if (isSorted) barColor = 'bg-[#10B981]';
                      if (isHighlighted) barColor = 'bg-[#3B82F6]';
                      if (isSwapping) barColor = 'bg-[#C2410C] animate-pulse';

                      const maxVal = Math.max(...currentStep.arrayState, 50);
                      const heightPercent = Math.max(18, Math.round((val / maxVal) * 100));

                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center flex-1 max-w-[52px] h-full justify-end relative"
                        >
                          {/* Pointer Label Badge */}
                          {pointer && (
                            <span
                              className="absolute -top-7 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded text-white shadow-xs whitespace-nowrap z-10"
                              style={{ backgroundColor: pointer.color || '#C2410C' }}
                            >
                              {pointer.label}
                            </span>
                          )}

                          {/* Top Numeric Label */}
                          <span className="text-[10px] font-mono text-stone-300 font-bold mb-1">
                            {val}
                          </span>

                          {/* Bar */}
                          <motion.div
                            layout
                            className={`w-full rounded-t-lg transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white shadow-md ${barColor}`}
                            style={{ height: `${heightPercent}%` }}
                          />

                          {/* Index Footer */}
                          <span className="text-[9px] font-mono text-stone-500 mt-1">
                            [{idx}]
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Temporary Arrays Box (e.g., L and R arrays during MergeSort) */}
                  {currentStep.tempArrays && currentStep.tempArrays.length > 0 && (
                    <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-center gap-6">
                      {currentStep.tempArrays.map((tArr, tIdx) => (
                        <div key={tIdx} className="bg-stone-900 border border-stone-800 p-2.5 rounded-xl flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-[#FDBA74]">
                            {tArr.label}:
                          </span>
                          <div className="flex items-center gap-1.5">
                            {tArr.values.map((v, vIdx) => {
                              const isActive = tArr.activeIndex === vIdx;
                              return (
                                <span
                                  key={vIdx}
                                  className={`px-2 py-1 rounded text-xs font-mono font-bold border ${
                                    isActive
                                      ? 'bg-[#C2410C] text-white border-orange-400 ring-2 ring-orange-500/40'
                                      : 'bg-stone-800 border-stone-700 text-stone-300'
                                  }`}
                                >
                                  {v}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 2. GRAPH CANVASES (For BFS, DFS, Dijkstra) */}
              {resolvedType === 'graph' && currentStep.graphNodes && (
                <div className="w-full h-64 relative flex items-center justify-center border border-stone-800 rounded-xl bg-stone-950 p-4 overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {currentStep.graphEdges?.map((edge, i) => {
                      const fromNode = currentStep.graphNodes?.find((n) => n.id === edge.from);
                      const toNode = currentStep.graphNodes?.find((n) => n.id === edge.to);
                      if (!fromNode || !toNode) return null;

                      const fx = fromNode.x || 100;
                      const fy = fromNode.y || 100;
                      const tx = toNode.x || 200;
                      const ty = toNode.y || 100;

                      return (
                        <g key={i}>
                          <line
                            x1={fx}
                            y1={fy}
                            x2={tx}
                            y2={ty}
                            stroke={edge.highlighted ? '#C2410C' : '#475569'}
                            strokeWidth={edge.highlighted ? 3 : 1.5}
                            strokeDasharray={edge.highlighted ? '4 2' : 'none'}
                          />
                          {edge.weight !== undefined && (
                            <text
                              x={(fx + tx) / 2}
                              y={(fy + ty) / 2 - 6}
                              fill={edge.highlighted ? '#FDBA74' : '#94A3B8'}
                              fontSize="11"
                              fontFamily="monospace"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              {edge.weight}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Render Graph Nodes */}
                  {currentStep.graphNodes.map((node) => {
                    let nodeStyle = 'bg-slate-800 border-slate-600 text-slate-200';
                    if (node.state === 'current')
                      nodeStyle =
                        'bg-[#C2410C] border-orange-400 text-white shadow-lg ring-4 ring-orange-500/30 scale-110';
                    if (node.state === 'visiting') nodeStyle = 'bg-blue-600 border-blue-400 text-white';
                    if (node.state === 'visited') nodeStyle = 'bg-emerald-600 border-emerald-400 text-white';
                    if (node.state === 'path') nodeStyle = 'bg-amber-500 border-amber-300 text-white ring-2 ring-amber-400';

                    return (
                      <div
                        key={node.id}
                        className={`absolute w-12 h-12 rounded-full border-2 flex flex-col items-center justify-center font-mono text-xs font-bold transition-all duration-300 z-10 ${nodeStyle}`}
                        style={{
                          left: `${(node.x || 100) - 24}px`,
                          top: `${(node.y || 100) - 24}px`
                        }}
                      >
                        <span>{node.id}</span>
                        {node.distance && (
                          <span className="text-[8px] opacity-90 block leading-tight">{node.distance}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 3. DYNAMIC PROGRAMMING (DP) GRID CANVASES */}
              {resolvedType === 'dp' && currentStep.dpGrid && (
                <div className="overflow-x-auto bg-stone-950 p-4 border border-stone-800 rounded-xl w-full">
                  <table className="w-full text-center text-xs font-mono border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2 text-stone-500 border-b border-stone-800 font-bold">
                          Ítem \ Peso
                        </th>
                        {currentStep.dpGrid.colLabels.map((cLabel, cIdx) => (
                          <th key={cIdx} className="p-2 text-[#FDBA74] border-b border-stone-800 font-bold">
                            {cLabel}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentStep.dpGrid.matrix.map((row, rIdx) => (
                        <tr key={rIdx}>
                          <td className="p-2 text-stone-300 font-bold border-r border-stone-800 text-left whitespace-nowrap bg-stone-900/50">
                            {currentStep.dpGrid?.rowLabels[rIdx]}
                          </td>
                          {row.map((val, cIdx) => {
                            const isActive =
                              currentStep.dpGrid?.activeCell?.[0] === rIdx &&
                              currentStep.dpGrid?.activeCell?.[1] === cIdx;

                            return (
                              <td
                                key={cIdx}
                                className={`p-2.5 border border-stone-800/80 transition-all font-bold ${
                                  isActive
                                    ? 'bg-[#C2410C] text-white ring-2 ring-orange-400 shadow-md scale-105 z-10'
                                    : val !== 0 && val !== '0' && val !== '-'
                                    ? 'text-emerald-400 bg-stone-900/60'
                                    : 'text-stone-500'
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

            {/* Bottom Playback Controls Bar */}
            <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentStepIndex(0);
                    setIsPlaying(false);
                  }}
                  className="p-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl transition"
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
                  className="p-2.5 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-300 rounded-xl transition"
                  title="Paso Anterior"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-5 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                  <span>{isPlaying ? 'Pausar' : 'Reproducir'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
                  }}
                  disabled={currentStepIndex === steps.length - 1}
                  className="p-2.5 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-300 rounded-xl transition"
                  title="Siguiente Paso"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Speed Buttons */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-stone-900 px-3 py-1.5 rounded-xl border border-stone-800 text-xs text-stone-300 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#FDBA74]" />
                  <span className="hidden sm:inline">Velocidad:</span>
                  <button
                    onClick={() => setSpeedMs(1400)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      speedMs === 1400 ? 'bg-[#C2410C] text-white' : 'hover:text-white text-stone-400'
                    }`}
                  >
                    0.5x
                  </button>
                  <button
                    onClick={() => setSpeedMs(800)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      speedMs === 800 ? 'bg-[#C2410C] text-white' : 'hover:text-white text-stone-400'
                    }`}
                  >
                    1x
                  </button>
                  <button
                    onClick={() => setSpeedMs(350)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      speedMs === 350 ? 'bg-[#C2410C] text-white' : 'hover:text-white text-stone-400'
                    }`}
                  >
                    2x
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Input Form (If array or custom handler provided) */}
          {allowCustomInput && (
            <form onSubmit={handleCustomInputSubmit} className="flex items-center gap-3">
              <input
                type="text"
                placeholder={customInputPlaceholder}
                value={customInputText}
                onChange={(e) => setCustomInputText(e.target.value)}
                className="flex-1 bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl px-4 py-2.5 text-xs font-mono text-[#1A1A1A] focus:outline-none focus:border-[#C2410C]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#33312E] text-white rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-[#FDBA74]" />
                <span>Simular Datos</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Panel: Synchronized CLRS Pseudocode & Variables Inspector (4-5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          {/* Synchronized Pseudocode Box */}
          <div className="bg-[#1A1A1A] text-stone-200 border border-stone-800 rounded-2xl p-4 shadow-xs flex flex-col space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#C2410C]" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Pseudocódigo CLRS Cormen
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                Sincronizado
              </span>
            </div>

            {/* Pseudocode Lines List */}
            <div className="font-mono text-xs overflow-x-auto space-y-1 max-h-[280px] overflow-y-auto pr-1">
              {pseudocodeLines.map((line, idx) => {
                const lineNum = idx + 1;
                const isCurrentLine = currentStep.codeLine === lineNum;

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 px-2.5 py-1 rounded-lg transition-all ${
                      isCurrentLine
                        ? 'bg-[#FFF7ED] text-[#C2410C] font-bold border-l-4 border-[#C2410C] shadow-sm'
                        : 'text-stone-300 hover:bg-stone-900/80'
                    }`}
                  >
                    <span
                      className={`text-[10px] select-none font-mono w-5 text-right shrink-0 mt-0.5 ${
                        isCurrentLine ? 'text-[#C2410C] font-bold' : 'text-stone-600'
                      }`}
                    >
                      {lineNum}
                    </span>
                    <pre className="whitespace-pre font-mono text-[11px] leading-relaxed">
                      {line}
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Variables Inspector Box */}
          <div className="bg-white border border-[#E5E2DE] rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#F2F1EE] pb-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#C2410C]" />
                <h4 className="text-xs font-serif font-bold text-[#1A1A1A]">
                  Inspector de Variables en Tiempo Real
                </h4>
              </div>
              <span className="text-[10px] font-mono text-[#8C8882]">Estado de Ejecución</span>
            </div>

            {currentStep.variables && Object.keys(currentStep.variables).length > 0 ? (
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {Object.entries(currentStep.variables).map(([key, val]) => (
                  <div
                    key={key}
                    className="bg-[#F9F8F6] border border-[#E5E2DE] p-2 rounded-xl flex items-center justify-between"
                  >
                    <span className="text-[#8C8882] text-[11px] font-semibold">{key}:</span>
                    <span className="font-bold text-[#1A1A1A] bg-white px-2 py-0.5 rounded border border-[#E5E2DE]">
                      {String(val)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#8C8882] italic text-center py-2">
                Avanza los pasos para inspeccionar las variables del algoritmo.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
