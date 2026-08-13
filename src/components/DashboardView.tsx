import React from 'react';
import { CourseItem, Exercise } from '../types';
import { Zap, Terminal, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { UpdatesSection } from './UpdatesSection';
import { LiveTelemetryWidget } from './LiveTelemetryWidget';

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
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  courses,
  completedItemIds,
  onSelectClass,
  onOpenVisualizer,
  onOpenCCourse,
  onOpenAlgoCourse,
}) => {
  // Stats calculation
  const totalClasses = courses.length;
  const completedClassesCount = completedItemIds.length;

  return (
    <div className="flex-1 bg-white text-[#1A1A1A] flex flex-col justify-between overflow-y-auto p-4 sm:p-8 lg:p-12 relative selection:bg-[#C2410C] selection:text-white">
      {/* Main Home Content Stage */}
      <div className="max-w-6xl mx-auto w-full space-y-10 my-auto pb-8">
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

        {/* 3 Main Entry Tiles / Viñetas Centradas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TILE 1: ALGORITMOS */}
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => onOpenVisualizer && onOpenVisualizer()}
            className="bg-white border-2 border-[#E5E2DE] hover:border-[#C2410C] rounded-3xl p-7 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-5 relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border border-[#6EE7B7] flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 fill-current" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#6EE7B7]/50 inline-block">
                  Simulaciones en Tiempo Real
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] group-hover:text-[#C2410C] transition-colors">
                  Algoritmos
                </h2>
                <p className="text-xs text-[#4A4742] leading-relaxed">
                  Visualizador interactivo con 14 algoritmos clásicos (Sorting, Grafos, DP, Punteros), pseudocódigo CLRS sincronizado y editor ejecutable en C, C++ y Python.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F2F1EE] flex items-center justify-between text-xs font-bold text-[#C2410C] group-hover:translate-x-1 transition-transform">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                14 Algoritmos Paso a Paso
              </span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* TILE 2: CURSO C PRO */}
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => onOpenCCourse && onOpenCCourse()}
            className="bg-white border-2 border-[#E5E2DE] hover:border-[#C2410C] rounded-3xl p-7 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-5 relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74] flex items-center justify-center text-[#C2410C] group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#C2410C] bg-[#FFF7ED] px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#FDBA74]/50 inline-block">
                  Estándar Kernighan &amp; Ritchie
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] group-hover:text-[#C2410C] transition-colors">
                  Curso C Pro
                </h2>
                <p className="text-xs text-[#4A4742] leading-relaxed">
                  Aprende C moderno desde nivel inicial hasta profesional: sintaxis, tipos de datos, aritmética de punteros, gestión dinámica de memoria Heap y llamadas al sistema.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F2F1EE] flex items-center justify-between text-xs font-bold text-[#C2410C] group-hover:translate-x-1 transition-transform">
              <span>8 Capítulos Integrales</span>
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
            className="bg-white border-2 border-[#E5E2DE] hover:border-[#C2410C] rounded-3xl p-7 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-5 relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DE] flex items-center justify-center text-[#1A1A1A] group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#1A1A1A] bg-[#F2F1EE] px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#E5E2DE] inline-block">
                  Cormen (CLRS) C Edition
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] group-hover:text-[#C2410C] transition-colors">
                  Algorítmica y Complejidad
                </h2>
                <p className="text-xs text-[#4A4742] leading-relaxed">
                  Curso estructurado de 16 clases y talleres, análisis asintótico Big-O, verificación formal de algoritmos y banco de 95 ejercicios en C.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F2F1EE] flex items-center justify-between text-xs font-bold text-[#C2410C] group-hover:translate-x-1 transition-transform">
              <span>16 Clases • {completedClassesCount}/{totalClasses} Completadas</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        </div>

        {/* REAL-TIME TELEMETRY PANEL (Santiago Time, Valparaíso Weather with condition, and Earthquake API) */}
        <LiveTelemetryWidget />

        {/* ANUNCIOS Y NUEVAS ACTUALIZACIONES */}
        <UpdatesSection />
      </div>
    </div>
  );
};
