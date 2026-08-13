import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  X,
  Check,
  Sparkles,
  BookOpen,
  Code,
  HelpCircle,
  Lightbulb,
  FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  SummaryExportPayload,
  downloadMarkdownSummary,
  exportSummaryToPDF
} from '../utils/exportSummary';

interface ExportSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  payload: SummaryExportPayload;
}

export const ExportSummaryModal: React.FC<ExportSummaryModalProps> = ({
  isOpen,
  onClose,
  payload,
}) => {
  const [includeTheory, setIncludeTheory] = useState<boolean>(true);
  const [includeCode, setIncludeCode] = useState<boolean>(true);
  const [includeComplexity, setIncludeComplexity] = useState<boolean>(true);
  const [includeAnalogies, setIncludeAnalogies] = useState<boolean>(true);
  const [includeQuestions, setIncludeQuestions] = useState<boolean>(true);

  if (!isOpen) return null;

  // Filter payload based on user selections
  const filteredPayload: SummaryExportPayload = {
    ...payload,
    theoryContent: includeTheory ? payload.theoryContent : undefined,
    pseudocodeCLRS: includeCode ? payload.pseudocodeCLRS : undefined,
    codeExampleC: includeCode ? payload.codeExampleC : undefined,
    complexity: includeComplexity ? payload.complexity : undefined,
    analogies: includeAnalogies ? payload.analogies : undefined,
    checkQuestions: includeQuestions ? payload.checkQuestions : undefined,
  };

  const handleExportMarkdown = () => {
    downloadMarkdownSummary(filteredPayload);
  };

  const handleExportPDF = () => {
    exportSummaryToPDF(filteredPayload);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white border border-[#E5E2DE] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Top Decorative Blur */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFF7ED] rounded-full blur-xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#FFF7ED] text-[#C2410C] rounded-2xl border border-[#FDBA74]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">
                  Exportar Ficha de Repaso
                </h3>
                <span className="text-xs font-mono text-[#8C8882] block truncate max-w-[260px]">
                  {payload.title}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#8C8882] hover:text-[#1A1A1A] rounded-xl hover:bg-[#F2F1EE] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Info Card */}
          <div className="bg-[#F9F8F6] border border-[#E5E2DE] rounded-2xl p-4 text-xs text-[#4A4742] space-y-1">
            <div className="flex items-center justify-between font-mono font-bold text-[#1A1A1A]">
              <span>Curso / Categoría:</span>
              <span className="text-[#C2410C]">{payload.categoryOrCourse}</span>
            </div>
            {payload.cormenRef && (
              <div className="flex items-center justify-between font-mono text-[11px] text-[#8C8882]">
                <span>Cormen Ref:</span>
                <span>{payload.cormenRef}</span>
              </div>
            )}
          </div>

          {/* Configuration Checkboxes */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[#4A4742] block uppercase tracking-wider">
              Selecciona el Contenido a Incluir:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
              {payload.theoryContent && (
                <label className="flex items-center gap-2 p-2.5 bg-white border border-[#E5E2DE] rounded-xl hover:bg-[#F9F8F6] cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={includeTheory}
                    onChange={(e) => setIncludeTheory(e.target.checked)}
                    className="rounded text-[#C2410C] focus:ring-[#C2410C]"
                  />
                  <BookOpen className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Teoría y Conceptos</span>
                </label>
              )}

              {(payload.pseudocodeCLRS || payload.codeExampleC) && (
                <label className="flex items-center gap-2 p-2.5 bg-white border border-[#E5E2DE] rounded-xl hover:bg-[#F9F8F6] cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={includeCode}
                    onChange={(e) => setIncludeCode(e.target.checked)}
                    className="rounded text-[#C2410C] focus:ring-[#C2410C]"
                  />
                  <Code className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Pseudocódigo &amp; C</span>
                </label>
              )}

              {payload.complexity && (
                <label className="flex items-center gap-2 p-2.5 bg-white border border-[#E5E2DE] rounded-xl hover:bg-[#F9F8F6] cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={includeComplexity}
                    onChange={(e) => setIncludeComplexity(e.target.checked)}
                    className="rounded text-[#C2410C] focus:ring-[#C2410C]"
                  />
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Tabla Big-O</span>
                </label>
              )}

              {payload.analogies && payload.analogies.length > 0 && (
                <label className="flex items-center gap-2 p-2.5 bg-white border border-[#E5E2DE] rounded-xl hover:bg-[#F9F8F6] cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={includeAnalogies}
                    onChange={(e) => setIncludeAnalogies(e.target.checked)}
                    className="rounded text-[#C2410C] focus:ring-[#C2410C]"
                  />
                  <Lightbulb className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Analogías Didácticas</span>
                </label>
              )}

              {payload.checkQuestions && payload.checkQuestions.length > 0 && (
                <label className="flex items-center gap-2 p-2.5 bg-white border border-[#E5E2DE] rounded-xl hover:bg-[#F9F8F6] cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={includeQuestions}
                    onChange={(e) => setIncludeQuestions(e.target.checked)}
                    className="rounded text-[#C2410C] focus:ring-[#C2410C]"
                  />
                  <HelpCircle className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Preguntas Examen</span>
                </label>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleExportMarkdown}
              className="px-4 py-3 bg-[#1A1A1A] hover:bg-[#33312E] text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
            >
              <Download className="w-4 h-4 text-[#C2410C]" />
              <span>Descargar Markdown (.md)</span>
            </button>

            <button
              onClick={handleExportPDF}
              className="px-4 py-3 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF (.pdf)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
