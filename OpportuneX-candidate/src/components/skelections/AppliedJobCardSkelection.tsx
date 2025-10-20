import { motion } from "framer-motion";
const AppliedJobCardSkelection = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 shadow-lg"
    >
      <div className="animate-pulse space-y-4">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-zinc-800" />
            <div>
              <div className="h-4 w-32 rounded bg-zinc-800" />
              <div className="mt-2 flex gap-2">
                <div className="h-3 w-20 rounded bg-zinc-800" />
                <div className="h-3 w-16 rounded bg-zinc-800" />
              </div>
            </div>
          </div>
          <div className="h-6 w-16 rounded-full bg-zinc-800" />
        </div>

        {/* Description */}
        <div className="h-3 w-full rounded bg-zinc-800" />
        <div className="h-3 w-2/3 rounded bg-zinc-800" />

        {/* Tags */}
        <div className="mt-3 flex gap-2">
          <div className="h-6 w-20 rounded-full bg-zinc-800" />
          <div className="h-6 w-20 rounded-full bg-zinc-800" />
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between">
          <div className="h-4 w-32 rounded bg-zinc-800" />
          <div className="flex gap-2">
            <div className="h-8 w-20 rounded-lg bg-zinc-800" />
            <div className="h-8 w-24 rounded-lg bg-zinc-800" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AppliedJobCardSkelection;
