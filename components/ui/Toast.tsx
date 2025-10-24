import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';
import { ToastMessage } from '@/context/ToastContext';

interface ToastProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

const icons = {
  success: <CheckCircle className="text-green-500" />,
  error: <AlertTriangle className="text-red-500" />,
};

const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000); // Auto-dismiss after 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.5 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="mb-4"
    >
      <div className="bg-white/80 backdrop-blur-md border border-white/30 shadow-glass rounded-xl p-4 flex items-center">
        <div className="flex-shrink-0 mr-3">
          {icons[toast.type]}
        </div>
        <div className="flex-grow">
          <p className="font-bold text-brand-navy">{toast.title}</p>
          {toast.message && <p className="text-sm text-gray-600">{toast.message}</p>}
        </div>
        <button onClick={() => onDismiss(toast.id)} className="ml-4 p-1 rounded-full text-gray-500 hover:bg-gray-200/50 transition">
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, onDismiss }: { toasts: ToastMessage[], onDismiss: (id: string) => void }) => {
  return (
    <div className="fixed top-24 right-4 z-[100] w-full max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};
