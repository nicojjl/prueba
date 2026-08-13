import React from 'react';
import { X, Code, Terminal, CheckCircle2, FolderTree, Sparkles, BookOpen } from 'lucide-react';

interface VibeCodingGuideModalProps {
  onClose: () => void;
}

export const VibeCodingGuideModal: React.FC<VibeCodingGuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#F9F8F6] border border-[#E5E2DE] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 space-y-8 text-[#1A1A1A] shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#8C8882] hover:text-[#1A1A1A] hover:bg-[#F2F1EE] rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 border-b border-[#E5E2DE] pb-6">
          <div className="p-3 bg-[#FFF7ED] border border-[#FDBA74] rounded-2xl text-[#C2410C]">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">
              Guía de Instalación Local &amp; Vibe Coding
            </h2>
            <p className="text-xs text-[#8C8882] font-medium uppercase tracking-wider mt-1">
              Manual para ejecutar y personalizar en VS Code
            </p>
          </div>
        </div>

        {/* Step 1: Requirements */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#C2410C] uppercase tracking-widest flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#C2410C]" />
            1. Prerrequisitos de Software
          </h3>
          <ul className="text-xs text-[#4A4742] space-y-2.5 bg-white p-5 rounded-xl border border-[#E5E2DE] leading-relaxed">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span>
                <strong>Visual Studio Code (VS Code)</strong>: Descárgalo gratis desde{' '}
                <code className="text-[#C2410C] font-mono font-semibold">code.visualstudio.com</code>.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span>
                <strong>Node.js (versión 18 o superior)</strong>: Descárgalo desde{' '}
                <code className="text-[#C2410C] font-mono font-semibold">nodejs.org</code> (incluye <code className="text-[#C2410C] font-mono font-semibold">npm</code>).
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
              <span>
                <strong>Extensiones Recomendadas</strong>: Tailwind CSS IntelliSense, ESLint, Prettier y GitHub Copilot / Cursor.
              </span>
            </li>
          </ul>
        </div>

        {/* Step 2: How to run */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C2410C]" />
            2. Pasos para Ejecución Local
          </h3>
          <div className="bg-white p-5 rounded-xl border border-[#E5E2DE] space-y-3 text-xs font-mono">
            <p className="text-[#8C8882]">// Abre la terminal en VS Code y ejecuta los comandos:</p>
            <div className="p-4 bg-[#181818] rounded-lg border border-[#252525] text-[#E5E5E5] space-y-2">
              <div className="text-[#8C8882]"># 1. Instala todas las dependencias</div>
              <div className="text-[#10B981] font-bold">npm install</div>
              <div className="pt-2 text-[#8C8882]"># 2. Inicia el servidor local de desarrollo</div>
              <div className="text-[#10B981] font-bold">npm run dev</div>
            </div>
            <p className="text-[#4A4742]">
              Accede a <code className="text-[#C2410C] font-bold">http://localhost:3000</code> en tu navegador.
            </p>
          </div>
        </div>

        {/* Step 3: Project Architecture */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-[#C2410C]" />
            3. Arquitectura del Proyecto
          </h3>
          <div className="bg-white p-5 rounded-xl border border-[#E5E2DE] text-xs font-mono space-y-2.5 text-[#4A4742]">
            <div>📁 <strong>/src/data/coursesData.ts</strong> ➔ Contiene los contenidos teóricos, ejercicios y preguntas.</div>
            <div>📁 <strong>/src/components/Visualizers/</strong> ➔ Simuladores gráficos interactivos (Big-O, Punteros, Grafos, Árboles).</div>
            <div>📁 <strong>/src/components/ExercisePlayground.tsx</strong> ➔ Entorno interactivo de resolución de código.</div>
            <div>📁 <strong>server.ts</strong> ➔ Servidor backend Express para conectar con el Mentor IA.</div>
          </div>
        </div>

        {/* Step 4: Golden Rules for Vibe Coding */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#C2410C] uppercase tracking-widest flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#C2410C]" />
            4. Buenas Prácticas de Vibe Coding
          </h3>
          <div className="bg-[#FFF7ED] border border-[#FDBA74] p-5 rounded-xl text-xs text-[#1A1A1A] space-y-2.5 leading-relaxed">
            <p>
              1. <strong>Estructura Modular</strong>: Mantén cada componente en un archivo dedicado dentro de <code className="text-[#C2410C] font-mono">/src/components/</code>.
            </p>
            <p>
              2. <strong>Variables Descriptivas</strong>: Utiliza nombres de variables claros como <code className="text-[#C2410C] font-mono">nodoActual</code> o <code className="text-[#C2410C] font-mono">pilaLlamadas</code>.
            </p>
            <p>
              3. <strong>Prompt de ejemplo</strong>: <em>"Abre /src/data/coursesData.ts y agrega un ejercicio de Árboles BST con su suite de pruebas."</em>
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#E5E2DE] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold rounded-full text-xs uppercase tracking-wider transition shadow-sm"
          >
            Entendido, ¡Ir a Estudiar!
          </button>
        </div>
      </div>
    </div>
  );
};
