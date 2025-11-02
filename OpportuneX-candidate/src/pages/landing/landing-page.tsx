import FAQ from "@/components/home/faq";
import Hero from "@/components/home/hero";
import LatestJobs from "@/components/home/latest-jobs";
import Newsletter from "@/components/home/newsletter";
import PopularJobs from "@/components/home/popular-jobs";
import StatsSection from "@/components/home/stats";
import Testimonials from "@/components/home/testimonials";
import TrustedCompanies from "@/components/home/trusted-companies";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-zinc-950 overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl opacity-15" />
      </div>

      <div className="relative z-10">
        <Hero />
        <TrustedCompanies />
        <LatestJobs />
        <PopularJobs />
        <StatsSection />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </div>
    </main>
  );
}
