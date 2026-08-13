import React from 'react';
import { BookOpen, Code, Bot, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  onOpenVibeGuide: () => void;
  onToggleTutor: () => void;
  isTutorOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  completedCount,
  totalCount,
  onOpenVibeGuide,
  onToggleTutor,
  isTutorOpen,
}) => {
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <header className="bg-[#F9F8F6] border-b border-[#E5E2DE] text-[#1A1A1A] sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#FFF7ED] border border-[#FDBA74] rounded-xl text-[#C2410C]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-serif italic font-semibold text-[#1A1A1A] leading-tight flex items-center gap-2">
              Algorítmica <span className="font-normal font-sans not-italic">&amp;</span> Complejidad
              <span className="text-[10px] font-sans font-semibold uppercase tracking-widest px-2.5 py-0.5 bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74] rounded-full not-italic">
                CLRS Cormen
              </span>
            </h1>
            <p className="text-[11px] uppercase tracking-widest text-[#8C8882] font-medium hidden sm:block">
              Curso Académico • Mentor Virtual &amp; Práctica Paso a Paso
            </p>
          </div>
        </div>

        {/* Progress Bar & Actions */}
        <div className="flex items-center gap-4">
          {/* Progress */}
          <div className="hidden md:flex flex-col items-end min-w-[140px]">
            <div className="flex items-center gap-1.5 text-xs text-[#4A4742] font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C2410C]" />
              <span>Progreso: {completedCount}/{totalCount} ({progressPercent}%)</span>
            </div>
            <div className="w-36 h-2 bg-[#E5E2DE] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C2410C] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Vibe Coding Guide Button */}
          <button
            onClick={onOpenVibeGuide}
            className="flex items-center gap-1.5 px-4 py-2 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] rounded-full text-[11px] font-semibold uppercase tracking-wider transition"
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Guía VS Code &amp; Vibe</span>
            <span className="sm:hidden">VS Code</span>
          </button>

          {/* Toggle AI Tutor Button */}
          <button
            onClick={onToggleTutor}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wider transition border ${
              isTutorOpen
                ? 'bg-[#C2410C] border-[#C2410C] text-white shadow-sm'
                : 'bg-white hover:bg-[#FFF7ED] border-[#E5E2DE] text-[#C2410C]'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Mentor Virtual</span>
          </button>
        </div>
      </div>
    </header>
  );
};
