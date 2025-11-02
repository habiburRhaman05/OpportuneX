"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Users, Briefcase, Building2, TrendingUp } from "lucide-react"

interface StatItem {
  label: string
  value: number
  suffix: string
  icon: React.ReactNode
  delay: number
}

const stats: StatItem[] = [
  {
    label: "Active Candidates",
    value: 250,
    suffix: "K+",
    icon: <Users className="w-8 h-8" />,
    delay: 0,
  },
  {
    label: "Jobs Posted",
    value: 50,
    suffix: "K+",
    icon: <Briefcase className="w-8 h-8" />,
    delay: 0.1,
  },
  {
    label: "Companies Hiring",
    value: 5,
    suffix: "K+",
    icon: <Building2 className="w-8 h-8" />,
    delay: 0.2,
  },
  {
    label: "Success Rate",
    value: 95,
    suffix: "%",
    icon: <TrendingUp className="w-8 h-8" />,
    delay: 0.3,
  },
]

function CountUpNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) return

    let current = 0
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [hasStarted, target, duration])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return <span>{count}</span>
}

export default function StatsSection() {
  return (
    <section id="stats-section" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-3">By The Numbers</h2>
          <p className="text-gray-400">Our impact in connecting talent with opportunities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-blue-600/30 via-zinc-900/30 to-transparent border border-blue-400/30 p-8 hover:border-blue-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 animate-fade-in"
              style={{
                animationDelay: `${stat.delay}s`,
              }}
            >
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-4xl font-bold text-white">
                    <CountUpNumber target={stat.value} />
                    <span className="text-2xl text-blue-400 ml-1">{stat.suffix}</span>
                  </p>
                </div>
              </div>

              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
