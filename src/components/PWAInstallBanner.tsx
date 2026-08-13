import React, { useState, useEffect } from 'react';
import { Smartphone, Download, WifiOff, Check, X, ShieldCheck, Sparkles, ChevronRight, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [showIOSGuide, setShowIOSGuide] = useState<boolean>(false);

  useEffect(() => {
    // Check if offline
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iosDevice);

    // Check standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    if (isStandalone) {
      setIsInstalled(true);
    }

    // Capture PWA Install Prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Capture appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowBanner(false);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  return (
    <>
      {/* Offline Status Top Bar Indicator */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#181825] border-b border-[#313244] text-[#F97316] px-4 py-2 text-xs font-mono font-bold flex items-center justify-between shadow-xs sticky top-0 z-50"
          >
            <div className="flex items-center gap-2 mx-auto">
              <WifiOff className="w-4 h-4 text-[#F97316] animate-pulse" />
              <span>
                ⚡ <strong>Modo Offline Activo:</strong> Estás sin conexión, pero la plataforma, simuladores y teoría funcionan al 100%.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating PWA Install Banner for Mobile & Desktop when prompt available */}
      <AnimatePresence>
        {!isInstalled && showBanner && (deferredPrompt || isIOS) && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-40 bg-white border-2 border-[#C2410C] rounded-2xl p-4 shadow-2xl space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#FFF7ED] text-[#C2410C] rounded-xl border border-[#FDBA74] shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#1A1A1A] flex items-center gap-1.5">
                    <span>Instalar App Cormen CLRS</span>
                    <span className="text-[10px] font-mono bg-[#FFF7ED] text-[#C2410C] px-1.5 py-0.5 rounded border border-[#FDBA74] uppercase">
                      PWA Offline
                    </span>
                  </h4>
                  <p className="text-xs text-[#4A4742] leading-tight mt-0.5">
                    Añade a tu pantalla de inicio para estudiar sin consumir datos en el metro o la universidad.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowBanner(false)}
                className="p-1 text-[#8C8882] hover:text-[#1A1A1A] rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#E5E2DE]">
              <button
                onClick={() => setShowBanner(false)}
                className="px-3 py-1.5 text-xs font-semibold text-[#8C8882] hover:text-[#1A1A1A] transition"
              >
                Más Tarde
              </button>

              <button
                onClick={handleInstallClick}
                className="px-4 py-1.5 bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isIOS ? '¿Cómo Instalar en iOS?' : 'Instalar App Ahora'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Guide for iOS Safari Install */}
      <AnimatePresence>
        {showIOSGuide && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-[#E5E2DE] rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#C2410C]" />
                  <h3 className="text-base font-serif font-bold text-[#1A1A1A]">
                    Instalar en iPhone / iPad
                  </h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-[#8C8882] hover:text-[#1A1A1A] rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-[#4A4742]">
                <p>
                  Para usar la aplicación 100% offline desde tu pantalla de inicio en iOS:
                </p>
                <ol className="space-y-2 list-decimal list-inside font-medium bg-[#F9F8F6] p-3.5 rounded-2xl border border-[#E5E2DE]">
                  <li>
                    Presiona el botón <strong>Compartir <Share className="w-3.5 h-3.5 inline text-[#007AFF]" /></strong> en Safari.
                  </li>
                  <li>
                    Desplaza hacia abajo y selecciona <strong>"Añadir a la pantalla de inicio"</strong>.
                  </li>
                  <li>
                    Presiona <strong>"Añadir"</strong> en la esquina superior derecha.
                  </li>
                </ol>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#33312E] text-white rounded-xl text-xs font-bold transition"
              >
                Entendido
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
