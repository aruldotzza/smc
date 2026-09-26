import type { Metadata } from "next";
import Navbar from "@/Components/Header/Navbar";
import FleetSection from "@/Components/Fleet/FleetSection";
import CTASection from "@/Components/CTA/CTASection";
import Footer from "@/Components/Footer/Footer";
import fleetData from "@/data/fleet.json";

export const metadata: Metadata = {
  title: "Our Fleet | Singapore Maxicabs - 6, 7, 9 & 13 Seater Maxi Cabs",
  description:
    "Explore Singapore Maxicabs' luxury fleet. Toyota Vellfire 6-Seater, 7-Seater, 9-Seater, 13-Seater Minibus, VIP Lounge, and Wheelchair Accessible Vans.",
};

export default function FleetsPage() {
  return (
    <main className="min-h-screen flex flex-col w-full selection:bg-[#C6A45A] selection:text-[#071E3B]">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Banner */}
      <section className="w-full bg-[#071E3B] text-white py-16 sm:py-20 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#071E3B] via-[#0B2A4A] to-[#071E3B] opacity-90 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A45A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto relative z-10 flex flex-col items-start gap-4">
          <span className="text-base sm:text-lg font-bold text-[#C6A45A] uppercase tracking-[0.5px] font-manrope">
            {fleetData.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] font-manrope">
            {fleetData.title}
          </h1>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl font-normal">
            {fleetData.subtitle}
          </p>
        </div>
      </section>

      {/* 3. Fleet Grid */}
      <FleetSection />

      {/* 4. CTA */}
      <CTASection />

      {/* 5. Footer */}
      <Footer />
    </main>
  );
}
