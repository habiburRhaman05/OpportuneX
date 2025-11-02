import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { SkeletonCompanyLogo } from "../skelections/skeleton-loader";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent } from "../ui/carousel";

const companies = [
  {
    name: "Advanced Chemical Industries Limited (ACI)",
    job: 265,
    slug: "advanced-chemical-industries-limited-aci-lXqpuzaQ",
    logo: "https://studio.skill.jobs/media/logo/ACI.png",
  },
  {
    name: "Walton Hi-Tech Industries PLC.",
    job: 260,
    slug: "walton-hi-tech-industries-plc-QycYHUGz",
    logo: "https://studio.skill.jobs/media/logo/walton.jpg",
  },
  {
    name: "Daffodil International University",
    job: 189,
    slug: "daffodil-international-university-jRuBTdMx",
    logo: "https://studio.skill.jobs/media/logo/Screenshot_2025-06-14_182114.png",
  },
  {
    name: "Bashundhara Group",
    job: 167,
    slug: "bashundhara-group-JDj0gAUM",
    logo: "https://studio.skill.jobs/media/logo/Bashundhara_Group.png",
  },
  {
    name: "BRAC",
    job: 161,
    slug: "brac-xObYpbH6",
    logo: "https://studio.skill.jobs/media/logo/logo_5.png",
  },
  {
    name: "Meghna Group of Industries",
    job: 135,
    slug: "meghna-group-of-industries-0k2wxIXV",
    logo: "https://studio.skill.jobs/media/logo/MGI_Logo.png",
  },
  {
    name: "Anwar Group of Industries.",
    job: 117,
    slug: "anwar-group-of-industries-lZdQNA9e",
    logo: "https://studio.skill.jobs/media/logo/anwar_big_logo.png",
  },
  {
    name: "BJIT Limited",
    job: 101,
    slug: "bjit-limited-wxQEFJjf",
    logo: "https://studio.skill.jobs/media/logo/BJIT_W4y9bUE.png",
  },
  {
    name: "DBL Group",
    job: 93,
    slug: "dbl-group-Rc2LmCWX",
    logo: "https://studio.skill.jobs/media/logo/logocir-1_cfne3Xd.png",
  },
  {
    name: "City Group",
    job: 77,
    slug: "city-group-73gilfIC",
    logo: "https://studio.skill.jobs/media/logo/city_group_logo.png",
  },
  {
    name: "Concord Group",
    job: 74,
    slug: "concord-group-FGZA65Ou",
    logo: "https://studio.skill.jobs/media/logo/download_1.jpg",
  },
  {
    name: "Walton Digi-Tech Industries Ltd.",
    job: 69,
    slug: "walton-digi-tech-industries-ltd-8rQFlKjs",
    logo: "https://studio.skill.jobs/media/logo/walton_F6HaX4q.jpg",
  },
  {
    name: "Akij Resources Limited",
    job: 69,
    slug: "akij-resources-limited-FQaDQXmk",
    logo: "https://studio.skill.jobs/media/logo/Screenshot_391.png",
  },
  {
    name: "Daffodil Polytechnic Institute",
    job: 68,
    slug: "daffodil-polytechnic-institute-Tk5kKJ8O",
    logo: "https://studio.skill.jobs/media/logo/DPI-logo.png",
  },
  {
    name: "SQ Group",
    job: 65,
    slug: "sq-group-0QTaToXx",
    logo: "https://studio.skill.jobs/media/logo/Screenshot_2023-02-04_154126.png",
  },
  {
    name: "ACI Motors Limited",
    job: 60,
    slug: "aci-motors-limited-XPBGNsfQ",
    logo: "https://studio.skill.jobs/media/logo/download_2_6J0WBr6.png",
  },
  {
    name: "Friendship",
    job: 59,
    slug: "friendship-5ea5YqDw",
    logo: "https://studio.skill.jobs/media/logo/frienddddddddddd.png",
  },
  {
    name: "M & J Group",
    job: 50,
    slug: "m-j-group-wGUnzroH",
    logo: "https://studio.skill.jobs/media/logo/mjLogo.png",
  },
  {
    name: "PRAN-RFL Group",
    job: 47,
    slug: "pran-rfl-group-CyIT3hSk",
    logo: "https://studio.skill.jobs/media/logo/RFL.png",
  },
  {
    name: "Daffodil International School",
    job: 46,
    slug: "daffodil-international-school-onGvQNrm",
    logo: "https://studio.skill.jobs/media/logo/dis-new-1676290938.webp",
  },
];

export default function TrustedCompanies() {
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % (companies.length * 50));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3 animate-fade-in">
            Trusted by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Leading Companies
            </span>
          </h2>
          <p
            className="text-gray-400 animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            Join thousands of professionals working at top companies
          </p>
        </div>

        {/* Slider Container */}
        {isLoading ? (
          <div className="flex gap-8 mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCompanyLogo key={i} />
            ))}
          </div>
        ) : (
          <Carousel
            className="relative overflow-hidden mb-12"
            opts={{
              align: "start",
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent className="flex gap-8">
              {[...companies, ...companies].map((company, index) => (
                <Link
                  to={""}
                  key={index}
                  className="flex-shrink-0 w-56  rounded-xl bg-white backdrop-blur-md border border-white/10 hover:border-blue-400/50 transition-all duration-300  cursor-pointer group animate-fade-in select-none"
                >
                  <div className="text-center flex items-center justify-center flex-col">
                    <div className="w-[150px] h-[60px]">
                      <img
                        src={company.logo}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {isLoading ? (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 text-center animate-pulse"
                >
                  <div className="h-8 bg-white/10 rounded w-1/2 mx-auto mb-2" />
                  <div className="h-4 bg-white/10 rounded w-2/3 mx-auto" />
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="bg-gradient-to-br from-blue-500/20 to-transparent backdrop-blur-md border border-blue-400/30 rounded-lg p-6 text-center animate-fade-in">
                <p className="text-2xl font-bold text-blue-300">98%</p>
                <p className="text-sm text-gray-400">Candidate Satisfaction</p>
              </div>
              <div
                className="bg-gradient-to-br from-blue-500/20 to-transparent backdrop-blur-md border border-blue-400/30 rounded-lg p-6 text-center animate-fade-in"
                style={{ animationDelay: "100ms" }}
              >
                <p className="text-2xl font-bold text-blue-300">2.5M+</p>
                <p className="text-sm text-gray-400">Active Users</p>
              </div>
              <div
                className="bg-gradient-to-br from-blue-500/20 to-transparent backdrop-blur-md border border-blue-400/30 rounded-lg p-6 text-center animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                <p className="text-2xl font-bold text-blue-300">50+</p>
                <p className="text-sm text-gray-400">Countries</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
