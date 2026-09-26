"use client";

import React from "react";
import fleetData from "@/data/fleet.json";
import FleetCard, { Vehicle } from "./FleetCard";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function FleetSection() {
  return (
    <section id="fleet" className="py-20 px-6 sm:px-12 bg-white">
      <div className="max-w-[1360px] mx-auto flex flex-col items-center gap-14">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-3 max-w-3xl">
          <span className="text-xs font-bold text-[#C6A45A] uppercase tracking-[1px] font-manrope">
            {fleetData.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071E3B] tracking-tight font-manrope">
            {fleetData.title}
          </h2>
          <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
            {fleetData.subtitle}
          </p>
        </div>

        {/* Fleet Grid: 2 rows of 3 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {fleetData.vehicles.map((vehicle: Vehicle) => (
            <FleetCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* Bottom Banner: +5 More Vehicles */}
        <div className="w-full bg-[#FBF7EC] border border-[#C6A45A] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-[#071E3B]">
              {fleetData.bottomBanner.title}
            </h4>
            <p className="text-sm text-[#5F6B7A]">
              {fleetData.bottomBanner.description}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              {fleetData.bottomBanner.badges.map((b, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#071E3B]"
                >
                  <Check className="w-3.5 h-3.5 text-[#C6A45A] stroke-[3]" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/fleets"
            className="px-8 py-3 rounded-lg bg-[#071E3B] hover:bg-[#0B2A4A] text-white text-sm font-semibold flex items-center gap-3 transition-all shrink-0"
          >
            <span>{fleetData.bottomBanner.buttonText}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
