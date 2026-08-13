import React, { useState } from 'react';
import { FileText, Download, Printer } from 'lucide-react';
import { SummaryExportPayload } from '../utils/exportSummary';
import { ExportSummaryModal } from './ExportSummaryModal';

interface ExportSummaryButtonProps {
  payload: SummaryExportPayload;
  variant?: 'default' | 'compact' | 'outline';
  className?: string;
}

export const ExportSummaryButton: React.FC<ExportSummaryButtonProps> = ({
  payload,
  variant = 'default',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  let btnStyle =
    'px-3.5 py-1.5 bg-[#FFF7ED] hover:bg-[#FFEDD5] text-[#C2410C] border border-[#FDBA74] rounded-full text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer';

  if (variant === 'compact') {
    btnStyle =
      'px-2.5 py-1 bg-white hover:bg-[#F2F1EE] text-[#C2410C] border border-[#E5E2DE] rounded-lg text-[11px] font-bold transition flex items-center gap-1 shadow-2xs cursor-pointer';
  } else if (variant === 'outline') {
    btnStyle =
      'px-3 py-1.5 bg-white hover:bg-[#F2F1EE] text-[#1A1A1A] border border-[#E5E2DE] rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer';
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`${btnStyle} ${className}`}
        title="Exportar resumen teórico y pseudocódigo CLRS a PDF o Markdown para estudiar"
      >
        <FileText className="w-3.5 h-3.5 text-[#C2410C]" />
        <span>Exportar Resumen (PDF/MD)</span>
      </button>

      <ExportSummaryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        payload={payload}
      />
    </>
  );
};
