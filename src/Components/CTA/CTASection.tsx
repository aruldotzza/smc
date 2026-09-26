"use client";

import React from "react";
import ctaData from "@/data/cta.json";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";
import { useBookingModal } from "@/context/BookingContext";

export default function CTASection() {
  const { openModal } = useBookingModal();

  return (
    <section className="py-20 px-6 sm:px-12 lg:px-24 bg-[#071E3B] text-white text-center relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071E3B] via-[#0B2A4A] to-[#071E3B] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A45A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-manrope">
          {ctaData.title}
        </h2>
        <p className="text-base sm:text-lg text-white/90 max-w-2xl font-normal leading-relaxed -mt-2 font-manrope">
          {ctaData.subtitle}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => openModal({ initialStep: 0 })}
            className="px-8 py-3.5 rounded-lg bg-[#C6A45A] hover:bg-[#B58E45] text-white text-base font-semibold flex items-center gap-3 transition-all shadow-lg hover:shadow-xl cursor-pointer"
          >
            <span>Book Online</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <a
            href={ctaData.phoneHref}
            className="px-8 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-base font-semibold flex items-center gap-3 transition-all"
          >
            <Phone className="w-4 h-4 text-[#C6A45A]" />
            <span>Call (+65) 8800 6006</span>
          </a>

          <a
            href="https://wa.me/6588006006"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-lg border border-[#C6A45A] hover:bg-[#C6A45A]/10 text-[#C6A45A] text-base font-semibold flex items-center gap-3 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
