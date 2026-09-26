"use client";

import React from "react";
import { useBookingModal } from "@/context/BookingContext";
import { Plane, Clock, Car, MapPin, Check, ShieldCheck, ChevronRight, X } from "lucide-react";

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
      bgImage: "/images/Home/Hero_tab.png",
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
      bgImage: "/images/Home/Hero_tab.png",
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
      bgImage: "/images/Cab.png",
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
      bgImage: "/images/Cab.png",
    },
  ];

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-10 flex flex-col gap-8 max-w-4xl mx-auto relative overflow-hidden">
      {/* Close button */}
      <button
        onClick={closeModal}
        className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            What are you booking?
          </h2>
          <p className="text-sm text-[#667085] max-w-xl leading-relaxed">
            Select a luxury transfer option to configure your itinerary with dedicated chauffeur service.
          </p>
        </div>

        {/* 100% Fixed Fares Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FBF7EC] border border-[#F4EAD1] text-[#A77E3C] text-xs font-bold shrink-0 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-[#A77E3C]" />
          <span>100% Fixed Fares · No Hidden Fees</span>
        </div>
      </div>

      {/* 2x2 Services Grid matching Figma design */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelect(item)}
            className="group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-sm hover:shadow-xl hover:border-[#C6A45A] transition-all duration-300 flex flex-col justify-end min-h-[300px] cursor-pointer"
          >
            {/* Background Image with Dark Gradient */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${item.bgImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/80 to-[#0B1220]/25" />

            {/* Top Badges */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                {item.icon}
                <span>{item.title}</span>
              </div>
            </div>

            <div className="absolute top-3.5 right-3.5 z-10">
              <span className="px-2.5 py-1 rounded-md bg-[#C6A45A] text-white text-xs font-extrabold shadow-sm">
                {item.fromPrice}
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-5 pt-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {item.displayTitle}
                  </h3>
                  <span className="px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] text-[10px] font-bold">
                    {item.discount}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </div>

              <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed line-clamp-2">
                {item.description}
              </p>

              {/* Tag Pills & Select CTA */}
              <div className="pt-2.5 border-t border-white/15 flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-white/10 text-white/80 text-[11px] font-normal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-bold text-[#C6A45A] group-hover:text-white transition-colors shrink-0 flex items-center gap-0.5">
                  Select →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Ribbon */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#667085]">
        <div className="flex items-center gap-2 text-emerald-700 font-medium">
          <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
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
