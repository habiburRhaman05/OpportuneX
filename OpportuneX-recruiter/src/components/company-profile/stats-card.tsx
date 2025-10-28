import type React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend: string;
}

export default function StatsCard({
  icon,
  label,
  value,
  trend,
}: StatsCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 backdrop-blur-xl hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-300 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
          {icon}
        </div>
      </div>
      <p className="text-zinc-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-white mb-2">{value}</p>
      <p className="text-xs text-zinc-500">{trend}</p>
    </div>
  );
}
