/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { COURSES_DATA } from './data/coursesData';
import { CourseItem, Exercise } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ClassView } from './components/ClassView';
import { ExercisePlayground } from './components/ExercisePlayground';
import { DashboardView } from './components/DashboardView';
import { CCourseView } from './components/CCourseView';
import { AlgorithmVisualizerView } from './components/AlgorithmVisualizerView';
import { LeaderboardView } from './components/LeaderboardView';
import { CertamenesView } from './components/CertamenesView';
import { UserProfile } from './types';
import { calculateUserXP, getLevelInfo, checkAndUpateStreak } from './utils/gamification';
import { decodeShareCode, SharedCodePayload } from './utils/codeSharing';
import { SharedCodeNotificationModal } from './components/SharedCodeNotificationModal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { BookOpen, Code, LayoutDashboard, Terminal, Zap, Share2 } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'dashboard' | 'class' | 'c_course' | 'visualizer' | 'leaderboard' | 'certamenes'>('dashboard');
  const [selectedItemId, setSelectedItemId] = useState<string>('clase-1');
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>('merge-sort');

  // User Gamification Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('algo_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return {
      nickname: 'Estudiante Algorítmico',
      university: 'U. de Chile',
      avatar: '🧙‍♂️',
      customTitle: 'Iniciando en C',
      lastVisitDate: '',
      streakDays: 1,
    };
  });

  // Check and update study streak on mount
  useEffect(() => {
    const updatedProfile = checkAndUpateStreak(userProfile);
    if (
      updatedProfile.streakDays !== userProfile.streakDays ||
      updatedProfile.lastVisitDate !== userProfile.lastVisitDate
    ) {
      setUserProfile(updatedProfile);
    }
  }, []);

  // Save profile state to localStorage
  useEffect(() => {
    localStorage.setItem('algo_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Code Sharing State & Hash Detection
  const [incomingSharePayload, setIncomingSharePayload] = useState<SharedCodePayload | null>(null);
  const [importedExercise, setImportedExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const checkShareUrl = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      const decoded = decodeShareCode(hash || search);
      if (decoded) {
        setIncomingSharePayload(decoded);
      }
    };

    checkShareUrl();
    window.addEventListener('hashchange', checkShareUrl);
    return () => window.removeEventListener('hashchange', checkShareUrl);
  }, []);

  const handleAcceptSharedCode = (code: string) => {
    const exTitle = incomingSharePayload?.title || 'Código Compartido por Compañero';
    const sharedEx: Exercise = {
      id: 'shared-link-exercise',
      title: exTitle,
      description: `Código C recibido a través de un enlace hash compartido. Puedes modificarlo, probar algoritmos y compilarlo en vivo.`,
      initialCode: code,
      cormenRef: 'Solución Compartida',
      solutionCode: code,
      explanation: 'Solución de C recibida mediante código comprimido en enlace URL.',
      hint: 'Utiliza el editor interactivo C99 y presiona "Compilar & Validar" para ejecutar.',
      testCases: [
        {
          id: 'tc-shared-1',
          description: 'Ejecución libre del programa C compartido',
          input: '',
          expectedOutput: '',
        },
      ],
    };

    setImportedExercise(sharedEx);
    setIncomingSharePayload(null);
    setSelectedItemId('clase-1');
    setActiveTab('exercises');
    setViewMode('class');

    try {
      window.history.replaceState(null, '', window.location.pathname);
    } catch (e) {
      // ignore
    }
  };

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

  const [completedCSubtopics, setCompletedCSubtopics] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('algo_completed_c_subtopics');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [selectedCChapterId, setSelectedCChapterId] = useState<string>('cap-1');

  const [activeTab, setActiveTab] = useState<'theory' | 'exercises'>('theory');

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('algo_completed_items', JSON.stringify(completedItemIds));
  }, [completedItemIds]);

  useEffect(() => {
    localStorage.setItem('algo_solved_exercises', JSON.stringify(solvedExerciseIds));
  }, [solvedExerciseIds]);

  useEffect(() => {
    localStorage.setItem('algo_completed_c_subtopics', JSON.stringify(completedCSubtopics));
  }, [completedCSubtopics]);

  const currentItem: CourseItem = useMemo(
    () => COURSES_DATA.find((item) => item.id === selectedItemId) || COURSES_DATA[0],
    [selectedItemId]
  );

  const currentExercises = useMemo(() => currentItem.exercises || [], [currentItem]);

  const handleToggleCompleted = useCallback((id: string) => {
    setCompletedItemIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const handleToggleCSubtopicCompleted = useCallback((subtopicId: string) => {
    setCompletedCSubtopics((prev) =>
      prev.includes(subtopicId)
        ? prev.filter((id) => id !== subtopicId)
        : [...prev, subtopicId]
    );
  }, []);

  const handleSelectCChapter = useCallback((chapterId: string) => {
    setSelectedCChapterId(chapterId);
    setViewMode('c_course');
  }, []);

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

  const handleSelectClass = useCallback((classId: string, tab: 'theory' | 'exercises' = 'theory') => {
    setSelectedItemId(classId);
    setActiveTab(tab);
    setViewMode('class');
  }, []);

  const handleOpenGlobalExercise = useCallback((exercise: Exercise) => {
    // Find class that contains this exercise
    const foundClass = COURSES_DATA.find((item) =>
      (item.exercises || []).some((ex) => ex.id === exercise.id)
    );
    if (!foundClass) {
      console.warn(`No class found containing exercise ID: ${exercise.id}`);
      return;
    }
    setSelectedItemId(foundClass.id);
    setActiveTab('exercises');
    setViewMode('class');
  }, []);

  const userXP = useMemo(
    () => calculateUserXP(completedItemIds, solvedExerciseIds, completedCSubtopics, userProfile.streakDays),
    [completedItemIds, solvedExerciseIds, completedCSubtopics, userProfile.streakDays]
  );

  const levelInfo = useMemo(() => getLevelInfo(userXP), [userXP]);

  return (
    <div className="h-screen max-h-screen bg-[#F9F8F6] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#C2410C] selection:text-white overflow-hidden">
      {/* PWA Install Banner & Offline Mode Indicator */}
      <PWAInstallBanner />

      {/* Top Header */}
      <Header
        completedCount={completedItemIds.length}
        totalCount={COURSES_DATA.length}
        onOpenDashboard={() => setViewMode('dashboard')}
        isDashboardActive={viewMode === 'dashboard'}
        userXP={userXP}
        userLevel={levelInfo.level}
        streakDays={userProfile.streakDays}
        onOpenLeaderboard={() => setViewMode('leaderboard')}
        isLeaderboardActive={viewMode === 'leaderboard'}
        onOpenCertamenes={() => setViewMode('certamenes')}
        isCertamenesActive={viewMode === 'certamenes'}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Sidebar (Hidden on Dashboard / Home view) */}
        {viewMode !== 'dashboard' && (
          <Sidebar
            items={COURSES_DATA}
            selectedItemId={selectedItemId}
            isDashboardActive={false}
            onOpenDashboard={() => setViewMode('dashboard')}
            isCCourseActive={viewMode === 'c_course'}
            onOpenCCourse={() => setViewMode('c_course')}
            isVisualizerActive={viewMode === 'visualizer'}
            onOpenVisualizer={() => setViewMode('visualizer')}
            isLeaderboardActive={viewMode === 'leaderboard'}
            onOpenLeaderboard={() => setViewMode('leaderboard')}
            isAlgoCourseActive={viewMode === 'class'}
            onOpenAlgoCourse={() => setViewMode('class')}
            isCertamenesActive={viewMode === 'certamenes'}
            onOpenCertamenes={() => setViewMode('certamenes')}
            selectedCChapterId={selectedCChapterId}
            onSelectCChapter={handleSelectCChapter}
            completedCSubtopics={completedCSubtopics}
            selectedAlgoId={selectedAlgoId}
            onSelectAlgorithm={(algoId) => {
              setSelectedAlgoId(algoId);
              setViewMode('visualizer');
            }}
            onSelectItem={(id) => {
              setSelectedItemId(id);
              setActiveTab('theory');
              setViewMode('class');
            }}
            completedItemIds={completedItemIds}
          />
        )}

        {/* Center Content Stage */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#F9F8F6]">
          {/* Top Bar for Mode Navigation */}
          {viewMode === 'class' && (
            <div className="bg-[#F9F8F6] px-6 py-3 border-b border-[#E5E2DE] flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('dashboard')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F2F1EE] hover:bg-[#E5E2DE] text-[#4A4742] rounded-full transition uppercase tracking-wider text-[11px]"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Volver al Dashboard</span>
                </button>

                <button
                  onClick={() => setViewMode('c_course')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF7ED] hover:bg-[#FFEAD5] text-[#C2410C] border border-[#FDBA74] rounded-full transition uppercase tracking-wider text-[11px]"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Ir al Curso C (K&amp;R)</span>
                </button>

                <button
                  onClick={() => setViewMode('visualizer')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#065F46] border border-[#6EE7B7] rounded-full transition uppercase tracking-wider text-[11px]"
                >
                  <Zap className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Visualizador de Algoritmos</span>
                </button>

                <div className="h-4 w-px bg-[#E5E2DE]" />

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
            </div>
          )}

          {/* Active View Display */}
          <div className="flex-1 overflow-y-auto flex flex-col">
            {viewMode === 'certamenes' ? (
              <CertamenesView onBackToDashboard={() => setViewMode('dashboard')} />
            ) : viewMode === 'leaderboard' ? (
              <LeaderboardView
                completedItemIds={completedItemIds}
                solvedExerciseIds={solvedExerciseIds}
                completedCSubtopics={completedCSubtopics}
                userProfile={userProfile}
                onUpdateProfile={(updated) => setUserProfile(updated)}
              />
            ) : viewMode === 'visualizer' ? (
              <AlgorithmVisualizerView
                selectedAlgoId={selectedAlgoId}
                onSelectAlgorithm={(algoId) => setSelectedAlgoId(algoId)}
              />
            ) : viewMode === 'dashboard' ? (
              <DashboardView
                courses={COURSES_DATA}
                completedItemIds={completedItemIds}
                solvedExerciseIds={solvedExerciseIds}
                onSelectClass={handleSelectClass}
                onOpenGlobalExercise={handleOpenGlobalExercise}
                onSelectCChapter={handleSelectCChapter}
                onOpenVisualizer={() => setViewMode('visualizer')}
                onOpenCCourse={() => setViewMode('c_course')}
                onOpenAlgoCourse={() => {
                  setSelectedItemId('clase-1');
                  setViewMode('class');
                }}
                onOpenLeaderboard={() => setViewMode('leaderboard')}
                onOpenCertamenes={() => setViewMode('certamenes')}
                userXP={userXP}
                userLevel={levelInfo.level}
                streakDays={userProfile.streakDays}
              />
            ) : viewMode === 'c_course' ? (
              <CCourseView
                completedSubtopics={completedCSubtopics}
                onToggleSubtopicCompleted={handleToggleCSubtopicCompleted}
                selectedChapterId={selectedCChapterId}
                onSelectSubtopic={(chapId) => handleSelectCChapter(chapId)}
              />
            ) : activeTab === 'theory' ? (
              <ClassView
                item={currentItem}
                onNextClass={currentItem.nextItemId ? handleNextClass : undefined}
                onPrevClass={currentItem.prevItemId ? handlePrevClass : undefined}
                isCompleted={completedItemIds.includes(currentItem.id)}
                onToggleCompleted={() => handleToggleCompleted(currentItem.id)}
                onOpenExercise={() => setActiveTab('exercises')}
              />
            ) : (
              <div className="p-4 sm:p-6 lg:p-8 flex-1">
                <ExercisePlayground
                  exercises={
                    importedExercise
                      ? [importedExercise, ...currentExercises]
                      : currentExercises.length > 0
                      ? currentExercises
                      : []
                  }
                  onSolved={(exerciseId) => {
                    if (!solvedExerciseIds.includes(exerciseId)) {
                      setSolvedExerciseIds((prev) => [...prev, exerciseId]);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Shared Code Notification Modal */}
      <SharedCodeNotificationModal
        payload={incomingSharePayload}
        onAccept={handleAcceptSharedCode}
        onDismiss={() => setIncomingSharePayload(null)}
      />
    </div>
  );
}
