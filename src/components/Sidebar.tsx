import React from 'react';
import { CourseItem } from '../types';
import { C_COURSE_DATA } from '../data/cCourseData';
import {
  BookOpen,
  Wrench,
  CheckCircle2,
  ChevronRight,
  Bookmark,
  LayoutDashboard,
  Terminal,
  Code,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  items: CourseItem[];
  selectedItemId: string;
  onSelectItem: (id: string) => void;
  completedItemIds: string[];
  isDashboardActive: boolean;
  onOpenDashboard: () => void;
  isCCourseActive: boolean;
  onOpenCCourse: () => void;
  isVisualizerActive: boolean;
  onOpenVisualizer: () => void;
  isAlgoCourseActive?: boolean;
  onOpenAlgoCourse?: () => void;
  selectedCChapterId?: string;
  onSelectCChapter?: (chapterId: string) => void;
  completedCSubtopics?: string[]; // IDs of completed C chapters
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  completedItemIds,
  isDashboardActive,
  onOpenDashboard,
  isCCourseActive,
  onOpenCCourse,
  isVisualizerActive,
  onOpenVisualizer,
  isAlgoCourseActive = false,
  onOpenAlgoCourse,
  selectedCChapterId = 'cap-1',
  onSelectCChapter,
  completedCSubtopics = [],
}) => {
  return (
    <aside className="w-full lg:w-80 h-[45vh] lg:h-auto max-h-[calc(100vh-4rem)] bg-[#F9F8F6] border-b lg:border-b-0 lg:border-r border-[#E5E2DE] text-[#1A1A1A] flex flex-col shrink-0 overflow-hidden">
      {/* Top Navigation Switcher */}
      <div className="p-3 sm:p-4 border-b border-[#E5E2DE] bg-white shrink-0 space-y-2">
        {/* Volver al Menú Principal */}
        <button
          onClick={onOpenDashboard}
          className="w-full p-2.5 rounded-xl border border-[#E5E2DE] bg-[#F9F8F6] hover:bg-[#F2F1EE] text-[#4A4742] hover:text-[#1A1A1A] transition-all flex items-center justify-center gap-2 text-xs font-semibold"
          title="Regresar al Inicio / Menú Principal"
        >
          <LayoutDashboard className="w-4 h-4 text-[#C2410C]" />
          <span>Volver al Menú Principal</span>
        </button>

        <button
          onClick={onOpenVisualizer}
          className={`w-full p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
            isVisualizerActive
              ? 'bg-[#10B981] text-white border-[#10B981] shadow-xs'
              : 'bg-[#ECFDF5] hover:bg-[#D1FAE5] border-[#6EE7B7] text-[#065F46]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg ${isVisualizerActive ? 'bg-white text-[#10B981]' : 'bg-[#10B981] text-white'}`}>
              <Code className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-serif font-bold block leading-tight">
                Visualizador de Algoritmos
              </span>
              <span className={`text-[10px] font-mono block ${isVisualizerActive ? 'text-white/90' : 'text-[#047857]'}`}>
                34 Algoritmos Interactivos
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 opacity-60" />
        </button>

        <button
          onClick={onOpenCCourse}
          className={`w-full p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
            isCCourseActive
              ? 'bg-[#C2410C] text-white border-[#C2410C] shadow-xs'
              : 'bg-[#FFF7ED] hover:bg-[#FFEAD5] border-[#FDBA74] text-[#C2410C]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg ${isCCourseActive ? 'bg-white text-[#C2410C]' : 'bg-[#C2410C] text-white'}`}>
              <Terminal className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-serif font-bold block leading-tight">
                Curso C Pro (K&amp;R 8 Caps)
              </span>
              <span className={`text-[10px] font-mono block ${isCCourseActive ? 'text-white/90' : 'text-[#C2410C]'}`}>
                8 Capítulos Integrales
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 opacity-60" />
        </button>

        <button
          onClick={() => {
            if (onOpenAlgoCourse) onOpenAlgoCourse();
          }}
          className={`w-full p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
            isAlgoCourseActive
              ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
              : 'bg-[#F9F8F6] hover:bg-[#F2F1EE] border-[#E5E2DE] text-[#1A1A1A]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg ${isAlgoCourseActive ? 'bg-[#C2410C] text-white' : 'bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74]'}`}>
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-serif font-bold block leading-tight">
                Curso Algorítmica (CLRS)
              </span>
              <span className={`text-[10px] font-mono block ${isAlgoCourseActive ? 'text-[#FDBA74]' : 'text-[#C2410C]'}`}>
                16 Clases &amp; 19 Módulos
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 opacity-60" />
        </button>
      </div>

      {/* Course Title Header */}
      <div className="p-3 sm:p-4 border-b border-[#E5E2DE] bg-[#F9F8F6] shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8882] block">
          {isVisualizerActive ? 'Modo Visualizador de Algoritmos' : isCCourseActive ? 'Capítulos del Curso Lenguaje C (K&R):' : 'Lecciones de Algorítmica (CLRS):'}
        </span>
      </div>

      {/* Course List */}
      <div className="overflow-y-auto flex-1 min-h-0 p-3 space-y-2 scroll-smooth">
        {isCCourseActive ? (
          /* 8 Chapters List */
          C_COURSE_DATA.map((chapter) => {
            const isSelectedChapter = chapter.id === selectedCChapterId;
            const isChapterCompleted = completedCSubtopics.includes(chapter.id);

            return (
              <button
                key={chapter.id}
                onClick={() => onSelectCChapter && onSelectCChapter(chapter.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-start gap-3 group ${
                  isSelectedChapter
                    ? 'bg-white border-[#FDBA74] text-[#C2410C] font-semibold shadow-xs'
                    : 'bg-white/60 hover:bg-white border-[#E5E2DE] text-[#4A4742]'
                }`}
              >
                <div className="mt-0.5 text-base shrink-0">
                  {isChapterCompleted ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#10B981]" />
                  ) : (
                    <span>{chapter.icon}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74]">
                      Capítulo {chapter.chapterNumber}
                    </span>
                    <span className="text-[10px] text-[#8C8882] font-mono">
                      {chapter.exercises?.length || 2} ej.
                    </span>
                  </div>

                  <h3
                    className={`text-xs font-serif ${
                      isSelectedChapter ? 'font-bold text-[#1A1A1A] text-sm' : 'text-[#4A4742]'
                    } truncate`}
                  >
                    {chapter.title.split(':')[1] || chapter.title}
                  </h3>

                  <p className="text-[10px] text-[#8C8882] truncate mt-0.5">
                    {chapter.subtitle}
                  </p>
                </div>

                {isSelectedChapter ? (
                  <span className="w-2 h-2 rounded-full bg-[#C2410C] self-center shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#C5C2BD] shrink-0 self-center transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            );
          })
        ) : (
          /* Algorítmica Course Items */
          items.map((item) => {
            const isSelected = item.id === selectedItemId;
            const isCompleted = completedItemIds.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 group flex items-start gap-3 ${
                  isSelected
                    ? item.type === 'workshop'
                      ? 'bg-[#FFF7ED] border-[#FDBA74] text-[#C2410C] font-semibold shadow-xs'
                      : 'bg-white border-[#E5E2DE] text-[#1A1A1A] font-semibold shadow-xs'
                    : 'bg-transparent hover:bg-[#F2F1EE] border-transparent text-[#8C8882]'
                }`}
              >
                {/* Type Icon / Completed status */}
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  ) : item.type === 'workshop' ? (
                    <Wrench className="w-4 h-4 text-[#C2410C]" />
                  ) : (
                    <BookOpen
                      className={`w-4 h-4 ${isSelected ? 'text-[#C2410C]' : 'text-[#8C8882]'}`}
                    />
                  )}
                </div>

                {/* Title & Metadata */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        item.type === 'workshop'
                          ? 'bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74]'
                          : item.type === 'review'
                          ? 'bg-stone-200 text-stone-700 border border-stone-300'
                          : 'bg-[#F2F1EE] text-[#4A4742] border border-[#E5E2DE]'
                      }`}
                    >
                      {item.type === 'workshop'
                        ? 'Taller'
                        : item.type === 'review'
                        ? 'Repaso'
                        : `Clase ${item.number}`}
                    </span>
                    <span className="text-[10px] text-[#8C8882] font-mono">
                      {item.durationMinutes} min
                    </span>
                  </div>

                  <h3
                    className={`text-xs font-serif ${
                      isSelected
                        ? 'text-[#1A1A1A] font-bold text-sm'
                        : 'text-[#4A4742] group-hover:text-[#1A1A1A]'
                    } truncate`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-[#8C8882] truncate mt-0.5">{item.topic}</p>

                  <div className="flex items-center gap-1 text-[10px] text-[#8C8882] mt-1.5 font-mono">
                    <Bookmark className="w-3 h-3 text-[#C2410C] shrink-0" />
                    <span className="truncate">{item.cormenChapter}</span>
                  </div>
                </div>

                {isSelected ? (
                  <span className="w-2 h-2 bg-[#C2410C] rounded-full shrink-0 self-center" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#C5C2BD] shrink-0 self-center transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
