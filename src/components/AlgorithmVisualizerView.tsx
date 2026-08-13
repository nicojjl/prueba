import React, { useState, useRef, useEffect, useMemo } from 'react';
import { AlgorithmItem, AlgoCategory } from '../types';
import { ALGORITHMS_DATA, ALGO_CATEGORIES } from '../data/algorithmsData';
import { AlgorithmVisualizer } from './AlgorithmVisualizer';
import {
  MERGE_SORT_PSEUDOCODE,
  MERGE_SORT_PRESETS,
  generateMergeSortSteps,
  DIJKSTRA_PSEUDOCODE,
  DIJKSTRA_PRESETS,
  generateDijkstraSteps,
  KNAPSACK_PSEUDOCODE,
  KNAPSACK_PRESETS,
  generateKnapsackSteps
} from '../data/visualizerAlgorithmDrivers';
import {
  Search,
  Code,
  Terminal,
  Zap,
  Lightbulb,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  BarChart2,
  ArrowLeft,
  Play,
  RotateCcw,
  Eye,
  FileCode,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { CSyntaxHighlighter } from './CSyntaxHighlighter';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ExportSummaryButton } from './ExportSummaryButton';

interface AlgorithmVisualizerViewProps {
  selectedAlgoId?: string;
  onSelectAlgorithm?: (algoId: string) => void;
}

// Descriptions for categories on the landing page
const CATEGORY_DESCRIPTIONS: Record<AlgoCategory, string> = {
  conceptos: 'Aprende los fundamentos de análisis de algoritmos, técnicas de dos punteros y ventanas deslizantes para optimización.',
  estructuras: 'Explora el funcionamiento interno de pilas, colas y estructuras lineales fundamentales en memoria.',
  ordenamiento: 'Simula los algoritmos clásicos de ordenación (Bubble, Selection, Insertion, Quick Sort, Merge Sort) con sus divisiones.',
  busqueda_grafos: 'Visualiza recorridos BFS, caminos mínimos con Dijkstra y exploración de grafos complejos paso a paso.',
  dp_backtracking: 'Descompón subproblemas superpuestos con Programación Dinámica (Mochila 0/1) y explora espacios de estados (N-Reinas).'
};

export const AlgorithmVisualizerView: React.FC<AlgorithmVisualizerViewProps> = ({
  selectedAlgoId: propSelectedAlgoId,
  onSelectAlgorithm: propOnSelectAlgorithm,
}) => {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState<'landing' | 'workspace'>('workspace');
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>(propSelectedAlgoId || 'merge-sort');
  const [activeCategory, setActiveCategory] = useState<AlgoCategory | 'todas'>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (propSelectedAlgoId && propSelectedAlgoId !== selectedAlgoId) {
      setSelectedAlgoId(propSelectedAlgoId);
      setViewMode('workspace');
      setActiveTab('simulation');
    }
  }, [propSelectedAlgoId]);

  // Workspace Tabs: Progressive disclosure
  const [activeTab, setActiveTab] = useState<'simulation' | 'pseudocode' | 'complexity' | 'code'>('simulation');

  // Code Editor state
  const [codeLang, setCodeLang] = useState<'c' | 'cpp' | 'python'>('c');
  const [editorMode, setEditorMode] = useState<'editor' | 'highlighted'>('editor');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [userCodes, setUserCodes] = useState<Record<string, string>>({});

  // Category Tabs Scroll Container Ref
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState<boolean>(false);
  const [showRightScroll, setShowRightScroll] = useState<boolean>(true);

  const selectedAlgo: AlgorithmItem = useMemo(
    () => ALGORITHMS_DATA.find((a) => a.id === selectedAlgoId) || ALGORITHMS_DATA[0],
    [selectedAlgoId]
  );

  // Current Code for the active algorithm and language
  const codeKey = `${selectedAlgo.id}_${codeLang}`;
  const defaultCodeForLang = selectedAlgo.codeImplementations?.[codeLang] || '// Código no disponible';
  const currentCode = userCodes[codeKey] !== undefined ? userCodes[codeKey] : defaultCodeForLang;

  // Filter algorithms
  const filteredAlgos = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ALGORITHMS_DATA.filter((algo) => {
      const matchesCategory = activeCategory === 'todas' || algo.category === activeCategory;
      const matchesSearch =
        !q ||
        algo.name.toLowerCase().includes(q) ||
        algo.subtitle.toLowerCase().includes(q) ||
        algo.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Check scroll position for categories tab bar
  const checkScrollPosition = () => {
    if (!categoryScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
    setShowLeftScroll(scrollLeft > 10);
    setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [viewMode]);

  const handleScrollCategories = (direction: 'left' | 'right') => {
    if (!categoryScrollRef.current) return;
    const scrollAmount = 240;
    categoryScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(checkScrollPosition, 300);
  };

  const handleSelectAlgorithm = (algoId: string) => {
    setSelectedAlgoId(algoId);
    setViewMode('workspace');
    setActiveTab('simulation');
    if (propOnSelectAlgorithm) {
      propOnSelectAlgorithm(algoId);
    }
  };

  const handleSelectCategoryFromLanding = (catId: AlgoCategory) => {
    setActiveCategory(catId);
    setViewMode('workspace');
  };

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCodeChange = (newVal: string) => {
    setUserCodes((prev) => ({
      ...prev,
      [codeKey]: newVal
    }));
  };

  const handleResetCode = () => {
    setUserCodes((prev) => {
      const copy = { ...prev };
      delete copy[codeKey];
      return copy;
    });
  };

  const handleKeyDownInTextarea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      const newValue = value.substring(0, start) + '    ' + value.substring(end);
      handleCodeChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const renderActiveVisualizer = () => {
    if (selectedAlgo.id === 'merge-sort') {
      return (
        <AlgorithmVisualizer
          key="merge-sort"
          title={selectedAlgo.name}
          subtitle={selectedAlgo.subtitle}
          cormenChapter={selectedAlgo.cormenChapter || 'Capítulo 2.3 (Divide y Vencerás)'}
          categoryLabel={selectedAlgo.categoryLabel}
          pseudocode={MERGE_SORT_PSEUDOCODE}
          presets={MERGE_SORT_PRESETS}
          defaultInput={MERGE_SORT_PRESETS[0].input}
          generateSteps={generateMergeSortSteps}
          visualizerType="array"
        />
      );
    }

    if (selectedAlgo.id === 'dijkstra') {
      return (
        <AlgorithmVisualizer
          key="dijkstra"
          title={selectedAlgo.name}
          subtitle={selectedAlgo.subtitle}
          cormenChapter="Capítulo 24.3 (Rutas Mínimas)"
          categoryLabel={selectedAlgo.categoryLabel}
          pseudocode={DIJKSTRA_PSEUDOCODE}
          presets={DIJKSTRA_PRESETS}
          defaultInput={DIJKSTRA_PRESETS[0].input}
          generateSteps={generateDijkstraSteps}
          visualizerType="graph"
        />
      );
    }

    if (selectedAlgo.id === 'knapsack-dp') {
      return (
        <AlgorithmVisualizer
          key="knapsack-dp"
          title={selectedAlgo.name}
          subtitle={selectedAlgo.subtitle}
          cormenChapter="Capítulo 16 (Programación Dinámica)"
          categoryLabel={selectedAlgo.categoryLabel}
          pseudocode={KNAPSACK_PSEUDOCODE}
          presets={KNAPSACK_PRESETS}
          defaultInput={KNAPSACK_PRESETS[0].input}
          generateSteps={generateKnapsackSteps}
          visualizerType="dp"
        />
      );
    }

    // Fallback driver for all other algorithms
    const fallbackPseudocode =
      selectedAlgo.pseudocode ||
      `// Pseudocódigo CLRS ${selectedAlgo.name}
1. inicio ${selectedAlgo.id}
2. procesar datos en tiempo real
3. verificar condiciones de parada
4. retornar resultado optimizado`;

    const fallbackInput = selectedAlgo.initialVisualData?.defaultArray || [45, 12, 89, 34, 23, 7, 60];

    return (
      <AlgorithmVisualizer
        key={selectedAlgo.id}
        title={selectedAlgo.name}
        subtitle={selectedAlgo.subtitle}
        cormenChapter={selectedAlgo.cormenChapter || 'CLRS Cormen'}
        categoryLabel={selectedAlgo.categoryLabel}
        pseudocode={fallbackPseudocode}
        defaultInput={fallbackInput}
        generateSteps={selectedAlgo.generateSteps}
        allowCustomInput={!['bfs', 'n-queens'].includes(selectedAlgo.id)}
      />
    );
  };

  // ==========================================
  // VIEW 1: LANDING / CATEGORY SELECTION PAGE
  // ==========================================
  if (viewMode === 'landing') {
    return (
      <div className="flex-1 bg-[#F9F8F6] text-[#1A1A1A] overflow-y-auto p-4 sm:p-6 lg:p-10 space-y-10">
        {/* Landing Hero Header */}
        <div className="bg-white border border-[#E5E2DE] rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
            <Zap className="w-80 h-80 text-[#C2410C]" />
          </div>

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold px-3 py-1 bg-[#C2410C] text-white rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CLRS Cormen • Plataforma Interactiva</span>
              </span>
              <span className="text-xs text-[#C2410C] font-semibold font-mono uppercase tracking-wider">
                {ALGORITHMS_DATA.length} Algoritmos Disponibles
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight leading-tight">
              Visualizador Interactivo de Algoritmos
            </h1>

            <p className="text-sm sm:text-base text-[#4A4742] leading-relaxed">
              Selecciona una categoría para explorar algoritmos con simulaciones visuales paso a paso, pseudocódigo sincronizado, análisis de complejidad Big-O y un editor de código ejecutable interactivo en <strong className="text-[#C2410C]">C, C++ y Python</strong>.
            </p>

            {/* Global Quick Search */}
            <div className="pt-2 max-w-xl">
              <div className="relative">
                <Search className="w-5 h-5 text-[#8C8882] absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Buscar algoritmo directo (ej: Merge Sort, Dijkstra, Mochila, Quick)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-[#E5E2DE] rounded-2xl pl-12 pr-4 py-3 text-sm text-[#1A1A1A] placeholder-[#8C8882] focus:outline-none focus:border-[#C2410C] focus:bg-white transition shadow-xs"
                />
              </div>

              {searchQuery && (
                <div className="mt-3 bg-white border border-[#E5E2DE] rounded-2xl p-3 shadow-lg space-y-1 max-h-60 overflow-y-auto">
                  <span className="text-[10px] font-bold text-[#8C8882] uppercase tracking-wider px-2 block">
                    Resultados de búsqueda ({filteredAlgos.length})
                  </span>
                  {filteredAlgos.map((algo) => (
                    <button
                      key={algo.id}
                      onClick={() => handleSelectAlgorithm(algo.id)}
                      className="w-full text-left p-2.5 hover:bg-[#FFF7ED] rounded-xl flex items-center justify-between transition group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{algo.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#C2410C]">
                            {algo.name}
                          </div>
                          <div className="text-[10px] text-[#8C8882]">{algo.categoryLabel}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#8C8882] group-hover:text-[#C2410C]" />
                    </button>
                  ))}
                  {filteredAlgos.length === 0 && (
                    <div className="p-3 text-center text-xs text-[#8C8882]">
                      No se encontraron algoritmos con "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Categories Section Heading */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#C2410C]" />
            <span>Categorías de Algoritmos</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#8C8882]">
            Elige un área de estudio para acceder al listado de simulaciones e implementaciones en código.
          </p>
        </div>

        {/* Large Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALGO_CATEGORIES.map((cat) => {
            const algosInCat = ALGORITHMS_DATA.filter((a) => a.category === cat.id);
            const desc = CATEGORY_DESCRIPTIONS[cat.id] || 'Explora los algoritmos de esta categoría.';

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategoryFromLanding(cat.id)}
                className="bg-white border border-[#E5E2DE] hover:border-[#FDBA74] rounded-3xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-6 group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 bg-[#F9F8F6] border border-[#E5E2DE] text-[#C2410C] rounded-full">
                      {cat.count} Algoritmos
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-serif font-bold text-[#1A1A1A] group-hover:text-[#C2410C] transition-colors">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-[#4A4742] leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Sample Algorithms Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {algosInCat.slice(0, 4).map((a) => (
                      <span
                        key={a.id}
                        className="text-[10px] bg-[#F9F8F6] text-[#4A4742] px-2.5 py-1 rounded-lg border border-[#E5E2DE] font-medium"
                      >
                        {a.name}
                      </span>
                    ))}
                    {algosInCat.length > 4 && (
                      <span className="text-[10px] bg-[#FFF7ED] text-[#C2410C] px-2 py-1 rounded-lg font-bold">
                        +{algosInCat.length - 4} más
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F2F1EE] flex items-center justify-between text-xs font-bold text-[#C2410C] group-hover:translate-x-1 transition-transform">
                  <span>Explorar categoría</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Algorithms Showcase Section */}
        <div className="bg-white border border-[#E5E2DE] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#C2410C]" />
                <span>Algoritmos Destacados del Programa CLRS</span>
              </h3>
              <p className="text-xs text-[#8C8882]">Acceso rápido a los algoritmos con simulación paso a paso avanzada.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ALGORITHMS_DATA.find((a) => a.id === 'merge-sort')!,
              ALGORITHMS_DATA.find((a) => a.id === 'dijkstra')!,
              ALGORITHMS_DATA.find((a) => a.id === 'knapsack-dp')!
            ].map((algo) => (
              <button
                key={algo.id}
                onClick={() => handleSelectAlgorithm(algo.id)}
                className="text-left p-4 bg-[#F9F8F6] hover:bg-[#FFF7ED] border border-[#E5E2DE] hover:border-[#FDBA74] rounded-2xl transition space-y-2 group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{algo.icon}</span>
                    <span className="text-[10px] font-mono font-semibold text-[#C2410C] bg-white px-2 py-0.5 rounded-md border border-[#E5E2DE]">
                      {algo.complexity.timeAverage}
                    </span>
                  </div>

                  <h4 className="text-sm font-serif font-bold text-[#1A1A1A] group-hover:text-[#C2410C]">
                    {algo.name}
                  </h4>
                  <p className="text-xs text-[#8C8882] line-clamp-2">
                    {algo.subtitle}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-[#C2410C]">
                  <span>Abrir Simulador</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: ALGORITHM WORKSPACE & SIMULATOR
  // ==========================================
  return (
    <div className="flex-1 bg-[#F9F8F6] text-[#1A1A1A] overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-[#E5E2DE] rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F9F8F6] hover:bg-[#F2F1EE] border border-[#E5E2DE] rounded-xl text-xs font-bold text-[#1A1A1A] transition"
          >
            <ArrowLeft className="w-4 h-4 text-[#C2410C]" />
            <span>Volver a Categorías</span>
          </button>

          <span className="text-[#C5C2BD]">/</span>

          <span className="text-xs font-semibold text-[#8C8882] flex items-center gap-1.5">
            <span>{selectedAlgo.icon}</span>
            <span className="text-[#1A1A1A] font-serif font-bold">{selectedAlgo.name}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-[#8C8882] font-mono hidden sm:block">
            Capítulo: <strong className="text-[#C2410C]">{selectedAlgo.cormenChapter || 'CLRS Cormen'}</strong>
          </div>

          <ExportSummaryButton
            payload={{
              title: `${selectedAlgo.name}`,
              categoryOrCourse: `Algorítmica & Visualizador - ${selectedAlgo.categoryLabel}`,
              cormenRef: selectedAlgo.cormenChapter || 'Cormen CLRS Edition',
              topicSummary: selectedAlgo.subtitle,
              theoryContent: selectedAlgo.explanationMarkdown,
              codeExampleC: selectedAlgo.codeImplementations?.c,
              complexity: selectedAlgo.complexity,
              analogies: selectedAlgo.analogy ? [{
                title: selectedAlgo.analogy.title,
                concept: selectedAlgo.name,
                analogy: selectedAlgo.analogy.description,
                whyItWorks: selectedAlgo.analogy.realLifeExample,
              }] : undefined,
            }}
          />
        </div>
      </div>

      {/* Category Tabs Bar with Smooth Overflow & Scroll Arrows (PROBLEM 2 FIXED) */}
      <div className="relative bg-white border border-[#E5E2DE] rounded-2xl p-2 shadow-xs flex items-center">
        {/* Left Scroll Arrow */}
        {showLeftScroll && (
          <button
            onClick={() => handleScrollCategories('left')}
            className="absolute left-2 z-10 p-1.5 bg-white/90 hover:bg-white border border-[#E5E2DE] text-[#1A1A1A] rounded-xl shadow-md transition"
            title="Desplazar a la izquierda"
          >
            <ChevronLeft className="w-4 h-4 text-[#C2410C]" />
          </button>
        )}

        {/* Left Fade Gradient Mask */}
        {showLeftScroll && (
          <div className="absolute left-8 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-5 pointer-events-none" />
        )}

        {/* Scrollable Categories Row - Native Scrollbar Hidden via CSS */}
        <div
          ref={categoryScrollRef}
          onScroll={checkScrollPosition}
          className="flex items-center gap-2 overflow-x-auto w-full py-1 px-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <button
            onClick={() => setActiveCategory('todas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-2 border ${
              activeCategory === 'todas'
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                : 'bg-[#F9F8F6] hover:bg-[#F2F1EE] border-[#E5E2DE] text-[#4A4742]'
            }`}
          >
            <span>🌐</span>
            <span>Todas las Categorías</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">
              {ALGORITHMS_DATA.length}
            </span>
          </button>

          {ALGO_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-2 border ${
                activeCategory === cat.id
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                  : 'bg-[#F9F8F6] hover:bg-[#F2F1EE] border-[#E5E2DE] text-[#4A4742]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Right Fade Gradient Mask */}
        {showRightScroll && (
          <div className="absolute right-8 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-5 pointer-events-none" />
        )}

        {/* Right Scroll Arrow */}
        {showRightScroll && (
          <button
            onClick={() => handleScrollCategories('right')}
            className="absolute right-2 z-10 p-1.5 bg-white/90 hover:bg-white border border-[#E5E2DE] text-[#1A1A1A] rounded-xl shadow-md transition"
            title="Desplazar a la derecha"
          >
            <ChevronRight className="w-4 h-4 text-[#C2410C]" />
          </button>
        )}
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Algorithm Picker List */}
        <div className="lg:col-span-4 bg-white border border-[#E5E2DE] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col space-y-4 max-h-[780px]">
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8C8882] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Filtrar algoritmo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2410C] transition"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#8C8882]">
              <span>Mostrando {filteredAlgos.length} de {ALGORITHMS_DATA.length}</span>
              {activeCategory !== 'todas' && (
                <button
                  onClick={() => setActiveCategory('todas')}
                  className="text-[#C2410C] hover:underline font-semibold"
                >
                  Limpiar filtro
                </button>
              )}
            </div>
          </div>

          {/* List Scroll Area */}
          <div className="overflow-y-auto flex-1 space-y-2 pr-1">
            {filteredAlgos.map((algo) => {
              const isSelected = algo.id === selectedAlgoId;
              return (
                <button
                  key={algo.id}
                  onClick={() => setSelectedAlgoId(algo.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 group ${
                    isSelected
                      ? 'bg-[#FFF7ED] border-[#FDBA74] text-[#C2410C] font-semibold shadow-xs'
                      : 'bg-[#F9F8F6]/60 hover:bg-[#F2F1EE] border-[#E5E2DE] text-[#4A4742]'
                  }`}
                >
                  <span className="text-xl mt-0.5 shrink-0">{algo.icon}</span>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-white/80 border border-[#E5E2DE] text-[#4A4742]">
                        {algo.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono text-[#C2410C] font-semibold">
                        {algo.complexity.timeAverage}
                      </span>
                    </div>

                    <h3 className={`text-xs font-serif ${isSelected ? 'font-bold text-[#1A1A1A] text-sm' : 'text-[#1A1A1A]'}`}>
                      {algo.name}
                    </h3>

                    <p className="text-[10px] text-[#8C8882] line-clamp-1 leading-relaxed">
                      {algo.subtitle}
                    </p>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 self-center transition-transform ${isSelected ? 'text-[#C2410C] translate-x-0.5' : 'text-[#C5C2BD]'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Progressive Disclosure Workspace (PROBLEM 4 FIXED) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section Navigation Tabs Bar */}
          <div className="bg-white border border-[#E5E2DE] p-2 rounded-2xl shadow-xs flex flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('simulation')}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === 'simulation'
                  ? 'bg-[#C2410C] text-white shadow-xs'
                  : 'text-[#4A4742] hover:bg-[#F9F8F6] hover:text-[#1A1A1A]'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>1. Simulación</span>
            </button>

            <button
              onClick={() => setActiveTab('pseudocode')}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === 'pseudocode'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-[#4A4742] hover:bg-[#F9F8F6] hover:text-[#1A1A1A]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>2. Pseudocódigo & Teoría</span>
            </button>

            <button
              onClick={() => setActiveTab('complexity')}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === 'complexity'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-[#4A4742] hover:bg-[#F9F8F6] hover:text-[#1A1A1A]'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5 text-[#C2410C]" />
              <span>3. Complejidad</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === 'code'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'text-[#4A4742] hover:bg-[#F9F8F6] hover:text-[#1A1A1A]'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>4. Código Fuente</span>
            </button>
          </div>

          {/* TAB 1: SIMULATION & INTERACTIVE STAGE */}
          {activeTab === 'simulation' && (
            <div className="space-y-6">
              {renderActiveVisualizer()}

              {/* Real Life Analogy Card */}
              <div className="bg-[#FFF7ED] border border-[#FDBA74] p-6 rounded-2xl shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#C2410C] font-bold text-xs uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" />
                  <span>Analogía del Mundo Real</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">
                  {selectedAlgo.analogy.title}
                </h3>

                <p className="text-xs text-[#4A4742] leading-relaxed">
                  {selectedAlgo.analogy.description}
                </p>

                <div className="pt-2 border-t border-[#FDBA74]/40 text-xs text-[#C2410C] font-semibold">
                  <strong>Ejemplo práctico:</strong> {selectedAlgo.analogy.realLifeExample}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PSEUDOCODE & THEORY */}
          {activeTab === 'pseudocode' && (
            <div className="space-y-6">
              <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#C2410C]" />
                  <span>Explicación Teórica & Lógica del Algoritmo</span>
                </h3>

                <div className="text-xs text-[#33312E] leading-relaxed">
                  <MarkdownRenderer content={selectedAlgo.explanationMarkdown} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMPLEXITY ANALYSIS */}
          {activeTab === 'complexity' && (
            <div className="space-y-6">
              <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-base font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-[#C2410C]" />
                  <span>Análisis de Complejidad Algorítmica (Big O)</span>
                </h3>

                <p className="text-xs text-[#4A4742]">
                  Resumen de la complejidad temporal y espacial en notación asintótica oficial Cormen (CLRS):
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#F9F8F6] p-4 rounded-xl text-center border border-[#E5E2DE]">
                    <span className="text-[10px] text-[#8C8882] font-bold uppercase block">
                      Mejor Caso (Time)
                    </span>
                    <span className="text-base font-mono font-bold text-[#10B981] mt-1 block">
                      {selectedAlgo.complexity.timeBest}
                    </span>
                  </div>

                  <div className="bg-[#FFF7ED] p-4 rounded-xl text-center border border-[#FDBA74]">
                    <span className="text-[10px] text-[#C2410C] font-bold uppercase block">
                      Caso Promedio (Time)
                    </span>
                    <span className="text-base font-mono font-bold text-[#C2410C] mt-1 block">
                      {selectedAlgo.complexity.timeAverage}
                    </span>
                  </div>

                  <div className="bg-[#F9F8F6] p-4 rounded-xl text-center border border-[#E5E2DE]">
                    <span className="text-[10px] text-[#8C8882] font-bold uppercase block">
                      Peor Caso (Time)
                    </span>
                    <span className="text-base font-mono font-bold text-[#1A1A1A] mt-1 block">
                      {selectedAlgo.complexity.timeWorst}
                    </span>
                  </div>

                  <div className="bg-[#F9F8F6] p-4 rounded-xl text-center border border-[#E5E2DE]">
                    <span className="text-[10px] text-[#8C8882] font-bold uppercase block">
                      Espacio Auxiliar
                    </span>
                    <span className="text-base font-mono font-bold text-[#2563EB] mt-1 block">
                      {selectedAlgo.complexity.spaceWorst}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INTERACTIVE CODE EDITOR (PROBLEM 1 FIXED FULLY CONNECTED) */}
          {activeTab === 'code' && (
            <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#F2F1EE]">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-[#C2410C]" />
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#1A1A1A]">
                      Editor Interactivo de Código Fuente
                    </h3>
                    <p className="text-[11px] text-[#8C8882]">
                      Escribe y edita código funcional para <strong>{selectedAlgo.name}</strong> en C, C++ y Python.
                    </p>
                  </div>
                </div>

                {/* Language Switcher Tabs */}
                <div className="flex items-center gap-1.5 bg-[#F2F1EE] p-1 rounded-xl">
                  <button
                    onClick={() => setCodeLang('c')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      codeLang === 'c'
                        ? 'bg-[#C2410C] text-white shadow-xs'
                        : 'text-[#4A4742] hover:text-[#1A1A1A]'
                    }`}
                  >
                    Lenguaje C
                  </button>

                  <button
                    onClick={() => setCodeLang('cpp')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      codeLang === 'cpp'
                        ? 'bg-[#1A1A1A] text-white shadow-xs'
                        : 'text-[#4A4742] hover:text-[#1A1A1A]'
                    }`}
                  >
                    C++
                  </button>

                  <button
                    onClick={() => setCodeLang('python')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      codeLang === 'python'
                        ? 'bg-[#3B82F6] text-white shadow-xs'
                        : 'text-[#4A4742] hover:text-[#1A1A1A]'
                    }`}
                  >
                    Python
                  </button>
                </div>
              </div>

              {/* Editor Top Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11111B] p-3 rounded-t-xl border border-stone-800 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditorMode('editor')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      editorMode === 'editor'
                        ? 'bg-[#C2410C] text-white'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Editor Interactivo</span>
                  </button>

                  <button
                    onClick={() => setEditorMode('highlighted')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      editorMode === 'highlighted'
                        ? 'bg-[#CBA6F7] text-stone-900'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Vista Coloreada Syntax</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetCode}
                    className="px-3 py-1.5 text-stone-400 hover:text-stone-200 transition text-xs flex items-center gap-1"
                    title="Restablecer al plantilla original"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restablecer</span>
                  </button>

                  <button
                    onClick={() => handleCopyCode(currentCode)}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              {/* Main Interactive Code Input / Syntax View Container */}
              <div className="rounded-b-xl border border-stone-800 bg-[#181825] overflow-hidden">
                {editorMode === 'editor' ? (
                  <textarea
                    key={codeKey}
                    value={currentCode}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    onKeyDown={handleKeyDownInTextarea}
                    rows={16}
                    spellCheck={false}
                    className="w-full bg-[#181825] text-[#A6E3A1] font-mono text-xs p-4 focus:outline-none resize-y leading-relaxed border-none selection:bg-[#313244]"
                    placeholder="// Escribe o modifica tu código aquí..."
                  />
                ) : (
                  <div className="p-4 bg-[#1A1A1A] text-white text-xs font-mono overflow-x-auto min-h-[300px]">
                    <CSyntaxHighlighter
                      code={currentCode}
                      language={codeLang === 'python' ? 'python' : 'c'}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
