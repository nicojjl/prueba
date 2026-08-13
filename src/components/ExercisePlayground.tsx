import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Copy,
  Check,
  Wrench,
  Cpu,
  CornerDownLeft,
  FileCode,
  Zap,
  Share2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { CSyntaxHighlighter } from './CSyntaxHighlighter';
import { ShareCodeModal } from './ShareCodeModal';

interface ExercisePlaygroundProps {
  exercise?: Exercise;
  exercises?: Exercise[];
  onSolved?: (exerciseId: string) => void;
}

export interface CExecutionResult {
  success: boolean;
  stdout: string;
  returnValue: any;
  error?: string;
  executionTimeMs: number;
}

/**
 * High-Precision Browser C & Algorithmic Code Interpreter & Evaluator
 */
export function executeCCodeInBrowser(
  cCode: string,
  args: any[] = []
): CExecutionResult {
  const startTime = performance.now();
  const stdoutBuffer: string[] = [];

  // Robust C printf implementation for captured stdout
  const printf = (format: string, ...vals: any[]) => {
    if (typeof format !== 'string') {
      stdoutBuffer.push(String(format));
      return;
    }
    let valIdx = 0;
    const formatted = format.replace(
      /%(-?\d*)?(\.\d+)?([difsucgxX]|ld|lld|lf|hd|hu|llu)/g,
      (match, width, precision, type) => {
        if (valIdx >= vals.length) return match;
        const val = vals[valIdx++];
        if (type === 'f' || type === 'lf') {
          const num = Number(val);
          if (precision) {
            const digits = parseInt(precision.replace('.', ''), 10);
            const str = num.toFixed(digits);
            if (width) {
              const minW = Math.abs(parseInt(width, 10));
              return width.startsWith('-') ? str.padEnd(minW, ' ') : str.padStart(minW, ' ');
            }
            return str;
          }
          const str = String(num);
          if (width) {
            const minW = Math.abs(parseInt(width, 10));
            return width.startsWith('-') ? str.padEnd(minW, ' ') : str.padStart(minW, ' ');
          }
          return str;
        } else if (
          type === 'd' ||
          type === 'i' ||
          type === 'ld' ||
          type === 'lld' ||
          type === 'u' ||
          type === 'hd' ||
          type === 'hu' ||
          type === 'llu'
        ) {
          const num = Math.trunc(Number(val));
          const str = String(num);
          if (width) {
            const minW = Math.abs(parseInt(width, 10));
            return width.startsWith('-') ? str.padEnd(minW, ' ') : str.padStart(minW, ' ');
          }
          return str;
        } else if (type === 'c') {
          return typeof val === 'number' ? String.fromCharCode(val) : String(val);
        } else if (type === 's') {
          const str = String(val);
          if (width) {
            const minW = Math.abs(parseInt(width, 10));
            return width.startsWith('-') ? str.padEnd(minW, ' ') : str.padStart(minW, ' ');
          }
          return str;
        }
        return String(val);
      }
    );
    stdoutBuffer.push(formatted);
  };

  const putchar = (ch: any) => {
    if (typeof ch === 'number') {
      stdoutBuffer.push(String.fromCharCode(ch));
    } else {
      stdoutBuffer.push(String(ch));
    }
  };

  const puts = (str: string) => {
    stdoutBuffer.push(String(str) + '\n');
  };

  try {
    let js = cCode;

    // 1. Remove preprocessor directives
    js = js.replace(/#include\s*<[^>]+>/g, '');
    js = js.replace(/#include\s*"[^"]+"/g, '');

    // 2. Process #define constants
    js = js.replace(/#define\s+([A-Za-z0-9_]+)\s+(.+)/g, 'const $1 = $2;');

    // 3. Remove struct definitions
    js = js.replace(/struct\s+[A-Za-z0-9_]+\s*\{[^}]*\};/g, '');

    // 4. Map C math built-ins
    js = js.replace(/\bpow\s*\(/g, 'Math.pow(');
    js = js.replace(/\blog2\s*\(/g, 'Math.log2(');
    js = js.replace(/\bfloor\s*\(/g, 'Math.floor(');
    js = js.replace(/\bceil\s*\(/g, 'Math.ceil(');
    js = js.replace(/\babs\s*\(/g, 'Math.abs(');
    js = js.replace(/\bfabs\s*\(/g, 'Math.abs(');
    js = js.replace(/\bsqrt\s*\(/g, 'Math.sqrt(');

    // 5. Transform C primitive type declarations
    js = js.replace(
      /\b(const\s+)?(unsigned\s+|signed\s+)?(int|double|float|char\*|char|bool|long\s+long|long|short|size_t|void)\s+([a-zA-Z0-9_$]+)\s*=/g,
      'let $4 ='
    );
    js = js.replace(
      /\b(const\s+)?(unsigned\s+|signed\s+)?(int|double|float|char\*|char|bool|long\s+long|long|short|size_t|void)\s+([a-zA-Z0-9_$]+)\s*;/g,
      'let $4;'
    );

    // 6. Loops type declarations
    js = js.replace(
      /for\s*\(\s*(unsigned\s+|signed\s+)?(int|double|float|long\s+long|long|short|size_t)\s+/g,
      'for (let '
    );

    // 7. Castings
    js = js.replace(/\((float|double|int|long\s+long|char|short)\)/g, 'Number');

    // 8. Transform C functions to JS
    let mainFuncName = '';
    let firstFuncName = '';

    js = js.replace(
      /^(?:const\s+)?(?:unsigned\s+|signed\s+)?(?:int|double|float|char\*|char|bool|long\s+long|long|short|void|size_t)\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)\s*\{/gm,
      (match, fnName, params) => {
        if (fnName === 'main') mainFuncName = 'main';
        if (!firstFuncName) firstFuncName = fnName;

        const cleanParams = params
          .split(',')
          .map((p: string) => {
            let param = p.trim();
            if (!param) return '';
            param = param.replace(
              /^(const\s+)?(struct\s+)?(unsigned\s+|signed\s+)?[a-zA-Z0-9_]+\s*\*?\s*/,
              ''
            );
            param = param.replace(/\[\]/g, '');
            return param.trim();
          })
          .filter(Boolean)
          .join(', ');

        return `function ${fnName}(${cleanParams}) {`;
      }
    );

    // Construct evaluator Function
    const evaluator = new Function(
      'printf',
      'putchar',
      'puts',
      'EOF',
      'NULL',
      'DENTRO',
      'FUERA',
      `
      ${js}

      if (typeof ${mainFuncName || 'undefined'} === 'function') {
        return main();
      }
      if (typeof ${firstFuncName || 'undefined'} === 'function') {
        return ${firstFuncName}(...arguments[7]);
      }
      return undefined;
      `
    );

    const retVal = evaluator(printf, putchar, puts, -1, null, 1, 0, args);
    const endTime = performance.now();

    return {
      success: true,
      stdout: stdoutBuffer.join(''),
      returnValue: retVal,
      executionTimeMs: Math.round((endTime - startTime) * 10) / 10,
    };
  } catch (err: any) {
    const endTime = performance.now();
    return {
      success: false,
      stdout: stdoutBuffer.join(''),
      returnValue: undefined,
      error: err?.message || 'Error de compilación o ejecución en C.',
      executionTimeMs: Math.round((endTime - startTime) * 10) / 10,
    };
  }
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
    {
      testId: string;
      passed: boolean;
      actual: string;
      expected: string;
      stdout: string;
    }[]
  >([]);
  const [capturedConsoleStdout, setCapturedConsoleStdout] = useState<string>('');
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [compilationError, setCompilationError] = useState<string | null>(null);

  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [terminalTab, setTerminalTab] = useState<'console' | 'tests'>('console');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Synchronize code state when active exercise changes
  useEffect(() => {
    if (activeExercise) {
      setCode(activeExercise.initialCode);
      setTestResults([]);
      setCapturedConsoleStdout('');
      setExecutionTime(null);
      setCompilationError(null);
      setShowHint(false);
      setShowSolution(false);
    }
  }, [selectedIdx, activeExercise?.id]);

  if (!activeExercise) {
    return (
      <div className="p-8 text-center text-[#8C8882]">
        No hay ejercicios asignados a esta lección.
      </div>
    );
  }

  // Handle Tab key, Enter auto-indent, auto-closing brackets
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Ctrl+Enter or Cmd+Enter to compile & run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunCode();
      return;
    }

    // Tab key inserts 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
      return;
    }

    // Enter key auto-indents matching leading spaces
    if (e.key === 'Enter') {
      const start = textarea.selectionStart;
      const lines = code.substring(0, start).split('\n');
      const currentLine = lines[lines.length - 1];
      const match = currentLine.match(/^(\s+)/);
      let indent = match ? match[1] : '';

      if (currentLine.trim().endsWith('{')) {
        indent += '    ';
      }

      if (indent.length > 0) {
        e.preventDefault();
        const end = textarea.selectionEnd;
        const newCode = code.substring(0, start) + '\n' + indent + code.substring(end);
        setCode(newCode);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1 + indent.length;
        }, 0);
      }
      return;
    }

    // Auto-close brackets
    const matchingPairs: Record<string, string> = {
      '{': '}',
      '(': ')',
      '[': ']',
      '"': '"',
      "'": "'",
    };

    if (matchingPairs[e.key]) {
      const closeChar = matchingPairs[e.key];
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      if (start !== end) return; // don't wrap selection automatically

      e.preventDefault();
      const newCode = code.substring(0, start) + e.key + closeChar + code.substring(start);
      setCode(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  // Sync scroll between textarea and line numbers
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleResetCode = () => {
    setCode(activeExercise.initialCode);
    setTestResults([]);
    setCapturedConsoleStdout('');
    setExecutionTime(null);
    setCompilationError(null);
    setShowSolution(false);
  };

  const handleFormatCode = () => {
    // Simple C indentation beautifier
    const lines = code.split('\n');
    let indentLevel = 0;
    const formattedLines = lines.map((line) => {
      let trimmed = line.trim();
      if (trimmed.startsWith('}')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      const indented = '    '.repeat(indentLevel) + trimmed;
      if (trimmed.endsWith('{')) {
        indentLevel++;
      }
      return indented;
    });
    setCode(formattedLines.join('\n'));
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = () => {
    const results = [];
    let allPassed = true;
    let combinedStdout = '';
    let maxExecTime = 0;
    setCompilationError(null);

    for (let tc of activeExercise.testCases) {
      let argVal: any[] = [];
      try {
        if (tc.input) {
          // eslint-disable-next-line no-new-func
          const parsedArg = new Function(`return ${tc.input};`)();
          argVal = Array.isArray(parsedArg) ? parsedArg : [parsedArg];
        }
      } catch (e) {
        argVal = [];
      }

      const execRes = executeCCodeInBrowser(code, argVal);

      if (!execRes.success) {
        allPassed = false;
        setCompilationError(execRes.error || 'Error de compilación C');
        results.push({
          testId: tc.id,
          passed: false,
          actual: execRes.error || 'Error',
          expected: tc.expectedOutput,
          stdout: execRes.stdout,
        });
        continue;
      }

      if (execRes.executionTimeMs > maxExecTime) {
        maxExecTime = execRes.executionTimeMs;
      }

      if (execRes.stdout) {
        combinedStdout += execRes.stdout + '\n';
      }

      // Check output
      const actualStr =
        execRes.returnValue !== undefined && execRes.returnValue !== null
          ? String(execRes.returnValue)
          : execRes.stdout.trim();

      const expectedStr = tc.expectedOutput.trim();

      // Normalize comparison (whitespace trim)
      const normActual = actualStr.replace(/\r\n/g, '\n').trim();
      const normExpected = expectedStr.replace(/\r\n/g, '\n').trim();

      const passed =
        normActual === normExpected ||
        normActual.replace(/\s+/g, '') === normExpected.replace(/\s+/g, '') ||
        (execRes.stdout.length > 0 &&
          execRes.stdout.replace(/\s+/g, '').includes(normExpected.replace(/\s+/g, '')));

      if (!passed) allPassed = false;

      results.push({
        testId: tc.id,
        passed,
        actual: actualStr || '(sin retorno)',
        expected: expectedStr,
        stdout: execRes.stdout,
      });
    }

    setTestResults(results);
    setCapturedConsoleStdout(
      combinedStdout.trim() || '[Sin salida explícita en stdout mediante printf/putchar]'
    );
    setExecutionTime(maxExecTime);
    setTerminalTab('console');

    if (allPassed && onSolved) {
      onSolved(activeExercise.id);
    }
  };

  const lineNumbersArray = useMemo(() => {
    const lineCount = code.split('\n').length;
    return Array.from({ length: Math.max(lineCount, 12) }, (_, i) => i + 1);
  }, [code]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-[#E5E2DE] rounded-2xl p-4 sm:p-8 shadow-xs space-y-6"
    >
      {/* Exercise Selection Tabs Bar if multiple */}
      {allExercises.length > 1 && (
        <div className="bg-[#F9F8F6] p-2 border border-[#E5E2DE] rounded-xl flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-[#8C8882] uppercase tracking-wider px-2 flex items-center gap-1.5 shrink-0">
            <Layers className="w-4 h-4 text-[#C2410C]" />
            <span>Taller Práctico ({allExercises.length} Ejercicios):</span>
          </span>
          <div className="flex items-center gap-1.5">
            {allExercises.map((ex, idx) => (
              <button
                key={ex.id || idx}
                onClick={() => setSelectedIdx(idx)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 flex items-center gap-2 ${
                  selectedIdx === idx
                    ? 'bg-[#C2410C] text-white shadow-xs'
                    : 'bg-white hover:bg-[#F2F1EE] text-[#4A4742] border border-[#E5E2DE]'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Ejer. {idx + 1}: {ex.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Workspace Grid Layout: Left Problem Specs / Right IDE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5/12): Academic Problem Statement & References */}
        <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                {activeExercise.cormenRef}
              </span>
              <span className="px-2.5 py-0.5 bg-[#181825] text-[#A6E3A1] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                <Cpu className="w-3 h-3 text-[#A6E3A1]" />
                <span>Compilador C99 (GCC)</span>
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A]">
              {activeExercise.title}
            </h2>

            {/* Markdown Description */}
            <div className="text-xs sm:text-sm text-[#4A4742] leading-relaxed bg-[#F9F8F6] p-4 rounded-xl border border-[#E5E2DE]">
              <MarkdownRenderer content={activeExercise.description} />
            </div>

            {/* Required Test Cases Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider block">
                Casos de Prueba Requeridos:
              </span>
              <div className="space-y-2">
                {activeExercise.testCases.map((tc, idx) => (
                  <div
                    key={tc.id}
                    className="p-3 bg-white border border-[#E5E2DE] rounded-xl text-xs font-mono space-y-1 shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-[10px] text-[#8C8882]">
                      <span className="font-bold uppercase">Caso #{idx + 1}</span>
                      {tc.input && <span>Entrada: <code className="text-[#1A1A1A]">{tc.input}</code></span>}
                    </div>
                    <div className="text-[#10B981] font-bold">
                      Salida Esperada: <code className="bg-[#ECFDF5] px-1.5 py-0.5 rounded text-[#065F46]">{tc.expectedOutput}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Actions: Hint & Solution Reveal */}
          <div className="space-y-3 pt-4 border-t border-[#F2F1EE]">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#C2410C] hover:underline"
              >
                <HelpCircle className="w-4 h-4 text-[#C2410C]" />
                <span>{showHint ? 'Ocultar Pista Técnica' : 'Ver Pista Técnica'}</span>
              </button>

              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] hover:underline"
              >
                <Eye className="w-4 h-4 text-[#1A1A1A]" />
                <span>{showSolution ? 'Ocultar Solución C' : 'Ver Solución Catedrática'}</span>
              </button>
            </div>

            {/* Hint Box */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#FFF7ED] border border-[#FDBA74] p-4 rounded-xl text-xs text-[#C2410C] space-y-1 overflow-hidden"
                >
                  <span className="font-bold block uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Pista Técnica de Catedrático:
                  </span>
                  <div className="text-[#1A1A1A] font-sans">
                    <MarkdownRenderer content={activeExercise.hint} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Solution Box */}
            <AnimatePresence>
              {showSolution && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-[#181825] border border-[#313244] p-4 rounded-xl text-xs text-[#BAC2DE] space-y-3 overflow-hidden shadow-md"
                >
                  <div className="flex items-center gap-2 font-bold text-[#FAB387]">
                    <Code className="w-4 h-4 text-[#FAB387]" />
                    <span>Código de Solución Oficial C:</span>
                  </div>
                  <CSyntaxHighlighter code={activeExercise.solutionCode} />
                  <div className="text-[#CDD6F4] font-sans pt-2 border-t border-[#313244]">
                    <MarkdownRenderer content={activeExercise.explanation} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column (7/12): Professional Code Editor & Interactive Terminal */}
        <div className="lg:col-span-7 space-y-4">
          {/* Code Editor Container */}
          <div className="bg-[#181825] border border-[#313244] rounded-2xl overflow-hidden shadow-md flex flex-col">
            {/* Editor Top Toolbar */}
            <div className="bg-[#11111B] px-4 py-2.5 border-b border-[#313244] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#BAC2DE]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ED8796] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#EED49F] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#A6DA95] inline-block" />
                <span className="font-bold text-[11px] text-[#FAB387] ml-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#FAB387]" />
                  main.c (ANSI C / C99)
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px]">
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="px-2.5 py-1 bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold rounded transition flex items-center gap-1 shadow-2xs"
                  title="Generar enlace o código de solución para compartir por WhatsApp / Discord"
                >
                  <Share2 className="w-3 h-3" />
                  <span>Compartir</span>
                </button>

                <button
                  onClick={handleFormatCode}
                  className="px-2.5 py-1 bg-[#1E1E2E] hover:bg-[#313244] text-[#CBA6F7] rounded transition flex items-center gap-1"
                  title="Auto-identar código C"
                >
                  <Wrench className="w-3 h-3" />
                  <span>Formatear</span>
                </button>

                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 bg-[#1E1E2E] hover:bg-[#313244] text-[#BAC2DE] hover:text-white rounded transition flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-[#A6E3A1]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>

                <button
                  onClick={handleResetCode}
                  className="px-2.5 py-1 bg-[#1E1E2E] hover:bg-[#313244] text-[#F38BA8] rounded transition flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>

            {/* Code Editor Body with Line Numbers */}
            <div className="relative flex font-mono text-xs sm:text-sm bg-[#181825] min-h-[280px]">
              {/* Line Numbers Gutter */}
              <div
                ref={lineNumbersRef}
                className="w-10 select-none py-4 text-right pr-3 bg-[#11111B] text-[#585B70] border-r border-[#313244] overflow-hidden leading-relaxed font-mono"
              >
                {lineNumbersArray.map((num) => (
                  <div key={num}>{num}</div>
                ))}
              </div>

              {/* Textarea Editor */}
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                onScroll={handleScroll}
                rows={14}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                className="flex-1 bg-[#181825] text-[#A6E3A1] font-mono text-xs sm:text-sm p-4 focus:outline-none resize-y leading-relaxed border-none selection:bg-[#313244] placeholder-[#585B70]"
                placeholder="// Escribe tu programa o función C aquí..."
              />
            </div>

            {/* Editor Footer Status Bar */}
            <div className="bg-[#11111B] px-4 py-2 border-t border-[#313244] flex items-center justify-between text-[11px] font-mono text-[#6C7086]">
              <div className="flex items-center gap-4">
                <span>Líneas: {lineNumbersArray.length}</span>
                <span>Caracteres: {code.length}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#A6E3A1]">
                <CornerDownLeft className="w-3 h-3" />
                <span>Atajo: <kbd className="bg-[#313244] text-white px-1 py-0.5 rounded text-[10px]">Ctrl + Enter</kbd> para ejecutar</span>
              </div>
            </div>
          </div>

          {/* Primary Compile & Validate Button */}
          <button
            onClick={handleRunCode}
            className="w-full py-3 bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Compilar &amp; Validar Pruebas C</span>
          </button>

          {/* Interactive Terminal Window */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden shadow-md font-mono text-xs">
            {/* Terminal Header */}
            <div className="bg-[#1E293B] px-4 py-2.5 border-b border-[#334155] flex items-center justify-between text-[#94A3B8]">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-[#38BDF8]" />
                <span className="font-bold text-[#F8FAFC]">Consola stdout &amp; Terminal GCC</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTerminalTab('console')}
                  className={`px-3 py-1 rounded text-[10px] uppercase font-bold transition ${
                    terminalTab === 'console'
                      ? 'bg-[#38BDF8] text-[#0F172A]'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Salida Standard (stdout)
                </button>
                <button
                  onClick={() => setTerminalTab('tests')}
                  className={`px-3 py-1 rounded text-[10px] uppercase font-bold transition ${
                    terminalTab === 'tests'
                      ? 'bg-[#38BDF8] text-[#0F172A]'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Resultados de Pruebas ({testResults.length})
                </button>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-4 min-h-[140px] space-y-3 text-[#F8FAFC]">
              {compilationError && (
                <div className="p-3 bg-[#451A03] border border-[#B45309] rounded-xl text-[#FDBA74] text-xs leading-relaxed space-y-1">
                  <span className="font-bold text-[#F97316] uppercase block">
                    [Error de Compilación / Ejecución GCC]:
                  </span>
                  <div>{compilationError}</div>
                </div>
              )}

              {terminalTab === 'console' ? (
                <div>
                  <div className="text-[10px] text-[#64748B] pb-2 border-b border-[#1E293B] flex items-center justify-between mb-2">
                    <span>$ gcc -Wall -Wextra -O2 main.c -o main &amp;&amp; ./main</span>
                    {executionTime !== null && (
                      <span className="text-[#38BDF8] font-bold">
                        Tiempo: {executionTime} ms
                      </span>
                    )}
                  </div>
                  <pre className="whitespace-pre-wrap text-[#38BDF8] leading-relaxed font-mono">
                    {capturedConsoleStdout || (
                      <span className="text-[#64748B] italic">
                        Haz clic en "Compilar &amp; Validar" para ejecutar tu código y ver la salida en tiempo real.
                      </span>
                    )}
                  </pre>
                </div>
              ) : (
                <div className="space-y-2">
                  {testResults.length === 0 ? (
                    <div className="text-[#64748B] italic py-4 text-center">
                      No hay resultados de pruebas aún. Presiona "Compilar &amp; Validar".
                    </div>
                  ) : (
                    testResults.map((res, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border font-mono text-xs space-y-1.5 ${
                          res.passed
                            ? 'bg-[#064E3B]/40 border-[#10B981] text-[#A7F3D0]'
                            : 'bg-[#7F1D1D]/40 border-[#EF4444] text-[#FECACA]'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <div className="flex items-center gap-2">
                            {res.passed ? (
                              <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                            ) : (
                              <XCircle className="w-4 h-4 text-[#F87171]" />
                            )}
                            <span>Caso de Prueba #{idx + 1}</span>
                          </div>
                          <span className="uppercase text-[10px] tracking-wider px-2 py-0.5 rounded font-bold bg-black/40">
                            {res.passed ? '✓ PASADO' : '✗ FALLIDO'}
                          </span>
                        </div>

                        {!res.passed && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
                            <div>
                              <span className="opacity-70 block">Tu Salida:</span>
                              <code className="font-bold text-white bg-black/30 px-1.5 py-0.5 rounded block mt-0.5">
                                {res.actual}
                              </code>
                            </div>
                            <div>
                              <span className="opacity-70 block">Salida Esperada:</span>
                              <code className="font-bold text-[#34D399] bg-black/30 px-1.5 py-0.5 rounded block mt-0.5">
                                {res.expected}
                              </code>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Solution Modal */}
      <ShareCodeModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        code={code}
        title={activeExercise?.title || 'Solución C'}
        exerciseId={activeExercise?.id}
      />
    </motion.div>
  );
};
