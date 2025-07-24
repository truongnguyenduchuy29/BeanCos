import React, { useEffect } from 'react';
import { CheckCircle, Copy } from 'lucide-react';

interface ToastModalProps {
  isOpen: boolean;
  message: string;
  voucherCode?: string;
  onClose: () => void;
  duration?: number;
}

const ToastModal: React.FC<ToastModalProps> = ({
  isOpen,
  message,
  voucherCode,
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      // Add CSS animation to head
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translate(-50%, -100%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
        }
        @keyframes slideOutUp {
          from {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -100%) scale(0.8);
          }
        }
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .toast-enter {
          animation: slideInDown 0.5s ease-out forwards;
        }
        .toast-exit {
          animation: slideOutUp 0.3s ease-in forwards;
        }
        .progress-shrink {
          animation: shrink ${duration}ms linear forwards;
        }
      `;
      document.head.appendChild(style);

      return () => {
        clearTimeout(timer);
        try {
          document.head.removeChild(style);
        } catch {
          // Ignore error if style already removed
        }
      };
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none">
      <div className="fixed top-6 left-1/2 pointer-events-auto toast-enter">
        <div className="bg-white rounded-xl shadow-2xl border border-green-200 p-5 max-w-sm w-full mx-4 backdrop-blur-sm bg-white/95">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-green-800 font-semibold text-lg mb-1">
                {message}
              </p>
              {voucherCode && (
                <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <Copy className="w-4 h-4 text-green-600" />
                    <p className="text-sm text-green-700 font-mono font-semibold flex-1">
                      {voucherCode}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-1 mt-2">
                <span className="text-sm text-gray-600">🎁</span>
                <p className="text-xs text-gray-600">
                  Voucher mới đã được tạo!
                </p>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 w-full bg-gray-200/50 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-green-400 to-green-600 h-1.5 rounded-full progress-shrink"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastModal;
