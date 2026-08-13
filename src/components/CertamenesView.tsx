import React from 'react';
import { CertamenesSection } from './CertamenesSection';
import { LayoutDashboard, FileText, ArrowLeft, Download, Printer, Sparkles, BookOpen } from 'lucide-react';

interface CertamenesViewProps {
  onBackToDashboard: () => void;
}

export const CertamenesView: React.FC<CertamenesViewProps> = ({ onBackToDashboard }) => {
  return (
    <div className="flex-1 bg-white text-[#1A1A1A] overflow-y-auto p-4 sm:p-8 lg:p-12 relative selection:bg-[#C2410C] selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-4">
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#F2F1EE] hover:bg-[#E5E2DE] text-[#1A1A1A] rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#C2410C]" />
            <span>Volver al Menú Principal</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#666]">
            <FileText className="w-4 h-4 text-[#C2410C]" />
            <span className="font-semibold text-[#1A1A1A]">Pautas Oficiales C99 &amp; Soluciones USM</span>
          </div>
        </div>

        {/* Informative Header Banner */}
        <div className="bg-[#FFF7ED] border-2 border-[#FDBA74] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#FDBA74] rounded-full text-[#C2410C] text-[11px] font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Repositorio Académico UTFSM (ELO320)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A]">
                Banco de Certámenes &amp; Guías en Formato PDF
              </h1>
              <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed">
                Descarga e imprime los certámenes oficiales con pautas de corrección, código en ANSI C (C99), diagramas de memoria y puntajes por pregunta.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="p-4 bg-white border border-[#FDBA74] rounded-2xl flex items-center gap-3 text-xs font-mono font-bold text-[#C2410C] shadow-2xs">
                <Printer className="w-5 h-5" />
                <div>
                  <span className="block text-sm font-bold text-[#1A1A1A]">Exportación PDF</span>
                  <span className="text-[10px] text-[#8C8882]">Lista para Impresión A4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certamenes Main Section */}
        <CertamenesSection />
      </div>
    </div>
  );
};

