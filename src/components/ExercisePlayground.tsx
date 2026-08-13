import React, { useState } from 'react';
import { Exercise } from '../types';
import {
  Code,
  Play,
  RotateCcw,
  Copy,
  Check,
  HelpCircle,
  Eye,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ExercisePlaygroundProps {
  exercise: Exercise;
  onSolved?: () => void;
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
  onSolved,
}) => {
  const [code, setCode] = useState<string>(exercise.initialCode);
  const [testResults, setTestResults] = useState<
    { testId: string; passed: boolean; actual: string; expected: string }[]
  >([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const handleResetCode = () => {
    setCode(exercise.initialCode);
    setTestResults([]);
    setShowSolution(false);
  };

  const handleRunCode = () => {
    const results = [];
    let allPassed = true;

    try {
      const { executableJs, functionName } = transpileCToExecutableJS(code);

      // Evaluate function definition inside clean scope
      // eslint-disable-next-line no-new-func
      const runUserFunc = new Function(`
        ${executableJs}
        return typeof ${functionName} !== 'undefined' ? ${functionName} : undefined;
      `)();

      if (!runUserFunc || typeof runUserFunc !== 'function') {
        throw new Error('No se pudo encontrar la función principal en tu código C.');
      }

      for (let tc of exercise.testCases) {
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
      onSolved();
    }
  };

  // Generate Prompt for External AI
  const handleCopyAIPrompt = () => {
    const failedTests = testResults.filter((r) => !r.passed);
    const errorSummary =
      failedTests.length > 0
        ? failedTests
            .map(
              (f) =>
                `- Test ${f.testId}: Esperaba "${f.expected}", pero mi código en C produjo "${f.actual}".`
            )
            .join('\n')
        : 'Mi código no pasa los casos de prueba.';

    const promptText = `Hola IA, estoy estudiando Algorítmica y Complejidad con el libro de Cormen (CLRS) programando en Lenguaje C.
Estoy resolviendo el siguiente ejercicio:

Ejercicio: "${exercise.title}"
Referencia Cormen: ${exercise.cormenRef}
Descripción: ${exercise.description}

Este es el código en C que he escrito:
\`\`\`c
${code}
\`\`\`

Resultado de los tests que fallaron:
${errorSummary}

Por favor, actúa como un mentor pedagógico, amable y paciente. Explícame exactamente en qué me equivoqué en C, cuál es el fallo conceptual o de punteros/lógica, y dame pistas paso a paso para corregirlo.`;

    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 3000);
  };

  return (
    <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      {/* Exercise Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F2F1EE]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74] rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider">
              {exercise.cormenRef}
            </span>
          </div>
          <h2 className="text-xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <Code className="w-5 h-5 text-[#C2410C]" />
            {exercise.title}
          </h2>
        </div>

        {/* Copy Prompt for External AI */}
        <button
          onClick={handleCopyAIPrompt}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#F2F1EE] border border-[#1A1A1A] text-[#1A1A1A] rounded-full text-xs font-semibold uppercase tracking-wider transition shadow-xs"
          title="Genera un prompt estructurado con tu código en C y los errores para pegarlo en ChatGPT, Claude o Gemini"
        >
          {copiedPrompt ? (
            <>
              <Check className="w-4 h-4 text-[#10B981]" />
              <span>¡Prompt Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#C2410C]" />
              <span>Copiar Prompt en C para IA Externa</span>
            </>
          )}
        </button>
      </div>

      <div className="text-sm text-[#4A4742]">
        <MarkdownRenderer content={exercise.description} />
      </div>

      {/* Code Editor Box */}
      <div className="bg-[#181818] border border-[#252525] rounded-xl overflow-hidden shadow-sm">
        <div className="bg-[#202020] px-4 py-2.5 border-b border-[#2D2D2D] flex items-center justify-between text-xs font-mono text-[#A0A0A0]">
          <span className="font-semibold uppercase tracking-wider text-[10px] text-[#FDBA74]">
            Entorno de Código: Lenguaje C (ANSI C / C99)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetCode}
              className="flex items-center gap-1 hover:text-white transition text-[11px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Código C</span>
            </button>
          </div>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={11}
          className="w-full bg-[#181818] text-[#E5E5E5] font-mono text-xs sm:text-sm p-4 focus:outline-none resize-y leading-relaxed border-none"
        />

        <div className="bg-[#202020] px-4 py-3 border-t border-[#2D2D2D] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 text-[#D1D1D1] hover:text-[#F59E0B] transition"
            >
              <HelpCircle className="w-4 h-4 text-[#F59E0B]" />
              <span>{showHint ? 'Ocultar Pista' : 'Ver Pista'}</span>
            </button>

            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center gap-1.5 text-[#D1D1D1] hover:text-[#C2410C] transition"
            >
              <Eye className="w-4 h-4 text-[#C2410C]" />
              <span>{showSolution ? 'Ocultar Solución C' : 'Ver Solución C'}</span>
            </button>
          </div>

          <button
            onClick={handleRunCode}
            className="flex items-center gap-2 px-5 py-2 bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold rounded-full text-xs uppercase tracking-wider transition shadow-xs"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Ejecutar Pruebas en C</span>
          </button>
        </div>
      </div>

      {/* Hint Accordion */}
      {showHint && (
        <div className="bg-[#FFF7ED] border border-[#FDBA74] p-4 rounded-xl text-xs sm:text-sm text-[#C2410C] flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block mb-1 uppercase tracking-wider text-[10px]">Pista del Mentor:</span>
            <div className="text-[#1A1A1A]">
              <MarkdownRenderer content={exercise.hint} />
            </div>
          </div>
        </div>
      )}

      {/* Solution Reveal Box */}
      {showSolution && (
        <div className="bg-[#F9F8F6] border border-[#E5E2DE] p-5 rounded-xl text-xs sm:text-sm space-y-3">
          <div className="flex items-center gap-2 font-bold text-[#1A1A1A]">
            <Eye className="w-4 h-4 text-[#C2410C]" />
            <span>Solución de Referencia en Lenguaje C:</span>
          </div>
          <pre className="bg-[#181818] p-4 rounded-lg border border-[#252525] font-mono text-[#E5E5E5] overflow-x-auto text-xs">
            {exercise.solutionCode}
          </pre>
          <div className="text-[#4A4742]">
            <MarkdownRenderer content={exercise.explanation} />
          </div>
        </div>
      )}

      {/* Test Results Suite */}
      {testResults.length > 0 && (
        <div className="bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">
            Resultados de la Suite de Pruebas:
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
                    <span>Caso #{i + 1}</span>
                  </div>
                  <span className="uppercase tracking-wider text-[10px]">{res.passed ? '¡Pasado!' : 'Fallido'}</span>
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
        </div>
      )}
    </div>
  );
};
