import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SkeletonTestimonial } from "../skelections/skeleton-loader";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

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
    id: 4,
    name: "David Wilson",
    role: "Data Analyst",
    company: "Analytics Corp",
    image: "👨‍💻",
    text: "JobPortal's interface is sleek and modern. It makes job hunting feel less stressful and more enjoyable.",
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
    id: 4,
    name: "David Wilson",
    role: "Data Analyst",
    company: "Analytics Corp",
    image: "👨‍💻",
    text: "JobPortal's interface is sleek and modern. It makes job hunting feel less stressful and more enjoyable.",
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
];

export default function Testimonials() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
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

        {/* Testimonials Carousel */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonTestimonial key={i} />
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
            <CarouselContent className="">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="basis-1/3">
                  <div className="transition-all duration-500 animate-fade-in">
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600/30 to-transparent border border-blue-400/30 p-8 hover:border-blue-400/60 transition-all duration-300 h-full flex flex-col">
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
                      <p className="text-gray-300 mb-6 flex-1 italic">
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
          </Carousel>
        )}
      </div>
    </section>
  );
}
