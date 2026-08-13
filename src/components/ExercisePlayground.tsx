import React, { useState, useEffect } from 'react';
import { Exercise } from '../types';
import {
  Code,
  Play,
  RotateCcw,
  HelpCircle,
  Eye,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers,
  Terminal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { CSyntaxHighlighter } from './CSyntaxHighlighter';

interface ExercisePlaygroundProps {
  exercise?: Exercise;
  exercises?: Exercise[];
  onSolved?: (exerciseId: string) => void;
}

function transpileCToExecutableJS(cCode: string): { executableJs: string; functionName: string } {
  let js = cCode;

  // 1. Remove #include directives
  js = js.replace(/#include\s*<[^>]+>/g, '');
  js = js.replace(/#include\s*"[^"]+"/g, '');

  // 2. Remove struct definitions
  js = js.replace(/struct\s+[A-Za-z0-9_]+\s*\{[^}]*\};/g, '');

  // 3. Math functions
  js = js.replace(/\bpow\s*\(/g, 'Math.pow(');
  js = js.replace(/\blog2\s*\(/g, 'Math.log2(');
  js = js.replace(/\bfloor\s*\(/g, 'Math.floor(');
  js = js.replace(/\bceil\s*\(/g, 'Math.ceil(');
  js = js.replace(/\babs\s*\(/g, 'Math.abs(');
  js = js.replace(/\bfabs\s*\(/g, 'Math.abs(');
  js = js.replace(/\bsqrt\s*\(/g, 'Math.sqrt(');

  // 4. NULL
  js = js.replace(/\bNULL\b/g, 'null');

  // 5. Variable types
  js = js.replace(/\b(int|double|float|char\*|char|bool|long\s+long|long|size_t)\s+([a-zA-Z0-9_$]+)\s*=/g, 'let $2 =');
  js = js.replace(/\b(int|double|float|char\*|char|bool|long\s+long|long|size_t)\s+([a-zA-Z0-9_$]+)\s*;/g, 'let $2;');

  // 6. Loops
  js = js.replace(/for\s*\(\s*(int|double|float|long\s+long|long|size_t)\s+/g, 'for (let ');

  // 7. Function signature conversion
  let functionName = '';
  js = js.replace(
    /^(?:[a-zA-Z0-9_*\s]+)\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*\{/gm,
    (match, fnName, params) => {
      if (!functionName) functionName = fnName;
      const cleanParams = params
        .split(',')
        .map((p: string) => {
          let param = p.trim();
          if (!param) return '';
          param = param.replace(/^(const\s+)?(struct\s+)?[a-zA-Z0-9_]+\s*\*?\s*/, '');
          param = param.replace(/\[\]/g, '');
          return param.trim();
        })
        .filter(Boolean)
        .join(', ');
      return `function ${fnName}(${cleanParams}) {`;
    }
  );

  return { executableJs: js, functionName };
}

export const ExercisePlayground: React.FC<ExercisePlaygroundProps> = ({
  exercise,
  exercises,
  onSolved,
}) => {
  const allExercises = exercises || (exercise ? [exercise] : []);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const activeExercise = allExercises[selectedIdx] || allExercises[0];

  const [code, setCode] = useState<string>(activeExercise?.initialCode || '');
  const [testResults, setTestResults] = useState<
    { testId: string; passed: boolean; actual: string; expected: string }[]
  >([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [editorTab, setEditorTab] = useState<'editor' | 'highlighted'>('editor');

  // Update code when active exercise changes
  useEffect(() => {
    if (activeExercise) {
      setCode(activeExercise.initialCode);
      setTestResults([]);
      setShowHint(false);
      setShowSolution(false);
    }
  }, [selectedIdx, activeExercise?.id]);

  if (!activeExercise) {
    return (
      <div className="p-8 text-center text-[#8C8882]">
        No hay ejercicios disponibles para esta sección.
      </div>
    );
  }

  const handleResetCode = () => {
    setCode(activeExercise.initialCode);
    setTestResults([]);
    setShowSolution(false);
  };

  const handleRunCode = () => {
    const results = [];
    let allPassed = true;

    try {
      const { executableJs, functionName } = transpileCToExecutableJS(code);

      // eslint-disable-next-line no-new-func
      const runUserFunc = new Function(`
        ${executableJs}
        return typeof ${functionName} !== 'undefined' ? ${functionName} : undefined;
      `)();

      if (!runUserFunc || typeof runUserFunc !== 'function') {
        throw new Error('No se pudo encontrar la función principal en tu código C.');
      }

      for (let tc of activeExercise.testCases) {
        try {
          // eslint-disable-next-line no-new-func
          const argVal = new Function(`return ${tc.input};`)();
          let output;

          if (Array.isArray(argVal)) {
            output = runUserFunc(...argVal);
          } else {
            output = runUserFunc(argVal);
          }

          const actualStr =
            typeof output === 'object' ? JSON.stringify(output) : String(output);
          const expectedStr = tc.expectedOutput;

          const passed =
            actualStr.trim().replace(/\s+/g, '') === expectedStr.trim().replace(/\s+/g, '');
          if (!passed) allPassed = false;

          results.push({
            testId: tc.id,
            passed,
            actual: actualStr,
            expected: expectedStr,
          });
        } catch (err: any) {
          allPassed = false;
          results.push({
            testId: tc.id,
            passed: false,
            actual: `Error de ejecución: ${err.message}`,
            expected: tc.expectedOutput,
          });
        }
      }
    } catch (syntaxErr: any) {
      allPassed = false;
      results.push({
        testId: 'syntax',
        passed: false,
        actual: `Error de Sintaxis / Compilación: ${syntaxErr.message}`,
        expected: 'Código en C válido con función definida',
      });
    }

    setTestResults(results);
    if (allPassed && onSolved) {
      onSolved(activeExercise.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
    >
      {/* Exercise Selection Bar if multiple */}
      {allExercises.length > 1 && (
        <div className="bg-[#F9F8F6] p-2 border border-[#E5E2DE] rounded-xl flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-[#8C8882] uppercase tracking-wider px-2 flex items-center gap-1 shrink-0">
            <Layers className="w-4 h-4 text-[#C2410C]" />
            <span>Ejercicios C:</span>
          </span>
          <div className="flex items-center gap-1.5">
            {allExercises.map((ex, idx) => (
              <button
                key={ex.id || idx}
                onClick={() => setSelectedIdx(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
                  selectedIdx === idx
                    ? 'bg-[#C2410C] text-white shadow-xs'
                    : 'bg-white hover:bg-[#F2F1EE] text-[#4A4742] border border-[#E5E2DE]'
                }`}
              >
                Ejercicio {idx + 1}: {ex.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Exercise Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F2F1EE]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74] rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider">
              {activeExercise.cormenRef}
            </span>
            <span className="px-2.5 py-0.5 bg-[#181825] text-[#A6E3A1] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
              Lenguaje C (ANSI C)
            </span>
          </div>
          <h2 className="text-xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <Code className="w-5 h-5 text-[#C2410C]" />
            {activeExercise.title}
          </h2>
        </div>
      </div>

      {/* Description */}
      <div className="text-sm text-[#4A4742]">
        <MarkdownRenderer content={activeExercise.description} />
      </div>

      {/* Code Editor Container */}
      <div className="bg-[#181825] border border-[#313244] rounded-xl overflow-hidden shadow-md">
        {/* Editor Top Toolbar */}
        <div className="bg-[#11111B] px-4 py-2.5 border-b border-[#313244] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#BAC2DE]">
          <div className="flex items-center gap-3">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-[#FAB387] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#FAB387]" />
              Editor C99
            </span>
            <div className="flex items-center bg-[#1E1E2E] p-0.5 rounded-lg border border-[#313244]">
              <button
                onClick={() => setEditorTab('editor')}
                className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold transition ${
                  editorTab === 'editor'
                    ? 'bg-[#CBA6F7] text-[#11111B]'
                    : 'text-[#BAC2DE] hover:text-white'
                }`}
              >
                Escribir Código
              </button>
              <button
                onClick={() => setEditorTab('highlighted')}
                className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold transition ${
                  editorTab === 'highlighted'
                    ? 'bg-[#CBA6F7] text-[#11111B]'
                    : 'text-[#BAC2DE] hover:text-white'
                }`}
              >
                Vista Coloreada C
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetCode}
              className="flex items-center gap-1 text-[#CBA6F7] hover:text-white transition text-[11px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Código C</span>
            </button>
          </div>
        </div>

        {/* Editor Content */}
        {editorTab === 'editor' ? (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={12}
            spellCheck={false}
            className="w-full bg-[#181825] text-[#A6E3A1] font-mono text-xs sm:text-sm p-4 focus:outline-none resize-y leading-relaxed border-none selection:bg-[#313244]"
          />
        ) : (
          <div className="p-2 bg-[#181825]">
            <CSyntaxHighlighter code={code} />
          </div>
        )}

        {/* Bottom Toolbar */}
        <div className="bg-[#11111B] px-4 py-3 border-t border-[#313244] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 text-[#CDD6F4] hover:text-[#F9E2AF] transition"
            >
              <HelpCircle className="w-4 h-4 text-[#F9E2AF]" />
              <span>{showHint ? 'Ocultar Pista' : 'Ver Pista'}</span>
            </button>

            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center gap-1.5 text-[#CDD6F4] hover:text-[#FAB387] transition"
            >
              <Eye className="w-4 h-4 text-[#FAB387]" />
              <span>{showSolution ? 'Ocultar Solución C' : 'Ver Solución C'}</span>
            </button>
          </div>

          <button
            onClick={handleRunCode}
            className="flex items-center gap-2 px-5 py-2 bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold rounded-full text-xs uppercase tracking-wider transition shadow-xs"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Ejecutar Pruebas C</span>
          </button>
        </div>
      </div>

      {/* Hint Accordion */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#FFF7ED] border border-[#FDBA74] p-4 rounded-xl text-xs sm:text-sm text-[#C2410C] flex items-start gap-3 overflow-hidden"
          >
            <Sparkles className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block mb-1 uppercase tracking-wider text-[10px]">
                Pista Técnica C:
              </span>
              <div className="text-[#1A1A1A]">
                <MarkdownRenderer content={activeExercise.hint} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Solution Reveal Box */}
      <AnimatePresence>
        {showSolution && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-[#F9F8F6] border border-[#E5E2DE] p-5 rounded-xl text-xs sm:text-sm space-y-3"
          >
            <div className="flex items-center gap-2 font-bold text-[#1A1A1A]">
              <Eye className="w-4 h-4 text-[#C2410C]" />
              <span>Solución Ofícial de Referencia en C:</span>
            </div>
            <CSyntaxHighlighter code={activeExercise.solutionCode} />
            <div className="text-[#4A4742]">
              <MarkdownRenderer content={activeExercise.explanation} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Test Results Suite */}
      <AnimatePresence>
        {testResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl p-5 space-y-3"
          >
            <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#C2410C]" />
              <span>Resultados de la Suite de Pruebas:</span>
            </h3>

            <div className="space-y-2.5">
              {testResults.map((res, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border text-xs font-mono space-y-1.5 ${
                    res.passed
                      ? 'bg-[#ECFDF5] border-[#10B981] text-[#065F46]'
                      : 'bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <div className="flex items-center gap-2">
                      {res.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#EF4444] shrink-0" />
                      )}
                      <span>Caso de Prueba #{i + 1}</span>
                    </div>
                    <span className="uppercase tracking-wider text-[10px]">
                      {res.passed ? '¡Pasado!' : 'Fallido'}
                    </span>
                  </div>

                  {!res.passed && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#FCA5A5] text-[11px]">
                      <div>
                        <span className="text-[#7F1D1D] block font-semibold">Tu Salida:</span>
                        <code className="text-[#991B1B] font-bold">{res.actual}</code>
                      </div>
                      <div>
                        <span className="text-[#065F46] block font-semibold">Salida Esperada:</span>
                        <code className="text-[#047857] font-bold">{res.expected}</code>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
