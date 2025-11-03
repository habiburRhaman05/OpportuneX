import { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SkeletonTestimonial } from "../skelections/skeleton-loader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Developer",
    company: "Tech Innovations",
    image: "👩‍💼",
    text: "JobPortal helped me land my dream job in just 2 weeks. The platform is incredibly user-friendly and the job listings are always up-to-date.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "Digital Solutions",
    image: "👨‍💼",
    text: "As a hiring manager, I've found the best talent through JobPortal. The candidate quality is exceptional.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "Creative Agency",
    image: "👩‍🎨",
    text: "The filters and search capabilities are outstanding. I found exactly what I was looking for in no time!",
    rating: 5,
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Data Analyst",
    company: "Analytics Corp",
    image: "👨‍💻",
    text: "JobPortal's interface is sleek and modern. It makes job hunting feel less stressful and more enjoyable.",
    rating: 5,
  },
  {
    id: 5,
    name: "Aisha Rahman",
    role: "HR Executive",
    company: "TalentSphere",
    image: "👩‍💼",
    text: "As an HR professional, I love how easy it is to find qualified candidates fast. Highly recommend!",
    rating: 5,
  },
];

export default function Testimonials() {
  const [isLoading, setIsLoading] = useState(true);
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3 animate-fade-in">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Users Say
            </span>
          </h2>
          <p
            className="text-gray-400 animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            Thousands of successful placements and happy users
          </p>
        </div>

        {/* Carousel */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonTestimonial key={i} />
            ))}
          </div>
        ) : (
          <Carousel
            plugins={[autoplay.current]}
            className="w-full"
            opts={{ align: "start", loop: true }}
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="transition-all duration-500 animate-fade-in">
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 via-zinc-900/60 to-transparent backdrop-blur-md border border-blue-400/30 hover:border-blue-400/60 hover:shadow-[0_0_20px_rgba(0,123,255,0.3)] p-8 transition-all duration-300 h-full flex flex-col">
                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          )
                        )}
                      </div>

                      {/* Quote */}
                      <p className="text-gray-300 mb-6 flex-1 italic leading-relaxed">
                        "{testimonial.text}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                        <div className="text-3xl">{testimonial.image}</div>
                        <div>
                          <p className="text-white font-semibold">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {testimonial.role}
                          </p>
                          <p className="text-xs text-blue-400">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-6">
              <CarouselPrevious className="bg-zinc-800 hover:bg-blue-500/80 text-white rounded-full p-2 transition-all">
                <ChevronLeft className="h-5 w-5" />
              </CarouselPrevious>
              <CarouselNext className="bg-zinc-800 hover:bg-blue-500/80 text-white rounded-full p-2 transition-all">
                <ChevronRight className="h-5 w-5" />
              </CarouselNext>
            </div>
          </Carousel>
        )}
        {/* Mobile “View All” Button */}
        <div className="block sm:hidden text-center mt-2 mx-auto w-[160px]">
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-base w-full rounded-xl">
            More Testimonials
          </Button>
        </div>
      </div>
    </section>
  );
}
