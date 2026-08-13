import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Gauge,
  Sparkles,
  Code2,
  Info,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface InteractiveAnimationContainerProps {
  title: string;
  description: string;
  conceptTag?: string;
  totalSteps?: number;
  currentStep?: number;
  onStepChange?: (step: number) => void;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onReset?: () => void;
  onStepForward?: () => void;
  onStepBackward?: () => void;
  speed?: number;
  onSpeedChange?: (speed: number) => void;
  autoPlayIntervalMs?: number;
  
  // Custom renders or children
  children?: React.ReactNode | ((state: { step: number; isPlaying: boolean; speed: number }) => React.ReactNode);
  extraControls?: React.ReactNode;
  
  // Optional code or step explanation
  codeSnippet?: string;
  activeCodeLine?: number;
  stepExplanations?: string[];
  
  // Custom background styling
  darkCanvas?: boolean;
}

export const InteractiveAnimationContainer: React.FC<InteractiveAnimationContainerProps> = ({
  title,
  description,
  conceptTag = 'Animación Interactiva',
  totalSteps = 10,
  currentStep: controlledStep,
  onStepChange,
  isPlaying: controlledIsPlaying,
  onTogglePlay,
  onReset: controlledOnReset,
  onStepForward,
  onStepBackward,
  speed: controlledSpeed,
  onSpeedChange,
  autoPlayIntervalMs = 1200,
  children,
  extraControls,
  codeSnippet,
  activeCodeLine,
  stepExplanations,
  darkCanvas = false,
}) => {
  // Internal State (used when uncontrolled)
  const [internalStep, setInternalStep] = useState<number>(0);
  const [internalIsPlaying, setInternalIsPlaying] = useState<boolean>(false);
  const [internalSpeed, setInternalSpeed] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Determine controlled vs uncontrolled
  const step = controlledStep !== undefined ? controlledStep : internalStep;
  const isPlaying = controlledIsPlaying !== undefined ? controlledIsPlaying : internalIsPlaying;
  const speed = controlledSpeed !== undefined ? controlledSpeed : internalSpeed;

  const handleStepChange = (newStep: number) => {
    const clamped = Math.max(0, Math.min(totalSteps - 1, newStep));
    if (onStepChange) {
      onStepChange(clamped);
    } else {
      setInternalStep(clamped);
    }
  };

  const handleTogglePlay = () => {
    if (onTogglePlay) {
      onTogglePlay();
    } else {
      setInternalIsPlaying((prev) => !prev);
    }
  };

  const handleReset = () => {
    if (controlledOnReset) {
      controlledOnReset();
    } else {
      setInternalStep(0);
      setInternalIsPlaying(false);
    }
  };

  const handleForward = () => {
    if (onStepForward) {
      onStepForward();
    } else {
      if (step < totalSteps - 1) {
        handleStepChange(step + 1);
      } else {
        handleStepChange(0); // loop back
      }
    }
  };

  const handleBackward = () => {
    if (onStepBackward) {
      onStepBackward();
    } else {
      if (step > 0) {
        handleStepChange(step - 1);
      }
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    if (onSpeedChange) {
      onSpeedChange(newSpeed);
    } else {
      setInternalSpeed(newSpeed);
    }
  };

  // Auto-play interval handling
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying && totalSteps > 0) {
      const interval = Math.max(200, autoPlayIntervalMs / speed);
      timer = setInterval(() => {
        if (step < totalSteps - 1) {
          handleStepChange(step + 1);
        } else {
          // Loop or pause at end
          handleStepChange(0);
        }
      }, interval);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, step, totalSteps, speed, autoPlayIntervalMs]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const currentExplanation =
    stepExplanations && stepExplanations[step]
      ? stepExplanations[step]
      : null;

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl border transition-all my-6 overflow-hidden shadow-xs ${
        darkCanvas
          ? 'bg-[#121316] border-[#2A2D35] text-white'
          : 'bg-white border-[#E5E2DE] text-[#1A1A1A]'
      } ${
        isFullscreen
          ? 'fixed inset-4 z-50 my-0 max-w-none shadow-2xl flex flex-col justify-between'
          : 'relative'
      }`}
    >
      {/* Header Bar */}
      <div
        className={`px-5 py-3.5 border-b flex items-center justify-between gap-4 ${
          darkCanvas ? 'border-[#2A2D35] bg-[#1A1C23]' : 'border-[#F2F1EE] bg-[#F9F8F6]'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74]">
                {conceptTag}
              </span>
              <span className="text-[11px] font-mono text-[#8C8882]">
                Paso {step + 1} de {totalSteps}
              </span>
            </div>

            <h4
              className={`text-sm font-serif font-bold truncate ${
                darkCanvas ? 'text-white' : 'text-[#1A1A1A]'
              }`}
            >
              {title}
            </h4>
          </div>
        </div>

        {/* Top Right Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {codeSnippet && (
            <button
              onClick={() => setShowCode(!showCode)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors ${
                showCode
                  ? 'bg-[#C2410C] text-white border-[#C2410C]'
                  : darkCanvas
                  ? 'bg-[#252833] text-gray-300 border-[#3A3D4D] hover:bg-[#323645]'
                  : 'bg-white text-[#4A4742] border-[#E5E2DE] hover:bg-[#F2F1EE]'
              }`}
              title="Mostrar/Ocultar Código C Relacionado"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Código C</span>
            </button>
          )}

          <button
            onClick={toggleFullscreen}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              darkCanvas
                ? 'bg-[#252833] text-gray-300 border-[#3A3D4D] hover:bg-[#323645]'
                : 'bg-white text-[#4A4742] border-[#E5E2DE] hover:bg-[#F2F1EE]'
            }`}
            title={isFullscreen ? 'Salir de Pantalla Completa' : 'Maximizar Animación'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Canvas Stage */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center relative min-h-[260px]">
        {/* Description Banner */}
        <p className={`text-xs mb-4 ${darkCanvas ? 'text-gray-300' : 'text-[#4A4742]'}`}>
          {description}
        </p>

        {/* Custom Render / Children Canvas */}
        <div className="w-full my-auto">
          {typeof children === 'function'
            ? children({ step, isPlaying, speed })
            : children}
        </div>

        {/* Step Explanation Badge */}
        {currentExplanation && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-xl border text-xs font-sans flex items-start gap-2.5 ${
              darkCanvas
                ? 'bg-[#1E2029] border-[#2E3240] text-amber-200'
                : 'bg-[#FFF7ED] border-[#FDBA74] text-[#852D08]'
            }`}
          >
            <Info className="w-4 h-4 shrink-0 text-[#C2410C] mt-0.5" />
            <div className="flex-1 leading-relaxed">
              <span className="font-bold mr-1">Explicación Paso {step + 1}:</span>
              {currentExplanation}
            </div>
          </motion.div>
        )}

        {/* Synchronized Code Drawer */}
        <AnimatePresence>
          {showCode && codeSnippet && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden rounded-xl border border-[#2A2D35] bg-[#0D0E11] text-xs font-mono text-gray-300"
            >
              <div className="px-3 py-1.5 bg-[#17181F] border-b border-[#2A2D35] flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#C2410C]" />
                  Código C Sincronizado
                </span>
                <span>ANSI C</span>
              </div>
              <pre className="p-3.5 overflow-x-auto leading-relaxed">
                <code>
                  {codeSnippet.split('\n').map((line, idx) => {
                    const isHighlighted = activeCodeLine !== undefined && activeCodeLine === idx + 1;
                    return (
                      <div
                        key={idx}
                        className={`flex gap-3 px-1.5 py-0.5 rounded ${
                          isHighlighted ? 'bg-[#C2410C]/30 text-amber-300 font-bold border-l-2 border-[#C2410C]' : ''
                        }`}
                      >
                        <span className="text-gray-600 select-none w-5 text-right">{idx + 1}</span>
                        <span>{line}</span>
                      </div>
                    );
                  })}
                </code>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Control Dock */}
      <div
        className={`px-5 py-3 border-t flex flex-wrap items-center justify-between gap-4 ${
          darkCanvas ? 'border-[#2A2D35] bg-[#16181F]' : 'border-[#F2F1EE] bg-[#F9F8F6]'
        }`}
      >
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          {/* Reset */}
          <button
            onClick={handleReset}
            className={`p-2 rounded-xl border transition ${
              darkCanvas
                ? 'bg-[#252833] text-gray-300 border-[#3A3D4D] hover:bg-[#323645]'
                : 'bg-white text-[#4A4742] border-[#E5E2DE] hover:bg-[#F2F1EE]'
            }`}
            title="Reiniciar (Paso 0)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Step Back */}
          <button
            onClick={handleBackward}
            disabled={step === 0}
            className={`p-2 rounded-xl border transition disabled:opacity-40 disabled:cursor-not-allowed ${
              darkCanvas
                ? 'bg-[#252833] text-gray-300 border-[#3A3D4D] hover:bg-[#323645]'
                : 'bg-white text-[#4A4742] border-[#E5E2DE] hover:bg-[#F2F1EE]'
            }`}
            title="Paso Anterior"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play / Pause Toggle */}
          <button
            onClick={handleTogglePlay}
            className="px-4 py-2 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-mono font-bold text-xs flex items-center gap-2 shadow-xs transition active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Reproducir</span>
              </>
            )}
          </button>

          {/* Step Forward */}
          <button
            onClick={handleForward}
            disabled={step >= totalSteps - 1}
            className={`p-2 rounded-xl border transition disabled:opacity-40 disabled:cursor-not-allowed ${
              darkCanvas
                ? 'bg-[#252833] text-gray-300 border-[#3A3D4D] hover:bg-[#323645]'
                : 'bg-white text-[#4A4742] border-[#E5E2DE] hover:bg-[#F2F1EE]'
            }`}
            title="Paso Siguiente"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Step Slider & Progress Indicator */}
        <div className="flex-1 min-w-[200px] max-w-md flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={totalSteps - 1}
            value={step}
            onChange={(e) => handleStepChange(parseInt(e.target.value, 10))}
            className="flex-1 accent-[#C2410C] cursor-pointer h-2 bg-gray-200 rounded-lg dark:bg-gray-700"
          />
          <span className="text-xs font-mono font-bold w-12 text-right text-[#C2410C]">
            {step + 1}/{totalSteps}
          </span>
        </div>

        {/* Speed Selector & Extra Controls */}
        <div className="flex items-center gap-3">
          {extraControls}

          <div className="flex items-center gap-1.5 bg-[#FFF7ED] border border-[#FDBA74] px-2.5 py-1 rounded-xl text-xs text-[#C2410C] font-mono font-semibold">
            <Gauge className="w-3.5 h-3.5" />
            <select
              value={speed}
              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
              className="bg-transparent border-none outline-hidden cursor-pointer font-bold text-xs"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1.0x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2.0x</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
