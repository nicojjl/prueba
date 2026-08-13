import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CertamenItem } from '../data/certamenesData';
import { CSyntaxHighlighter } from './CSyntaxHighlighter';
import { MarkdownRenderer } from './MarkdownRenderer';
import { exportCertamenPDF } from '../utils/exportSummary';
import {
  X,
  FileText,
  Clock,
  User,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Code2,
  Printer,
  Sparkles,
  HelpCircle,
  Award,
  Layers
} from 'lucide-react';

interface CertamenModalProps {
  certamen: CertamenItem | null;
  onClose: () => void;
}

export const CertamenModal: React.FC<CertamenModalProps> = ({ certamen, onClose }) => {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);

  if (!certamen) return null;

  const currentQ = certamen.questions[activeQuestionIdx] || certamen.questions[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-hidden selection:bg-[#C2410C] selection:text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-[#E5E2DE] rounded-3xl shadow-2xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden relative"
        >
          {/* Top Header */}
          <div className="bg-[#FFF7ED] border-b border-[#FDBA74] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap text-xs font-bold font-mono text-[#C2410C]">
                <span className="bg-white px-2.5 py-0.5 rounded-md border border-[#FDBA74] shadow-2xs">
                  {certamen.semester}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {certamen.university}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A]">
                {certamen.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#4A4742] pt-0.5">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C2410C]" />
                  {certamen.professor}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C2410C]" />
                  {certamen.date}
                </span>
                {certamen.duration && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C2410C]" />
                    {certamen.duration}
                  </span>
                )}
              </div>
            </div>

            {/* Actions: Export PDF & Close */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                onClick={() => exportCertamenPDF(certamen)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Exportar PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#4A4742] hover:text-[#1A1A1A] hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Topics & Overview Banner */}
          <div className="bg-[#F9F8F6] px-6 py-3 border-b border-[#E5E2DE] flex flex-wrap items-center justify-between gap-3 text-xs text-[#4A4742]">
            <div className="flex items-center gap-2 overflow-x-auto py-0.5">
              <span className="font-bold text-[#1A1A1A] uppercase text-[10px] tracking-wider flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#C2410C]" />
                Temas Evaluados:
              </span>
              {certamen.topics.map((topic, i) => (
                <span
                  key={i}
                  className="bg-white border border-[#E5E2DE] px-2.5 py-0.5 rounded-full text-[11px] font-medium text-[#1A1A1A] whitespace-nowrap shadow-2xs"
                >
                  {topic}
                </span>
              ))}
            </div>
            <div className="text-[11px] font-mono text-[#888] font-semibold">
              {certamen.questions.length} Preguntas • Total Pauta Disponible
            </div>
          </div>

          {/* Question Selector Tabs */}
          <div className="bg-white border-b border-[#E5E2DE] px-6 py-2 flex items-center gap-2 overflow-x-auto">
            {certamen.questions.map((q, idx) => {
              const isActive = idx === activeQuestionIdx;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestionIdx(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white shadow-sm'
                      : 'bg-[#F2F1EE] text-[#4A4742] hover:bg-[#E5E2DE] hover:text-[#1A1A1A]'
                  }`}
                >
                  <HelpCircle className={`w-3.5 h-3.5 ${isActive ? 'text-[#FDBA74]' : 'text-[#888]'}`} />
                  <span>{q.number}: {q.title.slice(0, 24)}...</span>
                  <span className={`ml-1 text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-[#C2410C] text-white' : 'bg-stone-300 text-stone-800'
                  }`}>
                    {q.points}pts
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Question Content Stage */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Question Title & Score Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E2DE] pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold font-mono text-[#C2410C] uppercase tracking-wider">
                  {currentQ.number}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
                  {currentQ.title}
                </h3>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] text-[#FDBA74] rounded-xl text-xs font-mono font-bold self-start sm:self-center shadow-xs">
                <Award className="w-4 h-4 text-[#FDBA74]" />
                <span>Puntaje: {currentQ.points} Puntos</span>
              </div>
            </div>

            {/* Question Description */}
            <div className="bg-[#FAFAFA] border border-[#E5E2DE] p-4 sm:p-5 rounded-2xl text-sm text-[#2D2B28] leading-relaxed space-y-2">
              <div className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <FileText className="w-4 h-4 text-[#C2410C]" />
                Enunciado de la Pregunta:
              </div>
              <MarkdownRenderer content={currentQ.description} />
            </div>

            {/* Code Snippet if present */}
            {currentQ.codeSnippet && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#89B4FA]" />
                  Código Base / Estructura Entregada:
                </div>
                <CSyntaxHighlighter code={currentQ.codeSnippet} language="c" />
              </div>
            )}

            {/* Solution Explanation Pauta Box */}
            {currentQ.solutionExplanation && (
              <div className="bg-[#FFF7ED] border-2 border-[#FDBA74] p-5 rounded-2xl space-y-3 relative shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C2410C]">
                  <CheckCircle2 className="w-4 h-4 text-[#C2410C]" />
                  <span>Pauta Oficial de Corrección &amp; Explicación:</span>
                </div>
                <div className="text-sm text-[#2D2B28] leading-relaxed">
                  <MarkdownRenderer content={currentQ.solutionExplanation} />
                </div>
              </div>
            )}

            {/* Solution Code C99 if present */}
            {currentQ.solutionCode && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-[#166534] uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#166534]" />
                  Solución Oficial en C (C99) / Pseudocódigo:
                </div>
                <CSyntaxHighlighter code={currentQ.solutionCode} language="c" />
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="bg-[#F9F8F6] border-t border-[#E5E2DE] p-4 px-6 flex items-center justify-between text-xs text-[#4A4742]">
            <button
              disabled={activeQuestionIdx === 0}
              onClick={() => setActiveQuestionIdx((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-xl border border-[#E5E2DE] bg-white hover:bg-[#F2F1EE] disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-all cursor-pointer"
            >
              ← Pregunta Anterior
            </button>

            <span className="font-mono font-semibold text-[#888]">
              {activeQuestionIdx + 1} de {certamen.questions.length}
            </span>

            <button
              disabled={activeQuestionIdx === certamen.questions.length - 1}
              onClick={() => setActiveQuestionIdx((prev) => Math.min(certamen.questions.length - 1, prev + 1))}
              className="px-4 py-2 rounded-xl bg-[#1A1A1A] hover:bg-[#33312E] text-white disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-all cursor-pointer"
            >
              Siguiente Pregunta →
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
