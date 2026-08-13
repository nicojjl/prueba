import React, { useState, useEffect } from 'react';
import { CourseItem, Exercise } from '../types';
import {
  Zap,
  Terminal,
  GraduationCap,
  ArrowRight,
  Clock,
  Thermometer,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

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
  // Live Santiago de Chile Time State
  const [santiagoTime, setSantiagoTime] = useState<string>('');

  // Live Valparaíso Weather State
  const [valparaisoTemp, setValparaisoTemp] = useState<string>('Cargando...');

  // Santiago Time Interval Effect
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('es-CL', {
          timeZone: 'America/Santiago',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        setSantiagoTime(formatter.format(now));
      } catch (e) {
        const now = new Date();
        setSantiagoTime(now.toLocaleTimeString('es-CL'));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Valparaíso Temperature Fetch Effect (Open-Meteo API)
  useEffect(() => {
    const fetchValparaisoWeather = async () => {
      try {
        // Valparaíso coordinates: latitude -33.0472, longitude -71.6127
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-33.0472&longitude=-71.6127&current_weather=true'
        );
        if (!res.ok) throw new Error('Weather API failed');
        const data = await res.json();
        if (data && data.current_weather && typeof data.current_weather.temperature === 'number') {
          const temp = Math.round(data.current_weather.temperature);
          setValparaisoTemp(`${temp}°C`);
        } else {
          setValparaisoTemp('15°C');
        }
      } catch (err) {
        setValparaisoTemp('15°C (Est.)');
      }
    };

    fetchValparaisoWeather();
    const weatherInterval = setInterval(fetchValparaisoWeather, 10 * 60 * 1000);
    return () => clearInterval(weatherInterval);
  }, []);

  // Stats calculation
  const totalClasses = courses.length;
  const completedClassesCount = completedItemIds.length;

  return (
    <div className="flex-1 bg-white text-[#1A1A1A] flex flex-col justify-between overflow-y-auto p-6 sm:p-10 lg:p-16 relative selection:bg-[#C2410C] selection:text-white">
      {/* Main Home Content Stage */}
      <div className="max-w-6xl mx-auto w-full space-y-12 my-auto">
        {/* Minimal Header Title & Tagline */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plataforma Educativa de Algoritmos &amp; Programación C</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#1A1A1A] tracking-tight leading-tight">
            Algorítmica &amp; Complejidad
          </h1>

          <p className="text-base sm:text-lg text-[#4A4742] leading-relaxed max-w-2xl mx-auto font-sans">
            Selecciona el módulo o curso al que deseas ingresar para comenzar tu sesión de aprendizaje interactivo.
          </p>
        </div>

        {/* 3 Main Entry Tiles / Viñetas Centradas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {/* TILE 1: ALGORITMOS */}
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => onOpenVisualizer && onOpenVisualizer()}
            className="bg-white border-2 border-[#E5E2DE] hover:border-[#C2410C] rounded-3xl p-8 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-6 relative overflow-hidden"
          >
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] border border-[#6EE7B7] flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 fill-current" />
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
            className="bg-white border-2 border-[#E5E2DE] hover:border-[#C2410C] rounded-3xl p-8 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-6 relative overflow-hidden"
          >
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74] flex items-center justify-center text-[#C2410C] group-hover:scale-110 transition-transform">
                <Terminal className="w-7 h-7" />
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
            className="bg-white border-2 border-[#E5E2DE] hover:border-[#C2410C] rounded-3xl p-8 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group space-y-6 relative overflow-hidden"
          >
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-[#F9F8F6] border border-[#E5E2DE] flex items-center justify-center text-[#1A1A1A] group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7" />
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
      </div>

      {/* DISCREET BOTTOM-LEFT REAL-TIME WIDGET (SANTIAGO TIME & VALPARAÍSO WEATHER) */}
      <div className="pt-12 sm:pt-6">
        <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 px-3.5 py-2 rounded-xl bg-red-50/60 border border-red-200/60 text-red-600 font-mono text-xs shadow-xs">
          {/* Live Santiago de Chile Time */}
          <div className="flex items-center gap-1.5 font-semibold">
            <Clock className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>Santiago de Chile:</span>
            <span className="font-bold">{santiagoTime || '...'}</span>
          </div>

          <span className="hidden sm:inline text-red-300">•</span>

          {/* Live Valparaíso Weather */}
          <div className="flex items-center gap-1.5 font-semibold">
            <Thermometer className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>Valparaíso:</span>
            <span className="font-bold">{valparaisoTemp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
