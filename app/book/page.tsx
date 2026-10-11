"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import Step1Card from "@/Components/Booking/Step1Card";
import Step2Card from "@/Components/Booking/Step2Card";
import Step3Card from "@/Components/Booking/Step3Card";
import BookingValueProps from "@/Components/Booking/BookingValueProps";
import PaymentFailedCard from "@/Components/Booking/PaymentFailedCard";
import { useBookingModal } from "@/context/BookingContext";

function BookPageContent() {
  const { step, setStep, bookingData } = useBookingModal();
  const searchParams = useSearchParams();

  const statusParam = searchParams.get("status");
  const errorParam = searchParams.get("error");
  const nameParam = searchParams.get("name");

  const isQueryFailed = statusParam === "failed" || Boolean(errorParam);
  const [manualError, setManualError] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const hasError = (isQueryFailed && !isDismissed) || manualError;

  // When step 0 is selected in context, default to step 1 on page
  const currentStep = step === 0 ? 1 : step;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left Column (5 Cols): Why Book With Us & Fixed Rate Reference */}
      <div className="lg:col-span-5 order-2 lg:order-1">
        <BookingValueProps />
      </div>

      {/* Right Column (7 Cols): Step Card / Confirmation / Error */}
      <div className="lg:col-span-7 order-1 lg:order-2">
        {hasError ? (
          /* Error State matching paymentFailed.html */
          <div className="flex justify-center lg:justify-start">
            <PaymentFailedCard
              customerName={nameParam || bookingData?.name}
              errorMessage={errorParam ? String(errorParam) : undefined}
              onRetry={() => {
                setIsDismissed(true);
                setManualError(false);
                setStep(1);
              }}
            />
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
  );
}

export default function BookPage() {
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
      <section className="py-10 sm:py-16 px-4 sm:px-12 lg:px-24 max-w-[1360px] mx-auto w-full flex flex-col gap-10 flex-1">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <BookingValueProps />
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2">
                <Step1Card isModal={false} />
              </div>
            </div>
          }
        >
          <BookPageContent />
        </Suspense>
      </section>

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}
