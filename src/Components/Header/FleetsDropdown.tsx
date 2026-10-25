"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface FleetItem {
  name: string;
  capacity: string;
  slug: string;
  image: string;
}

const fleets: FleetItem[] = [
  {
    name: "Mercedes E-Class",
    capacity: "4 Pax | 2 Bags",
    slug: "mercedes-e-class",
    image: "/images/Cab.png",
  },
  {
    name: "Mercedes S-Class",
    capacity: "4 Pax | 2 Bags",
    slug: "mercedes-s-class",
    image: "/images/Cab.png",
  },
  {
    name: "Toyota Alphard / Vellfire",
    capacity: "6 Pax | 4 Bags",
    slug: "6-seater",
    image: "/images/Cab.png",
  },
  {
    name: "Mercedes Vito / Viano",
    capacity: "7 Pax | 6 Bags",
    slug: "7-seater",
    image: "/images/Cab.png",
  },
  {
    name: "Mercedes V-Class",
    capacity: "7 Pax | 6 Bags",
    slug: "7-seater",
    image: "/images/Cab.png",
  },
  {
    name: "Toyota Hiace 13-Seater Minibus",
    capacity: "13 Pax | 11 Bags",
    slug: "13-seater",
    image: "/images/Cab.png",
  },
  {
    name: "VIP / Executive Minibus",
    capacity: "13 Pax | 11 Bags",
    slug: "vip-lounge",
    image: "/images/Cab.png",
  },
  {
    name: "Wheelchair-Accessible Maxi Cab",
    capacity: "Accessible Wheelchair with Ramps",
    slug: "wheelchair-cab",
    image: "/images/Cab.png",
  },
  {
    name: "23-Seater Coach",
    capacity: "23 Pax | 20 Bags",
    slug: "13-seater",
    image: "/images/Cab.png",
  },
  {
    name: "40-Seater Coach",
    capacity: "40 Pax | 20 Bags",
    slug: "13-seater",
    image: "/images/Cab.png",
  },
];

interface FleetsDropdownProps {
  onItemClick?: () => void;
}

export default function FleetsDropdown({ onItemClick }: FleetsDropdownProps) {
  return (
    <div className="w-[360px] sm:w-[504px] max-h-[460px] overflow-y-auto p-2 sm:p-3 bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col divide-y divide-slate-100 z-50">
      {fleets.map((fleet, index) => (
        <Link
          key={index}
          href={`/fleets#${fleet.slug}`}
          onClick={onItemClick}
          className="p-3 sm:p-3.5 rounded-xl flex items-center gap-3.5 hover:bg-[#FBF7EC] active:scale-[0.99] transition-all group"
        >
          <div className="w-14 h-11 shrink-0 relative rounded-md overflow-hidden bg-slate-100 flex items-center justify-center p-1 border border-slate-200/70">
            <Image
              src={fleet.image}
              alt={fleet.name}
              fill
              sizes="56px"
              className="object-contain group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[#071E3B] text-sm sm:text-base font-semibold font-manrope leading-snug group-hover:text-[#C6A45A] transition-colors">
              {fleet.name}
            </span>
            <span className="text-[#667085] text-xs font-normal font-manrope leading-4">
              {fleet.capacity}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
