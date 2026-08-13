import React, { useState } from 'react';
import { CourseItem, Exercise } from '../types';
import { C_COURSE_DATA } from '../data/cCourseData';
import {
  BookOpen,
  Code,
  CheckCircle2,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  Trophy,
  Play,
  Search,
  ArrowRight,
  ChevronRight,
  GraduationCap,
  Flame,
  Zap,
  BarChart3,
  FileCode,
  RotateCcw,
  Check,
  Lightbulb,
  Wrench,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CSyntaxHighlighter } from './CSyntaxHighlighter';

interface DashboardViewProps {
  courses: CourseItem[];
  completedItemIds: string[];
  solvedExerciseIds: string[];
  onSelectClass: (classId: string, tab?: 'theory' | 'exercises') => void;
  onOpenGlobalExercise: (exercise: Exercise) => void;
  onSelectCChapter?: (chapterId: string) => void;
}

// Full C Cheat Sheet and Command Templates for Intensive C Practice
interface CCommandTemplate {
  id: string;
  category: string;
  title: string;
  command: string;
  description: string;
  codeSnippet: string;
  expectedOutput: string;
}

const C_COMMAND_TEMPLATES: CCommandTemplate[] = [
  {
    id: 'c-mem-1',
    category: 'Memoria Dinámica',
    title: 'Reserva con malloc() y Liberación con free()',
    command: 'malloc, free, sizeof',
    description: 'Reserva memoria en el Heap para un arreglo de enteros y libera el bloque para evitar memory leaks.',
    codeSnippet: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    // Reserva dinámica de memoria para 5 enteros
    int *arr = (int*) malloc(n * sizeof(int));
    
    if (arr == NULL) {
        printf("Error: Memoria insuficiente\\n");
        return 1;
    }
    
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
        printf("arr[%d] = %d (Dir: %p)\\n", i, arr[i], (void*)&arr[i]);
    }
    
    // IMPORTANTE: Liberar memoria siempre
    free(arr);
    printf("Memoria liberada exitosamente.\\n");
    return 0;
}`,
    expectedOutput: `arr[0] = 10 (Dir: 0x7ffd1230)\narr[1] = 20 (Dir: 0x7ffd1234)\narr[2] = 30 (Dir: 0x7ffd1238)\narr[3] = 40 (Dir: 0x7ffd123c)\narr[4] = 50 (Dir: 0x7ffd1240)\nMemoria liberada exitosamente.`,
  },
  {
    id: 'c-ptr-1',
    category: 'Punteros y Referencias',
    title: 'Intercambio de Variables por Referencia (Punteros)',
    command: 'void swap(int *a, int *b)',
    description: 'Modifica el contenido de variables originales pasando sus direcciones de memoria mediante el operador &.',
    codeSnippet: `#include <stdio.h>

void intercambiar(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 42, y = 99;
    printf("Antes: x = %d, y = %d\\n", x, y);
    
    // Pasamos direcciones de memoria con &
    intercambiar(&x, &y);
    
    printf("Después: x = %d, y = %d\\n", x, y);
    return 0;
}`,
    expectedOutput: `Antes: x = 42, y = 99\nDespués: x = 99, y = 42`,
  },
  {
    id: 'c-struct-1',
    category: 'Estructuras de Datos',
    title: 'Estructura Nodo de Árbol / Lista Enlazada',
    command: 'struct, typedef, punteros a struct',
    description: 'Define un nodo autorreferenciado con punteros en C para construir árboles binarios y listas.',
    codeSnippet: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo *izq;
    struct Nodo *der;
} Nodo;

Nodo* crearNodo(int valor) {
    Nodo* nuevo = (Nodo*) malloc(sizeof(Nodo));
    nuevo->dato = valor;
    nuevo->izq = NULL;
    nuevo->der = NULL;
    return nuevo;
}

int main() {
    Nodo* raiz = crearNodo(10);
    raiz->izq = crearNodo(5);
    raiz->der = crearNodo(20);
    
    printf("Raíz: %d\\n", raiz->dato);
    printf("Hijo Izquierdo: %d\\n", raiz->izq->dato);
    printf("Hijo Derecho: %d\\n", raiz->der->dato);
    
    free(raiz->izq);
    free(raiz->der);
    free(raiz);
    return 0;
}`,
    expectedOutput: `Raíz: 10\nHijo Izquierdo: 5\nHijo Derecho: 20`,
  },
  {
    id: 'c-arr-ptr',
    category: 'Aritmética de Punteros',
    title: 'Recorrido de Arreglo con *(ptr + i)',
    command: '*(ptr + i) vs arr[i]',
    description: 'Demuestra la equivalencia técnica entre la notación de subíndice de arreglos y la aritmética de punteros pura.',
    codeSnippet: `#include <stdio.h>

int main() {
    int numeros[] = {5, 15, 25, 35, 45};
    int n = 5;
    int *p = numeros; // Apunta al primer elemento

    printf("Demostración de Aritmética de Punteros:\\n");
    for (int i = 0; i < n; i++) {
        printf("*(p + %d) = %d | Desplazamiento: +%ld bytes\\n", 
               i, *(p + i), i * sizeof(int));
    }
    return 0;
}`,
    expectedOutput: `Demostración de Aritmética de Punteros:\n*(p + 0) = 5 | Desplazamiento: +0 bytes\n*(p + 1) = 15 | Desplazamiento: +4 bytes\n*(p + 2) = 25 | Desplazamiento: +8 bytes\n*(p + 3) = 35 | Desplazamiento: +12 bytes\n*(p + 4) = 45 | Desplazamiento: +16 bytes`,
  },
  {
    id: 'c-rec-1',
    category: 'Recursión y Pilas',
    title: 'Factorial Recursivo con Traza de Pila de Llamadas',
    command: 'long long factorial(int n)',
    description: 'Visualiza cómo se acumulan los marcos de pila en la recursión hasta alcanzar el caso base.',
    codeSnippet: `#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) {
        printf("  [Caso Base] n = %d -> retorna 1\\n", n);
        return 1;
    }
    printf("  [Llamada Subproblema] %d * factorial(%d)\\n", n, n - 1);
    long long res = n * factorial(n - 1);
    printf("  [Retorno] factorial(%d) = %lld\\n", n, res);
    return res;
}

int main() {
    int num = 5;
    printf("Calculando factorial(%d):\\n", num);
    long long resultado = factorial(num);
    printf("Resultado final: %d! = %lld\\n", num, resultado);
    return 0;
}`,
    expectedOutput: `Calculando factorial(5):\n  [Llamada Subproblema] 5 * factorial(4)\n  [Llamada Subproblema] 4 * factorial(3)\n  [Llamada Subproblema] 3 * factorial(2)\n  [Llamada Subproblema] 2 * factorial(1)\n  [Caso Base] n = 1 -> retorna 1\n  [Retorno] factorial(2) = 2\n  [Retorno] factorial(3) = 6\n  [Retorno] factorial(4) = 24\n  [Retorno] factorial(5) = 120\nResultado final: 5! = 120`,
  },
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  courses,
  completedItemIds,
  solvedExerciseIds,
  onSelectClass,
  onOpenGlobalExercise,
  onSelectCChapter,
}) => {
  const [activeCourseDashboard, setActiveCourseDashboard] = useState<'algo' | 'c_course'>('algo');
  const [activeDashboardTab, setActiveDashboardTab] = useState<'esquema' | 'full_c'>('esquema');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<CCommandTemplate>(C_COMMAND_TEMPLATES[0]);
  const [templateExecuted, setTemplateExecuted] = useState<boolean>(false);

  // Calculate Course Metrics for Algorithmic
  const totalClasses = courses.length;
  const completedClassesCount = completedItemIds.length;
  const progressPercent = Math.round((completedClassesCount / totalClasses) * 100);

  // Total exercises across all classes
  const allExercisesWithClass = courses.flatMap((item) =>
    (item.exercises || []).map((ex) => ({
      ...ex,
      classId: item.id,
      classTitle: item.title,
      classNumber: item.number,
    }))
  );
  const totalExercisesCount = allExercisesWithClass.length;
  const solvedCount = solvedExerciseIds.length;
  const exercisesProgressPercent = totalExercisesCount > 0
    ? Math.round((solvedCount / totalExercisesCount) * 100)
    : 0;

  // C Course Metrics
  const totalCChapters = C_COURSE_DATA.length;
  const cAllExercises = C_COURSE_DATA.flatMap((chap) => chap.exercises || []);

  // Filter exercises for Full C search
  const filteredExercises = allExercisesWithClass.filter((ex) => {
    const matchesSearch =
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.cormenRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.classTitle.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'Todas') return matchesSearch;
    if (selectedCategory === 'Punteros y Memoria')
      return matchesSearch && (ex.description.includes('puntero') || ex.description.includes('memoria') || ex.description.includes('punteros') || ex.description.includes('struct'));
    if (selectedCategory === 'Recursión')
      return matchesSearch && (ex.description.includes('recurs') || ex.title.includes('Recursi'));
    if (selectedCategory === 'Búsqueda y Ordenamiento')
      return matchesSearch && (ex.title.includes('Búsqueda') || ex.title.includes('Ordenamiento') || ex.title.includes('Mergesort') || ex.title.includes('Quicksort') || ex.title.includes('Burbuja'));
    if (selectedCategory === 'Árboles y Grafos')
      return matchesSearch && (ex.title.includes('Árbol') || ex.title.includes('BST') || ex.title.includes('Grafo') || ex.title.includes('BFS') || ex.title.includes('Dijkstra'));
    if (selectedCategory === 'Programación Dinámica')
      return matchesSearch && (ex.title.includes('DP') || ex.title.includes('Dinámica') || ex.title.includes('Voraz') || ex.title.includes('Fibonacci'));

    return matchesSearch;
  });

  return (
    <div className="flex-1 bg-[#F9F8F6] text-[#1A1A1A] overflow-y-auto p-4 sm:p-8 lg:p-12 space-y-10">
      {/* Course Switcher Bar on Top of Dashboard */}
      <div className="bg-[#1A1A1A] text-white rounded-2xl p-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2 px-3">
          <Sparkles className="w-5 h-5 text-[#FDBA74]" />
          <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
            Seleccionar Curso para el Dashboard:
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveCourseDashboard('algo')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 ${
              activeCourseDashboard === 'algo'
                ? 'bg-[#C2410C] text-white shadow-xs'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Dashboard: Algorítmica (Cormen)</span>
          </button>

          <button
            onClick={() => setActiveCourseDashboard('c_course')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 ${
              activeCourseDashboard === 'c_course'
                ? 'bg-[#C2410C] text-white shadow-xs'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4 text-[#FDBA74]" />
            <span>Dashboard: Lenguaje C Pro (K&amp;R 8 Capítulos)</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD CURSO 1: ALGORÍTMICA */}
      {activeCourseDashboard === 'algo' && (
        <div className="space-y-10">
          {/* Dashboard Top Header */}
          <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-3 py-1 bg-[#1A1A1A] text-white rounded-full uppercase tracking-widest flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#FDBA74]" />
                    <span>Panel Principal • Algorítmica y Complejidad</span>
                  </span>
                  <span className="text-xs text-[#C2410C] font-semibold font-mono uppercase tracking-wider">
                    CLRS Cormen C Edition
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                  Dashboard de Algorítmica
                </h1>
                <p className="text-sm sm:text-base text-[#4A4742] leading-relaxed">
                  Explora el esquema general del curso de 16 clases y talleres, o ingresa al módulo de <strong className="text-[#C2410C]">Full C</strong> para dominar comandos, sintaxis, memoria dinámica y punteros.
                </p>
              </div>

              {/* Overall Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full sm:w-auto">
                <div className="bg-[#F9F8F6] border border-[#E5E2DE] p-4 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-[#8C8882] uppercase tracking-wider block">
                    Clases Completadas
                  </span>
                  <div className="text-2xl font-serif font-bold text-[#1A1A1A] mt-1">
                    {completedClassesCount} <span className="text-xs text-[#8C8882] font-sans font-normal">/ {totalClasses}</span>
                  </div>
                  <div className="w-full bg-[#E5E2DE] h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-[#10B981] h-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="bg-[#FFF7ED] border border-[#FDBA74] p-4 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-[#C2410C] uppercase tracking-wider block">
                    Prácticas C Resueltas
                  </span>
                  <div className="text-2xl font-serif font-bold text-[#C2410C] mt-1">
                    {solvedCount} <span className="text-xs text-[#C2410C]/70 font-sans font-normal">/ {totalExercisesCount}</span>
                  </div>
                  <div className="w-full bg-[#FDBA74]/40 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-[#C2410C] h-full transition-all duration-500"
                      style={{ width: `${exercisesProgressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="bg-[#F9F8F6] border border-[#E5E2DE] p-4 rounded-xl text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-[#8C8882] uppercase tracking-wider block">
                    Ejercicios por Clase
                  </span>
                  <div className="text-2xl font-serif font-bold text-[#1A1A1A] mt-1">
                    5 <span className="text-xs text-[#8C8882] font-sans font-normal">en C / clase</span>
                  </div>
                  <span className="text-[10px] text-[#10B981] font-semibold mt-1 block">
                    ✓ 95 ejercicios listos
                  </span>
                </div>
              </div>
            </div>

            {/* Dashboard Section Switcher Tabs */}
            <div className="mt-8 pt-6 border-t border-[#F2F1EE] flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveDashboardTab('esquema')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  activeDashboardTab === 'esquema'
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-[#F2F1EE] hover:bg-[#E5E2DE] text-[#4A4742]'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-[#FDBA74]" />
                <span>1. Esquema del Curso (16 Clases)</span>
              </button>

              <button
                onClick={() => setActiveDashboardTab('full_c')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  activeDashboardTab === 'full_c'
                    ? 'bg-[#C2410C] text-white shadow-sm'
                    : 'bg-[#F2F1EE] hover:bg-[#E5E2DE] text-[#4A4742]'
                }`}
              >
                <Terminal className="w-4 h-4 text-white" />
                <span>2. Full C: Práctica Intensiva de Comandos y Sintaxis</span>
                <span className="px-2 py-0.5 bg-white/20 text-white rounded-full text-[10px]">
                  95 Ejercicios
                </span>
              </button>
            </div>
          </div>

          {/* TAB 1: ESQUEMA DEL CURSO ALGORÍTMICA */}
          {activeDashboardTab === 'esquema' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">
                    Esquema Curricular Completo (CLRS Cormen en C)
                  </h2>
                  <p className="text-xs text-[#8C8882]">
                    Selecciona cualquier lección para estudiar su teoría, profundización 1A, práctica 1B y sus 5 ejercicios en C.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {courses.map((item, idx) => {
                  const isComp = completedItemIds.includes(item.id);
                  const exerciseCount = item.exercises?.length || 5;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`bg-white border rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all hover:shadow-md ${
                        isComp ? 'border-[#10B981]' : 'border-[#E5E2DE]'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                              item.type === 'workshop'
                                ? 'bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74]'
                                : item.type === 'review'
                                ? 'bg-stone-200 text-stone-700 border border-stone-300'
                                : 'bg-[#F2F1EE] text-[#4A4742] border border-[#E5E2DE]'
                            }`}
                          >
                            {item.type === 'workshop'
                              ? 'Taller Práctico'
                              : item.type === 'review'
                              ? 'Repaso'
                              : `Clase ${item.number}`}
                          </span>

                          {isComp ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-[#10B981] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#10B981]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Completada</span>
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium text-[#8C8882]">
                              {item.durationMinutes} min
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-serif font-bold text-[#1A1A1A] leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#4A4742] line-clamp-2 leading-relaxed">
                          {item.topic}
                        </p>

                        <div className="pt-2 text-[11px] text-[#C2410C] font-mono truncate">
                          {item.cormenChapter}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#F2F1EE] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold bg-[#F2F1EE] text-[#4A4742] px-2 py-1 rounded-md flex items-center gap-1">
                            <Code className="w-3 h-3 text-[#C2410C]" />
                            <span>{exerciseCount} Ejercicios C</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectClass(item.id, 'theory')}
                            className="p-2 bg-[#F2F1EE] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] rounded-xl transition text-xs font-semibold flex items-center gap-1"
                            title="Ver Teoría"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onSelectClass(item.id, 'exercises')}
                            className="px-3 py-1.5 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-xs"
                          >
                            <span>Practicar</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 2: FULL C - COMANDOS Y SINTAXIS */}
          {activeDashboardTab === 'full_c' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {/* Section 1: Interactive C Command Tester & Sandbox */}
              <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F2F1EE]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-[#C2410C]" />
                    <div>
                      <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">
                        Laboratorio de Sintaxis &amp; Comandos Esenciales de Lenguaje C
                      </h2>
                      <p className="text-xs text-[#8C8882]">
                        Aprende y prueba patrones clave de C: memoria dinámica, punteros, structs, recursión y arreglos.
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold bg-[#FFF7ED] text-[#C2410C] px-3 py-1 rounded-full border border-[#FDBA74]">
                    Compilador Simulado C99/C11
                  </span>
                </div>

                {/* Template Selector Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {C_COMMAND_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => {
                        setSelectedTemplate(tmpl);
                        setTemplateExecuted(false);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        selectedTemplate.id === tmpl.id
                          ? 'bg-[#C2410C] text-white shadow-xs'
                          : 'bg-[#F2F1EE] hover:bg-[#E5E2DE] text-[#4A4742]'
                      }`}
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>{tmpl.title}</span>
                    </button>
                  ))}
                </div>

                {/* Template Workspace */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                  {/* Left: Code Editor View */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#4A4742] flex items-center gap-1.5">
                        <FileCode className="w-4 h-4 text-[#C2410C]" />
                        <span>Código Fuente en C</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#8C8882]">
                        {selectedTemplate.command}
                      </span>
                    </div>

                    <div className="bg-[#1A1A1A] text-white p-4 rounded-xl border border-stone-800 font-mono text-xs overflow-x-auto">
                      <CSyntaxHighlighter code={selectedTemplate.codeSnippet} />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xs text-[#4A4742] italic">
                        {selectedTemplate.description}
                      </p>
                      <button
                        onClick={() => setTemplateExecuted(true)}
                        className="px-5 py-2 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs shrink-0"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Ejecutar Código C</span>
                      </button>
                    </div>
                  </div>

                  {/* Right: Output & Explanation */}
                  <div className="space-y-3 flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4A4742] flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-[#10B981]" />
                      <span>Consola de Salida (`stdout`)</span>
                    </span>

                    <div className="bg-[#0F172A] text-[#F8FAFC] p-5 rounded-xl border border-slate-800 font-mono text-xs flex-1 min-h-[220px] flex flex-col justify-between">
                      {templateExecuted ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-2"
                        >
                          <div className="text-[10px] text-[#10B981] font-bold border-b border-slate-800 pb-1 uppercase tracking-wider">
                            [Proceso finalizado con código de salida 0]
                          </div>
                          <pre className="whitespace-pre-wrap leading-relaxed text-emerald-400">
                            {selectedTemplate.expectedOutput}
                          </pre>
                        </motion.div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-2 py-8">
                          <Play className="w-8 h-8 opacity-40 animate-pulse" />
                          <p className="text-xs">Haz clic en "Ejecutar Código C" para ver la salida formateada en consola.</p>
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-[#FFF7ED] border border-[#FDBA74] rounded-xl text-xs text-[#C2410C] flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block uppercase text-[10px] tracking-wider">
                          Consejo de Ingeniería en C:
                        </span>
                        <span className="text-[#1A1A1A]">
                          En Lenguaje C, siempre verifica si la memoria asignada dinámicamente es nula (`if (ptr == NULL)`) y recuerda invocar `free(ptr)` para evitar fugas de memoria.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Full C Exercises Explorer (95 Exercises Search & Filter) */}
              <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F2F1EE]">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-[#1A1A1A] flex items-center gap-2">
                      <Code className="w-5 h-5 text-[#C2410C]" />
                      <span>Banco de 95 Prácticas de Código C (5 por cada Clase)</span>
                    </h2>
                    <p className="text-xs text-[#8C8882] mt-0.5">
                      Filtra por tema o busca cualquier concepto de C para practicar inmediatamente en el editor interactivo.
                    </p>
                  </div>

                  <span className="text-xs font-bold bg-[#1A1A1A] text-white px-3 py-1 rounded-full">
                    Mostrando {filteredExercises.length} de {totalExercisesCount}
                  </span>
                </div>

                {/* Search and Category Filters */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="w-4 h-4 text-[#8C8882] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Buscar ejercicio en C (p. ej., BST, Mergesort, Dijkstra, punteros)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl pl-10 pr-4 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#C2410C] transition"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      'Todas',
                      'Punteros y Memoria',
                      'Recursión',
                      'Búsqueda y Ordenamiento',
                      'Árboles y Grafos',
                      'Programación Dinámica',
                    ].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          selectedCategory === cat
                            ? 'bg-[#1A1A1A] text-white font-bold'
                            : 'bg-[#F2F1EE] hover:bg-[#E5E2DE] text-[#4A4742]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Exercise Cards List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {filteredExercises.slice(0, 20).map((ex) => {
                    const isSolved = solvedExerciseIds.includes(ex.id);

                    return (
                      <div
                        key={ex.id}
                        className="bg-[#F9F8F6] border border-[#E5E2DE] p-5 rounded-xl flex flex-col justify-between hover:border-[#C2410C] transition space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C2410C] bg-[#FFF7ED] px-2.5 py-0.5 rounded-md border border-[#FDBA74]">
                              {ex.classNumber ? `Clase ${ex.classNumber}` : ex.classTitle}
                            </span>

                            {isSolved ? (
                              <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#10B981] flex items-center gap-1">
                                <Check className="w-3 h-3" /> Resuelto
                              </span>
                            ) : (
                              <span className="text-[10px] text-[#8C8882] font-mono">
                                Cormen Ref
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm font-bold text-[#1A1A1A] leading-snug">
                            {ex.title}
                          </h4>
                          <p className="text-xs text-[#4A4742] line-clamp-2 leading-relaxed">
                            {ex.description}
                          </p>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-[#E5E2DE]/60">
                          <span className="text-[10px] text-[#8C8882] font-mono truncate max-w-[180px]">
                            {ex.cormenRef}
                          </span>

                          <button
                            onClick={() => onOpenGlobalExercise(ex)}
                            className="px-3.5 py-1.5 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs"
                          >
                            <Code className="w-3.5 h-3.5" />
                            <span>Resolver en C</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredExercises.length > 20 && (
                  <div className="text-center pt-2">
                    <span className="text-xs text-[#8C8882]">
                      Mostrando los primeros 20 resultados de {filteredExercises.length}. Refina tu búsqueda para ver otros ejercicios específicos.
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* DASHBOARD CURSO 2: LENGUAJE C PRO (KERNIGHAN & RITCHIE) */}
      {activeCourseDashboard === 'c_course' && (
        <div className="space-y-10">
          {/* Header Banner */}
          <div className="bg-white border border-[#E5E2DE] rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-3 py-1 bg-[#C2410C] text-white rounded-full uppercase tracking-widest flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-white" />
                    <span>Panel Principal • Lenguaje C (Kernighan &amp; Ritchie)</span>
                  </span>
                  <span className="text-xs text-[#C2410C] font-semibold font-mono uppercase tracking-wider">
                    8 Capítulos Integrales
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                  Dashboard de Lenguaje C Pro
                </h1>
                <p className="text-sm sm:text-base text-[#4A4742] leading-relaxed">
                  Accede a los 8 Capítulos Integrales del estándar K&amp;R: desde la sintaxis inicial y tipos primitivos hasta punteros avanzadísimos, structs y llamadas al sistema UNIX.
                </p>
              </div>

              {/* Stats Card */}
              <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
                <div className="bg-[#FFF7ED] border border-[#FDBA74] p-4 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-[#C2410C] uppercase tracking-wider block">
                    Capítulos del Curso
                  </span>
                  <div className="text-3xl font-serif font-bold text-[#C2410C] mt-1">
                    8 <span className="text-xs text-[#C2410C]/80 font-sans font-normal">Capítulos</span>
                  </div>
                  <span className="text-[10px] text-[#C2410C] font-semibold block mt-1">
                    ✓ Contenido Completo
                  </span>
                </div>

                <div className="bg-[#F9F8F6] border border-[#E5E2DE] p-4 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-[#8C8882] uppercase tracking-wider block">
                    Ejercicios Prácticos
                  </span>
                  <div className="text-3xl font-serif font-bold text-[#1A1A1A] mt-1">
                    {cAllExercises.length} <span className="text-xs text-[#8C8882] font-sans font-normal">en C</span>
                  </div>
                  <span className="text-[10px] text-[#10B981] font-semibold block mt-1">
                    ✓ Validadores Listos
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 8 Chapters Cards Grid */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">
              Explorar los 8 Capítulos del Curso C
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {C_COURSE_DATA.map((chap) => (
                <div
                  key={chap.id}
                  className="bg-white border border-[#E5E2DE] p-6 rounded-2xl flex flex-col justify-between hover:border-[#C2410C] transition shadow-xs space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{chap.icon}</span>
                      <span className="text-[10px] font-mono font-bold bg-[#FFF7ED] text-[#C2410C] px-2.5 py-1 rounded-full border border-[#FDBA74]">
                        Capítulo {chap.chapterNumber}
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#1A1A1A] leading-snug">
                      {chap.title}
                    </h3>
                    <p className="text-xs text-[#4A4742] line-clamp-3 leading-relaxed">
                      {chap.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F2F1EE] space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#8C8882]">
                      <span>{chap.exercises?.length || 2} Ejercicios</span>
                      <span>{chap.quizQuestions?.length || 2} Preguntas</span>
                    </div>

                    <button
                      onClick={() => onSelectCChapter && onSelectCChapter(chap.id)}
                      className="w-full py-2 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>Abrir Capítulo {chap.chapterNumber}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
