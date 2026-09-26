import React from "react";
import ctaData from "@/data/cta.json";
import Link from "next/link";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 px-6 sm:px-12 bg-[#071E3B] text-white text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          {ctaData.title}
        </h2>
        <p className="text-base sm:text-lg text-white/90 max-w-2xl font-normal leading-relaxed -mt-2">
          {ctaData.subtitle}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href={ctaData.bookHref}
            className="px-8 py-3.5 rounded-lg bg-[#C6A45A] hover:bg-[#b59247] text-white text-base font-semibold flex items-center gap-3 transition-all shadow-lg hover:shadow-xl"
          >
            <span>Book Online</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

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
