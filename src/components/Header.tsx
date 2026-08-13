import React from 'react';
import { BookOpen, CheckCircle2, Award, Trophy, Flame, Zap, FileText } from 'lucide-react';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  onOpenDashboard?: () => void;
  isDashboardActive?: boolean;
  userXP?: number;
  userLevel?: number;
  streakDays?: number;
  onOpenLeaderboard?: () => void;
  isLeaderboardActive?: boolean;
  onOpenCertamenes?: () => void;
  isCertamenesActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  completedCount,
  totalCount,
  onOpenDashboard,
  userXP = 0,
  userLevel = 1,
  streakDays = 1,
  onOpenLeaderboard,
  isLeaderboardActive = false,
  onOpenCertamenes,
  isCertamenesActive = false,
}) => {
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <header className="bg-[#F9F8F6] border-b border-[#E5E2DE] text-[#1A1A1A] sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Title & Badge */}
        <div
          onClick={() => onOpenDashboard && onOpenDashboard()}
          className="flex items-center gap-3 cursor-pointer group"
          title="Ir a la página principal"
        >
          <div className="p-2.5 bg-[#FFF7ED] border border-[#FDBA74] group-hover:border-[#C2410C] rounded-xl text-[#C2410C] shadow-xs transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-serif italic font-semibold text-[#1A1A1A] group-hover:text-[#C2410C] transition-colors leading-tight flex items-center gap-2">
              Algorítmica <span className="font-normal font-sans not-italic">&amp;</span> Complejidad
              <span className="text-[10px] font-sans font-semibold uppercase tracking-widest px-2.5 py-0.5 bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74] rounded-full not-italic">
                ANSI C / CLRS Cormen
              </span>
            </h1>
            <p className="text-[11px] uppercase tracking-widest text-[#8C8882] font-medium hidden sm:block">
              Plataforma Académica de Aprendizaje Interactivo • Edición Lenguaje C
            </p>
          </div>
        </div>

        {/* Right Section: Certámenes Button, XP/Leaderboard Button & Progress Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Certámenes & PDF's Button */}
          {onOpenCertamenes && (
            <button
              onClick={onOpenCertamenes}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-2xl border text-xs font-bold transition shadow-xs cursor-pointer ${
                isCertamenesActive
                  ? 'bg-[#C2410C] text-white border-[#C2410C] ring-2 ring-[#C2410C]/20'
                  : 'bg-[#FFF7ED] hover:bg-[#FFEAD5] text-[#C2410C] border-[#FDBA74]'
              }`}
              title="Ver Certámenes USM, Pautas de Corrección y Descargar PDF's"
            >
              <FileText className={`w-4 h-4 shrink-0 ${isCertamenesActive ? 'text-white' : 'text-[#C2410C]'}`} />
              <span className="font-mono uppercase tracking-wider text-[10px] sm:text-[11px] font-bold">
                PDF's &amp; Certámenes
              </span>
            </button>
          )}

          {/* Leaderboard Button */}
          {onOpenLeaderboard && (
            <button
              onClick={onOpenLeaderboard}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border text-xs font-bold transition shadow-xs ${
                isLeaderboardActive
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-[#FFF7ED] hover:bg-[#FFEAD5] text-[#C2410C] border-[#FDBA74]'
              }`}
              title="Ver Tabla de Clasificación, Racha y Logros"
            >
              <Trophy className="w-4 h-4 text-[#FDBA74]" />
              <div className="flex items-center gap-1.5 font-mono">
                <span>Lvl {userLevel}</span>
                <span className="text-[#D5D2CE]">•</span>
                <span className="flex items-center gap-0.5 text-[#C2410C]">
                  <Zap className="w-3 h-3 fill-current" />
                  {userXP} XP
                </span>
                <span className="text-[#D5D2CE] hidden md:inline">•</span>
                <span className="hidden md:flex items-center gap-0.5 text-[#EF4444]">
                  <Flame className="w-3 h-3 fill-current" />
                  {streakDays}d
                </span>
              </div>
            </button>
          )}

          {/* Progress Bar */}
          <div className="hidden sm:flex flex-col items-end min-w-[140px]">
            <div className="flex items-center gap-1.5 text-xs text-[#4A4742] font-semibold mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#C2410C]" />
              <span>{completedCount}/{totalCount} ({progressPercent}%)</span>
            </div>
            <div className="w-36 h-2 bg-[#E5E2DE] rounded-full overflow-hidden p-0.5 border border-[#D5D2CE]">
              <div
                className="h-full bg-gradient-to-r from-[#C2410C] to-[#EA580C] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {completedCount === totalCount && (
            <span className="hidden xl:flex items-center gap-1.5 px-3 py-1 bg-[#ECFDF5] border border-[#10B981] text-[#065F46] rounded-full text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#10B981]" />
              <span>Completado</span>
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

