"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface ServicesSectionProps {
  isPage?: boolean;
}

export default function ServicesSection({ isPage = false }: ServicesSectionProps) {
  const serviceColumns: ServiceItem[][] = [
    // Column 1
    [
      {
        id: "airport-transfers",
        slug: "airport-transfers",
        title: "Airport Transfers",
        subtitle: "All Changi terminals, Jewel & Seletar",
        icon: (
          <svg
            className="w-5 h-5 text-[#123F6B]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2 4 20l8-4 8 4L12 2z" />
            <path d="M12 2v14" />
          </svg>
        ),
      },
      {
        id: "corporate-business",
        slug: "corporate-business",
        title: "Corporate & Business Transport",
        subtitle: "Executive cars with easy monthly billing",
        icon: (
          <svg
            className="w-5 h-5 text-[#123F6B]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="13" x="3" y="7" rx="3" />
            <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
            <path d="M3 13h18" />
          </svg>
        ),
      },
    ],
    // Column 2
    [
      {
        id: "weddings-special-occasions",
        slug: "weddings-special-occasions",
        title: "Weddings & Special Occasions",
        subtitle: "Mercedes S-Class with bridal decorations",
        icon: (
          <svg
            className="w-5 h-5 text-[#123F6B]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        ),
      },
      {
        id: "groups-event-shuttles",
        slug: "groups-event-shuttles",
        title: "Group & Event Shuttles",
        subtitle: "Conference and large group transfers",
        icon: (
          <svg
            className="w-5 h-5 text-[#123F6B]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="6.5" cy="6.5" r="2.5" />
            <path d="M3 14a3.5 3.5 0 0 1 7 0" />
            <circle cx="17.5" cy="6.5" r="2.5" />
            <path d="M14 14a3.5 3.5 0 0 1 7 0" />
            <circle cx="12" cy="13" r="2.5" />
            <path d="M8.5 20.5a3.5 3.5 0 0 1 7 0" />
          </svg>
        ),
      },
    ],
    // Column 3
    [
      {
        id: "hourly-booking-standby",
        slug: "hourly-booking-standby",
        title: "Hourly Booking & Standby",
        subtitle: "Book a dedicated driver for 3-12 hours",
        icon: (
          <svg
            className="w-5 h-5 text-[#123F6B]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        ),
      },
      {
        id: "wheelchair-transport",
        slug: "wheelchair-transport",
        title: "Wheelchair Accessible Maxi Cab",
        subtitle: "Wheelchair ramp & secure safety straps",
        icon: (
          <svg
            className="w-5 h-5 text-[#123F6B]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        ),
      },
    ],
  ];

  return (
    <section id="services" className="self-stretch px-6 sm:px-12 lg:px-16 py-12 flex flex-col justify-start items-center gap-8 bg-white">
      {/* Header */}
      <div className="self-stretch flex flex-col justify-start items-center gap-4">
        <div className="w-full max-w-[760px] flex flex-col justify-start items-center gap-3">
          <div className="self-stretch flex flex-col justify-start items-center">
            <span className="self-stretch text-center justify-center text-[#C6A45A] text-xs font-bold font-manrope uppercase leading-4 tracking-wide">
              OUR SERVICES
            </span>
          </div>
          <div className="self-stretch flex flex-col justify-start items-center">
            <h2 className="self-stretch text-center justify-center text-[#071E3B] text-4xl font-bold font-manrope leading-10">
              Rides for Every Need
            </h2>
          </div>
        </div>
        <div className="w-full max-w-[760px] flex flex-col justify-start items-center">
          <p className="self-stretch text-center justify-center text-[#667085] text-lg font-normal font-manrope leading-7">
            Airport pickups, hourly bookings, corporate transfers, and event transport - all with clear, fixed pricing and no hidden fees.
          </p>
        </div>
      </div>

      {/* 3 Columns with 2 Cards each matching design snippet */}
      <div className="w-full max-w-[1312px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {serviceColumns.map((column, colIdx) => (
          <div key={colIdx} className="w-full flex flex-col justify-start items-start gap-6">
            {column.map((item) => (
              <Link
                key={item.id}
                href={`/services/${item.slug}`}
                className="self-stretch p-6 bg-gradient-to-br from-white to-slate-50 rounded-[20px] shadow-[0px_4px_16px_-4px_rgba(15,23,42,0.04)] shadow-[0px_1px_4px_0px_rgba(15,23,42,0.03)] border border-[#E9ECEF] flex flex-col justify-start items-start gap-4 hover:border-[#C6A45A] hover:shadow-lg transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-[#EEF5FB] rounded-xl flex justify-center items-center shrink-0 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>

                {/* Title & Subtitle */}
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <h3 className="self-stretch text-[#071E3B] text-lg font-semibold font-manrope leading-7 group-hover:text-[#C6A45A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="self-stretch text-[#667085] text-sm font-normal font-manrope leading-5">
                    {item.subtitle}
                  </p>
                </div>

                {/* Bottom Right Chevron Arrow */}
                <div className="self-stretch flex flex-col justify-start items-end pt-1">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-[#667085] group-hover:text-[#C6A45A] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}



