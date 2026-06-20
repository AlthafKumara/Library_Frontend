import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from '../../store/toastStore';
import { CheckCircle, WarningCircle, X } from '@phosphor-icons/react';

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-100 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast }) {
  const removeToast = useToastStore((state) => state.removeToast);
  const isSuccess = toast.type === 'success';
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30 
      }}
      className={`
        pointer-events-auto flex items-center gap-4 p-4 rounded-2xl 
        shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border backdrop-blur-md min-w-[320px] max-w-sm
        ${isSuccess 
          ? 'bg-success-500/10 border-success-500/20 text-success-600' 
          : 'bg-danger-500/10 border-danger-500/20 text-danger-600'
        }
      `}
    >
      <div className={`shrink-0 p-1.5 rounded-full ${isSuccess ? 'bg-success-500/20' : 'bg-danger-500/20'}`}>
        {isSuccess ? (
          <CheckCircle size={24} weight="fill" />
        ) : (
          <WarningCircle size={24} weight="fill" />
        )}
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <p className="text-[15px] font-semibold tracking-tight text-neutral-900 leading-tight">
          {isSuccess ? 'Success' : 'Error'}
        </p>
        <p className="text-sm font-medium tracking-tight opacity-90 truncate leading-tight mt-0.5">
          {toast.message}
        </p>
      </div>

      <button 
        onClick={() => removeToast(toast.id)}
        className={`shrink-0 p-1.5 rounded-lg transition-colors active:scale-[0.98]
          ${isSuccess ? 'hover:bg-success-500/20' : 'hover:bg-danger-500/20'}
        `}
      >
        <X size={16} weight="bold" />
      </button>
    </motion.div>
  );
}
