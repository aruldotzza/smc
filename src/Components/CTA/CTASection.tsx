"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useBookingModal } from "@/context/BookingContext";

export default function CTASection() {
  const { openModal } = useBookingModal();

  return (
    <section className="py-16 px-6 sm:px-12 lg:px-24 bg-[#071E3B] text-white text-center flex flex-col justify-center items-center gap-8">
      {/* Title */}
      <div className="flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-manrope leading-[56px] text-white">
          Ready to Book Your Ride?
        </h2>
      </div>

      {/* Subtitle */}
      <div className="flex flex-col items-center max-w-xl">
        <p className="text-base font-normal font-manrope leading-6 text-white">
          Call us at (+65) 8800 6006 or book online in just a few clicks —
          <br className="hidden sm:inline" />
          it&apos;s quick and easy.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Book Now Button */}
        <button
          type="button"
          onClick={() => openModal({ initialStep: 0 })}
          className="px-8 py-3 bg-[#C6A45A] hover:bg-[#B58E45] text-white text-base font-semibold font-manrope rounded-lg transition-all shadow-md cursor-pointer"
        >
          Book Now
        </button>

        {/* Explore our Fleet Button */}
        <Link
          href="/fleets"
          className="px-8 py-3 rounded-lg border border-[#C6A45A] hover:bg-[#C6A45A]/10 text-[#C6A45A] text-base font-semibold font-manrope flex items-center gap-4 transition-all"
        >
          <span>Explore our Fleet</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </Link>
      </div>

      {/* Contact Details Ribbon */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-normal font-manrope text-white pt-2 opacity-90">
        <span>SINGAPORE MAXICABS</span>
        <span>•</span>
        <a
          href="mailto:booking@singaporemaxicabs.com.sg"
          className="hover:underline"
        >
          booking@singaporemaxicabs.com.sg
        </a>
        <span>•</span>
        <span>45A Campbell Lane Singapore 209917</span>
      </div>
    </section>
  );
}

