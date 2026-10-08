"use client";

import React from "react";
import heroData from "@/data/hero.json";
import fleetData from "@/data/fleet.json";
import { MapPin, ArrowRight, Check, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useBookingModal } from "@/context/BookingContext";
import LocationAutocompleteInput from "@/Components/Booking/LocationAutocompleteInput";

export default function BookingCard() {
  const { bookingData, updateBookingData, openModal } = useBookingModal();

  const handleFleetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = fleetData.vehicles.find((v) => v.id === e.target.value);
    if (selected) {
      updateBookingData({
        selectedFleet: selected.name,
        selectedFleetSlug: selected.slug,
        baseFare: parseInt(selected.price.replace(/[^0-9]/g, "")) || 70,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal({ initialStep: 2 });
  };

  return (
    <div className="w-full max-w-[520px] p-4 sm:p-7 bg-white/15 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl flex flex-col gap-4 sm:gap-5 text-white">
      {/* Eyebrow & Title */}
      <div className="flex flex-col">
        <span className="text-white/80 text-[11px] sm:text-xs font-bold font-manrope uppercase tracking-wider">
          {heroData.bookingForm.eyebrow}
        </span>
        <h3 className="text-white text-lg sm:text-xl font-bold font-manrope leading-6 sm:leading-7 pt-0.5">
          {heroData.bookingForm.title}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4">
        {/* Pickup Location */}
        <LocationAutocompleteInput
          label="Pickup Location"
          placeholder={heroData.bookingForm.pickupPlaceholder}
          value={bookingData.pickup}
          onChange={(val) => updateBookingData({ pickup: val })}
          theme="glassDark"
          required
        />

        {/* Dropoff Location */}
        <LocationAutocompleteInput
          label="Dropoff Location"
          placeholder={heroData.bookingForm.dropoffPlaceholder}
          value={bookingData.dropoff}
          onChange={(val) => updateBookingData({ dropoff: val })}
          theme="glassDark"
          required
        />

        {/* Passengers & Luggage Steppers */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* Passengers */}
          <div className="px-3 py-2 sm:py-2.5 bg-white rounded-xl flex items-center justify-between shadow-sm">
            <span className="text-[#5F6B7A] text-[11px] sm:text-xs font-bold font-manrope uppercase tracking-tight">
              Pax
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    passengers: Math.max(1, bookingData.passengers - 1),
                  })
                }
                className="w-7 h-7 sm:w-8 sm:h-8 bg-[#F8F7F4] hover:bg-slate-200 active:bg-slate-300 rounded-lg flex items-center justify-center text-[#071E3B] text-base font-bold font-manrope transition-colors cursor-pointer"
                aria-label="Decrease passengers"
              >
                −
              </button>
              <span className="w-5 text-center text-xs sm:text-sm font-bold font-manrope text-[#071E3B]">
                {bookingData.passengers}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    passengers: Math.min(13, bookingData.passengers + 1),
                  })
                }
                className="w-7 h-7 sm:w-8 sm:h-8 bg-[#F8F7F4] hover:bg-slate-200 active:bg-slate-300 rounded-lg flex items-center justify-center text-[#071E3B] text-base font-bold font-manrope transition-colors cursor-pointer"
                aria-label="Increase passengers"
              >
                +
              </button>
            </div>
          </div>

          {/* Luggage */}
          <div className="px-3 py-2 sm:py-2.5 bg-white rounded-xl flex items-center justify-between shadow-sm">
            <span className="text-[#5F6B7A] text-[11px] sm:text-xs font-bold font-manrope uppercase tracking-tight">
              Bags
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    luggage: Math.max(0, bookingData.luggage - 1),
                  })
                }
                className="w-7 h-7 sm:w-8 sm:h-8 bg-[#F8F7F4] hover:bg-slate-200 active:bg-slate-300 rounded-lg flex items-center justify-center text-[#071E3B] text-base font-bold font-manrope transition-colors cursor-pointer"
                aria-label="Decrease luggage"
              >
                −
              </button>
              <span className="w-5 text-center text-xs sm:text-sm font-bold font-manrope text-[#071E3B]">
                {bookingData.luggage}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    luggage: Math.min(15, bookingData.luggage + 1),
                  })
                }
                className="w-7 h-7 sm:w-8 sm:h-8 bg-[#F8F7F4] hover:bg-slate-200 active:bg-slate-300 rounded-lg flex items-center justify-center text-[#071E3B] text-base font-bold font-manrope transition-colors cursor-pointer"
                aria-label="Increase luggage"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Meet & Greet Checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer select-none py-0.5">
          <input
            type="checkbox"
            checked={bookingData.meetAndGreet}
            onChange={(e) =>
              updateBookingData({ meetAndGreet: e.target.checked })
            }
            className="sr-only"
          />
          <div
            className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors ${
              bookingData.meetAndGreet ? "bg-[#C6A45A]" : "bg-white/40 border border-white"
            }`}
          >
            {bookingData.meetAndGreet && (
              <Check className="w-3 h-3 text-[#071E3B] stroke-[3.5]" />
            )}
          </div>
          <span className="text-white text-xs font-medium font-manrope leading-5">
            {heroData.bookingForm.meetAndGreetLabel}
          </span>
        </label>

        {/* Recommended fleet for trip */}
        <div className="flex flex-col gap-1">
          <label className="text-white text-xs sm:text-sm font-medium font-manrope leading-5">
            Recommended fleet for your trip
          </label>
          <div className="relative">
            <select
              value={bookingData.selectedFleetSlug}
              onChange={handleFleetChange}
              className="w-full appearance-none px-3.5 py-3 bg-white rounded-xl flex items-center justify-between text-xs sm:text-sm font-semibold font-manrope text-[#071E3B] shadow-sm outline-none cursor-pointer pr-24"
            >
              {fleetData.vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.model})
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1.5">
              <div className="flex flex-col items-end leading-none">
                <span className="text-[9px] text-[#667085] font-bold font-manrope uppercase">
                  Fixed
                </span>
                <span className="text-sm sm:text-base font-extrabold text-[#071E3B] font-manrope">
                  ${bookingData.baseFare}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#667085]" />
            </div>
          </div>
        </div>

        {/* Singapore Disclaimer */}
        <p className="text-white/85 text-[11px] sm:text-xs font-normal font-manrope leading-4 text-center">
          {heroData.bookingForm.disclaimer}
        </p>

        {/* Book Now Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-[#071E3B] hover:bg-[#0B2A4A] active:scale-98 rounded-xl flex justify-center items-center gap-2.5 text-white text-sm sm:text-base font-bold font-manrope transition-all shadow-md cursor-pointer hover:shadow-lg border border-white/10"
        >
          <span>Book Now</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Footer Sub-links */}
        <div className="flex items-center justify-between pt-1">
          <Link
            href="/pricing"
            className="text-white/80 hover:text-white text-xs font-medium font-manrope leading-5 flex items-center gap-1 transition-colors"
          >
            <span>{heroData.bookingForm.viewPricesLabel}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="https://wa.me/6588006006"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C6A45A] hover:text-amber-300 text-xs font-bold font-manrope leading-5 flex items-center gap-1 transition-colors"
          >
            <span>{heroData.bookingForm.whatsappLabel}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </form>
    </div>
  );
}


