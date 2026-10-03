"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import Step1Card from "@/Components/Booking/Step1Card";
import Step2Card from "@/Components/Booking/Step2Card";
import Step3Card from "@/Components/Booking/Step3Card";
import { useBookingModal } from "@/context/BookingContext";
import {
  Clock,
  ShieldCheck,
  Users,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function BookPage() {
  const { step, setStep, bookingData } = useBookingModal();
  const [hasError, setHasError] = useState(false);

  // When step 0 is selected in context, default to step 1 on page
  const currentStep = step === 0 ? 1 : step;

  const whyBookItems = [
    {
      icon: <Clock className="w-5 h-5 text-[#C6A45A]" />,
      title: "Always Punctual",
      description: "We track your flight. We arrive even if your flight is delayed.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#C6A45A]" />,
      title: "Fixed Fares",
      description: "The price shown is exactly what you pay — no surge, no surprises.",
    },
    {
      icon: <Users className="w-5 h-5 text-[#C6A45A]" />,
      title: "6 to 13 Seats",
      description: "Perfect for families, groups, and corporate teams.",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-[#C6A45A]" />,
      title: "24/7 WhatsApp Support",
      description: "Real people respond fast via WhatsApp, day or night.",
    },
  ];

  const rateReference = [
    { name: "Mercedes Vito / Toyota Hiace 6S", price: "From $55" },
    { name: "Mercedes Vito / Toyota Hiace 7S", price: "From $60" },
    { name: "Mercedes Vito / Toyota Hiace 9S", price: "From $70" },
    { name: "Toyota HiAce / Ford Transit 13S", price: "From $110" },
  ];

  return (
    <main className="min-h-screen flex flex-col w-full bg-white selection:bg-[#C6A45A] selection:text-[#071E3B]">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Header */}
      <section className="w-full bg-[#071E3B] text-white py-12 sm:py-16 px-4 sm:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#071E3B] via-[#0B2A4A] to-[#071E3B] pointer-events-none opacity-90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A45A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto relative z-10 flex flex-col items-start gap-3 sm:gap-4">
          <span className="text-xs sm:text-sm font-bold text-[#C6A45A] uppercase tracking-widest font-manrope">
            Premium Transport
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] font-manrope">
            Book Your Ride
          </h1>
          <p className="text-sm sm:text-lg text-white/90 leading-relaxed max-w-2xl font-normal font-manrope">
            Fixed fares, no surge pricing. Airport transfers, corporate rides &amp; group transport across Singapore.
          </p>
        </div>
      </section>

      {/* 3. Main 2-Column Booking Section */}
      <section className="py-10 sm:py-16 px-4 sm:px-12 lg:px-24 max-w-[1360px] mx-auto w-full flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (5 Cols): Why Book With Us & Fixed Rate Reference */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 order-2 lg:order-1">
            {/* Why Book With Us Card */}
            <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E9ECEF] shadow-sm flex flex-col gap-5">
              <h2 className="text-xl sm:text-2xl font-bold text-[#071E3B] font-manrope">
                Why Book With Us?
              </h2>

              <div className="flex flex-col gap-4 sm:gap-5">
                {whyBookItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#F8F7F4] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-sm sm:text-base font-bold text-[#071E3B] font-manrope">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#667085] leading-relaxed font-manrope">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fixed Rate Reference Card */}
            <div className="p-6 sm:p-8 bg-[#071E3B] text-white rounded-2xl shadow-md flex flex-col gap-4 relative overflow-hidden">
              <span className="text-xs font-bold text-[#C6A45A] uppercase tracking-widest font-manrope">
                Fixed Rate Reference
              </span>

              <div className="flex flex-col gap-3 divide-y divide-white/10">
                {rateReference.map((r, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs sm:text-sm pt-2.5 first:pt-0"
                  >
                    <span className="text-white/90 font-manrope">{r.name}</span>
                    <span className="text-[#C6A45A] font-bold font-manrope shrink-0 ml-2">
                      {r.price}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/pricing"
                className="mt-2 text-xs font-bold text-[#C6A45A] hover:text-amber-300 transition-colors inline-flex items-center gap-1 self-start font-manrope"
              >
                <span>See full pricing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column (7 Cols): Step Card / Confirmation / Error */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            {hasError ? (
              /* Error State matching bookingerror.html */
              <div className="p-6 sm:p-10 bg-white rounded-2xl border border-rose-200 shadow-sm flex flex-col items-center text-center gap-5">
                <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div className="flex flex-col gap-1.5 max-w-md">
                  <h3 className="text-2xl font-bold text-[#071E3B] font-manrope">
                    Booking Failed
                  </h3>
                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed font-manrope">
                    We&apos;re sorry! Your booking couldn&apos;t be processed automatically at this time. Please try again or chat with our 24/7 WhatsApp dispatch.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setHasError(false);
                      setStep(1);
                    }}
                    className="w-full sm:w-auto flex-1 py-3 px-6 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold font-manrope transition-all cursor-pointer"
                  >
                    Try Booking Again
                  </button>
                  <a
                    href="https://wa.me/6588006006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-[#071E3B] rounded-xl text-sm font-bold font-manrope transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Support</span>
                  </a>
                </div>
              </div>
            ) : (
              /* Normal Step Flow */
              <div className="w-full">
                {/* Step Indicator Header */}
                <div className="mb-4 flex items-center justify-between px-2 text-xs font-bold font-manrope text-[#5F6B7A]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        currentStep >= 1 ? "bg-[#071E3B] text-white" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      1
                    </span>
                    <span className={currentStep >= 1 ? "text-[#071E3B]" : ""}>Locations</span>
                  </div>
                  <div className="w-8 h-0.5 bg-slate-200" />
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        currentStep >= 2 ? "bg-[#071E3B] text-white" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      2
                    </span>
                    <span className={currentStep >= 2 ? "text-[#071E3B]" : ""}>Details</span>
                  </div>
                  <div className="w-8 h-0.5 bg-slate-200" />
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        currentStep >= 3 ? "bg-[#071E3B] text-white" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      3
                    </span>
                    <span className={currentStep >= 3 ? "text-[#071E3B]" : ""}>Review</span>
                  </div>
                </div>

                {currentStep === 1 && <Step1Card isModal={false} />}
                {currentStep === 2 && <Step2Card isModal={false} />}
                {currentStep === 3 && <Step3Card isModal={false} />}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}
