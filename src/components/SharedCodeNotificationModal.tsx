import React from 'react';
import { SharedCodePayload } from '../utils/codeSharing';
import { CSyntaxHighlighter } from './CSyntaxHighlighter';
import { Play, Code, Sparkles, X, Terminal, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SharedCodeNotificationModalProps {
  payload: SharedCodePayload | null;
  onAccept: (code: string) => void;
  onDismiss: () => void;
}

export const SharedCodeNotificationModal: React.FC<SharedCodeNotificationModalProps> = ({
  payload,
  onAccept,
  onDismiss,
}) => {
  if (!payload) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="bg-white border-2 border-[#C2410C] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Background Highlight */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FFF7ED] rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FFF7ED] text-[#C2410C] rounded-2xl border border-[#FDBA74] animate-bounce">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-[#C2410C] bg-[#FFF7ED] px-2 py-0.5 rounded-full border border-[#FDBA74] uppercase">
                  Enlace de Compartición Recibido
                </span>
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mt-0.5">
                  ¡Código C Compartido por un Compañero!
                </h3>
              </div>
            </div>

            <button
              onClick={onDismiss}
              className="p-1.5 text-[#8C8882] hover:text-[#1A1A1A] rounded-xl hover:bg-[#F2F1EE] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed">
            Te han enviado el siguiente programa en C (<strong>{payload.title || 'Solución Práctica'}</strong>) para probar, editar y compilar en vivo:
          </p>

          {/* Code Container */}
          <div className="max-h-52 overflow-y-auto rounded-2xl border border-[#313244] bg-[#181825] shadow-inner">
            <CSyntaxHighlighter code={payload.code} />
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={onDismiss}
              className="w-full sm:w-auto px-5 py-2.5 border border-[#E5E2DE] text-[#4A4742] hover:bg-[#F2F1EE] rounded-xl text-xs font-semibold transition"
            >
              Ignorar
            </button>

            <button
              onClick={() => onAccept(payload.code)}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Abrir &amp; Probaren Playground</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
