import React, { useState } from 'react';
import { CourseItem, CheckQuestion } from '../types';
import { Sparkles, Copy, Check, Bot, MessageSquareText, AlertCircle } from 'lucide-react';

interface PromptGeneratorProps {
  item: CourseItem;
  quizQuestions: CheckQuestion[];
  userAnswers: Record<string, number>;
  onSendToAITutor?: (promptText: string) => void;
}

export const PromptGenerator: React.FC<PromptGeneratorProps> = ({
  item,
  quizQuestions,
  userAnswers,
  onSendToAITutor,
}) => {
  const [copied, setCopied] = useState(false);

  // Identify wrong questions
  const wrongQuestions = quizQuestions.filter((q) => {
    const userAnswer = userAnswers[q.id];
    return userAnswer !== undefined && userAnswer !== q.correctIndex;
  });

  const totalAnswered = Object.keys(userAnswers).filter((id) =>
    quizQuestions.some((q) => q.id === id)
  ).length;

  if (totalAnswered === 0) {
    return (
      <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-2xl p-6 text-center space-y-3">
        <Sparkles className="w-6 h-6 text-[#C2410C] mx-auto" />
        <h4 className="font-serif font-bold text-[#1A1A1A] text-lg">
          🤖 Asistente de Dudas para IA
        </h4>
        <p className="text-xs sm:text-sm text-[#4A4742] max-w-md mx-auto leading-relaxed">
          Responde a las preguntas del cuestionario superior. Si cometes algún error, el sistema estructurará automáticamente un **Prompt de Estudio** para que la IA te explique exactamente en qué te equivocaste.
        </p>
      </div>
    );
  }

  // Generate prompt content
  let promptText = '';

  if (wrongQuestions.length > 0) {
    promptText = `Hola Mentor IA, estoy estudiando el curso de Algoritmos (Basado en Cormen - CLRS).
Acabo de realizar el cuestionario de la lección "${item.title}" (${item.cormenChapter}) y me he equivocado en ${wrongQuestions.length} pregunta(s).

Por favor, ayúdame a entender mis errores con una explicación pedagógica, analogías sencillas y un ejemplo de código explicativo:

${wrongQuestions
  .map((q, idx) => {
    const selectedIdx = userAnswers[q.id];
    const selectedText = q.options[selectedIdx] || 'No respondida';
    const correctText = q.options[q.correctIndex];
    return `📌 PREGUNTA ${idx + 1}: "${q.question}"
- Mi respuesta (Incorrecta): "${selectedText}"
- Respuesta Correcta: "${correctText}"
- Explicación de la lección: "${q.explanation}"`;
  })
  .join('\n\n')}

Instrucciones para el Mentor IA:
1. Explícame el concepto de fondo de manera intuitiva sin usar jerga matemática excesivamente compleja.
2. Dame una analogía del mundo cotidiano para recordar la respuesta correcta.
3. Muestra un breve snippet de código en TypeScript o C que ilustre cómo funciona.`;
  } else {
    promptText = `Hola Mentor IA, he completado el cuestionario de la lección "${item.title}" (${item.cormenChapter}) respondiendo TODAS las preguntas correctamente!
Quiero profundizar aún más en este tema. ¿Podrías darme 2 casos de borde (edge cases) complejos o preguntas de entrevista técnica tipo FAANG relacionadas con ${item.topic}?`;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendToTutor = () => {
    if (onSendToAITutor) {
      onSendToAITutor(promptText);
    }
  };

  return (
    <div className="bg-white border-2 border-[#C2410C]/30 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F2F1EE]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#FFF7ED] text-[#C2410C] rounded-xl border border-[#FDBA74]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
              Generador de Prompt de Dudas para IA
            </h3>
            <p className="text-xs text-[#8C8882]">
              {wrongQuestions.length > 0
                ? `Detectamos ${wrongQuestions.length} error(es) en tu cuestionario. ¡Usa este prompt para resolver tus dudas!`
                : '¡Puntaje perfecto! Usa este prompt para solicitar desafíos avanzados a la IA.'}
            </p>
          </div>
        </div>

        <span
          className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
            wrongQuestions.length > 0
              ? 'bg-[#FEF2F2] text-[#991B1B] border border-[#EF4444]/30'
              : 'bg-[#ECFDF5] text-[#065F46] border border-[#10B981]/30'
          }`}
        >
          {wrongQuestions.length > 0
            ? `${wrongQuestions.length} Dudas Detectadas`
            : '100% Correcto'}
        </span>
      </div>

      {/* Prompt Text Preview Box */}
      <div className="bg-[#181818] border border-[#252525] rounded-xl p-4 text-[#E5E5E5] font-mono text-xs leading-relaxed overflow-x-auto max-h-60 relative group">
        <pre className="whitespace-pre-wrap font-mono">{promptText}</pre>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#F2F1EE] hover:bg-[#E5E2DE] text-[#1A1A1A] font-semibold rounded-full text-xs transition border border-[#E5E2DE]"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#10B981]" />
              <span>¡Copiado al Portapapeles!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#4A4742]" />
              <span>Copiar Prompt para ChatGPT / Claude</span>
            </>
          )}
        </button>

        {onSendToAITutor && (
          <button
            onClick={handleSendToTutor}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold rounded-full text-xs uppercase tracking-wider transition shadow-sm"
          >
            <Bot className="w-4 h-4" />
            <span>Preguntar al Mentor IA de la App</span>
          </button>
        )}
      </div>
    </div>
  );
};
