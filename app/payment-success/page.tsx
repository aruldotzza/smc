import React, { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import PaymentSuccessContent from "./PaymentSuccessContent";
import BookingValueProps from "@/Components/Booking/BookingValueProps";
import PaymentSuccessCard from "@/Components/Booking/PaymentSuccessCard";

export const metadata: Metadata = {
  title: "Booking & Payment Confirmed | Singapore Maxicabs",
  description:
    "Your Singapore Maxicabs ride has been confirmed and payment processed securely via Stripe. Driver dispatch details will be sent via WhatsApp.",
};

function PaymentSuccessFallback() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <div className="lg:col-span-5 order-2 lg:order-1">
        <BookingValueProps />
      </div>
      <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center lg:justify-start">
        <PaymentSuccessCard />
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
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
            Payment Verified
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] font-manrope">
            Booking Confirmed
          </h1>
          <p className="text-sm sm:text-lg text-white/90 leading-relaxed max-w-2xl font-normal font-manrope">
            Thank you for choosing Singapore Maxicabs. Your ride is locked in with our guaranteed fixed fare.
          </p>
        </div>
      </section>

      {/* 3. Main Content Section */}
      <section className="py-10 sm:py-16 px-4 sm:px-12 lg:px-24 max-w-[1360px] mx-auto w-full flex flex-col gap-10 flex-1">
        <Suspense fallback={<PaymentSuccessFallback />}>
          <PaymentSuccessContent />
        </Suspense>
      </section>

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}
