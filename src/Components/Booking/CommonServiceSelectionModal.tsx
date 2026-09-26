"use client";

import React from "react";
import { useBookingModal } from "@/context/BookingContext";
import { Plane, Clock, Car, MapPin, Check, ShieldCheck, ChevronRight, ArrowRight, X } from "lucide-react";

export default function CommonServiceSelectionModal() {
  const { setStep, updateBookingData, closeModal } = useBookingModal();

  const handleSelect = (service: {
    title: string;
    fleet: string;
    slug: string;
    fare: number;
    pickup: string;
    dropoff: string;
  }) => {
    updateBookingData({
      serviceType: service.title,
      selectedFleet: service.fleet,
      selectedFleetSlug: service.slug,
      baseFare: service.fare,
      pickup: service.pickup,
      dropoff: service.dropoff,
    });
    setStep(1);
  };

  const services = [
    {
      id: "airport",
      title: "Airport Transfer",
      displayTitle: "Arrival / Departure",
      discount: "10% OFF",
      fromPrice: "From $75",
      fare: 75,
      fleet: "Mercedes-Benz V-Class / Toyota Vellfire",
      slug: "7-seater",
      description:
        "Changi Airport meet & greet with flight tracking & 60-min terminal grace period. Fixed rates from $75.",
      tags: ["Meet & Greet", "60m Grace", "Flight Monitored"],
      icon: <Plane className="w-3.5 h-3.5 text-[#C6A45A]" />,
      pickup: "Singapore Changi Airport (SIN)",
      dropoff: "Marina Bay Sands Hotel",
      bgImage: "/images/Home/what_are_you_booking.png",
    },
    {
      id: "hourly",
      title: "Hourly Charter",
      displayTitle: "Hourly Charter",
      discount: "10% OFF",
      fromPrice: "From $75",
      fare: 75,
      fleet: "Toyota Vellfire / Alphard Executive",
      slug: "7-seater",
      description:
        "Dedicated chauffeur at your disposal, flexible itinerary, 3 hr minimum. From $65/hr.",
      tags: ["3h Minimum", "Unlimited Stops", "On-Standby"],
      icon: <Clock className="w-3.5 h-3.5 text-[#C6A45A]" />,
      pickup: "Hotel Grand Pacific Singapore",
      dropoff: "As-Directed City Tour",
      bgImage: "/images/Home/what_are_you_booking.png",
    },
    {
      id: "city",
      title: "City Transfer",
      displayTitle: "City Transfer",
      discount: "10% OFF",
      fromPrice: "From $65",
      fare: 65,
      fleet: "Toyota Vellfire / Alphard",
      slug: "6-seater",
      description:
        "Effortless hotel, office, and point-to-point journeys across Singapore. Fixed rates from $65.",
      tags: ["Direct Route", "Zero Surge", "Luggage Assist"],
      icon: <Car className="w-3.5 h-3.5 text-[#C6A45A]" />,
      pickup: "Marina Bay Financial Centre",
      dropoff: "Orchard Road Shopping District",
      bgImage: "/images/Home/what_are_you_booking.png",
    },
    {
      id: "tour",
      title: "Sightseeing & Island Tour",
      displayTitle: "City Tour",
      discount: "10% OFF",
      fromPrice: "From $75",
      fare: 75,
      fleet: "Mercedes-Benz Vito / Toyota HiAce",
      slug: "9-seater",
      description:
        "Customized island tour, Marina Bay, Sentosa, cultural landmarks. From 1 day.",
      tags: ["Full Day Options", "Bespoke Route", "Local Guide"],
      icon: <MapPin className="w-3.5 h-3.5 text-[#C6A45A]" />,
      pickup: "Marina Bay Sands Foyer",
      dropoff: "Sentosa / Gardens by the Bay",
      bgImage: "/images/Home/what_are_you_booking.png",
    },
  ];

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-7 flex flex-col gap-5 max-w-[820px] mx-auto relative overflow-hidden">
      {/* Close button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20 cursor-pointer"
        aria-label="Close modal"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 pr-8 sm:pr-0">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#0F172A] tracking-tight font-manrope">
            What are you booking?
          </h2>
          <p className="text-xs sm:text-sm text-[#667085] max-w-xl font-manrope leading-5">
            Select a luxury transfer option to configure your itinerary with dedicated chauffeur service.
          </p>
        </div>

        {/* 100% Fixed Fares Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FBF7EC] border border-[#F4EAD1] text-[#A77E3C] text-xs font-bold shrink-0 self-start sm:self-auto font-manrope">
          <ShieldCheck className="w-4 h-4 text-[#A77E3C]" />
          <span>100% Fixed Fares · No Hidden Fees</span>
        </div>
      </div>

      {/* 2x2 Services Grid with optimized compact height */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {services.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelect(item)}
            className="group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-sm hover:shadow-xl hover:border-[#C6A45A] transition-all duration-300 flex flex-col justify-end min-h-[240px] sm:min-h-[255px] cursor-pointer"
          >
            {/* Background Image with Gradient Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${item.bgImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/75 to-[#0B1220]/20 pointer-events-none" />

            {/* Top Bar: Left Type Badge + Right Price Badge */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold font-manrope shadow-xs">
                {item.icon}
                <span>{item.title}</span>
              </div>

              <span className="px-2.5 py-1 rounded-md bg-[#C6A45A] text-white text-[11px] font-extrabold font-manrope shadow-sm">
                {item.fromPrice}
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-4 sm:p-5 pt-6 bg-gradient-to-t from-[#0B1220]/95 via-[#0B1220]/80 to-transparent flex flex-col gap-2">
              {/* Title & Discount Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white tracking-wide font-manrope">
                    {item.displayTitle}
                  </h3>
                  <span className="px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] text-[10px] font-bold font-manrope tracking-tight">
                    {item.discount}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform shrink-0" />
              </div>

              {/* Subtitle / Description */}
              <p className="text-xs text-white/90 leading-relaxed line-clamp-2 font-manrope">
                {item.description}
              </p>

              {/* Tag Pills & Select CTA */}
              <div className="pt-2 border-t border-slate-100/20 flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 sm:py-1 rounded bg-[#F1F5F9] text-[#475569] text-[11px] sm:text-xs font-medium font-manrope leading-4 shadow-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-1 text-[#C6A45A] group-hover:text-white transition-colors shrink-0 text-xs font-bold font-manrope">
                  <span>Select</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Ribbon */}
      <div className="pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5 text-xs text-[#667085] font-manrope">
        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
          <span>All-inclusive transparent rates</span>
        </div>
        <div>Fixed Price Guarantee</div>
        <div>24/7 Dispatch (+65) 8800 6006</div>
        <div className="px-3 py-1 rounded-full bg-[#FBF7EC] border border-[#F4EAD1] text-[#A77E3C] font-bold">
          Step 1 of 3
        </div>
      </div>
    </div>
  );
}
