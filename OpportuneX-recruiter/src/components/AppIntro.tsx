import { motion } from "framer-motion";

export default function AppIntro() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-white to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center text-center"
      >
        {/* Logo Circle */}
        <motion.div
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-700 to-zinc-500 dark:from-zinc-200 dark:to-zinc-400 flex items-center justify-center shadow-xl"
        >
          <span className="text-white dark:text-zinc-950 text-2xl font-bold">
            X
          </span>
        </motion.div>

        {/* App name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-6 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white"
        >
          OpportuneX
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-3 text-lg text-zinc-600 dark:text-zinc-300 max-w-md"
        >
          Where Talent Meets Opportunity
        </motion.p>
      </motion.div>
    </div>
  );
}
