import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { CERTAMENES_DATA, CertamenItem } from '../data/certamenesData';
import { CertamenModal } from './CertamenModal';
import { exportCertamenPDF } from '../utils/exportSummary';
import {
  FileText,
  Search,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  BookOpen,
  Layers,
  Award,
  Download,
  Eye,
  Printer
} from 'lucide-react';

export const CertamenesSection: React.FC = () => {
  const [selectedCertamen, setSelectedCertamen] = useState<CertamenItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('todos');

  // Collect unique topics
  const allTopics = useMemo(() => {
    const set = new Set<string>();
    CERTAMENES_DATA.forEach((c) => c.topics.forEach((t) => set.add(t)));
    return ['todos', ...Array.from(set)];
  }, []);

  // Filter certamenes
  const filteredCertamenes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return CERTAMENES_DATA.filter((cert) => {
      const matchesSearch =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.professor.toLowerCase().includes(q) ||
        cert.semester.toLowerCase().includes(q) ||
        cert.summary.toLowerCase().includes(q) ||
        cert.topics.some((t) => t.toLowerCase().includes(q));

      const matchesTopic =
        selectedTopic === 'todos' || cert.topics.includes(selectedTopic);

      return matchesSearch && matchesTopic;
    });
  }, [searchQuery, selectedTopic]);

  return (
    <div className="space-y-6 pt-2">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E2DE] pb-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C] text-[11px] font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Banco de Exámenes Reales &amp; Pautas Universitarias</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
            Certámenes &amp; PDF's de Algorítmica (USM / ELO320)
          </h2>
          <p className="text-xs sm:text-sm text-[#4A4742] max-w-2xl">
            Colección de pruebas históricas con enunciados completos, soluciones en C99, análisis de fugas de memoria y descarga en formato PDF listo para imprimir.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tema, profesor, año..."
              className="w-full bg-white border border-[#E5E2DE] focus:border-[#C2410C] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1A1A1A] outline-none transition-colors"
            />
          </div>

          {/* Topic Dropdown Filter */}
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="bg-white border border-[#E5E2DE] focus:border-[#C2410C] rounded-xl px-3 py-2 text-xs font-semibold text-[#1A1A1A] outline-none transition-colors cursor-pointer"
          >
            {allTopics.map((t) => (
              <option key={t} value={t}>
                {t === 'todos' ? '📚 Todos los Temas' : `• ${t}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Certamen Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCertamenes.map((cert) => (
          <motion.div
            key={cert.id}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white border-2 border-[#E5E2DE] hover:border-[#C2410C] rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group space-y-4 relative overflow-hidden"
          >
            {/* Top Badge & Semester */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold text-[#C2410C] bg-[#FFF7ED] border border-[#FDBA74] px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  {cert.semester}
                </span>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  cert.difficulty === 'Alta' || cert.difficulty === 'Avanzada'
                    ? 'bg-[#FEF2F2] text-[#EF4444] border border-[#FCA5A5]'
                    : 'bg-[#ECFDF5] text-[#10B981] border border-[#6EE7B7]'
                }`}>
                  {cert.difficulty}
                </span>
              </div>

              {/* Title & Professor */}
              <div className="space-y-1">
                <h3 
                  onClick={() => setSelectedCertamen(cert)}
                  className="text-base font-serif font-bold text-[#1A1A1A] group-hover:text-[#C2410C] transition-colors leading-snug cursor-pointer"
                >
                  {cert.title}
                </h3>
                <div className="text-xs text-[#666] flex items-center gap-1.5 pt-0.5">
                  <User className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>{cert.professor}</span>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-xs text-[#4A4742] line-clamp-2 leading-relaxed">
                {cert.summary}
              </p>

              {/* Topics Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cert.topics.slice(0, 3).map((topic, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium bg-[#F2F1EE] text-[#4A4742] border border-[#E5E2DE] px-2 py-0.5 rounded-md"
                  >
                    {topic}
                  </span>
                ))}
                {cert.topics.length > 3 && (
                  <span className="text-[10px] font-bold text-[#C2410C] px-1 py-0.5">
                    +{cert.topics.length - 3} más
                  </span>
                )}
              </div>
            </div>

            {/* Card Footer Actions: Ver Pauta & Descargar PDF */}
            <div className="pt-3 border-t border-[#F2F1EE] flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedCertamen(cert)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FFF7ED] hover:bg-[#FFEAD5] text-[#C2410C] border border-[#FDBA74] text-xs font-bold transition-colors cursor-pointer"
                title="Ver preguntas y soluciones interactivas"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver Pauta</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  exportCertamenPDF(cert);
                }}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#1A1A1A] hover:bg-[#33312E] text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                title="Generar y descargar documento PDF oficial"
              >
                <Download className="w-3.5 h-3.5 text-[#FDBA74]" />
                <span className="font-mono text-[11px]">PDF</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCertamenes.length === 0 && (
        <div className="text-center py-10 bg-[#FAFAFA] border border-dashed border-[#E5E2DE] rounded-2xl text-xs text-[#666] space-y-2">
          <BookOpen className="w-8 h-8 text-[#888] mx-auto" />
          <p className="font-bold text-[#1A1A1A]">No se encontraron certámenes con ese filtro.</p>
          <p>Prueba buscando otro término o cambiando la categoría.</p>
        </div>
      )}

      {/* Interactive Modal when a Certamen card is clicked */}
      <CertamenModal
        certamen={selectedCertamen}
        onClose={() => setSelectedCertamen(null)}
      />
    </div>
  );
};
