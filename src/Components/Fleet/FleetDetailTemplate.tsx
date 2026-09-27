"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import { useBookingModal } from "@/context/BookingContext";
import CTASection from "@/Components/CTA/CTASection";

export interface VehicleDetail {
  id: string;
  slug: string;
  name: string;
  model: string;
  price: string;
  currency: string;
  description: string;
  heroDescription: string;
  pax: string;
  bags: string;
  pointToPoint: string;
  meetAndGreet: string;
  charter3h: string;
  charter8h: string;
  vehicleType: string;
  inclusions: string[];
  image?: string;
}

export default function FleetDetailTemplate({ vehicle }: { vehicle: VehicleDetail }) {
  const { openModal } = useBookingModal();

  const handleBookNow = () => {
    openModal({
      initialStep: 1,
      selectedFleet: vehicle.name,
      selectedFleetSlug: vehicle.slug,
      baseFare: parseInt(vehicle.price.replace(/[^0-9]/g, "")) || 70,
    });
  };

  const specs = [
    { label: "Passengers", value: vehicle.pax },
    { label: "Luggage", value: vehicle.bags },
    { label: "Point to Point Fare", value: vehicle.pointToPoint },
    { label: "Changi Meet & Greet", value: vehicle.meetAndGreet },
    { label: "3-Hour Charter", value: vehicle.charter3h },
    { label: "8-Hour Charter", value: vehicle.charter8h },
    { label: "Vehicle Type", value: vehicle.vehicleType },
  ];

  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. Hero Banner */}
      <section className="w-full bg-[#071E3B] text-white py-12 sm:py-20 px-4 sm:px-12 lg:px-24 relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071E3B] via-[#0B2A4A] to-[#071E3B] opacity-90 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A45A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto relative z-10 flex flex-col gap-6 sm:gap-8">
          {/* Breadcrumb Back */}
          <Link
            href="/fleets"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Fleets</span>
          </Link>

          {/* Hero Content Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 sm:gap-8">
            <div className="flex flex-col items-start gap-3 sm:gap-4 max-w-3xl">
              <span className="text-xs sm:text-sm font-bold text-[#C6A45A] uppercase tracking-[0.5px]">
                Our Fleet
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
                {vehicle.name}
              </h1>
              <span className="text-base sm:text-xl font-bold text-[#C6A45A]">
                {vehicle.model}
              </span>
              <p className="text-sm sm:text-lg text-white/90 leading-relaxed max-w-2xl font-normal">
                {vehicle.heroDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3 sm:pt-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#C6A45A] hover:bg-[#B58E45] active:scale-[0.98] text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg cursor-pointer min-h-[48px]"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <Link
                  href="/fleets"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-[#C6A45A] hover:bg-[#C6A45A]/10 active:scale-[0.98] text-[#C6A45A] text-sm sm:text-base font-semibold flex items-center justify-center gap-3 transition-all min-h-[48px]"
                >
                  <span>Explore other Fleets</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* Starting Price Display */}
            <div className="flex flex-col lg:items-end bg-white/10 lg:bg-transparent p-4 sm:p-5 lg:p-0 rounded-2xl border border-white/10 lg:border-none w-full sm:w-auto">
              <span className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#C6A45A] leading-none">
                {vehicle.price}
              </span>
              <span className="text-xs sm:text-base font-medium text-white/70 mt-1.5 sm:mt-2">
                Starting from ({vehicle.currency})
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Specs & Image Row */}
      <section className="py-12 sm:py-20 px-4 sm:px-12 lg:px-24 max-w-[1360px] mx-auto w-full flex flex-col gap-12 sm:gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Vehicle Showcase Card */}
          <div className="w-full h-64 sm:h-96 lg:h-[420px] rounded-2xl overflow-hidden bg-[#071E3B] border border-slate-800/80 shadow-xl relative flex flex-col justify-between p-4 sm:p-8 text-white group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#C6A45A] z-20" />
            <Image
              src={vehicle.image || "/images/Cab.png"}
              alt={vehicle.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071E3B] via-[#071E3B]/40 to-black/20 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#C6A45A] text-[#071E3B] text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
                Singapore Maxi Cab
              </span>
              <span className="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider border border-white/20 truncate">
                {vehicle.vehicleType || "Toyota Vellfire / Alphard"}
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-3 sm:pt-4 text-xs sm:text-sm text-white/90">
              <span className="font-semibold">{vehicle.name}</span>
              <span className="text-[#C6A45A] font-bold">100% Fixed Rates</span>
            </div>
          </div>

          {/* Pricing & Specs Table */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071E3B]">
              Pricing &amp; Specs
            </h2>

            <div className="w-full rounded-xl border border-[#E9ECEF] overflow-hidden shadow-xs">
              {specs.map((item, idx) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm ${
                    idx % 2 === 0 ? "bg-white" : "bg-[#F7F5EF]"
                  } border-b border-slate-100 last:border-none`}
                >
                  <span className="text-[#071E3B] font-medium">{item.label}</span>
                  <span className="text-[#A77E3C] font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. What's Included Section */}
        <div className="flex flex-col gap-6 sm:gap-8 pt-2 sm:pt-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071E3B]">
            What&apos;s Included
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
            {vehicle.inclusions.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-[#FBF7EC] border border-[#F4EAD1]"
              >
                <div className="w-5 h-5 rounded-full bg-[#ECFDF3] border border-[#16803C] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#16803C] stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#071E3B]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Ready to Book High-Impact CTA */}
        <div className="w-full rounded-3xl bg-[#071E3B] text-white p-6 sm:p-14 lg:p-16 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#071E3B] via-[#0B2A4A] to-[#071E3B] pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center gap-4 max-w-2xl">
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to Book Your {vehicle.name}?
            </h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Call us at (+65) 8800 6006 or book online in just a few clicks — it&apos;s quick and easy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleBookNow}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#C6A45A] hover:bg-[#B58E45] active:scale-[0.98] text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-3 transition-all shadow-lg cursor-pointer min-h-[48px]"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href="https://wa.me/6588006006"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg border border-[#C6A45A] hover:bg-[#C6A45A]/10 active:scale-[0.98] text-[#C6A45A] text-sm sm:text-base font-semibold flex items-center justify-center gap-3 transition-all min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs text-white/70 border-t border-white/10 w-full mt-4">
              <span>SINGAPORE MAXICABS</span>
              <span className="hidden sm:inline">•</span>
              <span>booking@singaporemaxicabs.com.sg</span>
              <span className="hidden sm:inline">•</span>
              <span>45A Campbell Lane Singapore 209917</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
