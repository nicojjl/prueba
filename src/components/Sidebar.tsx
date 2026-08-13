import React, { useState } from 'react';
import { CourseItem } from '../types';
import { BookOpen, Wrench, CheckCircle2, ChevronRight, Bookmark } from 'lucide-react';

interface SidebarProps {
  items: CourseItem[];
  selectedItemId: string;
  onSelectItem: (id: string) => void;
  completedItemIds: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  completedItemIds,
}) => {
  const [filter, setFilter] = useState<'all' | 'class' | 'workshop'>('all');

  const filteredItems = items.filter((item) => {
    if (filter === 'class') return item.type === 'class' || item.type === 'review';
    if (filter === 'workshop') return item.type === 'workshop';
    return true;
  });

  return (
    <aside className="w-full lg:w-80 h-[45vh] lg:h-auto max-h-[calc(100vh-4rem)] bg-[#F9F8F6] border-b lg:border-b-0 lg:border-r border-[#E5E2DE] text-[#1A1A1A] flex flex-col shrink-0 overflow-hidden">
      {/* Filter Tabs */}
      <div className="p-3 sm:p-4 border-b border-[#E5E2DE] bg-[#F9F8F6] shrink-0">
        <div className="grid grid-cols-3 gap-1 bg-[#F2F1EE] p-1 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`py-1.5 rounded-md transition ${
              filter === 'all'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#8C8882] hover:text-[#1A1A1A]'
            }`}
          >
            Todas ({items.length})
          </button>
          <button
            onClick={() => setFilter('class')}
            className={`py-1.5 rounded-md transition ${
              filter === 'class'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#8C8882] hover:text-[#1A1A1A]'
            }`}
          >
            Clases
          </button>
          <button
            onClick={() => setFilter('workshop')}
            className={`py-1.5 rounded-md transition ${
              filter === 'workshop'
                ? 'bg-[#1A1A1A] text-white shadow-xs'
                : 'text-[#8C8882] hover:text-[#1A1A1A]'
            }`}
          >
            Talleres
          </button>
        </div>
      </div>

      {/* Course List */}
      <div className="overflow-y-auto flex-1 min-h-0 p-3 space-y-1.5 scroll-smooth">
        {filteredItems.map((item) => {
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
                  <BookOpen className={`w-4 h-4 ${isSelected ? 'text-[#C2410C]' : 'text-[#8C8882]'}`} />
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

                <h3 className={`text-xs font-serif ${isSelected ? 'text-[#1A1A1A] font-bold text-sm' : 'text-[#4A4742] group-hover:text-[#1A1A1A]'} truncate`}>
                  {item.title}
                </h3>

                <p className="text-[11px] text-[#8C8882] truncate mt-0.5">
                  {item.topic}
                </p>

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
        })}
      </div>
    </aside>
  );
};
