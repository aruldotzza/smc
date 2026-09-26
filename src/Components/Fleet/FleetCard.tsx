"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Briefcase } from "lucide-react";
import { useBookingModal } from "@/context/BookingContext";

export interface Vehicle {
  id: string;
  slug?: string;
  name: string;
  model?: string;
  price: string;
  currency: string;
  description: string;
  specs?: string;
  pax: number | string;
  bags: string;
  badge?: string;
  image?: string;
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

  return (
    <div className="w-full bg-[#071E3B] rounded-[20px] overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-800/60 group">
      {/* Vehicle Image Banner */}
      <div>
        <Link
          href={`/fleets/${slug}`}
          className="block relative w-full h-[220px] sm:h-[240px] bg-[#071E3B] overflow-hidden cursor-pointer"
        >
          <Image
            src={vehicle.image || "/images/Cab.png"}
            alt={vehicle.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071E3B] via-[#071E3B]/20 to-transparent opacity-60 pointer-events-none" />

          {vehicle.badge && (
            <div className="absolute top-4 left-4 z-10 bg-[#C6A45A] text-[#071E3B] px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-md">
              {vehicle.badge}
            </div>
          )}
        </Link>

        {/* Card Body */}
        <div className="p-6 sm:p-7 flex flex-col gap-5">
          {/* Header & Price */}
          <div className="flex items-start justify-between gap-3">
            <Link href={`/fleets/${slug}`}>
              <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#C6A45A] transition-colors">
                {vehicle.name}
              </h3>
            </Link>
            <div className="flex items-baseline gap-1 shrink-0">
              <span className="text-2xl font-bold text-[#C6A45A]">
                {vehicle.price}
              </span>
              <span className="text-xs text-white/80 font-normal">
                {vehicle.currency}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-white/80 leading-relaxed min-h-[40px]">
            {vehicle.description}
          </p>

          {/* Specs Bar */}
          <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span className="text-[#C6A45A] font-semibold">Capacity</span>
            <div className="flex items-center gap-4 text-white font-medium">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#C6A45A]" />
                {vehicle.pax} Pax
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#C6A45A]" />
                {vehicle.bags} Bags
              </span>
            </div>
          </div>

          {/* Extras list if available */}
          {vehicle.extras && vehicle.extras.length > 0 && (
            <div className="flex flex-col gap-2 pt-1 border-t border-white/10">
              {vehicle.extras.map((extra, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs text-white/70"
                >
                  <span>{extra.label}</span>
                  <span className="text-[#C6A45A] font-semibold">{extra.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 sm:p-7 pt-0 flex items-center gap-2">
        <button
          type="button"
          onClick={handleReserve}
          className="flex-1 py-3.5 px-4 rounded-lg bg-[#C6A45A] hover:bg-[#B58E45] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-lg cursor-pointer"
        >
          <span>{vehicle.buttonText}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <Link
          href={`/fleets/${slug}`}
          className="py-3.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center transition-all"
          title="View Details"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
