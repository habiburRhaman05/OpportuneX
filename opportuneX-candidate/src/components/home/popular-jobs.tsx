import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { TrendingUp, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

import "swiper/css";
import "swiper/css/navigation";

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

  // 🧩 Fix hydration issues for Embla carousel in Next.js
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="lg:py-16 py-8 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <TrendingUp className="text-blue-400" />
              Most Popular Jobs
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Top positions with highest engagement
            </p>
          </div>

          {/* Desktop “View All” Button */}
          <div className="hidden sm:block">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 text-base rounded-xl">
              View All
            </Button>
          </div>
        </div>

        {/* 🔁 Carousel Section */}
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
          plugins={[
            Autoplay({
              delay: 2500,
            }),
          ]}
        >
          <CarouselContent>
            {popularJobs.map((job, index) => (
              <CarouselItem
                key={job.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br 
                  from-blue-500/20 via-zinc-900/50 to-transparent border border-blue-400/30 
                  p-6 hover:border-blue-400/60 transition-all duration-300 cursor-pointer 
                  hover:shadow-xl hover:shadow-blue-500/10 animate-fade-in backdrop-blur-lg"
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
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 group-hover:text-blue-300 transition">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/0 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Mobile “View All” Button */}
        <div className="block sm:hidden text-center mt-2 mx-auto w-[120px]">
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-base w-full rounded-xl">
            View All
          </Button>
        </div>
      </div>
    </section>
  );
}
