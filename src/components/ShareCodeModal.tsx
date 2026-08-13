import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  X,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Code,
  Terminal,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  encodeCodeToShareUrl,
  getWhatsAppShareLink,
  getDiscordShareText
} from '../utils/codeSharing';
import { CSyntaxHighlighter } from './CSyntaxHighlighter';

interface ShareCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  title?: string;
  exerciseId?: string;
}

export const ShareCodeModal: React.FC<ShareCodeModalProps> = ({
  isOpen,
  onClose,
  code,
  title = 'Solución C',
  exerciseId,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  if (!isOpen) return null;

  const shareUrl = encodeCodeToShareUrl(code, { title, exerciseId });
  const waUrl = getWhatsAppShareLink(shareUrl, title);
  const discordText = getDiscordShareText(code, shareUrl, title);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText(discordText);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white border border-[#E5E2DE] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Top Decorative Blur */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFF7ED] rounded-full blur-xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#FFF7ED] text-[#C2410C] rounded-2xl border border-[#FDBA74]">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">
                  Compartir Solución por Enlace
                </h3>
                <span className="text-xs font-mono text-[#8C8882] block">
                  {title}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#8C8882] hover:text-[#1A1A1A] rounded-xl hover:bg-[#F2F1EE] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shareable URL Box */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[#4A4742] block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
              <span>Enlace Directo Codificado (URL Hash):</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-[#F9F8F6] border border-[#E5E2DE] rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#1A1A1A] truncate focus:outline-none select-all"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-xs"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Enlace</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Quick Share Buttons */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#4A4742] block">
              Compartir en Redes y Mensajería:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* WhatsApp */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#DCFCE7] hover:bg-[#BBF7D0] border border-[#86EFAC] text-[#166534] rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4 text-[#16A34A]" />
                <span>Enviar por WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              {/* Discord / Telegram */}
              <button
                onClick={handleCopyDiscord}
                className="p-3 bg-[#EEF2FF] hover:bg-[#E0E7FF] border border-[#C7D2FE] text-[#3730A3] rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#4F46E5]" />
                <span>{copiedDiscord ? '¡Formato Copiado!' : 'Copiar p/ Discord'}</span>
              </button>
            </div>
          </div>

          {/* Code Preview snippet */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#4A4742] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#1A1A1A]" />
              <span>Vista Previa del Código C a Compartir:</span>
            </span>
            <div className="max-h-40 overflow-y-auto rounded-2xl border border-[#313244] bg-[#181825]">
              <CSyntaxHighlighter code={code} />
            </div>
          </div>

          {/* Close button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#33312E] text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
