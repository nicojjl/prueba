import React, { useState } from 'react';
import { CourseItem } from '../types';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Sparkles,
  Bookmark,
  Check,
  X,
  Lightbulb,
  BookOpen,
  Layers,
  Wrench,
  Code,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { BigOChartVisualizer } from './Visualizers/BigOChartVisualizer';
import { PointerVisualizer } from './Visualizers/PointerVisualizer';
import { LinkedListVisualizer } from './Visualizers/LinkedListVisualizer';
import { RecursionTreeVisualizer } from './Visualizers/RecursionTreeVisualizer';
import { BinaryTreeVisualizer } from './Visualizers/BinaryTreeVisualizer';
import { SortingVisualizer } from './Visualizers/SortingVisualizer';
import { GraphVisualizer } from './Visualizers/GraphVisualizer';
import { getSubclassesForCourse } from '../data/subclassesData';
import { SubclassDeepeningView } from './SubclassDeepeningView';
import { SubclassPracticeView } from './SubclassPracticeView';
import { AlgoClass1Animation1 } from './animations/AlgoClass1Animation1';
import { AlgoClass1Animation2 } from './animations/AlgoClass1Animation2';
import { ExportSummaryButton } from './ExportSummaryButton';
import { SummaryExportPayload } from '../utils/exportSummary';

interface ClassViewProps {
  item: CourseItem;
  onNextClass?: () => void;
  onPrevClass?: () => void;
  isCompleted: boolean;
  onToggleCompleted: () => void;
  onOpenExercise: () => void;
}

export const ClassView: React.FC<ClassViewProps> = ({
  item,
  onNextClass,
  onPrevClass,
  isCompleted,
  onToggleCompleted,
  onOpenExercise,
}) => {
  const [subclassTab, setSubclassTab] = useState<'main' | 'subclass_deepening' | 'subclass_practice'>('main');
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, number>>({});

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setQuestionAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const { deepening, practice } = getSubclassesForCourse(item);

  const renderVisualizer = () => {
    if (item.id === 'clase-1') {
      return (
        <div className="space-y-6">
          <AlgoClass1Animation1 />
          <AlgoClass1Animation2 />
        </div>
      );
    }

    switch (item.visualizerType) {
      case 'big_o_chart':
        return <BigOChartVisualizer />;
      case 'memory_pointers':
        return <PointerVisualizer />;
      case 'linked_list':
        return <LinkedListVisualizer />;
      case 'recursion_tree':
        return <RecursionTreeVisualizer />;
      case 'binary_tree':
        return <BinaryTreeVisualizer />;
      case 'sorting':
        return <SortingVisualizer />;
      case 'graph_bfs_dfs':
      case 'dijkstra':
        return <GraphVisualizer />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      key={`${item.id}-${subclassTab}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex-1 bg-[#F9F8F6] text-[#1A1A1A] overflow-y-auto p-4 sm:p-8 lg:p-12 space-y-8"
    >
      {/* Sub-class Navigation Tabs Bar */}
      <div className="bg-white border border-[#E5E2DE] p-1.5 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setSubclassTab('main')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              subclassTab === 'main'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#4A4742] hover:bg-[#F2F1EE]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#C2410C]" />
            <span>Lección Teórica Base</span>
          </button>

          <button
            onClick={() => setSubclassTab('subclass_deepening')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              subclassTab === 'subclass_deepening'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#4A4742] hover:bg-[#F2F1EE]'
            }`}
          >
            <Layers className="w-4 h-4 text-[#C2410C]" />
            <span>Subclase 1A: Profundización &amp; Analogías</span>
          </button>

          <button
            onClick={() => setSubclassTab('subclass_practice')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
              subclassTab === 'subclass_practice'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#4A4742] hover:bg-[#F2F1EE]'
            }`}
          >
            <Wrench className="w-4 h-4 text-[#C2410C]" />
            <span>Subclase 1B: Práctica &amp; Cuestionario</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <ExportSummaryButton
            payload={{
              title: `${item.type === 'workshop' ? 'Taller' : `Clase ${item.number}`}: ${item.title}`,
              categoryOrCourse: 'Curso Algorítmica y Complejidad CLRS',
              cormenRef: item.cormenChapter,
              topicSummary: item.topic || item.summary,
              theoryContent: item.theoryContent,
              analogies: deepening?.analogies,
              checkQuestions: item.checkQuestions,
            }}
          />

          <button
            onClick={onToggleCompleted}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition shrink-0 ${
              isCompleted
                ? 'bg-[#ECFDF5] border-[#10B981] text-[#065F46]'
                : 'bg-white hover:bg-[#F2F1EE] border-[#E5E2DE] text-[#4A4742]'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-[#10B981]' : 'text-[#8C8882]'}`} />
            <span>{isCompleted ? 'Completada ✓' : 'Marcar Completada'}</span>
          </button>
        </div>
      </div>

      {/* Subclass 1A: Deepening View */}
      {subclassTab === 'subclass_deepening' && (
        <SubclassDeepeningView item={item} deepeningData={deepening} />
      )}

      {/* Subclass 1B: Practice & Quiz View */}
      {subclassTab === 'subclass_practice' && (
        <SubclassPracticeView
          item={item}
          practiceData={practice}
          onOpenExercisesTab={onOpenExercise}
        />
      )}

      {/* Main Base Class View */}
      {subclassTab === 'main' && (
        <>
          {/* Header Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                    item.type === 'workshop'
                      ? 'bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74]'
                      : item.type === 'review'
                      ? 'bg-stone-200 text-stone-700 border border-stone-300'
                      : 'bg-[#F2F1EE] text-[#4A4742] border border-[#E5E2DE]'
                  }`}
                >
                  {item.type === 'workshop'
                    ? 'Taller Práctico'
                    : item.type === 'review'
                    ? 'Repaso Integrador'
                    : `Clase ${item.number}`}
                </span>
                <span className="text-xs text-[#8C8882] font-mono">
                  {item.durationMinutes} minutos de lectura
                </span>
              </div>
            </div>

            <span className="text-[#C2410C] font-serif italic text-lg sm:text-xl block mb-1">
              {item.type === 'workshop' ? 'Taller de Algorítmica' : `Lección ${item.number}`}
            </span>

            <h1 className="text-3xl sm:text-5xl font-serif text-[#1A1A1A] leading-tight tracking-tight">
              {item.title}
            </h1>
            <p className="text-base text-[#4A4742] mt-3 font-normal max-w-3xl leading-relaxed">
              {item.topic}
            </p>

            <div className="mt-6 pt-4 border-t border-[#F2F1EE] flex items-center gap-2 text-xs text-[#C2410C] font-mono uppercase tracking-wider font-semibold">
              <Bookmark className="w-4 h-4 shrink-0" />
              <span>Referencia Bibliográfica: {item.cormenChapter}</span>
            </div>
          </motion.div>

          {/* Embedded Visualizer */}
          {item.visualizerType !== 'none' && (
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C2410C]" />
                <h2 className="text-xs font-bold text-[#8C8882] uppercase tracking-widest">
                  Laboratorio Gráfico e Interactivo
                </h2>
              </div>
              {renderVisualizer()}
            </motion.section>
          )}

          {/* Main Theory Content */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-10 text-[#1A1A1A] shadow-xs"
          >
            <MarkdownRenderer content={item.theoryContent} />
          </motion.section>

          {/* Check Questions Section */}
          {item.checkQuestions && item.checkQuestions.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs"
            >
              <div className="flex items-center gap-2 pb-4 border-b border-[#F2F1EE]">
                <HelpCircle className="w-5 h-5 text-[#C2410C]" />
                <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">
                  Comprobación Conceptual &amp; Preguntas de Repaso
                </h2>
              </div>

              <div className="space-y-6">
                {item.checkQuestions.map((q, qIdx) => {
                  const selectedOpt = questionAnswers[q.id];
                  const isAnswered = selectedOpt !== undefined;
                  const isCorrect = selectedOpt === q.correctIndex;

                  return (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 10 }}
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

          {/* Completion Banner */}
          <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-2xl p-8 text-center space-y-4 shadow-xs">
            <Sparkles className="w-6 h-6 text-[#C2410C] mx-auto" />
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A]">
              ¿Listo para dar el siguiente paso en esta lección?
            </h3>
            <p className="text-xs sm:text-sm text-[#4A4742] max-w-xl mx-auto leading-relaxed">
              Explora las subclases de profundización y problemas, o dirígete directamente al editor interactivo de código C.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setSubclassTab('subclass_deepening')}
                className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-white font-bold rounded-full text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4 text-[#FDBA74]" />
                <span>Ir a Subclase 1A (Analogías)</span>
              </button>

              <button
                onClick={() => setSubclassTab('subclass_practice')}
                className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-white font-bold rounded-full text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-1.5"
              >
                <Wrench className="w-4 h-4 text-[#FDBA74]" />
                <span>Ir a Subclase 1B (Práctica C)</span>
              </button>

              <button
                onClick={onOpenExercise}
                className="px-5 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold rounded-full text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-1.5"
              >
                <Code className="w-4 h-4" />
                <span>Editor de Código C</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Bottom Prev / Next Nav */}
      <div className="flex items-center justify-between pt-6 border-t border-[#E5E2DE] text-xs font-semibold">
        {onPrevClass ? (
          <button
            onClick={() => {
              setSubclassTab('main');
              onPrevClass();
            }}
            className="flex items-center gap-2 px-5 py-2.5 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] rounded-full uppercase tracking-wider transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Clase Anterior</span>
          </button>
        ) : (
          <div />
        )}

        {onNextClass && (
          <button
            onClick={() => {
              setSubclassTab('main');
              onNextClass();
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#1A1A1A] hover:bg-black text-white rounded-full uppercase tracking-wider transition"
          >
            <span>Siguiente Clase</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
