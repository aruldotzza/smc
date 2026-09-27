import type { Metadata } from "next";
import Navbar from "@/Components/Header/Navbar";
import ServicesSection from "@/Components/Services/ServicesSection";
import CTASection from "@/Components/CTA/CTASection";
import Footer from "@/Components/Footer/Footer";
import servicesData from "@/data/services.json";

export const metadata: Metadata = {
  title: "Services | Singapore Maxicabs - Airport, Corporate, Weddings & Tours",
  description:
    "Explore Singapore Maxicabs' chauffeured services. Changi Airport Meet & Greet, Corporate Accounts, Hourly Standby, Wedding Convoys, and Wheelchair Transport.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen flex flex-col w-full selection:bg-[#C6A45A] selection:text-[#071E3B]">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Banner matching servicepagedesign.html */}
      <section className="w-full bg-[#071E3B] text-white py-12 sm:py-20 px-4 sm:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#071E3B] via-[#0B2A4A] to-[#071E3B] opacity-90 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A45A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto relative z-10 flex flex-col items-start gap-3 sm:gap-4">
          <span className="text-xs sm:text-sm font-bold text-[#C6A45A] uppercase tracking-[0.5px] font-manrope">
            {servicesData.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] font-manrope">
            {servicesData.title}
          </h1>
          <p className="text-sm sm:text-lg text-white/90 leading-relaxed max-w-2xl font-normal">
            {servicesData.subtitle}
          </p>
        </div>
      </section>

      {/* 3. Services Grid */}
      <ServicesSection isPage={true} />

      {/* 4. CTA */}
      <CTASection />

      {/* 5. Footer */}
      <Footer />
    </main>
  );
}
