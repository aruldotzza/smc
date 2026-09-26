import React from "react";
import heroData from "@/data/hero.json";
import BookingCard from "./BookingCard";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-[#0B2A4A] overflow-hidden py-16 sm:py-24 px-6 sm:px-12 lg:px-24">
      {/* Background Gradients from design.html */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(16,24,39,0.80)] via-[rgba(16,24,39,0.56)] to-[rgba(16,24,39,0.32)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(16,24,39,0.40)] via-transparent to-[rgba(16,24,39,0.20)] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Left Column Content */}
        <div className="flex-1 flex flex-col items-start gap-8 max-w-2xl">
          {/* Eyebrow and Headline */}
          <div className="flex flex-col gap-2">
            <span className="text-base sm:text-lg font-bold tracking-[0.5px] text-[#C6A45A] uppercase">
              {heroData.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.14] tracking-tight">
              Comfortable Rides.
              <br />
              Fixed Fares.
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg font-medium text-white max-w-[500px] leading-relaxed">
            {heroData.subtitle}
          </p>

          {/* 4 Feature Badges */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {heroData.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-[6px] text-white text-xs font-normal tracking-wide uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-5 pt-2">
            {/* Primary Gold CTA */}
            <Link
              href={heroData.primaryCta.href}
              className="px-8 py-3 rounded-lg bg-[#C6A45A] hover:bg-[#b59247] text-white text-base font-semibold flex items-center gap-3 transition-all shadow-md hover:shadow-lg"
            >
              <span>{heroData.primaryCta.label}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            {/* Secondary WhatsApp CTA */}
            <a
              href={heroData.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg border border-[#C6A45A] hover:bg-[#C6A45A]/10 text-[#C6A45A] text-base font-semibold flex items-center gap-3 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{heroData.secondaryCta.label}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* Right Column Booking Form */}
        <div className="w-full lg:w-auto flex justify-center">
          <BookingCard />
        </div>
      </div>
    </section>
  );
}
