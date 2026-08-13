import React from 'react';
import { DeepeningSubclass, CourseItem } from '../types';
import { Lightbulb, BookOpen, Layers, Sparkles, HelpCircle } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface SubclassDeepeningViewProps {
  item: CourseItem;
  deepeningData: DeepeningSubclass;
}

export const SubclassDeepeningView: React.FC<SubclassDeepeningViewProps> = ({
  item,
  deepeningData,
}) => {
  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold px-3 py-1 bg-[#C2410C] text-white rounded-full uppercase tracking-widest">
            Subclase 1A • Profundización &amp; Analogías
          </span>
          <span className="text-xs text-[#8C8882] font-mono">
            {item.cormenChapter}
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1A1A] font-bold">
          {deepeningData.title}
        </h2>
        <p className="text-sm sm:text-base text-[#4A4742] mt-2 leading-relaxed">
          {deepeningData.subtitle}
        </p>
      </div>

      {/* 1. Profundización Teórica Extendida */}
      <section className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-10 text-[#1A1A1A] shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-[#F2F1EE]">
          <BookOpen className="w-5 h-5 text-[#C2410C]" />
          <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
            1. Profundización y Conceptos Clave No Explicados
          </h3>
        </div>
        <MarkdownRenderer content={deepeningData.moreTopicsContent} />
      </section>

      {/* 2. Analogías del Mundo Real */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#C2410C]" />
          <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
            2. Analogías del Mundo Real para Entender sin Memorizar
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deepeningData.analogies.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs relative overflow-hidden hover:border-[#C2410C]/40 transition group"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-[#C2410C] uppercase tracking-wider bg-[#FFF7ED] px-2.5 py-1 rounded-md border border-[#FDBA74]">
                  Analogía 0{idx + 1}
                </span>
                <span className="text-xs text-[#8C8882] font-mono font-semibold">
                  {item.concept}
                </span>
              </div>

              <h4 className="text-lg font-serif font-bold text-[#1A1A1A]">
                {item.title}
              </h4>

              <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed bg-[#F9F8F6] p-4 rounded-xl border border-[#E5E2DE]">
                "{item.analogy}"
              </p>

              <div className="pt-2 border-t border-[#F2F1EE] flex items-start gap-2 text-xs text-[#10B981]">
                <Sparkles className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <div className="text-[#33312E] leading-relaxed">
                  <span className="font-bold text-[#065F46] block text-[11px] uppercase tracking-wider mb-0.5">
                    ¿Por qué funciona este modelo mental?
                  </span>
                  {item.whyItWorks}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Explicación Alternativa / Desde Otra Perspectiva */}
      <section className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-10 text-[#1A1A1A] shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-4 border-b border-[#F2F1EE]">
          <Layers className="w-5 h-5 text-[#C2410C]" />
          <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
            3. Explicado de Otra Forma (Perspectiva Intuitiva)
          </h3>
        </div>
        <MarkdownRenderer content={deepeningData.alternativeExplanation} />
      </section>
    </div>
  );
};
