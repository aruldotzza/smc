"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import aboutData from "@/data/about.json";
import { Clock, ShieldCheck, Sparkles, Headphones, ArrowRight, Phone } from "lucide-react";
import { useBookingModal } from "@/context/BookingContext";

export default function AboutPage() {
  const { openModal } = useBookingModal();

  const renderWhyChooseIcon = (iconName: string) => {
    switch (iconName) {
      case "time":
      case "clock":
        return (
          <svg
            className="w-9 h-9 text-[#C6A45A]"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 12V18L21.5 21.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "fare":
      case "badge-percent":
        return (
          <svg
            className="w-9 h-9 text-[#C6A45A]"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Money bag pouch shape */}
            <path
              d="M14.5 9H21.5M13 12H23M18 12C12.5 12 8.5 16 8.5 22C8.5 26.5 12.5 29 18 29C23.5 29 27.5 26.5 27.5 22C27.5 16 23.5 12 18 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dollar sign */}
            <path
              d="M18 16V25M15.5 18C15.5 16.9 16.6 16 18 16C19.4 16 20.5 16.9 20.5 18C20.5 19.5 15.5 19.8 15.5 22.2C15.5 23.6 16.6 24.5 18 24.5C19.4 24.5 20.5 23.6 20.5 22.2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "vehicle":
      case "sparkles":
        return (
          <svg
            className="w-9 h-9 text-[#C6A45A]"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Car body */}
            <path
              d="M6 23.5H7.5M13.5 23.5H21.5M27.5 23.5H29C29.8 23.5 30.5 22.8 30.5 22V19.5C30.5 18.7 29.8 18 29 18H27L24 13.5H13.5L11 18H6.5C5.7 18 5 18.7 5 19.5V22C5 22.8 5.7 23.5 6.5 23.5H6Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Wheels */}
            <circle cx="10.5" cy="23.5" r="3" stroke="currentColor" strokeWidth="2" />
            <circle cx="24.5" cy="23.5" r="3" stroke="currentColor" strokeWidth="2" />
            {/* Sparkles / Stars above car */}
            <path
              d="M26 6L26.9 8.5L29.5 9.5L26.9 10.5L26 13L25.1 10.5L22.5 9.5L25.1 8.5L26 6Z"
              fill="currentColor"
            />
            <path
              d="M19 5L19.6 6.8L21.5 7.5L19.6 8.2L19 10L18.4 8.2L16.5 7.5L18.4 6.8L19 5Z"
              fill="currentColor"
            />
          </svg>
        );
      case "support":
      case "headphones":
        return (
          <svg
            className="w-9 h-9 text-[#C6A45A]"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Telephone receiver handset */}
            <path
              d="M9.5 8C9.5 6.8 10.5 5.8 11.8 5.8H14C14.7 5.8 15.3 6.3 15.6 7L16.8 10.8C17 11.5 16.8 12.3 16.2 12.8L14.8 13.9C16.2 16.8 18.7 19.3 21.6 20.7L22.7 19.3C23.2 18.7 24 18.5 24.7 18.7L28.5 19.9C29.2 20.2 29.7 20.8 29.7 21.5V23.7C29.7 25 28.7 26 27.5 26C17.5 26 9.5 18 9.5 8Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return (
          <svg className="w-9 h-9 text-[#C6A45A]" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
    }
  };

  return (
    <main className="min-h-screen flex flex-col w-full bg-white selection:bg-[#C6A45A] selection:text-[#071E3B]">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Header */}
      <section className="w-full bg-[#071E3B] text-white py-12 sm:py-20 px-4 sm:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#071E3B] via-[#0B2A4A] to-[#071E3B] pointer-events-none opacity-90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A45A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto relative z-10 flex flex-col items-start gap-3 sm:gap-4">
          <span className="text-xs sm:text-sm font-bold text-[#C6A45A] uppercase tracking-[0.5px] font-manrope">
            {aboutData.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] font-manrope">
            {aboutData.title}
          </h1>
          <p className="text-sm sm:text-lg text-white/90 leading-relaxed max-w-2xl font-normal font-manrope">
            {aboutData.subtitle}
          </p>
        </div>
      </section>

      {/* 3. Our Story */}
      <section className="py-12 sm:py-20 px-4 sm:px-12 lg:px-24 max-w-[1360px] mx-auto w-full flex flex-col gap-12 sm:gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Info */}
          <div className="flex flex-col items-start gap-4 sm:gap-6">
            <span className="text-xs font-bold text-[#C6A45A] uppercase tracking-widest font-manrope">
              {aboutData.story.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#071E3B] leading-tight font-manrope">
              {aboutData.story.title}
            </h2>
            <div className="flex flex-col gap-3 sm:gap-4 text-sm sm:text-base text-[#667085] leading-relaxed font-manrope">
              {aboutData.story.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full h-72 sm:h-96 lg:h-[420px] rounded-2xl overflow-hidden border-t-[4px] border-[#C6A45A] shadow-xl bg-slate-900">
            <Image
              src={aboutData.story.image || "/images/aboutus.png"}
              alt="Singapore Maxicabs Chauffeur"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* 4. Why Choose Us (Exactly matching Figma Screenshot) */}
        <div className="flex flex-col items-center gap-8 sm:gap-10 pt-4 sm:pt-8 border-t border-slate-100">
          <div className="text-center flex flex-col items-center gap-2">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#071E3B] font-manrope">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
            {aboutData.whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 bg-[#F9F8F5] rounded-2xl border border-[#E9ECEF] flex flex-col items-center text-center gap-3.5 hover:border-[#C6A45A] hover:shadow-md transition-all group"
              >
                <div className="h-11 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {renderWhyChooseIcon(item.icon)}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#071E3B] font-manrope">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#667085] leading-relaxed font-manrope">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Stats Banner */}
        <div className="w-full bg-[#071E3B] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {aboutData.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center gap-1 pt-4 lg:pt-0">
                <span className="text-3xl sm:text-5xl font-extrabold text-[#C6A45A] font-manrope">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/90 font-manrope">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Ready to Experience the Difference CTA */}
        <div className="w-full rounded-2xl sm:rounded-3xl bg-[#F7F5EF] border border-[#E9ECEF] p-8 sm:p-14 text-center flex flex-col items-center gap-5 sm:gap-6 shadow-sm">
          <h3 className="text-2xl sm:text-4xl font-bold text-[#071E3B] tracking-tight font-manrope">
            {aboutData.cta.title}
          </h3>
          <p className="text-sm sm:text-base text-[#667085] max-w-xl font-manrope">
            {aboutData.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => openModal({ initialStep: 0 })}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#071E3B] hover:bg-[#0B2A4A] active:scale-[0.98] text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg cursor-pointer min-h-[48px]"
            >
              <span>{aboutData.cta.bookBtn}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[#071E3B] hover:bg-[#071E3B]/5 active:scale-[0.98] text-[#071E3B] text-sm sm:text-base font-semibold flex items-center justify-center gap-3 transition-all min-h-[48px]"
            >
              <span>{aboutData.cta.contactBtn}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
