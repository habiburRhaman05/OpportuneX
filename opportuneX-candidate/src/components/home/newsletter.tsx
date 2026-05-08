import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/30 rounded-full blur-3xl opacity-25" />
        <div className="absolute bottom-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/20 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600/30 via-zinc-900/60 to-blue-700/30 backdrop-blur-xl border border-blue-400/30 shadow-[0_0_30px_rgba(0,102,255,0.2)] p-8 sm:p-10 md:p-14 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 bg-blue-500/15 backdrop-blur-md border border-blue-400/30 rounded-full px-3 sm:px-4 py-2">
                <Mail className="text-blue-400 w-4 h-4" />
                <span className="text-sm text-blue-300">Stay Updated</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Get the best opportunities in your inbox
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss out on exciting job
              opportunities, career tips, and industry insights.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 bg-white/10 dark:bg-zinc-900/30 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-400/50 transition-all duration-300"
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 h-auto whitespace-nowrap transition-all duration-300"
            >
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {isSubmitted && (
            <div className="mt-6 p-4 bg-green-500/20 border border-green-400/50 rounded-lg text-center text-green-300 animate-pulse text-sm sm:text-base">
              ✓ Thank you! Check your email for confirmation.
            </div>
          )}

          <p className="text-center text-xs sm:text-sm text-gray-400 mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 sm:mt-12">
          {[
            { icon: "📧", label: "Email", value: "support@jobportal.com" },
            { icon: "💬", label: "Live Chat", value: "24/7 Available" },
            { icon: "📱", label: "Phone", value: "+1 (555) 123-4567" },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center p-5 sm:p-6 rounded-xl bg-white/5 dark:bg-zinc-900/30 backdrop-blur-md border border-white/10 hover:border-blue-400/30 hover:shadow-[0_0_20px_rgba(0,102,255,0.15)] transition-all duration-300"
            >
              <div className="text-xl sm:text-2xl mb-2">{item.icon}</div>
              <p className="text-sm text-gray-400">{item.label}</p>
              <p className="text-white font-semibold text-sm sm:text-base mt-1">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
