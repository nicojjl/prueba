import React, { useState } from 'react';
import { PracticeSubclass, CourseItem } from '../types';
import { Wrench, Check, X, HelpCircle, Code, Lightbulb, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface SubclassPracticeViewProps {
  item: CourseItem;
  practiceData: PracticeSubclass;
  onOpenExercisesTab?: () => void;
}

export const SubclassPracticeView: React.FC<SubclassPracticeViewProps> = ({
  item,
  practiceData,
  onOpenExercisesTab,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const quizQuestions = practiceData.quizQuestions || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      {/* Header Banner */}
      <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold px-3 py-1 bg-[#C2410C] text-white rounded-full uppercase tracking-widest">
            Subclase 1B • Práctica &amp; Cuestionario C
          </span>
          <span className="text-xs text-[#8C8882] font-mono">
            {item.cormenChapter}
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1A1A] font-bold">
          {practiceData.title}
        </h2>
        <p className="text-sm sm:text-base text-[#4A4742] mt-2 leading-relaxed">
          Poniendo a prueba la teoría con problemas resueltos paso a paso en Lenguaje C, ejercicios prácticos y evaluación conceptual interactiva.
        </p>
      </div>

      {/* 1. Teoría Aplicada en la Industria */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-10 text-[#1A1A1A] shadow-xs space-y-4"
      >
        <div className="flex items-center gap-2 pb-4 border-b border-[#F2F1EE]">
          <Wrench className="w-5 h-5 text-[#C2410C]" />
          <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
            1. Teoría Aplicada en Ingeniería de Software Real
          </h3>
        </div>
        <MarkdownRenderer content={practiceData.appliedTheory} />
      </motion.section>

      {/* 2. Problema Guía Resuelto Paso a Paso */}
      {practiceData.solvedProblem && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-10 text-[#1A1A1A] shadow-xs space-y-6"
        >
          <div className="flex items-center gap-2 pb-4 border-b border-[#F2F1EE]">
            <Code className="w-5 h-5 text-[#C2410C]" />
            <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
              2. Problema Guía Resuelto: {practiceData.solvedProblem.title}
            </h3>
          </div>

          <div className="bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl p-5 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C2410C] block">
              Enunciado del Problema:
            </span>
            <p className="text-sm text-[#1A1A1A] leading-relaxed font-sans">
              {practiceData.solvedProblem.problemStatement}
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A4742] block">
              Solución Guiada Paso a Paso y Código C:
            </span>
            <MarkdownRenderer content={practiceData.solvedProblem.stepByStepSolution} />
          </div>

          <div className="p-4 bg-[#ECFDF5] border border-[#10B981] rounded-xl text-xs sm:text-sm text-[#065F46] flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block uppercase text-[10px] tracking-wider mb-1">
                Conclusión Técnica Clave:
              </span>
              <span>{practiceData.solvedProblem.keyTakeaway}</span>
            </div>
          </div>
        </motion.section>
      )}

      {/* Link to Interactive Code Exercises */}
      {item.exercises && item.exercises.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1A1A1A] text-white rounded-2xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 shadow-sm"
        >
          <div className="space-y-1 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FDBA74]">
              Laboratorio de Programación en C
            </span>
            <h4 className="text-lg font-serif font-bold">
              {item.exercises.length} Ejercicio(s) de Código Disponibles para esta Clase
            </h4>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Escribe código real en el editor interactivo con ejecutor de casos de prueba.
            </p>
          </div>

          {onOpenExercisesTab && (
            <button
              onClick={onOpenExercisesTab}
              className="px-6 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold rounded-full text-xs uppercase tracking-wider transition shadow-sm"
            >
              Abrir Editor de Código C
            </button>
          )}
        </motion.div>
      )}

      {/* 3. Cuestionario de Evaluación */}
      {quizQuestions.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs"
        >
          <div className="flex items-center gap-2 pb-4 border-b border-[#F2F1EE]">
            <HelpCircle className="w-5 h-5 text-[#C2410C]" />
            <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
              3. Cuestionario Intensivo de Evaluación Conceptual
            </h3>
          </div>

          <div className="space-y-6">
            {quizQuestions.map((q, qIdx) => {
              const selectedOpt = userAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: qIdx * 0.05 }}
                  className="bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl p-6 space-y-4"
                >
                  <div className="font-semibold text-[#1A1A1A] text-sm sm:text-base flex items-start gap-3">
                    <span className="font-serif text-2xl text-[#C2410C] opacity-40 shrink-0">
                      0{qIdx + 1}
                    </span>
                    <div className="pt-1 flex-1">
                      <MarkdownRenderer content={q.question} inline />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 pt-1">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle =
                        'bg-white hover:bg-[#F2F1EE] border-[#E5E2DE] text-[#4A4742]';

                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-[#ECFDF5] border-[#10B981] text-[#065F46] font-semibold';
                        } else if (optIdx === selectedOpt) {
                          btnStyle = 'bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                        >
                          <div className="flex-1 pr-2">
                            <MarkdownRenderer content={opt} inline />
                          </div>
                          {isAnswered && optIdx === q.correctIndex && (
                            <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                          )}
                          {isAnswered && optIdx === selectedOpt && optIdx !== q.correctIndex && (
                            <X className="w-4 h-4 text-[#EF4444] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Box */}
                  <AnimatePresence>
                    {isAnswered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`p-5 rounded-xl border text-xs sm:text-sm space-y-2.5 overflow-hidden ${
                          isCorrect
                            ? 'bg-[#ECFDF5] border-[#10B981] text-[#065F46]'
                            : 'bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-sm">
                          {isCorrect ? (
                            <>
                              <Check className="w-4 h-4 text-[#10B981]" />
                              <span>¡Respuesta Correcta!</span>
                            </>
                          ) : (
                            <>
                              <X className="w-4 h-4 text-[#EF4444]" />
                              <span>Respuesta incorrecta:</span>
                            </>
                          )}
                        </div>

                        <div className="leading-relaxed">
                          <MarkdownRenderer content={q.explanation} />
                        </div>

                        {!isCorrect && q.analogousExplanation && (
                          <div className="mt-3 p-4 bg-[#FFF7ED] border border-[#FDBA74] rounded-lg text-[#C2410C] flex items-start gap-3">
                            <Lightbulb className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <span className="font-bold block mb-1 uppercase text-[10px] tracking-wider">
                                Explicación Alternativa:
                              </span>
                              <div className="text-xs text-[#1A1A1A] leading-relaxed">
                                <MarkdownRenderer content={q.analogousExplanation} />
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
};
