"use client";

import React from "react";
import pricingData from "@/data/pricing.json";
import { Ban, Clock, Hourglass, ArrowRight, MessageCircle, Check, Info } from "lucide-react";
import { useBookingModal } from "@/context/BookingContext";
import Link from "next/link";

export default function PricingSection() {
  const { openModal } = useBookingModal();

  const handleBookVehicle = (slug: string, name: string, fareStr: string) => {
    const fare = parseInt(fareStr.replace(/[^0-9]/g, "")) || 70;
    openModal({
      initialStep: 1,
      selectedFleet: name,
      selectedFleetSlug: slug,
      baseFare: fare,
    });
  };

  const getGuaranteeIcon = (iconName: string) => {
    switch (iconName) {
      case "ban":
        return <Ban className="w-8 h-8 text-rose-600" />;
      case "clock":
        return <Clock className="w-8 h-8 text-[#C6A45A]" />;
      case "hourglass":
        return <Hourglass className="w-8 h-8 text-[#C6A45A]" />;
      default:
        return <Check className="w-8 h-8 text-[#C6A45A]" />;
    }
  };

  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. Hero Header */}
      <section className="w-full bg-[#071E3B] text-white py-14 sm:py-20 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#071E3B] via-[#0B2A4A] to-[#071E3B] pointer-events-none opacity-90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A45A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto relative z-10 flex flex-col items-start gap-4">
          <span className="text-base sm:text-lg font-bold text-[#C6A45A] uppercase tracking-[0.5px]">
            {pricingData.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
            {pricingData.title}
          </h1>
          <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl font-normal">
            {pricingData.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <section className="py-16 sm:py-20 px-6 sm:px-12 lg:px-24 max-w-[1360px] mx-auto w-full flex flex-col gap-16">
        {/* 3 Guarantees Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pricingData.guarantees.map((item, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-2xl bg-[#F8F7F4] border border-[#E9ECEF] flex flex-col items-center text-center gap-3.5 shadow-2xs hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-1">
                {getGuaranteeIcon(item.icon)}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#071E3B]">
                {item.title}
              </h3>
              <p className="text-sm text-[#667085] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Vehicle Pricing Table */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071E3B]">
                Vehicle Pricing Matrix
              </h2>
              <p className="text-sm text-[#667085] mt-1">
                Transparent comparison of all vehicles and journey options in Singapore.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openModal({ initialStep: 0 })}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#071E3B] hover:bg-[#0B2A4A] text-white text-sm font-semibold transition-all shrink-0 cursor-pointer"
            >
              <span>Instant Booking</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Table Container */}
          <div className="w-full rounded-2xl border border-[#E9ECEF] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#071E3B] text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Vehicle</th>
                    <th className="py-4 px-4 text-center">Pax</th>
                    <th className="py-4 px-4 text-center">Point to Point</th>
                    <th className="py-4 px-4 text-center">Meet &amp; Greet</th>
                    <th className="py-4 px-4 text-center">3h Charter</th>
                    <th className="py-4 px-4 text-center">8h Charter</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {pricingData.matrix.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-[#F7F5EF]"
                      } hover:bg-[#EEF5FB] transition-colors`}
                    >
                      <td className="py-4 px-6">
                        <Link
                          href={`/fleets/${row.slug}`}
                          className="group block"
                        >
                          <span className="font-bold text-base text-[#071E3B] group-hover:text-[#C6A45A] transition-colors block">
                            {row.name}
                          </span>
                          <span className="text-xs text-[#667085]">
                            {row.model}
                          </span>
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-center font-semibold text-[#667085]">
                        {row.pax}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-base text-[#C6A45A]">
                        {row.pointToPoint}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-[#A77E3C]">
                        {row.meetAndGreet}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-[#A77E3C]">
                        {row.charter3h}
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-[#A77E3C]">
                        {row.charter8h}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            handleBookVehicle(row.slug, row.name, row.pointToPoint)
                          }
                          className="px-4 py-2 rounded-md bg-[#C6A45A] hover:bg-[#B58E45] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          Book
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pricing Notes Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F5EF] border border-[#E9ECEF] flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#071E3B]">
            <Info className="w-5 h-5 text-[#C6A45A]" />
            <h3 className="text-lg font-bold">Important Pricing Notes</h3>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[#5F6B7A]">
            {pricingData.pricingNotes.map((note, nIdx) => (
              <li key={nIdx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A45A] shrink-0 mt-2" />
                <span className="leading-relaxed">{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Ready to Book CTA Card */}
        <div className="w-full rounded-3xl bg-[#071E3B] text-white p-8 sm:p-14 lg:p-16 text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
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
                onClick={() => openModal({ initialStep: 0 })}
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
