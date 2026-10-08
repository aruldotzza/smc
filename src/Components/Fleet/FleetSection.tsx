"use client";

import React from "react";
import fleetData from "@/data/fleet.json";
import FleetCard, { Vehicle } from "./FleetCard";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useBookingModal } from "@/context/BookingContext";

export default function FleetSection() {
  const { vehicles: liveVehicles } = useBookingModal();

  // Transform live API vehicles or fallback to static fleetData
  const vehiclesToDisplay: Vehicle[] =
    liveVehicles && liveVehicles.length > 0
      ? liveVehicles.map((v) => {
          const slug =
            v.passengerCapacity === 6
              ? "6-seater"
              : v.passengerCapacity === 7
              ? "7-seater"
              : v.passengerCapacity === 9
              ? "9-seater"
              : v.passengerCapacity === 13
              ? "13-seater"
              : `vehicle-${v.id}`;
          const localMatch = fleetData.vehicles.find(
            (fv) => fv.slug === slug || fv.id === slug
          );

          const pointToPoint =
            v.prices?.departure_transfer?.amount ||
            v.prices?.arrival?.amount ||
            (localMatch ? parseInt(localMatch.price.replace(/[^0-9]/g, "")) : 70);
          const meetAndGreet =
            v.prices?.arrival?.amount || pointToPoint + 10;
          const hourlyRate = v.prices?.hourly?.amount || 65;

          return {
            id: String(v.id),
            slug,
            name: v.name,
            model: v.description || v.vehicleType || localMatch?.model || "Executive Maxi Cab",
            price: `$${pointToPoint}`,
            currency: v.currency || "SGD",
            description:
              v.description ||
              localMatch?.description ||
              "Comfortable luxury maxi cab with air-conditioned cabin and professional chauffeur.",
            heroDescription: localMatch?.heroDescription,
            pax: `${v.passengerCapacity || 7} Pax`,
            paxCount: v.passengerCapacity || 7,
            bags: `${v.luggageCapacity || 5} Bags`,
            luggageCount: v.luggageCapacity || 5,
            badge: v.recommendation ? "Recommended" : localMatch?.badge,
            image: v.imageUrl || localMatch?.image || "/images/Cab.png",
            meetAndGreet: `$${meetAndGreet} SGD`,
            charter3h: `$${hourlyRate * 3} SGD`,
            buttonText: `Reserve ${v.name.split(" ")[0]}`,
          };
        })
      : fleetData.vehicles;

  return (
    <section id="fleet" className="py-10 sm:py-16 px-4 sm:px-8 lg:px-16 bg-white">
      <div className="max-w-[1312px] mx-auto flex flex-col items-center gap-8 sm:gap-10">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-2.5 sm:gap-4 max-w-3xl">
          <div className="flex flex-col items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-bold text-[#C6A45A] uppercase tracking-wide font-manrope">
              {fleetData.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#071E3B] leading-tight font-manrope">
              {fleetData.title}
            </h2>
          </div>
          <p className="text-sm sm:text-lg text-[#667085] font-normal leading-relaxed font-manrope">
            {fleetData.subtitle}
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="w-full flex flex-col gap-6 sm:gap-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {vehiclesToDisplay.map((vehicle: Vehicle) => (
              <FleetCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          {/* Bottom Banner: +5 More Vehicles */}
          <div className="w-full bg-[#FBF7EC] border border-[#C6A45A] rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xs">
            <div className="flex flex-col gap-1.5 text-center md:text-left">
              <h4 className="text-lg sm:text-xl font-bold text-[#071E3B] font-manrope">
                {fleetData.bottomBanner.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#5F6B7A] font-manrope leading-relaxed">
                {fleetData.bottomBanner.description}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
                {fleetData.bottomBanner.badges.map((b, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#071E3B] font-manrope"
                  >
                    <Check className="w-3.5 h-3.5 text-[#C6A45A] stroke-[3]" />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/fleets"
              className="w-full md:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-[#071E3B] hover:bg-[#0B2A4A] text-white text-sm font-bold font-manrope flex items-center justify-center gap-3 transition-all shrink-0 cursor-pointer active:scale-98 shadow-sm"
            >
              <span>{fleetData.bottomBanner.buttonText}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}



