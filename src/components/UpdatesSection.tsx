import React, { useState } from 'react';
import { Megaphone, Sparkles, ChevronDown, ChevronUp, Calendar, Tag, CheckCircle2, Zap } from 'lucide-react';
import { APP_UPDATES, AppUpdate } from '../data/updatesData';
import { motion, AnimatePresence } from 'motion/react';

export const UpdatesSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>('update-v3.0');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <div className="bg-white border-2 border-[#E5E2DE] rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
      {/* Decorative top accent gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C2410C] via-[#EA580C] to-[#10B981]" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E5E2DE]">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFF7ED] border border-[#FDBA74] rounded-2xl text-[#C2410C] shadow-xs shrink-0">
            <Megaphone className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1A1A1A]">
                Anuncios &amp; Nuevas Actualizaciones
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-[#C2410C] text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Oficial
              </span>
            </div>
            <p className="text-xs text-[#4A4742] mt-0.5 font-sans">
              Historial de mejoras, nuevas funcionalidades e integraciones académicas en la plataforma.
            </p>
          </div>
        </div>

        <div className="text-right text-xs text-[#8C8882] font-mono">
          <span>Versión Actual: </span>
          <strong className="text-[#C2410C] font-bold">v3.0 (13 Ago 2026)</strong>
        </div>
      </div>

      {/* List of Announcements */}
      <div className="space-y-4">
        {APP_UPDATES.map((update: AppUpdate) => {
          const isExpanded = expandedId === update.id;

          return (
            <div
              key={update.id}
              className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                update.isLatest
                  ? 'border-[#FDBA74] bg-[#FFF7ED]/30'
                  : 'border-[#E5E2DE] bg-[#F9F8F6]/50 hover:bg-[#F9F8F6]'
              }`}
            >
              {/* Header row / Clickable trigger */}
              <button
                onClick={() => toggleExpand(update.id)}
                className="w-full text-left p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#C2410C] text-white shrink-0">
                    {update.version}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#1A1A1A] group-hover:text-[#C2410C] transition-colors">
                        {update.title}
                      </h3>
                      {update.isLatest && (
                        <span className="text-[10px] font-mono font-bold bg-[#C2410C]/10 text-[#C2410C] border border-[#FDBA74] px-2 py-0.5 rounded-full uppercase tracking-wider">
                          ¡Nuevo!
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-[#8C8882] font-mono mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#C2410C]" />
                        {update.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#4A4742]">
                        <Tag className="w-3 h-3 text-[#C2410C]" />
                        {update.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#E5E2DE]">
                  <span className="text-xs text-[#C2410C] font-semibold group-hover:underline">
                    {isExpanded ? 'Ocultar detalles' : 'Ver novedades'}
                  </span>
                  <div className="p-1 rounded-lg bg-white border border-[#E5E2DE] text-[#4A4742]">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-[#E5E2DE] bg-white p-4 sm:p-6"
                  >
                    <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed mb-4">
                      {update.description}
                    </p>

                    <div className="bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-mono font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#C2410C]" />
                        Puntos Destacados de esta Actualización:
                      </h4>
                      <ul className="space-y-2 pt-1">
                        {update.highlights.map((highlight, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-xs text-[#1A1A1A] leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
