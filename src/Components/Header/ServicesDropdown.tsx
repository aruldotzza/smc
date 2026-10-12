"use client";

import React from "react";
import Link from "next/link";
import { Plane, Briefcase, Heart, Users, Clock, Accessibility } from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    title: "Airport Transfers",
    description: "Meet & Greet at all Changi terminals, Seletar, and Jewel. We track your flight and wait even if it is delayed.",
    href: "/services/airport-transfers",
    icon: <Plane className="w-5 h-5 text-[#C6A45A]" />,
  },
  {
    title: "Corporate & Business Transport",
    description: "Executive cars for corporate accounts, with monthly billing, dedicated dispatchers, and priority booking.",
    href: "/services/corporate-transport",
    icon: <Briefcase className="w-5 h-5 text-[#C6A45A]" />,
  },
  {
    title: "Weddings & Special Occasions",
    description: "Mercedes S-Class with optional bridal decorations for weddings, galas, prom nights, and other milestone events.",
    href: "/services/wedding-car",
    icon: <Heart className="w-5 h-5 text-[#C6A45A]" />,
  },
  {
    title: "Group & Event Shuttles",
    description: "Coordinated transport for conferences, corporate away-days, sports events, and large groups.",
    href: "/services/group-transport",
    icon: <Users className="w-5 h-5 text-[#C6A45A]" />,
  },
  {
    title: "Hourly Booking & Standby",
    description: "Book a dedicated driver for 3–12 hours for meetings, city tours, shopping, or business standby.",
    href: "/services/hourly-charter",
    icon: <Clock className="w-5 h-5 text-[#C6A45A]" />,
  },
  {
    title: "Wheelchair Accessible Transport",
    description: "Purpose-built accessible vehicles with hydraulic ramps and safety harnesses for safe, comfortable mobility transfers.",
    href: "/services/wheelchair-transport",
    icon: <Accessibility className="w-5 h-5 text-[#C6A45A]" />,
  },
];

interface ServicesDropdownProps {
  onItemClick?: () => void;
}

export default function ServicesDropdown({ onItemClick }: ServicesDropdownProps) {
  return (
    <div className="w-[360px] sm:w-[504px] max-h-[480px] overflow-y-auto p-2 sm:p-3 bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col divide-y divide-slate-100 z-50">
      {services.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          onClick={onItemClick}
          className="p-3 sm:p-3.5 rounded-xl flex items-start gap-4 hover:bg-[#FBF7EC] active:scale-[0.99] transition-all group"
        >
          <div className="w-11 h-11 shrink-0 rounded-xl bg-[#FBF7EC] border border-[#F4EAD1] flex items-center justify-center group-hover:scale-105 transition-transform">
            {item.icon}
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="text-[#071E3B] text-sm sm:text-base font-semibold font-manrope leading-snug group-hover:text-[#C6A45A] transition-colors">
              {item.title}
            </span>
            <span className="text-[#667085] text-xs font-normal font-manrope leading-relaxed line-clamp-2">
              {item.description}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
