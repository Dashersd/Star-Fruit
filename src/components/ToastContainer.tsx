'use client';

import { useToast } from '@/context/ToastContext';
import { CheckCircle2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();
  // Don't render until mounted to prevent hydration errors
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-forest-800/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5),_0_0_15px_rgba(0,168,126,0.1)] text-white px-5 py-4 rounded-xl transform transition-all duration-500 animate-in slide-in-from-bottom-5 fade-in max-w-sm"
        >
          <CheckCircle2 className="text-sf-400 shrink-0" size={20} />
          <p className="text-sm font-medium flex-1 leading-tight">{toast.message}</p>
          <button 
            onClick={() => removeToast(toast.id)}
            className="text-ink-500 hover:text-white transition-colors p-1"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
