import Autoplay from "embla-carousel-autoplay";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, TrendingUp, Eye } from "lucide-react";
import { Button } from "../ui/button";

import "swiper/css";
import "swiper/css/navigation";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

/**
 * 🧠 PopularJobs Section
 * English: Displays the most popular jobs in a Swiper slider with autoplay and drag/swipe support.
 * বাংলা: Swiper ব্যবহার করে জনপ্রিয় চাকরির স্লাইডার দেখায় — এটি নিজে নিজে চলবে এবং টাচ বা মাউস দিয়ে সোয়াইপ করা যাবে।
 */

const popularJobs = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Tech Giants Inc",
    views: "12.5K",
    applications: "3,420",
    trend: "+24%",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "AI Solutions",
    views: "10.2K",
    applications: "2,890",
    trend: "+18%",
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "Brand Co",
    views: "8.7K",
    applications: "2,156",
    trend: "+15%",
  },
  {
    id: 4,
    title: "Cloud Architect",
    company: "Cloud Native",
    views: "9.5K",
    applications: "2,450",
    trend: "+22%",
  },
  {
    id: 5,
    title: "Security Engineer",
    company: "CyberSecure",
    views: "7.8K",
    applications: "1,980",
    trend: "+19%",
  },
  {
    id: 6,
    title: "Product Designer",
    company: "Creative Studio",
    views: "6.4K",
    applications: "1,650",
    trend: "+12%",
  },
];

export default function PopularJobs() {
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration issues for Swiper in Next.js
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
              <TrendingUp className="text-blue-400" />
              Most Popular Jobs
            </h2>
            <p className="text-gray-400">
              Top positions with highest engagement
            </p>
          </div>

          {/* CTA Button */}
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 text-lg">
            View All
          </Button>
        </div>

        {/* Swiper Slider */}

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full "
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {popularJobs.map((job, index) => (
              <CarouselItem key={job.id} className="basis-1/3">
                <div
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br 
                from-blue-500/20 via-zinc-900/50 to-transparent border border-blue-400/30 
                p-6 hover:border-blue-400/60 transition-all duration-300 cursor-pointer 
                hover:shadow-xl hover:shadow-blue-500/10 animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Rank Badge */}
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>

                  {/* Job Details */}
                  <div className="pt-8 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-400">{job.company}</p>
                    </div>

                    {/* Stats */}
                    <div className="space-y-3 py-4 border-y border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Eye size={16} className="text-blue-400" />
                          <span className="text-sm">Views</span>
                        </div>
                        <span className="font-semibold text-white">
                          {job.views}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">
                          Applications
                        </span>
                        <span className="font-semibold text-white">
                          {job.applications}
                        </span>
                      </div>
                    </div>

                    {/* Trend */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        Interest Trend
                      </span>
                      <span className="flex items-center gap-1 text-green-400 font-semibold">
                        <TrendingUp size={16} />
                        {job.trend}
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-blue-600/0 via-transparent to-transparent 
                opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Jobs Cards */}

        {/* Navigation Arrows */}
      </div>
    </section>
  );
}
