import React from "react";
import Link from "next/link";
import { ArrowRight, Users, Briefcase } from "lucide-react";

export interface Vehicle {
  id: string;
  name: string;
  price: string;
  currency: string;
  description: string;
  specs: string;
  pax: number | string;
  bags: string;
  badge?: string;
  extras?: { label: string; price: string }[];
  buttonText: string;
}

export default function FleetCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="w-full bg-[#071E3B] rounded-[20px] overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-800/60 group">
      {/* Vehicle Image Banner */}
      <div>
        <div className="relative w-full h-[240px] sm:h-[260px] bg-gradient-to-b from-[#0F2A4D] to-[#071E3B] flex items-center justify-center overflow-hidden">
          <div className="text-center p-6 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-[#C6A45A]/90 tracking-wide uppercase group-hover:scale-105 transition-transform duration-300">
              {vehicle.name}
            </span>
            <span className="text-xs text-white/60 uppercase tracking-widest mt-2">
              Executive Chauffeur Class
            </span>
          </div>

          {vehicle.badge && (
            <div className="absolute top-4 left-4 bg-[#C6A45A] text-[#071E3B] px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">
              {vehicle.badge}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7 flex flex-col gap-5">
          {/* Header & Price */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              {vehicle.name}
            </h3>
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

      {/* Action Button */}
      <div className="p-6 sm:p-7 pt-0">
        <Link
          href="#booking"
          className="w-full py-3.5 px-6 rounded-lg bg-[#C6A45A] hover:bg-[#b59247] text-white text-sm font-semibold flex items-center justify-center gap-3 transition-all shadow-md group-hover:shadow-lg"
        >
          <span>{vehicle.buttonText}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </Link>
      </div>
    </div>
  );
}
