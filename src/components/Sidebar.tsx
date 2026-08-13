import React, { useState, useMemo } from 'react';
import { CourseItem, AlgoCategory } from '../types';
import { C_COURSE_DATA } from '../data/cCourseData';
import { ALGORITHMS_DATA, ALGO_CATEGORIES } from '../data/algorithmsData';
import {
  BookOpen,
  Wrench,
  CheckCircle2,
  ChevronRight,
  Bookmark,
  LayoutDashboard,
  Terminal,
  Code,
  GraduationCap,
  Trophy,
  FileText,
  Search,
  Zap,
  Sparkles,
  X,
  Filter
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
  isLeaderboardActive?: boolean;
  onOpenLeaderboard?: () => void;
  isAlgoCourseActive?: boolean;
  onOpenAlgoCourse?: () => void;
  isCertamenesActive?: boolean;
  onOpenCertamenes?: () => void;
  selectedCChapterId?: string;
  onSelectCChapter?: (chapterId: string) => void;
  completedCSubtopics?: string[]; // IDs of completed C chapters
  selectedAlgoId?: string;
  onSelectAlgorithm?: (algoId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = React.memo(({
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
  isLeaderboardActive = false,
  onOpenLeaderboard,
  isAlgoCourseActive = false,
  onOpenAlgoCourse,
  isCertamenesActive = false,
  onOpenCertamenes,
  selectedCChapterId = 'cap-1',
  onSelectCChapter,
  completedCSubtopics = [],
  selectedAlgoId = 'merge-sort',
  onSelectAlgorithm,
}) => {
  // Visualizer search and category filter state inside Sidebar
  const [algoSearchQuery, setAlgoSearchQuery] = useState('');
  const [sidebarAlgoCategory, setSidebarAlgoCategory] = useState<AlgoCategory | 'todas'>('todas');

  const filteredSidebarAlgos = useMemo(() => {
    const q = algoSearchQuery.toLowerCase().trim();
    return ALGORITHMS_DATA.filter((algo) => {
      const matchCat = sidebarAlgoCategory === 'todas' || algo.category === sidebarAlgoCategory;
      const matchSearch =
        !q ||
        algo.name.toLowerCase().includes(q) ||
        algo.subtitle.toLowerCase().includes(q) ||
        algo.categoryLabel.toLowerCase().includes(q) ||
        algo.complexity?.timeWorst?.toLowerCase().includes(q) ||
        algo.complexity?.timeAverage?.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [sidebarAlgoCategory, algoSearchQuery]);
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

        {/* Tabla de Clasificación & Logros */}
        {onOpenLeaderboard && (
          <button
            onClick={onOpenLeaderboard}
            className={`w-full p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
              isLeaderboardActive
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                : 'bg-[#FFF7ED] hover:bg-[#FFEAD5] border-[#FDBA74] text-[#C2410C]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 rounded-lg ${isLeaderboardActive ? 'bg-white text-[#1A1A1A]' : 'bg-[#C2410C] text-white'}`}>
                <Trophy className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-serif font-bold block leading-tight">
                  Ránking &amp; Logros
                </span>
                <span className={`text-[10px] font-mono block ${isLeaderboardActive ? 'text-white/90' : 'text-[#C2410C]'}`}>
                  Tabla de Posiciones
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-60" />
          </button>
        )}

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

        <button
          onClick={() => {
            if (onOpenCertamenes) {
              onOpenCertamenes();
            } else {
              onOpenDashboard();
              setTimeout(() => {
                document.getElementById('certamenes-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }}
          className={`w-full p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
            isCertamenesActive
              ? 'border-[#C2410C] bg-[#C2410C] text-white shadow-xs'
              : 'border-[#FDBA74] bg-[#FFF7ED] hover:bg-[#FFEAD5] text-[#C2410C]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg ${isCertamenesActive ? 'bg-white text-[#C2410C]' : 'bg-[#C2410C] text-white'}`}>
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-serif font-bold block leading-tight">
                Certámenes &amp; PDF's USM
              </span>
              <span className={`text-[10px] font-mono block ${isCertamenesActive ? 'text-white/80' : 'text-[#C2410C]'}`}>
                6 Pruebas • Pautas C99 &amp; PDF
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 opacity-60" />
        </button>
      </div>

      {/* Course / Visualizer Title Header */}
      <div className="p-3 sm:p-4 border-b border-[#E5E2DE] bg-[#F9F8F6] shrink-0 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8882] block">
            {isVisualizerActive
              ? 'Catálogo de Algoritmos (34):'
              : isCCourseActive
              ? 'Capítulos del Curso Lenguaje C (K&R):'
              : 'Lecciones de Algorítmica (CLRS):'}
          </span>
          {isVisualizerActive && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#6EE7B7] font-bold">
              {filteredSidebarAlgos.length} / {ALGORITHMS_DATA.length}
            </span>
          )}
        </div>

        {/* Visualizer Search & Category Filter Controls */}
        {isVisualizerActive && (
          <div className="space-y-2">
            {/* Search input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8C8882] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={algoSearchQuery}
                onChange={(e) => setAlgoSearchQuery(e.target.value)}
                placeholder="Filtrar algoritmo, O(n)..."
                className="w-full bg-white border border-[#E5E2DE] focus:border-[#10B981] rounded-xl pl-8 pr-7 py-1.5 text-xs text-[#1A1A1A] outline-none transition-colors"
              />
              {algoSearchQuery && (
                <button
                  onClick={() => setAlgoSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8C8882] hover:text-[#1A1A1A] p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[10px]">
              <button
                onClick={() => setSidebarAlgoCategory('todas')}
                className={`px-2 py-1 rounded-lg shrink-0 font-medium transition cursor-pointer ${
                  sidebarAlgoCategory === 'todas'
                    ? 'bg-[#10B981] text-white font-bold'
                    : 'bg-white text-[#666] hover:bg-[#F2F1EE] border border-[#E5E2DE]'
                }`}
              >
                Todas ({ALGORITHMS_DATA.length})
              </button>
              {ALGO_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSidebarAlgoCategory(cat.id)}
                  className={`px-2 py-1 rounded-lg shrink-0 font-medium transition flex items-center gap-1 cursor-pointer ${
                    sidebarAlgoCategory === cat.id
                      ? 'bg-[#10B981] text-white font-bold'
                      : 'bg-white text-[#666] hover:bg-[#F2F1EE] border border-[#E5E2DE]'
                  }`}
                  title={cat.label}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Course / Algorithm List */}
      <div className="overflow-y-auto flex-1 min-h-0 p-3 space-y-2 scroll-smooth">
        {isVisualizerActive ? (
          /* Visualizer Algorithms List */
          filteredSidebarAlgos.length === 0 ? (
            <div className="p-6 text-center text-[#8C8882] space-y-2">
              <p className="text-xs">No se encontraron algoritmos con ese filtro.</p>
              <button
                onClick={() => {
                  setAlgoSearchQuery('');
                  setSidebarAlgoCategory('todas');
                }}
                className="text-xs font-bold text-[#10B981] hover:underline"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            filteredSidebarAlgos.map((algo) => {
              const isSelectedAlgo = algo.id === selectedAlgoId;

              return (
                <button
                  key={algo.id}
                  onClick={() => onSelectAlgorithm && onSelectAlgorithm(algo.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-2.5 group cursor-pointer ${
                    isSelectedAlgo
                      ? 'bg-[#ECFDF5] border-[#10B981] text-[#065F46] font-semibold shadow-xs ring-1 ring-[#10B981]/30'
                      : 'bg-white hover:bg-[#F9F8F6] border-[#E5E2DE] text-[#4A4742]'
                  }`}
                >
                  {/* Algorithm Icon */}
                  <div className="mt-0.5 text-base shrink-0 select-none">
                    <span>{algo.icon}</span>
                  </div>

                  {/* Title & Metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider bg-[#F2F1EE] text-[#4A4742] border border-[#E5E2DE]">
                        {algo.categoryLabel}
                      </span>
                      {algo.complexity?.timeWorst && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white text-[#047857] border border-[#A7F3D0] font-bold">
                          {algo.complexity.timeWorst}
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-xs font-serif ${
                        isSelectedAlgo ? 'font-bold text-[#064E3B] text-sm' : 'text-[#1A1A1A]'
                      } truncate`}
                    >
                      {algo.name}
                    </h3>

                    <p className="text-[10px] text-[#8C8882] truncate mt-0.5">
                      {algo.subtitle}
                    </p>
                  </div>

                  {isSelectedAlgo ? (
                    <span className="w-2 h-2 rounded-full bg-[#10B981] self-center shrink-0 animate-pulse" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#C5C2BD] shrink-0 self-center transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              );
            })
          )
        ) : isCCourseActive ? (
          /* 8 Chapters List */
          C_COURSE_DATA.map((chapter) => {
            const isSelectedChapter = chapter.id === selectedCChapterId;
            const isChapterCompleted = completedCSubtopics.includes(chapter.id);

            return (
              <button
                key={chapter.id}
                onClick={() => onSelectCChapter && onSelectCChapter(chapter.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-start gap-3 group cursor-pointer ${
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
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 group flex items-start gap-3 cursor-pointer ${
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
});

Sidebar.displayName = 'Sidebar';

