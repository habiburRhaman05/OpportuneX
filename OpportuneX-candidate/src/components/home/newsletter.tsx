"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-15" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600/40 via-zinc-900/50 to-blue-600/40 backdrop-blur-xl border border-blue-400/30 p-12 md:p-16">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 py-2">
                <Mail className="text-blue-400 w-4 h-4" />
                <span className="text-sm text-blue-300">Stay Updated</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Get the best opportunities in your inbox</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss out on exciting job opportunities, career tips, and industry
              insights.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-400/50 transition"
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 h-auto whitespace-nowrap"
            >
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Success message */}
          {isSubmitted && (
            <div className="mt-6 p-4 bg-green-500/20 border border-green-400/50 rounded-lg text-center text-green-300 animate-pulse">
              ✓ Thank you! Check your email for confirmation.
            </div>
          )}

          {/* Privacy note */}
          <p className="text-center text-xs text-gray-400 mt-6">We respect your privacy. Unsubscribe at any time.</p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/30 transition">
            <div className="text-2xl mb-2">📧</div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-white font-semibold text-sm mt-1">support@jobportal.com</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/30 transition">
            <div className="text-2xl mb-2">💬</div>
            <p className="text-sm text-gray-400">Live Chat</p>
            <p className="text-white font-semibold text-sm mt-1">24/7 Available</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/30 transition">
            <div className="text-2xl mb-2">📱</div>
            <p className="text-sm text-gray-400">Phone</p>
            <p className="text-white font-semibold text-sm mt-1">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </section>
  )
}
