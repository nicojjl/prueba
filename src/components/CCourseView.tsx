import React, { useState } from 'react';
import { Exercise } from '../types';
import { C_COURSE_DATA } from '../data/cCourseData';
import { CSyntaxHighlighter } from './CSyntaxHighlighter';
import { MarkdownRenderer } from './MarkdownRenderer';
import {
  BookOpen,
  Terminal,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Play,
  Search,
  Sparkles,
  Copy,
  Check,
  Cpu,
  Layers,
  GraduationCap,
  Code,
  Lightbulb,
  Zap,
  HelpCircle,
  Trophy,
  RotateCcw,
  Sliders,
  Wrench
} from 'lucide-react';
import { motion } from 'motion/react';
import { CCourseCap1Animation1 } from './animations/CCourseCap1Animation1';
import { CCourseCap1Animation2 } from './animations/CCourseCap1Animation2';
import { ExercisePlayground } from './ExercisePlayground';
import { ExportSummaryButton } from './ExportSummaryButton';

interface CCourseViewProps {
  completedSubtopics: string[]; // array of completed chapter or subtopic ids
  onToggleSubtopicCompleted: (chapterId: string) => void;
  selectedChapterId?: string;
  selectedSubtopicId?: string;
  onSelectSubtopic?: (chapterId: string, subtopicId: string) => void;
}

export const CCourseView: React.FC<CCourseViewProps> = ({
  completedSubtopics,
  onToggleSubtopicCompleted,
  selectedChapterId: propSelectedChapterId,
  onSelectSubtopic: propOnSelectSubtopic,
}) => {
  const [internalChapterId, setInternalChapterId] = useState<string>('cap-1');
  const selectedChapterId = propSelectedChapterId || internalChapterId;

  // Active Chapter
  const currentChapter =
    C_COURSE_DATA.find((c) => c.id === selectedChapterId) || C_COURSE_DATA[0];

  const [activeTab, setActiveTab] = useState<'theory' | 'analogies' | 'visualizer' | 'code' | 'exercises' | 'quiz'>('theory');

  // Code Execution State
  const [executed, setExecuted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Quiz State
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizFeedback, setShowQuizFeedback] = useState<Record<string, boolean>>({});

  // Memory Visualizer State (Interactive Pointer Simulator)
  const [memStep, setMemStep] = useState<number>(0);
  const MEMORY_SIMULATION_STEPS = [
    {
      title: 'Paso 1: Declaración de Variable int x = 42',
      description: 'El compilador C reserva 4 bytes en el Stack para x en la dirección hexadecimal 0x7ffd10.',
      stack: [
        { name: 'x', type: 'int', address: '0x7ffd10', value: '42', isPointer: false },
        { name: 'y', type: 'int', address: '0x7ffd14', value: '99', isPointer: false },
        { name: 'ptr', type: 'int*', address: '0x7ffd18', value: 'NULL', isPointer: true }
      ]
    },
    {
      title: 'Paso 2: Asignación de Puntero ptr = &x',
      description: 'El operador de dirección & obtiene 0x7ffd10 y lo almacena dentro de la variable puntero ptr.',
      stack: [
        { name: 'x', type: 'int', address: '0x7ffd10', value: '42', isPointer: false },
        { name: 'y', type: 'int', address: '0x7ffd14', value: '99', isPointer: false },
        { name: 'ptr', type: 'int*', address: '0x7ffd18', value: '0x7ffd10', isPointer: true, pointsTo: '0x7ffd10' }
      ]
    },
    {
      title: 'Paso 3: Desreferenciación *ptr = 100',
      description: 'El operador de desreferencia * busca la dirección en ptr (0x7ffd10) y sobreescribe su contenido con 100.',
      stack: [
        { name: 'x', type: 'int', address: '0x7ffd10', value: '100', isPointer: false, highlighted: true },
        { name: 'y', type: 'int', address: '0x7ffd14', value: '99', isPointer: false },
        { name: 'ptr', type: 'int*', address: '0x7ffd18', value: '0x7ffd10', isPointer: true, pointsTo: '0x7ffd10' }
      ]
    },
    {
      title: 'Paso 4: Reasignación de Puntero ptr = &y',
      description: 'ptr ahora almacena la dirección 0x7ffd14. El puntero ahora apunta a la variable y.',
      stack: [
        { name: 'x', type: 'int', address: '0x7ffd10', value: '100', isPointer: false },
        { name: 'y', type: 'int', address: '0x7ffd14', value: '99', isPointer: false },
        { name: 'ptr', type: 'int*', address: '0x7ffd18', value: '0x7ffd14', isPointer: true, pointsTo: '0x7ffd14', highlighted: true }
      ]
    }
  ];

  // Bitwise Visualizer State (Interactive Bit Switches)
  const [bitOperandA, setBitOperandA] = useState<number>(0b00101101); // 45
  const [bitOperandB, setBitOperandB] = useState<number>(0b00010011); // 19

  const toggleBitA = (index: number) => {
    setBitOperandA((prev) => prev ^ (1 << (7 - index)));
  };

  const toggleBitB = (index: number) => {
    setBitOperandB((prev) => prev ^ (1 << (7 - index)));
  };

  const handleSelectChapter = (chapId: string) => {
    setInternalChapterId(chapId);
    if (propOnSelectSubtopic) {
      propOnSelectSubtopic(chapId, chapId);
    }
    setExecuted(false);
    setCopied(false);
  };

  const handleCopyCode = (codeStr: string) => {
    navigator.clipboard.writeText(codeStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuizAnswer = (questionId: string, optionIndex: number) => {
    setUserQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowQuizFeedback((prev) => ({ ...prev, [questionId]: true }));
  };

  // Progress Calculation
  const totalChapters = C_COURSE_DATA.length;
  const completedCount = completedSubtopics.length;
  const progressPercent = Math.round((completedCount / totalChapters) * 100);

  const isChapterCompleted = completedSubtopics.includes(currentChapter.id);

  return (
    <div className="flex-1 bg-[#F9F8F6] text-[#1A1A1A] overflow-y-auto p-4 sm:p-8 lg:p-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-3 py-1 bg-[#C2410C] text-white rounded-full uppercase tracking-widest flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>Curso Maestro • Lenguaje C (Kernighan &amp; Ritchie)</span>
              </span>
              <span className="text-xs text-[#C2410C] font-semibold font-mono uppercase tracking-wider">
                C99 / ANSI C Standard
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1A1A1A] tracking-tight">
              Aprende C Profesional por Capítulos
            </h1>
            <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed">
              Estudia los 8 Capítulos Integrales de K&amp;R C: teoría en profundidad, analogías reales, simuladores animados de memoria RAM y terminal interactiva.
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-[#FFF7ED] border border-[#FDBA74] p-4 sm:p-5 rounded-2xl min-w-[220px] text-center space-y-2">
            <span className="text-[10px] font-bold text-[#C2410C] uppercase tracking-wider block">
              Progreso en Capítulos de C
            </span>
            <div className="text-3xl font-serif font-bold text-[#C2410C]">
              {completedCount} <span className="text-xs font-sans font-normal text-[#C2410C]/80">/ {totalChapters} Capítulos</span>
            </div>
            <div className="w-full bg-[#FDBA74]/40 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#C2410C] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-[#C2410C] font-semibold block pt-0.5">
              {progressPercent}% Completado
            </span>
          </div>
        </div>
      </div>

      {/* 8 Chapters Horizontal Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {C_COURSE_DATA.map((chap) => {
          const isSelected = chap.id === selectedChapterId;
          const isComp = completedSubtopics.includes(chap.id);

          return (
            <button
              key={chap.id}
              onClick={() => handleSelectChapter(chap.id)}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs scale-[1.02]'
                  : 'bg-white hover:bg-[#F2F1EE] border-[#E5E2DE] text-[#1A1A1A]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{chap.icon}</span>
                {isComp ? (
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                ) : (
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-[#C2410C] text-white' : 'bg-[#F2F1EE] text-[#8C8882]'
                    }`}
                  >
                    Cap. {chap.chapterNumber}
                  </span>
                )}
              </div>

              <div>
                <span className="text-xs font-serif font-bold line-clamp-1 block leading-tight">
                  {chap.title.split(':')[1] || chap.title}
                </span>
                <span
                  className={`text-[10px] block mt-1 ${
                    isSelected ? 'text-[#FDBA74]' : 'text-[#8C8882]'
                  }`}
                >
                  {chap.exercises?.length || 2} ejercicios
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Master Chapter Workspace */}
      <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
        {/* Chapter Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F2F1EE]">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentChapter.icon}</span>
              <span className="text-xs font-mono font-bold bg-[#C2410C] text-white px-3 py-1 rounded-full uppercase tracking-wider">
                Capítulo {currentChapter.chapterNumber} de 8
              </span>
              <span className="text-xs text-[#8C8882] font-semibold">
                K&amp;R C Standard
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
              {currentChapter.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed">
              {currentChapter.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ExportSummaryButton
              payload={{
                title: `Capítulo ${currentChapter.chapterNumber}: ${currentChapter.title}`,
                categoryOrCourse: 'Curso C Pro (Kernighan & Ritchie Standard)',
                cormenRef: `K&R C Standard • Cap. ${currentChapter.chapterNumber}`,
                topicSummary: currentChapter.subtitle,
                theoryContent: currentChapter.theoryContent,
                codeExampleC: currentChapter.codeExamples?.[0]?.code,
                analogies: currentChapter.analogies,
              }}
            />

            <button
              onClick={() => onToggleSubtopicCompleted(currentChapter.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs ${
                isChapterCompleted
                  ? 'bg-[#ECFDF5] text-[#10B981] border border-[#10B981]'
                  : 'bg-[#1A1A1A] hover:bg-[#333333] text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isChapterCompleted ? 'Capítulo Completado ✓' : 'Marcar Capítulo Completado'}</span>
            </button>
          </div>
        </div>

        {/* Key Concepts Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8882] mr-1">
            Conceptos Clave del Capítulo:
          </span>
          {currentChapter.keyConcepts.map((kc, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono font-semibold bg-[#FFF7ED] text-[#C2410C] px-3 py-1 rounded-full border border-[#FDBA74]"
            >
              {kc}
            </span>
          ))}
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-[#F9F8F6] p-1.5 rounded-xl border border-[#E5E2DE]">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'theory'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#4A4742] hover:bg-[#E5E2DE]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#FDBA74]" />
            <span>1. Teoría Completa</span>
          </button>

          <button
            onClick={() => setActiveTab('analogies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'analogies'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#4A4742] hover:bg-[#E5E2DE]'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-[#FDBA74]" />
            <span>2. Analogías Reales ({currentChapter.analogies?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('visualizer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'visualizer'
                ? 'bg-[#C2410C] text-white shadow-xs'
                : 'text-[#4A4742] hover:bg-[#E5E2DE]'
            }`}
          >
            <Zap className="w-4 h-4 text-white" />
            <span>3. Simuladores Animados C</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'code'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#4A4742] hover:bg-[#E5E2DE]'
            }`}
          >
            <Terminal className="w-4 h-4 text-[#10B981]" />
            <span>4. Código C &amp; Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'exercises'
                ? 'bg-[#C2410C] text-white shadow-xs'
                : 'text-[#4A4742] hover:bg-[#E5E2DE]'
            }`}
          >
            <Code className="w-4 h-4 text-white" />
            <span>5. Taller Práctico ({currentChapter.exercises?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'quiz'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#4A4742] hover:bg-[#E5E2DE]'
            }`}
          >
            <Trophy className="w-4 h-4 text-[#FDBA74]" />
            <span>6. Quiz ({currentChapter.quizQuestions?.length || 0})</span>
          </button>
        </div>

        {/* TAB 1: TEORÍA COMPLETA */}
        {activeTab === 'theory' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-4 bg-[#FFF7ED] border border-[#FDBA74] rounded-xl text-xs text-[#C2410C] flex items-start gap-3">
              <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-[#C2410C]" />
              <div>
                <span className="font-bold block text-xs uppercase tracking-wider">
                  Contenido Integrado del Capítulo {currentChapter.chapterNumber}:
                </span>
                <span className="text-[#1A1A1A]">
                  {currentChapter.description}
                </span>
              </div>
            </div>

            <div className="prose max-w-none text-xs sm:text-sm text-[#1A1A1A] leading-relaxed border-t border-[#F2F1EE] pt-6">
              <MarkdownRenderer content={currentChapter.theoryContent} />
            </div>
          </motion.div>
        )}

        {/* TAB 2: ANALOGÍAS Y METÁFORAS VISUALES */}
        {activeTab === 'analogies' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#C2410C]" />
                <span>Analogías del Mundo Real para el Capítulo {currentChapter.chapterNumber}</span>
              </h3>
              <p className="text-xs text-[#8C8882]">
                Visualiza conceptos abstractos de C (memoria, punteros, structs, flujos) con metáforas cotidianas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentChapter.analogies && currentChapter.analogies.length > 0 ? (
                currentChapter.analogies.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F9F8F6] border border-[#E5E2DE] p-6 rounded-2xl space-y-4 hover:border-[#C2410C] transition"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-[#C2410C] uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>{item.concept}</span>
                    </div>

                    <h4 className="text-base font-serif font-bold text-[#1A1A1A]">
                      {item.title}
                    </h4>

                    <p className="text-xs text-[#4A4742] leading-relaxed bg-white p-4 rounded-xl border border-[#E5E2DE]">
                      "{item.analogy}"
                    </p>

                    <div className="pt-2 text-[11px] text-[#10B981] font-semibold flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span><strong>Por qué funciona esta analogía:</strong> {item.whyItWorks}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 p-8 text-center text-xs text-[#8C8882] bg-[#F9F8F6] rounded-xl">
                  No hay analogías adicionales cargadas para este capítulo.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 3: SIMULADORES ANIMADOS C */}
        {activeTab === 'visualizer' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            {currentChapter.id === 'cap-1' && (
              <div className="space-y-8">
                <CCourseCap1Animation1 />
                <CCourseCap1Animation2 />
              </div>
            )}
            {/* Inspector 1: Punteros y Memoria Stack */}
            <div className="bg-[#F9F8F6] border border-[#E5E2DE] rounded-2xl p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E2DE]">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-[#C2410C]" />
                    <span>Inspector Animado de Memoria Stack y Punteros</span>
                  </h3>
                  <p className="text-xs text-[#8C8882]">
                    Visualiza la asignación de variables en la memoria RAM, direcciones hexadecimales y la desreferenciación mediante punteros paso a paso.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMemStep((prev) => Math.max(0, prev - 1))}
                    disabled={memStep === 0}
                    className="px-3 py-1.5 bg-[#E5E2DE] disabled:opacity-40 text-[#1A1A1A] rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-white rounded-lg border border-[#E5E2DE]">
                    Paso {memStep + 1} / {MEMORY_SIMULATION_STEPS.length}
                  </span>
                  <button
                    onClick={() => setMemStep((prev) => Math.min(MEMORY_SIMULATION_STEPS.length - 1, prev + 1))}
                    disabled={memStep === MEMORY_SIMULATION_STEPS.length - 1}
                    className="px-3 py-1.5 bg-[#C2410C] hover:bg-[#9A3412] disabled:opacity-40 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <span>Siguiente</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Step Title & Explanation */}
              <div className="p-4 bg-white border border-[#FDBA74] rounded-xl text-xs space-y-1">
                <span className="font-serif font-bold text-[#C2410C] text-sm block">
                  {MEMORY_SIMULATION_STEPS[memStep].title}
                </span>
                <p className="text-[#4A4742]">
                  {MEMORY_SIMULATION_STEPS[memStep].description}
                </p>
              </div>

              {/* RAM Stack Memory Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MEMORY_SIMULATION_STEPS[memStep].stack.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-5 rounded-xl border font-mono transition-all ${
                      item.highlighted
                        ? 'bg-[#FFF7ED] border-[#C2410C] shadow-md'
                        : 'bg-white border-[#E5E2DE]'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b pb-2 mb-3">
                      <span className="text-xs font-bold text-[#1A1A1A]">
                        Variable: <span className="text-[#C2410C]">{item.name}</span>
                      </span>
                      <span className="text-[10px] text-[#8C8882] bg-[#F2F1EE] px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#8C8882]">Dirección RAM:</span>
                        <span className="font-bold text-stone-700">{item.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8C8882]">Valor Almacenado:</span>
                        <span className="font-bold text-[#10B981] text-sm">{item.value}</span>
                      </div>
                      {item.isPointer && item.pointsTo && (
                        <div className="pt-2 border-t border-dashed border-[#E5E2DE] text-[11px] text-[#C2410C] font-semibold flex items-center justify-between">
                          <span>Apunta a:</span>
                          <span className="bg-[#FFF7ED] px-2 py-0.5 rounded border border-[#FDBA74]">
                            👉 {item.pointsTo}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Inspector 2: Interactive Bitwise Operator Switchboard */}
            <div className="bg-[#F9F8F6] border border-[#E5E2DE] rounded-2xl p-6 space-y-6">
              <div className="space-y-1 pb-4 border-b border-[#E5E2DE]">
                <h3 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#C2410C]" />
                  <span>Conmutador Interactivo Bitwise (8 Bits)</span>
                </h3>
                <p className="text-xs text-[#8C8882]">
                  Haz clic en cualquiera de los 8 bits de Operando A u Operando B para alternar entre 0 y 1. Observa el cálculo inmediato de AND (&amp;), OR (|), XOR (^) y desplazamientos.
                </p>
              </div>

              {/* Bit Switches Input Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Operando A */}
                <div className="bg-white p-5 rounded-xl border border-[#E5E2DE] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A1A1A]">
                      Operando A (Byte)
                    </span>
                    <span className="text-xs font-mono font-bold text-[#C2410C]">
                      Decimal: {bitOperandA} | Hex: 0x{bitOperandA.toString(16).toUpperCase().padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                    {Array.from({ length: 8 }).map((_, idx) => {
                      const bitVal = (bitOperandA >> (7 - idx)) & 1;
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleBitA(idx)}
                          className={`flex-1 py-3 rounded-lg font-mono font-bold text-xs transition border ${
                            bitVal === 1
                              ? 'bg-[#C2410C] text-white border-[#C2410C] shadow-xs'
                              : 'bg-[#F2F1EE] text-[#8C8882] border-[#E5E2DE] hover:bg-[#E5E2DE]'
                          }`}
                        >
                          {bitVal}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Operando B */}
                <div className="bg-white p-5 rounded-xl border border-[#E5E2DE] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A1A1A]">
                      Operando B (Byte)
                    </span>
                    <span className="text-xs font-mono font-bold text-[#C2410C]">
                      Decimal: {bitOperandB} | Hex: 0x{bitOperandB.toString(16).toUpperCase().padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                    {Array.from({ length: 8 }).map((_, idx) => {
                      const bitVal = (bitOperandB >> (7 - idx)) & 1;
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleBitB(idx)}
                          className={`flex-1 py-3 rounded-lg font-mono font-bold text-xs transition border ${
                            bitVal === 1
                              ? 'bg-[#10B981] text-white border-[#10B981] shadow-xs'
                              : 'bg-[#F2F1EE] text-[#8C8882] border-[#E5E2DE] hover:bg-[#E5E2DE]'
                          }`}
                        >
                          {bitVal}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bitwise Calculated Results Display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 font-mono text-xs">
                <div className="bg-[#1A1A1A] text-white p-4 rounded-xl border border-stone-800 space-y-1">
                  <span className="text-[10px] text-[#FDBA74] font-bold block">A &amp; B (AND Bitwise)</span>
                  <div className="text-base font-bold text-[#10B981]">
                    {(bitOperandA & bitOperandB).toString(2).padStart(8, '0')}
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Decimal: {bitOperandA & bitOperandB} | Hex: 0x{(bitOperandA & bitOperandB).toString(16).toUpperCase()}
                  </div>
                </div>

                <div className="bg-[#1A1A1A] text-white p-4 rounded-xl border border-stone-800 space-y-1">
                  <span className="text-[10px] text-[#FDBA74] font-bold block">A | B (OR Bitwise)</span>
                  <div className="text-base font-bold text-[#10B981]">
                    {(bitOperandA | bitOperandB).toString(2).padStart(8, '0')}
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Decimal: {bitOperandA | bitOperandB} | Hex: 0x{(bitOperandA | bitOperandB).toString(16).toUpperCase()}
                  </div>
                </div>

                <div className="bg-[#1A1A1A] text-white p-4 rounded-xl border border-stone-800 space-y-1">
                  <span className="text-[10px] text-[#FDBA74] font-bold block">A ^ B (XOR Bitwise)</span>
                  <div className="text-base font-bold text-[#10B981]">
                    {(bitOperandA ^ bitOperandB).toString(2).padStart(8, '0')}
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Decimal: {bitOperandA ^ bitOperandB} | Hex: 0x{(bitOperandA ^ bitOperandB).toString(16).toUpperCase()}
                  </div>
                </div>

                <div className="bg-[#1A1A1A] text-white p-4 rounded-xl border border-stone-800 space-y-1">
                  <span className="text-[10px] text-[#FDBA74] font-bold block">A &lt;&lt; 1 (Shift Left)</span>
                  <div className="text-base font-bold text-[#10B981]">
                    {((bitOperandA << 1) & 0xFF).toString(2).padStart(8, '0')}
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Decimal: {(bitOperandA << 1) & 0xFF}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: CÓDIGO C & TERMINAL */}
        {activeTab === 'code' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {currentChapter.codeExamples && currentChapter.codeExamples.map((ex, idx) => (
              <div key={idx} className="space-y-4 bg-[#F9F8F6] p-6 rounded-2xl border border-[#E5E2DE]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#1A1A1A]">
                      {ex.title}
                    </h3>
                    <p className="text-xs text-[#8C8882] mt-0.5">
                      {ex.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCode(ex.code)}
                      className="px-3 py-1.5 bg-white border border-[#E5E2DE] hover:bg-[#F2F1EE] text-[#1A1A1A] rounded-lg text-xs font-semibold transition flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copiado' : 'Copiar'}</span>
                    </button>

                    <button
                      onClick={() => setExecuted(true)}
                      className="px-4 py-1.5 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Ejecutar en Consola</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] text-white p-4 rounded-xl border border-stone-800 font-mono text-xs overflow-x-auto shadow-inner">
                  <CSyntaxHighlighter code={ex.code} />
                </div>

                {/* Simulated Terminal Output */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A4742] flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-[#10B981]" />
                    <span>Consola stdout (`gcc -Wall main.c -o main &amp;&amp; ./main`)</span>
                  </span>

                  <div className="bg-[#0F172A] text-[#F8FAFC] p-4 rounded-xl border border-slate-800 font-mono text-xs min-h-[90px]">
                    {executed ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="text-[10px] text-[#10B981] font-bold border-b border-slate-800 pb-1 mb-1">
                          [Proceso finalizado con código de salida 0]
                        </div>
                        <pre className="whitespace-pre-wrap text-emerald-400 leading-relaxed font-mono">
                          {ex.expectedOutput}
                        </pre>
                      </motion.div>
                    ) : (
                      <div className="text-slate-500 py-3 text-center">
                        Haz clic en "Ejecutar en Consola" para ver la salida compilada.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 5: TALLER PRÁCTICO EN C */}
        {activeTab === 'exercises' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {currentChapter.exercises && currentChapter.exercises.length > 0 ? (
              <ExercisePlayground exercises={currentChapter.exercises} />
            ) : (
              <div className="p-8 text-center text-xs text-[#8C8882] bg-[#F9F8F6] rounded-xl">
                No hay ejercicios asignados a este capítulo.
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 6: QUIZ AUTOEVALUACIÓN */}
        {activeTab === 'quiz' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#C2410C]" />
                <span>Autoevaluación del Capítulo {currentChapter.chapterNumber}</span>
              </h3>
              <p className="text-xs text-[#8C8882]">
                Pon a prueba tus conocimientos sobre los conceptos clave de este capítulo.
              </p>
            </div>

            <div className="space-y-6">
              {currentChapter.quizQuestions && currentChapter.quizQuestions.length > 0 ? (
                currentChapter.quizQuestions.map((q, idx) => {
                  const selectedOpt = userQuizAnswers[q.id];
                  const isSubmitted = showQuizFeedback[q.id];

                  return (
                    <div
                      key={q.id}
                      className="bg-[#F9F8F6] border border-[#E5E2DE] p-6 rounded-2xl space-y-4"
                    >
                      <h4 className="text-sm font-bold text-[#1A1A1A] flex items-start gap-2">
                        <span className="font-mono text-[#C2410C]">{idx + 1}.</span>
                        <span>{q.question}</span>
                      </h4>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isThisSelected = selectedOpt === optIdx;
                          const isCorrect = optIdx === q.correctIndex;

                          let btnStyle = 'bg-white border-[#E5E2DE] text-[#4A4742] hover:bg-[#F2F1EE]';
                          if (isSubmitted) {
                            if (isCorrect) {
                              btnStyle = 'bg-[#ECFDF5] border-[#10B981] text-[#065F46] font-bold';
                            } else if (isThisSelected) {
                              btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-bold';
                            }
                          } else if (isThisSelected) {
                            btnStyle = 'bg-[#FFF7ED] border-[#C2410C] text-[#C2410C] font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleQuizAnswer(q.id, optIdx)}
                              className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between gap-3 ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {isSubmitted && isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {isSubmitted && (
                        <div className="p-3 bg-white border border-[#E5E2DE] rounded-xl text-xs text-[#4A4742] space-y-1">
                          <span className="font-bold text-[#10B981] block">Explicación:</span>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-xs text-[#8C8882] bg-[#F9F8F6] rounded-xl">
                  No hay preguntas de autoevaluación para este capítulo.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
