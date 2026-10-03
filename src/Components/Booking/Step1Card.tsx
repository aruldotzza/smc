"use client";

import React from "react";
import { useBookingModal } from "@/context/BookingContext";
import AirportTransferCard from "./AirportTransferCard";
import CityTransferCard from "./CityTransferCard";
import HourlyCharterCard from "./HourlyCharterCard";
import { Plane, Clock, Car, Grid } from "lucide-react";

interface Step1CardProps {
  isModal?: boolean;
}

export default function Step1Card({ isModal = true }: Step1CardProps) {
  const { bookingData, updateBookingData, setStep } = useBookingModal();

  const service = (bookingData.serviceType || "").toLowerCase();

  const isAirport = service.includes("airport") || service.includes("arrival") || service.includes("departure");
  const isHourly = service.includes("hourly") || service.includes("charter");
  const isCity = !isAirport && !isHourly;

  const currentTab = isAirport ? "airport" : isHourly ? "hourly" : "city";

  const handleTabChange = (tab: "airport" | "hourly" | "city") => {
    if (tab === "airport") {
      updateBookingData({
        serviceType: "Airport Transfer",
        pickup: "Singapore Changi Airport (SIN)",
        dropoff: "Marina Bay Sands Hotel",
        baseFare: 70,
        meetAndGreet: true,
      });
    } else if (tab === "hourly") {
      updateBookingData({
        serviceType: "Hourly Charter",
        pickup: "Hotel Grand Pacific Singapore",
        dropoff: "As-Directed City Tour",
        durationHours: 3,
        baseFare: 65,
      });
    } else {
      updateBookingData({
        serviceType: "City Transfer",
        pickup: "Marina Bay Financial Centre",
        dropoff: "Orchard Road Shopping District",
        baseFare: 65,
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Top Quick Service Switcher Tabs */}
      <div className="w-full max-w-[620px] bg-[#071E3B]/90 backdrop-blur-md p-1.5 rounded-2xl flex items-center justify-between gap-1 shadow-lg border border-white/10 text-xs font-bold font-manrope">
        <button
          type="button"
          onClick={() => handleTabChange("airport")}
          className={`flex-1 py-2 sm:py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            currentTab === "airport"
              ? "bg-[#C6A45A] text-[#071E3B] shadow-sm font-extrabold"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          <Plane className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Airport</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("hourly")}
          className={`flex-1 py-2 sm:py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            currentTab === "hourly"
              ? "bg-[#C6A45A] text-[#071E3B] shadow-sm font-extrabold"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Hourly</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("city")}
          className={`flex-1 py-2 sm:py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            currentTab === "city"
              ? "bg-[#C6A45A] text-[#071E3B] shadow-sm font-extrabold"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          <Car className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">City</span>
        </button>

        {isModal && (
          <button
            type="button"
            onClick={() => setStep(0)}
            title="Browse all service options"
            className="py-2 sm:py-2.5 px-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer shrink-0"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Render the specialized popup card */}
      {isAirport && <AirportTransferCard isModal={isModal} />}
      {isHourly && <HourlyCharterCard isModal={isModal} />}
      {isCity && <CityTransferCard isModal={isModal} />}
    </div>
  );
}
