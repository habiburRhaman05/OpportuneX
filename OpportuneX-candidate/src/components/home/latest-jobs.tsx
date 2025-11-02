import Autoplay from "embla-carousel-autoplay";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Eye,
  MapPin,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkeletonJobCard } from "../skelections/skeleton-loader";

import "swiper/css";
import "swiper/css/navigation";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

/**
 * 🧠 LatestJobs Section
 * English: Displays the latest job posts with auto-play + swipe support using Swiper and shadcn/ui.
 * বাংলা: Swiper ও shadcn/ui ব্যবহার করে সর্বশেষ চাকরিগুলির একটি স্বয়ংক্রিয়ভাবে ঘুরতে থাকা স্লাইডার দেখায়।
 */

const latestJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp",
    views: "8.2K",
    applications: "2,150",
    trend: "+28%",
    location: "San Francisco, CA",
    type: "Full-time",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Design Studio",
    views: "7.5K",
    applications: "1,890",
    trend: "+22%",
    location: "New York, NY",
    type: "Full-time",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "Cloud Innovations",
    views: "9.1K",
    applications: "2,420",
    trend: "+31%",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Growth Systems",
    views: "6.8K",
    applications: "1,750",
    trend: "+19%",
    location: "Boston, MA",
    type: "Full-time",
  },
  {
    id: 5,
    title: "Frontend Developer",
    company: "WebFlow",
    views: "7.2K",
    applications: "1,980",
    trend: "+25%",
    location: "Seattle, WA",
    type: "Full-time",
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "AI Lab",
    views: "8.9K",
    applications: "2,310",
    trend: "+26%",
    location: "Remote",
    type: "Full-time",
  },
];

export default function LatestJobs() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
              <TrendingUp className="text-blue-400" />
              Latest Opportunities
            </h2>
            <p className="text-gray-400">
              Freshly posted positions from top companies
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 text-lg">
            View All
          </Button>
        </div>

        {/* Slider */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonJobCard key={i} />
            ))}
          </div>
        ) : (
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
              {latestJobs.map((job, index) => (
                <CarouselItem key={job.id} className="basis-1/3">
                  <div
                    className="group relative overflow-hidden rounded-xl 
                  bg-gradient-to-br from-blue-500/20 via-zinc-900/50 to-transparent 
                  border border-blue-400/30 p-6 hover:border-blue-400/60 
                  transition-all duration-300 cursor-pointer hover:shadow-xl 
                  hover:shadow-blue-500/10 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="pt-4 space-y-6">
                      {/* Job Info */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-400">{job.company}</p>
                      </div>

                      {/* Location & Type */}
                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                          <MapPin
                            size={16}
                            className="text-blue-400 flex-shrink-0"
                          />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase
                            size={16}
                            className="text-blue-400 flex-shrink-0"
                          />
                          <span>{job.type}</span>
                        </div>
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

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/0 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </section>
  );
}
