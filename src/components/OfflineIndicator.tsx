import React from 'react';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface OfflineIndicatorProps {
  pendingSyncCount?: number;
  onTriggerSync?: () => void;
  isSyncing?: boolean;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  pendingSyncCount = 0,
  onTriggerSync,
  isSyncing = false,
}) => {
  const isOnline = useOnlineStatus();

  if (isOnline && pendingSyncCount === 0) {
    return null;
  }

  if (!isOnline) {
    return (
      <div
        id="offline-banner"
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2.5 rounded-lg bg-slate-900 border border-blue-500/40 px-3.5 py-2 text-xs font-medium text-white shadow-xl max-w-sm"
      >
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
        </span>
        <WifiOff className="w-4 h-4 text-blue-300 shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-white">Offline Mode Active</p>
          <p className="text-slate-300 text-[11px] leading-tight">
            Viewing cached land records. {pendingSyncCount > 0 ? `${pendingSyncCount} action(s) queued for sync.` : 'Changes will sync automatically.'}
          </p>
        </div>
      </div>
    );
  }

  // Back online with pending items to sync
  return (
    <div
      id="online-sync-banner"
      className="fixed bottom-4 left-4 z-40 flex items-center gap-2.5 rounded-lg bg-blue-900 text-white border border-blue-400/30 px-3.5 py-2 text-xs shadow-xl max-w-sm animate-in fade-in"
    >
      <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0" />
      <div className="flex-1">
        <p className="font-semibold">Back Online</p>
        <p className="text-blue-100 text-[11px]">
          {pendingSyncCount} verification/document updates ready to sync.
        </p>
      </div>
      {onTriggerSync && (
        <button
          onClick={onTriggerSync}
          disabled={isSyncing}
          className="ml-2 flex items-center gap-1 bg-white text-blue-900 px-2.5 py-1 rounded text-[11px] font-bold hover:bg-blue-50 transition shrink-0"
        >
          <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Syncing...' : 'Sync Now'}
        </button>
      )}
    </div>
  );
};
