import React from 'react';
import { DeepeningSubclass, CourseItem } from '../types';
import { Lightbulb, BookOpen, Layers, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ExportSummaryButton } from './ExportSummaryButton';

interface SubclassDeepeningViewProps {
  item: CourseItem;
  deepeningData: DeepeningSubclass;
}

export const SubclassDeepeningView: React.FC<SubclassDeepeningViewProps> = ({
  item,
  deepeningData,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      {/* Header Banner */}
      <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-3 py-1 bg-[#C2410C] text-white rounded-full uppercase tracking-widest">
              Subclase 1A • Profundización &amp; Analogías
            </span>
            <span className="text-xs text-[#8C8882] font-mono">
              {item.cormenChapter}
            </span>
          </div>

          <ExportSummaryButton
            payload={{
              title: `Profundización 1A: ${deepeningData.title}`,
              categoryOrCourse: 'Subclase 1A - Algorítmica CLRS',
              cormenRef: item.cormenChapter,
              topicSummary: deepeningData.subtitle,
              theoryContent: deepeningData.moreTopicsContent,
              analogies: deepeningData.analogies,
            }}
          />
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1A1A] font-bold">
          {deepeningData.title}
        </h2>
        <p className="text-sm sm:text-base text-[#4A4742] mt-2 leading-relaxed">
          {deepeningData.subtitle}
        </p>
      </div>

      {/* 1. Profundización Teórica Extendida */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-10 text-[#1A1A1A] shadow-xs space-y-4"
      >
        <div className="flex items-center gap-2 pb-4 border-b border-[#F2F1EE]">
          <BookOpen className="w-5 h-5 text-[#C2410C]" />
          <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
            1. Profundización y Conceptos Clave No Explicados
          </h3>
        </div>
        <MarkdownRenderer content={deepeningData.moreTopicsContent} />
      </motion.section>

      {/* 2. Analogías del Mundo Real */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#C2410C]" />
          <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
            2. Analogías del Mundo Real para Entender sin Memorizar
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deepeningData.analogies.map((analogyItem, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + idx * 0.05 }}
              className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs relative overflow-hidden hover:border-[#C2410C]/40 transition group"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-[#C2410C] uppercase tracking-wider bg-[#FFF7ED] px-2.5 py-1 rounded-md border border-[#FDBA74]">
                  Analogía 0{idx + 1}
                </span>
                <span className="text-xs text-[#8C8882] font-mono font-semibold">
                  {analogyItem.concept}
                </span>
              </div>

              <h4 className="text-lg font-serif font-bold text-[#1A1A1A]">
                {analogyItem.title}
              </h4>

              <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed bg-[#F9F8F6] p-4 rounded-xl border border-[#E5E2DE]">
                "{analogyItem.analogy}"
              </p>

              <div className="pt-2 border-t border-[#F2F1EE] flex items-start gap-2 text-xs text-[#10B981]">
                <Sparkles className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <div className="text-[#33312E] leading-relaxed">
                  <span className="font-bold text-[#065F46] block text-[11px] uppercase tracking-wider mb-0.5">
                    ¿Por qué funciona este modelo mental?
                  </span>
                  {analogyItem.whyItWorks}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. Explicación Alternativa / Desde Otra Perspectiva */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-10 text-[#1A1A1A] shadow-xs space-y-4"
      >
        <div className="flex items-center gap-2 pb-4 border-b border-[#F2F1EE]">
          <Layers className="w-5 h-5 text-[#C2410C]" />
          <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
            3. Explicado de Otra Forma (Perspectiva Intuitiva)
          </h3>
        </div>
        <MarkdownRenderer content={deepeningData.alternativeExplanation} />
      </motion.section>
    </motion.div>
  );
};
