import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ className?: string; label?: string }> = ({
  className,
  label = 'Install App',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running in standalone mode, hide
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop prompt
  if (isInstallable) {
    return (
      <button
        id="pwa-install-btn"
        onClick={install}
        className={
          className ||
          'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition'
        }
      >
        <Download className="w-3.5 h-3.5" />
        <span>{label}</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          id="pwa-ios-install-btn"
          onClick={() => setShowIOSGuide(true)}
          className={
            className ||
            'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition'
          }
        >
          <Smartphone className="w-3.5 h-3.5 text-blue-700" />
          <span>Install on iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl border border-blue-100 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
                    CT
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Install Clear Title</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-blue-50/70 border border-blue-100">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <p>
                    Tap the <strong>Share</strong> icon in the Safari toolbar at the bottom of your screen.
                  </p>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-blue-50/70 border border-blue-100">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <p>
                    Scroll down and select <strong>Add to Home Screen</strong>.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-lg bg-blue-900 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
