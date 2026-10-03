"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import corporateData from "@/data/corporate.json";
import {
  Receipt,
  Zap,
  UserCheck,
  Award,
  Smartphone,
  Layers,
  ArrowRight,
  MessageCircle,
  Mail,
} from "lucide-react";
import { useBookingModal } from "@/context/BookingContext";

export default function CorporatePage() {
  const { openModal } = useBookingModal();

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "receipt":
        return <Receipt className="w-6 h-6 text-[#C6A45A]" />;
      case "zap":
        return <Zap className="w-6 h-6 text-[#C6A45A]" />;
      case "user-check":
        return <UserCheck className="w-6 h-6 text-[#C6A45A]" />;
      case "award":
        return <Award className="w-6 h-6 text-[#C6A45A]" />;
      case "map":
        return <Smartphone className="w-6 h-6 text-[#C6A45A]" />;
      case "layers":
        return <Layers className="w-6 h-6 text-[#C6A45A]" />;
      default:
        return <Zap className="w-6 h-6 text-[#C6A45A]" />;
    }
  };

  return (
    <main className="min-h-screen flex flex-col w-full bg-white selection:bg-[#C6A45A] selection:text-[#071E3B]">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Header */}
      <section className="w-full bg-[#071E3B] text-white py-12 sm:py-20 px-4 sm:px-12 lg:px-24 relative overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Home/what_we_offer.png"
            alt={corporateData.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071E3B] via-[#071E3B]/90 to-[#071E3B]/75 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071E3B] via-transparent to-[#071E3B]/40 pointer-events-none" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A45A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto relative z-10 flex flex-col items-start gap-4 sm:gap-6">
          <span className="text-xs sm:text-sm font-bold text-[#C6A45A] uppercase tracking-[0.5px] font-manrope">
            {corporateData.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] font-manrope">
            {corporateData.title}
          </h1>
          <p className="text-sm sm:text-lg text-white/90 leading-relaxed max-w-2xl font-normal font-manrope">
            {corporateData.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <a
              href="mailto:booking@singaporemaxicabs.com.sg?subject=Corporate%20Account%20Inquiry"
              className="px-8 py-3.5 rounded-xl bg-[#C6A45A] hover:bg-[#B58E45] active:scale-[0.98] text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer min-h-[48px]"
            >
              <Mail className="w-4 h-4" />
              <span>Email Us</span>
            </a>

            <a
              href="https://wa.me/6588006006?text=Hi,%20I'm%20interested%20in%20setting%20up%20a%20Corporate%20/%20VIP%20Transport%20Account."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl border border-[#C6A45A] hover:bg-[#C6A45A]/10 active:scale-[0.98] text-[#C6A45A] text-sm sm:text-base font-semibold flex items-center justify-center gap-2.5 transition-all min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Corporate Features Grid */}
      <section className="py-12 sm:py-20 px-4 sm:px-12 lg:px-24 max-w-[1360px] mx-auto w-full flex flex-col gap-12 sm:gap-16">
        <div className="flex flex-col gap-8">
          <div className="text-center flex flex-col items-center gap-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#071E3B] font-manrope">
              Why Corporate Partners Rely On Us
            </h2>
            <p className="text-sm sm:text-base text-[#667085] font-manrope">
              Tailored invoicing, dedicated fleet scheduling, and reliable 24/7 service for business excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {corporateData.features.map((f, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 bg-[#F8F7F4] rounded-2xl border border-[#E9ECEF] flex flex-col items-start gap-4 hover:border-[#C6A45A] hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getFeatureIcon(f.icon)}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-[#071E3B] font-manrope">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed font-manrope">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. VIP Lounge Highlight Card */}
        <div className="w-full rounded-3xl bg-[#071E3B] text-white p-6 sm:p-12 lg:p-14 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6A45A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col items-start gap-3 sm:gap-4 max-w-2xl relative z-10">
            <span className="px-2.5 py-1 rounded-md bg-[#C6A45A] text-[#071E3B] text-[11px] font-extrabold uppercase tracking-wider">
              Executive Chauffeur
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold text-white font-manrope">
              {corporateData.vipLounge.title}
            </h3>
            <p className="text-xs sm:text-base text-white/90 leading-relaxed font-manrope">
              {corporateData.vipLounge.description}
            </p>

            <Link
              href={`/fleets/${corporateData.vipLounge.slug}`}
              className="mt-2 px-6 py-3 rounded-xl bg-[#C6A45A] hover:bg-[#B58E45] text-[#071E3B] font-bold text-sm font-manrope transition-all shadow-md hover:shadow-lg active:scale-98 inline-flex items-center gap-2"
            >
              <span>View VIP Fleet</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

          <div className="flex flex-col items-start lg:items-end shrink-0 relative z-10 bg-white/10 lg:bg-transparent p-4 sm:p-6 lg:p-0 rounded-2xl border border-white/10 lg:border-none w-full sm:w-auto">
            <span className="text-4xl sm:text-6xl font-extrabold text-[#C6A45A] font-manrope leading-none">
              {corporateData.vipLounge.price}
            </span>
            <span className="text-xs sm:text-sm text-white/80 font-manrope mt-1">
              {corporateData.vipLounge.currency}
            </span>
          </div>
        </div>

        {/* 5. Open a Corporate Account CTA */}
        <div className="w-full rounded-2xl sm:rounded-3xl bg-[#F7F5EF] border border-[#E9ECEF] p-8 sm:p-14 text-center flex flex-col items-center gap-5 sm:gap-6 shadow-sm">
          <h3 className="text-2xl sm:text-4xl font-bold text-[#071E3B] tracking-tight font-manrope">
            {corporateData.cta.title}
          </h3>
          <p className="text-sm sm:text-base text-[#667085] max-w-xl font-manrope">
            {corporateData.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <a
              href="https://wa.me/6588006006?text=Hi,%20I'd%20like%20to%20open%20a%20corporate%20transport%20account."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#071E3B] hover:bg-[#0B2A4A] active:scale-[0.98] text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg cursor-pointer min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{corporateData.cta.whatsappLabel}</span>
            </a>

            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[#071E3B] hover:bg-[#071E3B]/5 active:scale-[0.98] text-[#071E3B] text-sm sm:text-base font-semibold flex items-center justify-center gap-3 transition-all min-h-[48px]"
            >
              <span>{corporateData.cta.contactLabel}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <Footer />
    </main>
  );
}
