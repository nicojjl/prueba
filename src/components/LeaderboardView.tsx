import React, { useState } from 'react';
import { UserProfile, LeaderboardEntry, Achievement } from '../types';
import {
  getLevelInfo,
  calculateUserXP,
  evaluateAchievements,
  DEFAULT_COMMUNITY_MEMBERS,
  AVATAR_OPTIONS,
  UNIVERSITY_OPTIONS
} from '../utils/gamification';
import {
  Trophy,
  Flame,
  Award,
  Zap,
  Edit3,
  Share2,
  CheckCircle2,
  Sparkles,
  Users,
  GraduationCap,
  X,
  Copy,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LeaderboardViewProps {
  completedItemIds: string[];
  solvedExerciseIds: string[];
  completedCSubtopics: string[];
  userProfile: UserProfile;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  completedItemIds,
  solvedExerciseIds,
  completedCSubtopics,
  userProfile,
  onUpdateProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'global' | 'university' | 'streaks' | 'achievements'>('global');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Form edit states
  const [editNickname, setEditNickname] = useState<string>(userProfile.nickname);
  const [editUniversity, setEditUniversity] = useState<string>(userProfile.university);
  const [editAvatar, setEditAvatar] = useState<string>(userProfile.avatar);

  // Calculate current user stats
  const userXP = calculateUserXP(
    completedItemIds,
    solvedExerciseIds,
    completedCSubtopics,
    userProfile.streakDays
  );

  const levelInfo = getLevelInfo(userXP);

  // Create list of all leaderboard entries (Community + Current User)
  const currentUserEntry: LeaderboardEntry = {
    id: 'current-user-me',
    name: userProfile.nickname || 'Estudiante Algorítmico',
    university: userProfile.university || 'U. de Chile',
    avatar: userProfile.avatar || '🧙‍♂️',
    xp: userXP,
    level: levelInfo.level,
    streakDays: userProfile.streakDays || 1,
    solvedCount: solvedExerciseIds.length,
    badgeCount: 0, // calculated below
    title: levelInfo.title,
    isCurrentUser: true,
  };

  // Combine and sort by XP descending
  const rawLeaderboard = [
    ...DEFAULT_COMMUNITY_MEMBERS,
    currentUserEntry,
  ];

  // Calculate ranks
  const sortedByXP = [...rawLeaderboard].sort((a, b) => b.xp - a.xp);
  const rankedLeaderboard = sortedByXP.map((entry, idx) => ({
    ...entry,
    rank: idx + 1,
  }));

  const myRank = rankedLeaderboard.find((entry) => entry.isCurrentUser)?.rank || 1;

  // Evaluate achievements for current user
  const userAchievements: Achievement[] = evaluateAchievements(
    completedItemIds,
    solvedExerciseIds,
    completedCSubtopics,
    userProfile.streakDays,
    myRank
  );

  const unlockedCount = userAchievements.filter((a) => a.unlocked).length;
  currentUserEntry.badgeCount = unlockedCount;

  // Filtered entries according to tab
  let displayedEntries = [...rankedLeaderboard];
  if (activeTab === 'university') {
    displayedEntries = displayedEntries.filter(
      (entry) => entry.university === userProfile.university || entry.isCurrentUser
    );
  } else if (activeTab === 'streaks') {
    displayedEntries.sort((a, b) => b.streakDays - a.streakDays);
    // re-index rank
    displayedEntries = displayedEntries.map((entry, idx) => ({ ...entry, rank: idx + 1 }));
  }

  // Handle profile save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      nickname: editNickname.trim() || 'Estudiante Algorítmico',
      university: editUniversity,
      avatar: editAvatar,
    });
    setIsEditModalOpen(false);
  };

  // Handle share ranking
  const handleShareRanking = () => {
    const text = `🏆 Mi Ránking en Algorítmica & Complejidad:\n` +
      `👤 ${currentUserEntry.name} (${currentUserEntry.university})\n` +
      `⚡ Nivel ${levelInfo.level} • ${userXP} XP | 🔥 Racha: ${userProfile.streakDays} días\n` +
      `🥇 Posición #${myRank} en la Tabla de Clasificación\n` +
      `🎖️ Insignias Desbloqueadas: ${unlockedCount}/${userAchievements.length}\n` +
      `🚀 ¡Aprende C y Algoritmos interactivamente aquí!`;

    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);
  };

  return (
    <div className="flex-1 bg-[#F9F8F6] text-[#1A1A1A] p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-8 selection:bg-[#C2410C] selection:text-white">
      {/* Top Banner: User Profile & XP Stats Card */}
      <div className="bg-white border border-[#E5E2DE] rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FFF7ED] rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          {/* User Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#FFF7ED] border-2 border-[#FDBA74] flex items-center justify-center text-4xl sm:text-5xl shadow-xs shrink-0">
                {userProfile.avatar || '🧙‍♂️'}
              </div>
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-mono font-bold rounded-full border border-white">
                Lvl {levelInfo.level}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
                  {userProfile.nickname || 'Estudiante Algorítmico'}
                </h1>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74] rounded-full">
                  {userProfile.university || 'U. de Chile'}
                </span>
              </div>

              <p className="text-xs text-[#8C8882] font-mono font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>{levelInfo.title}</span>
                <span className="text-[#D5D2CE]">•</span>
                <span>Posición #{myRank} General</span>
              </p>

              {/* XP Progress bar */}
              <div className="pt-2 w-full max-w-xs space-y-1">
                <div className="flex justify-between text-[11px] font-mono font-bold text-[#4A4742]">
                  <span>Progreso de Nivel</span>
                  <span className="text-[#C2410C]">{levelInfo.currentLevelXP} / {levelInfo.nextLevelXP} XP</span>
                </div>
                <div className="h-2 w-full bg-[#E5E2DE] rounded-full overflow-hidden p-0.5 border border-[#D5D2CE]">
                  <div
                    className="h-full bg-gradient-to-r from-[#C2410C] to-[#EA580C] rounded-full transition-all duration-500"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid & Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* XP Total */}
            <div className="flex-1 sm:flex-initial px-4 py-3 bg-[#F9F8F6] border border-[#E5E2DE] rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-[#FFF7ED] text-[#C2410C] rounded-xl border border-[#FDBA74]">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-lg font-mono font-bold text-[#1A1A1A] block leading-none">{userXP}</span>
                <span className="text-[10px] text-[#8C8882] font-bold uppercase tracking-wider">XP Ganados</span>
              </div>
            </div>

            {/* Streak */}
            <div className="flex-1 sm:flex-initial px-4 py-3 bg-[#F9F8F6] border border-[#E5E2DE] rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-[#FEF2F2] text-[#EF4444] rounded-xl border border-[#FCA5A5]">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-lg font-mono font-bold text-[#1A1A1A] block leading-none">{userProfile.streakDays} Días</span>
                <span className="text-[10px] text-[#8C8882] font-bold uppercase tracking-wider">Racha Activa</span>
              </div>
            </div>

            {/* Badges Count */}
            <div className="flex-1 sm:flex-initial px-4 py-3 bg-[#F9F8F6] border border-[#E5E2DE] rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-[#ECFDF5] text-[#10B981] rounded-xl border border-[#6EE7B7]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-mono font-bold text-[#1A1A1A] block leading-none">{unlockedCount}/{userAchievements.length}</span>
                <span className="text-[10px] text-[#8C8882] font-bold uppercase tracking-wider">Insignias</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex-1 sm:flex-none px-4 py-3 bg-[#1A1A1A] hover:bg-[#33312E] text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Edit3 className="w-4 h-4 text-[#FDBA74]" />
                <span>Editar Perfil</span>
              </button>

              <button
                onClick={handleShareRanking}
                className="flex-1 sm:flex-none px-4 py-3 bg-[#FFF7ED] hover:bg-[#FFEAD5] text-[#C2410C] border border-[#FDBA74] rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
                title="Copiar resumen del ránking para compartir"
              >
                {copiedShare ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Compartir</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Leaderboard Workspace Tabs */}
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E5E2DE] pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('global')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'global'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'bg-white text-[#4A4742] hover:bg-[#F2F1EE] border border-[#E5E2DE]'
            }`}
          >
            <Trophy className="w-4 h-4 text-[#FDBA74]" />
            <span>Ránking Global</span>
          </button>

          <button
            onClick={() => setActiveTab('university')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'university'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'bg-white text-[#4A4742] hover:bg-[#F2F1EE] border border-[#E5E2DE]'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#C2410C]" />
            <span>Mi Universidad ({userProfile.university || 'U. de Chile'})</span>
          </button>

          <button
            onClick={() => setActiveTab('streaks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'streaks'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'bg-white text-[#4A4742] hover:bg-[#F2F1EE] border border-[#E5E2DE]'
            }`}
          >
            <Flame className="w-4 h-4 text-[#EF4444]" />
            <span>Top Rachas de Estudio</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'achievements'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'bg-white text-[#4A4742] hover:bg-[#F2F1EE] border border-[#E5E2DE]'
            }`}
          >
            <Award className="w-4 h-4 text-[#10B981]" />
            <span>Mis Logros e Insignias ({unlockedCount}/{userAchievements.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'achievements' ? (
          /* Achievements Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  achievement.unlocked
                    ? 'bg-white border-[#FDBA74] shadow-xs hover:border-[#C2410C]'
                    : 'bg-[#F2F1EE]/50 border-[#E5E2DE] opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                    achievement.unlocked ? 'bg-[#FFF7ED] border border-[#FDBA74]' : 'bg-[#E5E2DE]'
                  }`}
                >
                  {achievement.icon}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-serif font-bold text-[#1A1A1A]">
                      {achievement.title}
                    </h3>
                    {achievement.unlocked ? (
                      <span className="text-[10px] font-mono font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#6EE7B7]">
                        + {achievement.xpReward} XP
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-semibold text-[#8C8882] bg-[#E5E2DE] px-2 py-0.5 rounded-full">
                        Bloqueado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#4A4742] leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Leaderboard Table */
          <div className="bg-white border border-[#E5E2DE] rounded-3xl overflow-hidden shadow-xs">
            <div className="p-4 sm:p-6 bg-[#F9F8F6] border-b border-[#E5E2DE] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#C2410C]" />
                <h2 className="text-lg font-serif font-bold text-[#1A1A1A]">
                  {activeTab === 'global' && 'Tabla de Clasificación de la Comunidad'}
                  {activeTab === 'university' && `Estudiantes en ${userProfile.university}`}
                  {activeTab === 'streaks' && 'Ranking por Días Consecutivos de Estudio'}
                </h2>
              </div>
              <span className="text-xs font-mono text-[#8C8882]">
                {displayedEntries.length} Estudiantes
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E2DE] bg-[#F2F1EE] text-[11px] font-mono font-bold uppercase tracking-wider text-[#8C8882]">
                    <th className="py-3.5 px-4 text-center w-16">Puesto</th>
                    <th className="py-3.5 px-4">Estudiante</th>
                    <th className="py-3.5 px-4">Universidad / Ciudad</th>
                    <th className="py-3.5 px-4 text-center">Racha</th>
                    <th className="py-3.5 px-4 text-center">Ejercicios</th>
                    <th className="py-3.5 px-4 text-right">Puntaje XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E2DE] text-xs">
                  {displayedEntries.map((entry) => {
                    const isUser = entry.isCurrentUser;
                    return (
                      <tr
                        key={entry.id}
                        className={`transition-colors ${
                          isUser
                            ? 'bg-[#FFF7ED] font-bold border-l-4 border-l-[#C2410C]'
                            : 'hover:bg-[#F9F8F6]'
                        }`}
                      >
                        {/* Rank */}
                        <td className="py-4 px-4 text-center font-mono font-bold text-sm">
                          {entry.rank === 1 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 bg-amber-100 text-amber-800 rounded-full border border-amber-300">
                              🥇
                            </span>
                          ) : entry.rank === 2 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 bg-slate-100 text-slate-800 rounded-full border border-slate-300">
                              🥈
                            </span>
                          ) : entry.rank === 3 ? (
                            <span className="inline-flex items-center justify-center w-7 h-7 bg-orange-100 text-amber-900 rounded-full border border-orange-300">
                              🥉
                            </span>
                          ) : (
                            <span className="text-[#8C8882]">#{entry.rank}</span>
                          )}
                        </td>

                        {/* Name & Avatar */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl p-1.5 bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl shrink-0">
                              {entry.avatar}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`font-semibold text-[#1A1A1A] ${isUser ? 'text-[#C2410C]' : ''}`}>
                                  {entry.name}
                                </span>
                                {isUser && (
                                  <span className="px-2 py-0.5 bg-[#C2410C] text-white text-[9px] font-mono uppercase font-bold rounded-full">
                                    TÚ
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-[#8C8882] block font-mono">
                                Lvl {entry.level} • {entry.title}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* University */}
                        <td className="py-4 px-4 text-[#4A4742] font-mono">
                          {entry.university}
                        </td>

                        {/* Streak */}
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center gap-1 font-mono font-bold text-[#EF4444] bg-[#FEF2F2] px-2.5 py-1 rounded-full border border-[#FCA5A5]">
                            <Flame className="w-3.5 h-3.5 fill-current" />
                            <span>{entry.streakDays}d</span>
                          </span>
                        </td>

                        {/* Solved Count */}
                        <td className="py-4 px-4 text-center font-mono font-semibold text-[#4A4742]">
                          {entry.solvedCount} resueltos
                        </td>

                        {/* XP */}
                        <td className="py-4 px-4 text-right font-mono font-bold text-sm text-[#C2410C]">
                          {entry.xp} XP
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-[#E5E2DE] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-4">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#C2410C]" />
                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">
                    Editar Mi Perfil de Estudiante
                  </h3>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1 text-[#8C8882] hover:text-[#1A1A1A] rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-5">
                {/* Nickname Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#4A4742] block">
                    Apodo / Nombre de Estudiante:
                  </label>
                  <input
                    type="text"
                    maxLength={30}
                    value={editNickname}
                    onChange={(e) => setEditNickname(e.target.value)}
                    className="w-full bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] font-semibold focus:outline-none focus:border-[#C2410C]"
                    placeholder="Ej. Nico_Dev"
                    required
                  />
                </div>

                {/* University Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-[#4A4742] block">
                    Universidad o Casa de Estudios:
                  </label>
                  <select
                    value={editUniversity}
                    onChange={(e) => setEditUniversity(e.target.value)}
                    className="w-full bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl px-3.5 py-2.5 text-xs text-[#1A1A1A] font-semibold focus:outline-none focus:border-[#C2410C]"
                  >
                    {UNIVERSITY_OPTIONS.map((uni) => (
                      <option key={uni} value={uni}>
                        {uni}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Avatar Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-[#4A4742] block">
                    Elige tu Avatar de la Comunidad:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {AVATAR_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setEditAvatar(opt.emoji)}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                          editAvatar === opt.emoji
                            ? 'border-[#C2410C] bg-[#FFF7ED] ring-2 ring-[#C2410C]/20'
                            : 'border-[#E5E2DE] bg-[#F9F8F6] hover:bg-[#F2F1EE]'
                        }`}
                      >
                        <span className="text-2xl">{opt.emoji}</span>
                        <span className="text-[10px] font-mono text-[#4A4742] truncate w-full">
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2.5 border border-[#E5E2DE] rounded-xl text-xs font-semibold text-[#4A4742] hover:bg-[#F2F1EE] transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
