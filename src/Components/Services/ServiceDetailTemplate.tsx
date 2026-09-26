"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, MessageCircle, ChevronDown, ShieldCheck } from "lucide-react";
import { useBookingModal } from "@/context/BookingContext";

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  heroDescription: string;
  icon: string;
  tags: string[];
  inclusions: string[];
  pricing: { vehicle: string; rate: string }[];
  faqs: { question: string; answer: string }[];
}

export default function ServiceDetailTemplate({ service }: { service: ServiceDetail }) {
  const { openModal } = useBookingModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleBookNow = () => {
    openModal({
      initialStep: 1,
      serviceType: service.title,
    });
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. Hero Banner */}
      <section className="w-full bg-[#071E3B] text-white py-14 sm:py-20 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Home/Hero_tab.png"
            alt={service.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071E3B] via-[#071E3B]/90 to-[#071E3B]/75 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071E3B] via-transparent to-[#071E3B]/40 pointer-events-none" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A45A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto relative z-10 flex flex-col gap-8">
          {/* Breadcrumb Back */}
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>

          {/* Hero Content */}
          <div className="flex flex-col items-start gap-4 max-w-3xl">
            <span className="text-base sm:text-lg font-bold text-[#C6A45A] uppercase tracking-[0.5px]">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
              {service.title}
            </h1>
            <span className="text-lg sm:text-xl font-bold text-[#C6A45A]">
              {service.subtitle}
            </span>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl font-normal">
              {service.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={handleBookNow}
                className="px-8 py-3.5 rounded-lg bg-[#C6A45A] hover:bg-[#B58E45] text-white text-base font-semibold flex items-center gap-3 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <Link
                href="/fleets"
                className="px-8 py-3.5 rounded-lg border border-[#C6A45A] hover:bg-[#C6A45A]/10 text-[#C6A45A] text-base font-semibold flex items-center gap-3 transition-all"
              >
                <span>Explore our Fleet</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content: What's Included & Pricing Table */}
      <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-24 max-w-[1360px] mx-auto w-full flex flex-col gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: What's Included */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071E3B]">
              What&apos;s Included
            </h2>

            <div className="flex flex-col gap-4">
              {service.inclusions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#ECFDF3] border border-[#16803C] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#16803C] stroke-[3]" />
                  </div>
                  <span className="text-sm sm:text-[15px] text-[#5F6B7A] leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Pricing Table & Guarantee Card */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071E3B]">
              Pricing
            </h2>

            {/* Pricing Matrix */}
            <div className="w-full rounded-xl border border-[#E9ECEF] overflow-hidden shadow-xs">
              {service.pricing.map((p, idx) => (
                <div
                  key={p.vehicle}
                  className={`flex items-center justify-between px-5 py-3.5 text-sm ${
                    idx % 2 === 0 ? "bg-white" : "bg-[#F7F5EF]"
                  } border-b border-slate-100 last:border-none`}
                >
                  <span className="text-[#5F6B7A] font-medium">{p.vehicle}</span>
                  <span className="text-[#A77E3C] font-bold">{p.rate}</span>
                </div>
              ))}
            </div>

            {/* Fixed Fares Guaranteed Card */}
            <div className="p-5 rounded-xl bg-[#EEF5FB] border border-[#E9ECEF] flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#123F6B]" />
                <h4 className="text-sm font-bold text-[#071E3B]">
                  Fixed Fares Guaranteed
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                All prices are final. No hidden charges, no midnight surcharges, no surge pricing.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Frequently Asked Questions */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="flex flex-col gap-6 pt-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071E3B]">
              Frequently Asked Questions
            </h2>

            <div className="flex flex-col gap-3.5">
              {service.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#E9ECEF] bg-white p-5 sm:p-6 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left font-bold text-base sm:text-lg text-[#071E3B] cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#667085] transition-transform duration-200 shrink-0 ${
                        openFaq === idx ? "rotate-180 text-[#C6A45A]" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`pt-3 text-sm sm:text-base text-[#667085] leading-relaxed ${
                      openFaq === idx || openFaq === null ? "block" : "hidden sm:block"
                    }`}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Ready to Book CTA Card */}
        <div className="w-full rounded-3xl bg-[#071E3B] text-white p-8 sm:p-14 lg:p-16 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden mt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-[#071E3B] via-[#0B2A4A] to-[#071E3B] pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center gap-4 max-w-2xl">
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to Book Your Ride?
            </h3>
            <p className="text-base text-white/90">
              Call us at (+65) 8800 6006 or book online in just a few clicks — it&apos;s quick and easy.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleBookNow}
                className="px-8 py-3.5 rounded-lg bg-[#C6A45A] hover:bg-[#B58E45] text-white text-base font-semibold flex items-center gap-3 transition-all shadow-lg cursor-pointer"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

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

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-white/70 border-t border-white/10 w-full mt-4">
              <span>SINGAPORE MAXICABS</span>
              <span>•</span>
              <span>booking@singaporemaxicabs.com.sg</span>
              <span>•</span>
              <span>45A Campbell Lane Singapore 209917</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
