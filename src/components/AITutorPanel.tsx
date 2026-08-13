import React, { useState, useRef, useEffect } from 'react';
import { CourseItem, ChatMessage } from '../types';
import { Bot, Send, X, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface AITutorPanelProps {
  currentClass: CourseItem;
  userCode?: string;
  onClose: () => void;
  onNextClass?: () => void;
  initialPrompt?: string;
}

export const AITutorPanel: React.FC<AITutorPanelProps> = ({
  currentClass,
  userCode,
  onClose,
  onNextClass,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `¡Saludos! Soy tu Mentor IA de Algorítmica y Complejidad. 🎓
Estoy aquí para acompañarte paso a paso con el contenido de Cormen (CLRS).

Respecto a la **${currentClass.title}**, ¿tienes alguna pregunta, quisieras explorar una analogía diferente o revisar un ejercicio práctico?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMsg, setInputMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setLoading(true);

    // Trigger next class if user types "siguiente"
    if (text.toLowerCase().trim() === 'siguiente' && onNextClass) {
      onNextClass();
    }

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          currentClass: {
            title: currentClass.title,
            topic: currentClass.topic,
            cormenChapter: currentClass.cormenChapter,
          },
          userCode,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.text || 'Ocurrió un inconveniente al consultar con el Mentor.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: 'Hubo un error de comunicación. Por favor inténtalo de nuevo.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <aside className="w-full lg:w-96 bg-[#F9F8F6] border-l border-[#E5E2DE] text-[#1A1A1A] flex flex-col h-full shadow-lg z-40">
      {/* Header */}
      <div className="p-4 border-b border-[#E5E2DE] flex items-center justify-between bg-[#F9F8F6]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#FFF7ED] border border-[#FDBA74] rounded-xl text-[#C2410C]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-[#1A1A1A] flex items-center gap-1.5 text-base">
              Mentor Virtual
              <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
            </h3>
            <p className="text-[10px] uppercase tracking-wider text-[#8C8882] font-semibold">
              Soporte Académico CLRS
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-[#8C8882] hover:text-[#1A1A1A] hover:bg-[#F2F1EE] rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[88%] p-4 rounded-2xl text-xs leading-relaxed space-y-1.5 shadow-xs ${
                m.role === 'user'
                  ? 'bg-[#1A1A1A] text-white rounded-br-none'
                  : 'bg-white border border-[#E5E2DE] text-[#1A1A1A] rounded-bl-none font-sans'
              }`}
            >
              {m.role === 'user' ? (
                <p className="whitespace-pre-wrap">{m.text}</p>
              ) : (
                <MarkdownRenderer content={m.text} />
              )}
              <span
                className={`text-[9px] block text-right font-mono ${
                  m.role === 'user' ? 'text-stone-300' : 'text-[#8C8882]'
                }`}
              >
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#C2410C] font-mono italic p-3 bg-[#FFF7ED] rounded-xl border border-[#FDBA74] w-max">
            <Bot className="w-4 h-4 animate-bounce" />
            <span>El Mentor Virtual está elaborando la respuesta...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Pills */}
      <div className="px-3 py-2.5 border-t border-[#E5E2DE] bg-[#F9F8F6] flex flex-wrap gap-1.5">
        <button
          onClick={() => handleSendMessage('no entiendo este concepto')}
          className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1 bg-white hover:bg-[#FFF7ED] border border-[#E5E2DE] hover:border-[#FDBA74] text-[#4A4742] hover:text-[#C2410C] rounded-full transition flex items-center gap-1 shadow-xs"
        >
          <HelpCircle className="w-3 h-3 text-[#C2410C]" />
          <span>No entiendo</span>
        </button>

        <button
          onClick={() => handleSendMessage('explícalo con otra analogía sencilla')}
          className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1 bg-white hover:bg-[#FFF7ED] border border-[#E5E2DE] hover:border-[#FDBA74] text-[#4A4742] hover:text-[#C2410C] rounded-full transition flex items-center gap-1 shadow-xs"
        >
          <Sparkles className="w-3 h-3 text-[#C2410C]" />
          <span>Otra analogía</span>
        </button>

        <button
          onClick={() => handleSendMessage('siguiente')}
          className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1 bg-[#FFF7ED] hover:bg-[#FDBA74]/30 border border-[#FDBA74] text-[#C2410C] rounded-full transition flex items-center gap-1 shadow-xs"
        >
          <span>Siguiente clase</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 border-t border-[#E5E2DE] bg-[#F9F8F6] flex items-center gap-2"
      >
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Pregunta o escribe 'siguiente'..."
          className="flex-1 bg-white border border-[#E5E2DE] focus:border-[#C2410C] rounded-full px-4 py-2 text-xs text-[#1A1A1A] placeholder-[#8C8882] focus:outline-none font-sans shadow-xs"
        />
        <button
          type="submit"
          disabled={!inputMsg.trim() || loading}
          className="p-2.5 bg-[#C2410C] hover:bg-[#9A3412] disabled:opacity-40 text-white rounded-full transition shrink-0 shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </aside>
  );
};
