import { Achievement, LeaderboardEntry, UserProfile } from '../types';

export const AVATAR_OPTIONS = [
  { id: 'c_wizard', label: 'Hechicero de C', emoji: '🧙‍♂️', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { id: 'code_cat', label: 'Gato Coder', emoji: '🐱‍💻', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  { id: 'clrs_master', label: 'Maestro Cormen', emoji: '📚', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { id: 'binary_ninja', label: 'Ninja Asintótico', emoji: '🥷', color: 'bg-zinc-100 text-zinc-800 border-zinc-300' },
  { id: 'algo_hacker', label: 'Hacker Algorítmico', emoji: '⚡', color: 'bg-orange-100 text-orange-800 border-orange-300' },
  { id: 'pointer_guru', label: 'Gurú de Punteros', emoji: '🎯', color: 'bg-blue-100 text-blue-800 border-blue-300' },
];

export const UNIVERSITY_OPTIONS = [
  'U. de Chile',
  'UTFSM (Santamaría)',
  'PUC (Católica)',
  'U. de Valparaíso',
  'U. de Concepción',
  'USACH',
  'UDP (Diego Portales)',
  'U. de Antofagasta',
  'Comunidad Global',
];

export const LEVEL_TITLES: { minLvl: number; title: string; badge: string }[] = [
  { minLvl: 1, title: 'Iniciando en C', badge: '🌱' },
  { minLvl: 2, title: 'Analista Big-O', badge: '📐' },
  { minLvl: 3, title: 'Artesano de Punteros', badge: '🛠️' },
  { minLvl: 4, title: 'Maestro de Árboles', badge: '🌲' },
  { minLvl: 5, title: 'Arquitecto Algorítmico', badge: '⚡' },
  { minLvl: 7, title: 'Leyenda Cormen (CLRS)', badge: '🏆' },
];

export function getLevelInfo(xp: number) {
  // 100 XP per level
  const level = Math.max(1, Math.floor(xp / 100) + 1);
  const currentLevelXP = xp % 100;
  const nextLevelXP = 100;
  const progressPercent = Math.min(100, Math.round((currentLevelXP / nextLevelXP) * 100));

  let matchedTitle = LEVEL_TITLES[0];
  for (const item of LEVEL_TITLES) {
    if (level >= item.minLvl) {
      matchedTitle = item;
    }
  }

  return {
    level,
    currentLevelXP,
    nextLevelXP,
    progressPercent,
    title: matchedTitle.title,
    badge: matchedTitle.badge,
  };
}

export function calculateUserXP(
  completedItemIds: string[],
  solvedExerciseIds: string[],
  completedCSubtopics: string[],
  streakDays: number
): number {
  const classXP = completedItemIds.length * 30; // 30 XP per completed CLRS class
  const exerciseXP = solvedExerciseIds.length * 50; // 50 XP per solved exercise
  const cSubtopicXP = completedCSubtopics.length * 20; // 20 XP per completed C topic
  const streakBonus = streakDays * 15; // 15 XP per day of active streak

  return classXP + exerciseXP + cSubtopicXP + streakBonus;
}

export function checkAndUpateStreak(profile: UserProfile): UserProfile {
  const todayStr = new Date().toISOString().split('T')[0];

  if (!profile.lastVisitDate) {
    return {
      ...profile,
      lastVisitDate: todayStr,
      streakDays: 1,
    };
  }

  if (profile.lastVisitDate === todayStr) {
    return profile; // Already visited today
  }

  const lastDate = new Date(profile.lastVisitDate);
  const todayDate = new Date(todayStr);
  const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Visited yesterday, increment streak
    return {
      ...profile,
      lastVisitDate: todayStr,
      streakDays: profile.streakDays + 1,
    };
  } else if (diffDays > 1) {
    // Streak broken, reset to 1
    return {
      ...profile,
      lastVisitDate: todayStr,
      streakDays: 1,
    };
  }

  return profile;
}

export function evaluateAchievements(
  completedItemIds: string[],
  solvedExerciseIds: string[],
  completedCSubtopics: string[],
  streakDays: number,
  userRank: number
): Achievement[] {
  return [
    {
      id: 'first_step',
      title: '🚀 Primer Paso',
      description: 'Completar tu primera clase o lectura teórica.',
      icon: '🌱',
      unlocked: completedItemIds.length > 0 || completedCSubtopics.length > 0,
      xpReward: 20,
      category: 'general',
    },
    {
      id: 'c_solver',
      title: '⚡ Resolvedor de C',
      description: 'Resolver tu primer ejercicio práctico de código.',
      icon: '💻',
      unlocked: solvedExerciseIds.length > 0,
      xpReward: 30,
      category: 'c_course',
    },
    {
      id: 'streak_3',
      title: '🔥 Racha Implacable',
      description: 'Mantener una racha de estudio de al menos 3 días consecutivos.',
      icon: '🔥',
      unlocked: streakDays >= 3,
      xpReward: 50,
      category: 'streak',
    },
    {
      id: 'clrs_scholar',
      title: '📚 Erudito Cormen',
      description: 'Completar al menos 3 clases del curso de Algoritmos (CLRS).',
      icon: '🎓',
      unlocked: completedItemIds.length >= 3,
      xpReward: 60,
      category: 'algorithms',
    },
    {
      id: 'c_master_5',
      title: '🧙‍♂️ Dominio en C (K&R)',
      description: 'Completar al menos 5 subtemas o lecturas del curso de C.',
      icon: '⚙️',
      unlocked: completedCSubtopics.length >= 5,
      xpReward: 80,
      category: 'c_course',
    },
    {
      id: 'exercise_5',
      title: '🏆 Resolvedor Senior',
      description: 'Resolver 5 o más ejercicios interactivos de código.',
      icon: '🎯',
      unlocked: solvedExerciseIds.length >= 5,
      xpReward: 100,
      category: 'c_course',
    },
    {
      id: 'top_5_leaderboard',
      title: '🥇 Top 5 del Ránking',
      description: 'Alcanzar una posición entre los primeros 5 puestos de la comunidad.',
      icon: '🌟',
      unlocked: userRank <= 5,
      xpReward: 100,
      category: 'general',
    },
  ];
}

// Simulated Classmate/Community Leaderboard Members
export const DEFAULT_COMMUNITY_MEMBERS: LeaderboardEntry[] = [
  {
    id: 'user-matias',
    name: 'Matías Valenzuela',
    university: 'UTFSM (Santamaría)',
    avatar: '🐱‍💻',
    xp: 1250,
    level: 13,
    streakDays: 8,
    solvedCount: 16,
    badgeCount: 6,
    title: 'Leyenda Cormen (CLRS)',
  },
  {
    id: 'user-lautaro',
    name: 'Lautaro Barriga',
    university: 'UTFSM (Santamaría)',
    avatar: '⚡',
    xp: 1080,
    level: 11,
    streakDays: 7,
    solvedCount: 14,
    badgeCount: 5,
    title: 'Arquitecto Algorítmico',
  },
  {
    id: 'user-valentina',
    name: 'Valentina Ríos',
    university: 'U. de Chile',
    avatar: '🧙‍♂️',
    xp: 980,
    level: 10,
    streakDays: 6,
    solvedCount: 12,
    badgeCount: 5,
    title: 'Arquitecto Algorítmico',
  },
  {
    id: 'user-camila',
    name: 'Camila Silva',
    university: 'PUC (Católica)',
    avatar: '🧙‍♂️',
    xp: 760,
    level: 8,
    streakDays: 4,
    solvedCount: 9,
    badgeCount: 4,
    title: 'Maestro de Árboles',
  },
  {
    id: 'user-diego',
    name: 'Diego Araya',
    university: 'U. de Valparaíso',
    avatar: '🎯',
    xp: 540,
    level: 6,
    streakDays: 3,
    solvedCount: 7,
    badgeCount: 3,
    title: 'Artesano de Punteros',
  },
  {
    id: 'user-felipe',
    name: 'Felipe Morales',
    university: 'USACH',
    avatar: '🥷',
    xp: 380,
    level: 4,
    streakDays: 2,
    solvedCount: 4,
    badgeCount: 2,
    title: 'Analista Big-O',
  },
  {
    id: 'user-isadora',
    name: 'Isadora Torres',
    university: 'U. de Concepción',
    avatar: '📚',
    xp: 220,
    level: 3,
    streakDays: 1,
    solvedCount: 2,
    badgeCount: 1,
    title: 'Iniciando en C',
  },
  {
    id: 'user-sebastian',
    name: 'Sebastián Bravo',
    university: 'UDP (Diego Portales)',
    avatar: '🌱',
    xp: 110,
    level: 2,
    streakDays: 1,
    solvedCount: 1,
    badgeCount: 1,
    title: 'Iniciando en C',
  },
];
