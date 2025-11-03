import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, MapPin } from "lucide-react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative lg:pt-24 md:pt-16 pt-10 lg:pb-20 md:pb-14 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 right-10 w-60 sm:w-72 lg:w-96 h-60 sm:h-72 lg:h-96 bg-blue-500/30 rounded-full blur-3xl opacity-20 transition-transform duration-700"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div
          className="absolute bottom-20 left-10 w-72 sm:w-80 lg:w-96 h-72 sm:h-80 lg:h-96 bg-blue-600/20 rounded-full blur-3xl opacity-15 transition-transform duration-700"
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-8 animate-fade-in text-center md:text-left">
            <div className="inline-block">
              <div className="bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 py-2 flex items-center gap-2 mx-auto md:mx-0 w-fit">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-sm text-blue-300 flex items-center gap-x-2">
                  Welcome to the{" "}
                  <span className="text-blue-800 bg-white p-1 rounded-lg font-bold">
                    Opportune Hub
                  </span>
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Find Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Dream Job
              </span>{" "}
              Today
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Discover thousands of opportunities from top companies worldwide.
              Connect with employers actively looking for talent like you.
            </p>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Job title, keyword..."
                    className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-400/50 transition"
                  />
                </div>
                <div className="relative sm:w-44">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-400/50 transition"
                  />
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 h-auto text-sm sm:text-base">
                  Search
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-sm text-gray-400 text-center md:text-left">
                Popular: Design, Marketing, Development, Sales
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 sm:pt-8">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 sm:p-5">
                <p className="text-xl sm:text-2xl font-bold text-blue-400">
                  50K+
                </p>
                <p className="text-xs text-gray-400">Active Jobs</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 sm:p-5">
                <p className="text-xl sm:text-2xl font-bold text-blue-400">
                  5K+
                </p>
                <p className="text-xs text-gray-400">Companies</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 sm:p-5">
                <p className="text-xl sm:text-2xl font-bold text-blue-400">
                  100K+
                </p>
                <p className="text-xs text-gray-400">Placements</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <img
              src="/assets/hero-illustration.svg"
              alt="Job Search Illustration"
              className="max-w-xs sm:max-w-sm lg:max-w-md object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
