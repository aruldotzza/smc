"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useBookingModal } from "@/context/BookingContext";

export interface Vehicle {
  id: string;
  slug?: string;
  name: string;
  model?: string;
  price: string;
  currency: string;
  description: string;
  heroDescription?: string;
  pax: string;
  paxCount?: number | string;
  bags: string;
  luggageCount?: number;
  badge?: string;
  image?: string;
  meetAndGreet?: string;
  charter3h?: string;
  specsRow1Label?: string;
  specsRow1Value?: string;
  specsRow2Label?: string;
  specsRow2Value?: string;
  specsRow3Label?: string;
  specsRow3Value?: string;
  extras?: { label: string; price: string }[];
  buttonText: string;
}

export default function FleetCard({ vehicle }: { vehicle: Vehicle }) {
  const { openModal } = useBookingModal();
  const slug = vehicle.slug || vehicle.id;

  const handleReserve = () => {
    openModal({
      initialStep: 1,
      selectedFleet: vehicle.name,
      selectedFleetSlug: slug,
      baseFare: parseInt(vehicle.price.replace(/[^0-9]/g, "")) || 70,
    });
  };

  // Row 1: Passenger / Bags
  const row1Label = vehicle.specsRow1Label || "Passenger / Bags";
  const row1Value = vehicle.specsRow1Value || `${vehicle.pax} • ${vehicle.bags}`;

  // Row 2: Changi Meet & Greet
  const row2Label = vehicle.specsRow2Label || "Changi Meet & Greet";
  const row2Value = vehicle.specsRow2Value || vehicle.meetAndGreet || "$75 SGD";

  // Row 3: 3-Hour Charter or LTA
  const row3Label = vehicle.specsRow3Label || (vehicle.id === "wheelchair-cab" ? "LTA Certified" : "3-Hour Charter");
  const row3Value = vehicle.specsRow3Value || vehicle.charter3h || (vehicle.id === "wheelchair-cab" ? "Full Safety Harness" : "$180 SGD");

  return (
    <div className="w-full bg-[#071E3B] rounded-[20px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col justify-between border border-[#0B2A4A] group hover:shadow-2xl transition-all duration-300">
      {/* Top Section: Image & Body */}
      <div className="flex flex-col">
        {/* Vehicle Image Banner */}
        <Link
          href={`/fleets/${slug}`}
          className="block relative w-full h-64 bg-[#071E3B] overflow-hidden cursor-pointer"
        >
          <Image
            src={vehicle.image || "/images/Cab.png"}
            alt={vehicle.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-[20px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071E3B]/80 via-transparent to-transparent pointer-events-none" />

          {vehicle.badge && (
            <div className="absolute top-4 left-4 z-10 bg-[#C6A45A] text-[#071E3B] px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-md">
              {vehicle.badge}
            </div>
          )}
        </Link>

        {/* Card Body */}
        <div className="p-7 flex flex-col gap-6">
          {/* Header & Price */}
          <div className="flex items-start justify-between gap-3">
            <Link href={`/fleets/${slug}`}>
              <h3 className="text-xl font-semibold text-white font-manrope group-hover:text-[#C6A45A] transition-colors">
                {vehicle.name}
              </h3>
            </Link>
            <div className="flex items-baseline gap-1 shrink-0">
              <span className="text-2xl font-semibold text-[#C6A45A] font-manrope">
                {vehicle.price}
              </span>
              <span className="text-xs text-white font-normal font-manrope">
                {vehicle.currency}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm font-normal text-white leading-5 font-manrope min-h-[40px]">
            {vehicle.description}
          </p>

          {/* Specs Rows with Border Top & Bottom */}
          <div className="py-6 border-t border-b border-[#7A8593]/40 flex flex-col gap-3.5">
            {/* Row 1: Passenger / Bags */}
            <div className="flex items-center justify-between">
              <span className="text-base font-normal text-white font-manrope">
                {row1Label}
              </span>
              <span className="text-xs font-medium text-white font-manrope">
                {row1Value}
              </span>
            </div>

            {/* Row 2: Changi Meet & Greet */}
            <div className="flex items-center justify-between">
              <span className="text-base font-normal text-white font-manrope">
                {row2Label}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-semibold text-[#C6A45A] font-manrope">
                  {row2Value.split(" ")[0]}
                </span>
                {row2Value.split(" ")[1] && (
                  <span className="text-xs font-normal text-white font-manrope">
                    {row2Value.split(" ")[1]}
                  </span>
                )}
              </div>
            </div>

            {/* Row 3: 3-Hour Charter / LTA */}
            <div className="flex items-center justify-between">
              <span className="text-base font-normal text-white font-manrope">
                {row3Label}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-semibold text-[#C6A45A] font-manrope">
                  {row3Value.includes("SGD") ? row3Value.split(" ")[0] : row3Value}
                </span>
                {row3Value.includes("SGD") && (
                  <span className="text-xs font-normal text-white font-manrope">
                    SGD
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Button */}
      <div className="px-7 pt-1 pb-7">
        <button
          type="button"
          onClick={handleReserve}
          className="w-full px-8 py-3 bg-[#C6A45A] hover:bg-[#B58E45] rounded-xl flex items-center justify-center gap-4 text-[#071E3B] text-base font-semibold font-manrope transition-all shadow-md group-hover:shadow-lg cursor-pointer"
        >
          <span>{vehicle.buttonText}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}

