/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { COURSES_DATA } from './data/coursesData';
import { CourseItem } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ClassView } from './components/ClassView';
import { ExercisePlayground } from './components/ExercisePlayground';
import { BookOpen, Code } from 'lucide-react';

export default function App() {
  const [selectedItemId, setSelectedItemId] = useState<string>('clase-1');
  const [completedItemIds, setCompletedItemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('algo_completed_items');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [solvedExerciseIds, setSolvedExerciseIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('algo_solved_exercises');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState<'theory' | 'exercises'>('theory');

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('algo_completed_items', JSON.stringify(completedItemIds));
  }, [completedItemIds]);

  useEffect(() => {
    localStorage.setItem('algo_solved_exercises', JSON.stringify(solvedExerciseIds));
  }, [solvedExerciseIds]);

  const currentItem: CourseItem =
    COURSES_DATA.find((item) => item.id === selectedItemId) || COURSES_DATA[0];

  const currentExercises = currentItem.exercises || [];

  const handleToggleCompleted = (id: string) => {
    setCompletedItemIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNextClass = () => {
    if (currentItem.nextItemId) {
      setSelectedItemId(currentItem.nextItemId);
      setActiveTab('theory');
      if (!completedItemIds.includes(currentItem.id)) {
        setCompletedItemIds((prev) => [...prev, currentItem.id]);
      }
    }
  };

  const handlePrevClass = () => {
    if (currentItem.prevItemId) {
      setSelectedItemId(currentItem.prevItemId);
      setActiveTab('theory');
    }
  };

  return (
    <div className="h-screen max-h-screen bg-[#F9F8F6] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#C2410C] selection:text-white overflow-hidden">
      {/* Top Header */}
      <Header
        completedCount={completedItemIds.length}
        totalCount={COURSES_DATA.length}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Sidebar */}
        <Sidebar
          items={COURSES_DATA}
          selectedItemId={selectedItemId}
          onSelectItem={(id) => {
            setSelectedItemId(id);
            setActiveTab('theory');
          }}
          completedItemIds={completedItemIds}
        />

        {/* Center Content Stage */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#F9F8F6]">
          {/* Section Navigation Tabs (Teoría / Ejercicios) */}
          <div className="bg-[#F9F8F6] px-6 py-3 border-b border-[#E5E2DE] flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-1.5 bg-[#F2F1EE] p-1 rounded-full text-xs font-semibold">
              <button
                onClick={() => setActiveTab('theory')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition uppercase tracking-wider text-[11px] ${
                  activeTab === 'theory'
                    ? 'bg-[#1A1A1A] text-white font-bold shadow-xs'
                    : 'text-[#8C8882] hover:text-[#1A1A1A]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Lección Teórica</span>
              </button>

              {currentExercises.length > 0 && (
                <button
                  onClick={() => setActiveTab('exercises')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition uppercase tracking-wider text-[11px] ${
                    activeTab === 'exercises'
                      ? 'bg-[#C2410C] text-white font-bold shadow-xs'
                      : 'text-[#8C8882] hover:text-[#1A1A1A]'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Práctica y Código C ({currentExercises.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* Active View Display */}
          <div className="flex-1 overflow-y-auto flex flex-col">
            {activeTab === 'theory' ? (
              <ClassView
                item={currentItem}
                onNextClass={currentItem.nextItemId ? handleNextClass : undefined}
                onPrevClass={currentItem.prevItemId ? handlePrevClass : undefined}
                isCompleted={completedItemIds.includes(currentItem.id)}
                onToggleCompleted={() => handleToggleCompleted(currentItem.id)}
                onOpenExercise={() => setActiveTab('exercises')}
              />
            ) : currentExercises.length > 0 ? (
              <div className="p-4 sm:p-6 lg:p-8 flex-1">
                <ExercisePlayground
                  exercises={currentExercises}
                  onSolved={(exerciseId) => {
                    if (!solvedExerciseIds.includes(exerciseId)) {
                      setSolvedExerciseIds((prev) => [...prev, exerciseId]);
                    }
                  }}
                />
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
