import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className=" bg-zinc-950 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-zinc-900 border border-red-500/30 rounded-2xl p-8 backdrop-blur-xl shadow-lg text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Unable to Load Company
          </h2>
          <p className="text-zinc-400 text-sm mb-6">{message}</p>
          <button
            onClick={onRetry}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Create New Company
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 text-zinc-700 mx-auto mb-4 flex items-center justify-center">
        {Icon}
      </div>
      <p className="text-white font-medium mb-1">{title}</p>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  );
}
