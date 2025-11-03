import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, Briefcase, Building2, TrendingUp } from "lucide-react";
import type React from "react";

const stats = [
  {
    label: "Active Candidates",
    value: 250,
    suffix: "K+",
    icon: <Users className="w-7 h-7 sm:w-8 sm:h-8" />,
    delay: 0,
  },
  {
    label: "Jobs Posted",
    value: 50,
    suffix: "K+",
    icon: <Briefcase className="w-7 h-7 sm:w-8 sm:h-8" />,
    delay: 0.1,
  },
  {
    label: "Companies Hiring",
    value: 5,
    suffix: "K+",
    icon: <Building2 className="w-7 h-7 sm:w-8 sm:h-8" />,
    delay: 0.2,
  },
  {
    label: "Success Rate",
    value: 95,
    suffix: "%",
    icon: <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8" />,
    delay: 0.3,
  },
];

function CountUpNumber({
  target,
  duration = 2000,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setHasStarted(true),
      { threshold: 0.4 }
    );
    const el = document.getElementById("stats-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <span>{count}</span>;
}

export default function StatsSection() {
  return (
    <section
      id="stats-section"
      className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-zinc-950"
    >
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-16 px-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
          By The Numbers
        </h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg">
          Our impact in connecting talent with opportunities
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: stat.delay,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-zinc-800/40 border border-zinc-700/50 
                       p-6 sm:p-8 flex flex-col items-center text-center 
                       hover:border-blue-400/60 transition-all duration-500 
                       hover:shadow-lg hover:shadow-blue-500/20"
          >
            {/* Icon */}
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-500/10 border border-blue-400/30 
                            flex items-center justify-center text-blue-400 
                            group-hover:scale-110 transition-transform duration-300"
            >
              {stat.icon}
            </div>

            {/* Text */}
            <div className="mt-4 sm:mt-6">
              <p className="text-sm sm:text-base text-gray-400 mb-1">
                {stat.label}
              </p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                <CountUpNumber target={stat.value} />
                <span className="text-xl sm:text-2xl text-blue-400 ml-1">
                  {stat.suffix}
                </span>
              </p>
            </div>

            {/* Glass Hover Glow */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-400/10 to-transparent 
                            opacity-0 group-hover:opacity-40 transition-opacity duration-500"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
