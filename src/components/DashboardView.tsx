import React from 'react';
import { CourseItem, Exercise } from '../types';
import { Zap, Terminal, GraduationCap, ArrowRight, Sparkles, Trophy, Flame, Award, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { UpdatesSection } from './UpdatesSection';
import { LiveTelemetryWidget } from './LiveTelemetryWidget';
import { CertamenesSection } from './CertamenesSection';

interface DashboardViewProps {
  courses: CourseItem[];
  completedItemIds: string[];
  solvedExerciseIds: string[];
  onSelectClass: (classId: string, tab?: 'theory' | 'exercises') => void;
  onOpenGlobalExercise: (exercise: Exercise) => void;
  onSelectCChapter?: (chapterId: string) => void;
  onOpenVisualizer?: () => void;
  onOpenCCourse?: () => void;
  onOpenAlgoCourse?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenCertamenes?: () => void;
  userXP?: number;
  userLevel?: number;
  streakDays?: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  courses,
  completedItemIds,
  onSelectClass,
  onOpenVisualizer,
  onOpenCCourse,
  onOpenAlgoCourse,
  onOpenLeaderboard,
  onOpenCertamenes,
  userXP = 0,
  userLevel = 1,
  streakDays = 1,
}) => {
  // Stats calculation
  const totalClasses = courses.length;
  const completedClassesCount = completedItemIds.length;

  const handleCertamenesClick = () => {
    if (onOpenCertamenes) {
      onOpenCertamenes();
    } else {
      const el = document.getElementById('certamenes-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex-1 bg-white text-[#1A1A1A] flex flex-col overflow-y-auto p-4 sm:p-8 lg:p-12 relative selection:bg-[#C2410C] selection:text-white">
      {/* Main Home Content Stage */}
      <div className="max-w-6xl mx-auto w-full space-y-10 pb-8">
        {/* Minimal Header Title & Tagline */}
        <div className="text-center space-y-3 max-w-3xl mx-auto pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plataforma Educativa de Algoritmos &amp; Programación C</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight leading-tight">
            Algorítmica &amp; Complejidad
          </h1>

          <p className="text-sm sm:text-base text-[#4A4742] leading-relaxed max-w-2xl mx-auto font-sans">
            Selecciona el módulo o curso al que deseas ingresar para comenzar tu sesión de aprendizaje interactivo.
          </p>
        </div>

        {/* 5 Main Entry Tiles / Viñetas Centradas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {/* TILE 1: ALGORITMOS */}
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => onOpenVisualizer && onOpenVisualizer()}
            className="bg-white border-2 border-[#E5E2DE] hover:border-[#C2410C] rounded-3xl p-5 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-4 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#ECFDF5] border border-[#6EE7B7] flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 fill-current" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#6EE7B7]/50 inline-block">
                  Simulaciones en Vivo
                </span>
                <h2 className="text-lg font-serif font-bold text-[#1A1A1A] group-hover:text-[#C2410C] transition-colors">
                  Algoritmos
                </h2>
                <p className="text-xs text-[#4A4742] leading-relaxed">
                  14 Algoritmos interactivos paso a paso, pseudocódigo CLRS e inspector de variables.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F2F1EE] flex items-center justify-between text-xs font-bold text-[#C2410C] group-hover:translate-x-1 transition-transform">
              <span className="flex items-center gap-1.5 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                14 Algoritmos
              </span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* TILE 2: CURSO C PRO */}
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => onOpenCCourse && onOpenCCourse()}
            className="bg-white border-2 border-[#E5E2DE] hover:border-[#C2410C] rounded-3xl p-5 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-4 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74] flex items-center justify-center text-[#C2410C] group-hover:scale-110 transition-transform">
                <Terminal className="w-5 h-5" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-[#C2410C] bg-[#FFF7ED] px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#FDBA74]/50 inline-block">
                  Estándar K&amp;R
                </span>
                <h2 className="text-lg font-serif font-bold text-[#1A1A1A] group-hover:text-[#C2410C] transition-colors">
                  Curso C Pro
                </h2>
                <p className="text-xs text-[#4A4742] leading-relaxed">
                  8 Capítulos integrales desde sintaxis básica hasta aritmética de punteros y Heap.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F2F1EE] flex items-center justify-between text-xs font-bold text-[#C2410C] group-hover:translate-x-1 transition-transform">
              <span className="text-[11px]">8 Capítulos K&amp;R</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* TILE 3: ALGORÍTMICA Y COMPLEJIDAD */}
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => {
              if (onOpenAlgoCourse) onOpenAlgoCourse();
              else onSelectClass('clase-1', 'theory');
            }}
            className="bg-white border-2 border-[#E5E2DE] hover:border-[#C2410C] rounded-3xl p-5 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-4 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DE] flex items-center justify-center text-[#1A1A1A] group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-[#1A1A1A] bg-[#F2F1EE] px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#E5E2DE] inline-block">
                  Cormen CLRS
                </span>
                <h2 className="text-lg font-serif font-bold text-[#1A1A1A] group-hover:text-[#C2410C] transition-colors">
                  Algorítmica CLRS
                </h2>
                <p className="text-xs text-[#4A4742] leading-relaxed">
                  16 Clases teóricas, análisis asintótico Big-O y banco de 95 ejercicios prácticos.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F2F1EE] flex items-center justify-between text-xs font-bold text-[#C2410C] group-hover:translate-x-1 transition-transform">
              <span className="text-[11px]">{completedClassesCount}/{totalClasses} Completadas</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* TILE 4: CERTÁMENES Y PAUTAS USM (DESTACADO) */}
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={handleCertamenesClick}
            className="bg-[#FFF7ED] border-2 border-[#C2410C] rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-4 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#C2410C] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <FileText className="w-5 h-5" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-[#C2410C] bg-white px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#FDBA74] inline-block">
                  Descargar / Ver PDF
                </span>
                <h2 className="text-lg font-serif font-bold text-[#1A1A1A] group-hover:text-[#C2410C] transition-colors">
                  Certámenes &amp; PDF's
                </h2>
                <p className="text-xs text-[#4A4742] leading-relaxed">
                  6 Pruebas reales con soluciones en C99, pautas oficiales y exportación directa en formato PDF.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#FDBA74] flex items-center justify-between text-xs font-bold text-[#C2410C] group-hover:translate-x-1 transition-transform">
              <span className="text-[11px] font-mono font-bold">Abrir Banco de PDF's &amp; Pruebas</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* TILE 5: LEADERBOARD & XP LOGROS */}
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => onOpenLeaderboard && onOpenLeaderboard()}
            className="bg-[#FFF7ED]/60 border-2 border-[#FDBA74] hover:border-[#C2410C] rounded-3xl p-5 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-4 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#1A1A1A] border border-[#33312E] flex items-center justify-center text-[#FDBA74] group-hover:scale-110 transition-transform shadow-xs">
                <Trophy className="w-5 h-5" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-[#C2410C] bg-white px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#FDBA74] inline-flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#EF4444] fill-current" />
                  Racha: {streakDays}d • Lvl {userLevel}
                </span>
                <h2 className="text-lg font-serif font-bold text-[#1A1A1A] group-hover:text-[#C2410C] transition-colors">
                  Ránking &amp; Logros
                </h2>
                <p className="text-xs text-[#4A4742] leading-relaxed">
                  Compite en la tabla de clasificación con tus puntos XP ({userXP} XP).
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#FDBA74]/50 flex items-center justify-between text-xs font-bold text-[#C2410C] group-hover:translate-x-1 transition-transform">
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Award className="w-4 h-4 text-[#C2410C]" />
                Clasificación
              </span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        </div>

        {/* CERTÁMENES DE ALGORÍTMICA (USM / ELO320) */}
        <div id="certamenes-section" className="pt-4 scroll-mt-6">
          <CertamenesSection />
        </div>

        {/* REAL-TIME TELEMETRY PANEL (Santiago Time, Valparaíso Weather with condition, and Earthquake API) */}
        <LiveTelemetryWidget />

        {/* ANUNCIOS Y NUEVAS ACTUALIZACIONES */}
        <UpdatesSection />
      </div>
    </div>
  );
};


