"use client";

import React from "react";
import heroData from "@/data/hero.json";
import fleetData from "@/data/fleet.json";
import { MapPin, ArrowRight, Check, ChevronDown, ChevronRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useBookingModal } from "@/context/BookingContext";

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
    <div className="w-full max-w-[520px] p-7 bg-white/10 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl flex flex-col gap-5 text-white">
      {/* Eyebrow & Title */}
      <div className="flex flex-col">
        <span className="text-white text-xs font-semibold font-manrope uppercase leading-4 tracking-wider">
          {heroData.bookingForm.eyebrow}
        </span>
        <h3 className="text-white text-xl font-semibold font-manrope leading-7 pt-1">
          {heroData.bookingForm.title}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Pickup Location */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white text-sm font-medium font-manrope leading-5">
            Pickup Location
          </label>
          <div className="px-4 py-3 bg-white rounded-lg flex items-center justify-between shadow-sm focus-within:ring-2 focus-within:ring-[#C6A45A]">
            <input
              type="text"
              placeholder={heroData.bookingForm.pickupPlaceholder}
              value={bookingData.pickup}
              onChange={(e) => updateBookingData({ pickup: e.target.value })}
              required
              className="w-full text-xs font-normal font-manrope text-slate-900 placeholder:text-[#667085] outline-none bg-transparent"
            />
            <MapPin className="w-3.5 h-3.5 text-[#C6A45A] shrink-0 ml-2" />
          </div>
        </div>

        {/* Dropoff Location */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white text-sm font-medium font-manrope leading-5">
            Dropoff Location
          </label>
          <div className="px-4 py-3 bg-white rounded-lg flex items-center justify-between shadow-sm focus-within:ring-2 focus-within:ring-[#C6A45A]">
            <input
              type="text"
              placeholder={heroData.bookingForm.dropoffPlaceholder}
              value={bookingData.dropoff}
              onChange={(e) => updateBookingData({ dropoff: e.target.value })}
              required
              className="w-full text-xs font-normal font-manrope text-slate-900 placeholder:text-[#667085] outline-none bg-transparent"
            />
            <MapPin className="w-3.5 h-3.5 text-[#C6A45A] shrink-0 ml-2" />
          </div>
        </div>

        {/* Passengers & Luggage Steppers */}
        <div className="grid grid-cols-2 gap-3">
          {/* Passengers */}
          <div className="px-3 py-2.5 bg-white rounded-lg flex items-center justify-between shadow-sm">
            <span className="text-[#5F6B7A] text-xs font-semibold font-manrope uppercase leading-4 tracking-tight">
              Passengers
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    passengers: Math.max(1, bookingData.passengers - 1),
                  })
                }
                className="w-6 h-6 bg-[#F8F7F4] hover:bg-slate-200 rounded-sm flex items-center justify-center text-[#071E3B] text-sm font-bold font-manrope transition-colors cursor-pointer"
              >
                −
              </button>
              <span className="w-5 text-center text-xs font-medium font-manrope text-[#071E3B]">
                {bookingData.passengers}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    passengers: Math.min(13, bookingData.passengers + 1),
                  })
                }
                className="w-6 h-6 bg-[#F8F7F4] hover:bg-slate-200 rounded-sm flex items-center justify-center text-[#071E3B] text-sm font-bold font-manrope transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Luggage */}
          <div className="px-3 py-2.5 bg-white rounded-lg flex items-center justify-between shadow-sm">
            <span className="text-[#5F6B7A] text-xs font-semibold font-manrope uppercase leading-4 tracking-tight">
              Luggage
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    luggage: Math.max(0, bookingData.luggage - 1),
                  })
                }
                className="w-6 h-6 bg-[#F8F7F4] hover:bg-slate-200 rounded-sm flex items-center justify-center text-[#071E3B] text-sm font-bold font-manrope transition-colors cursor-pointer"
              >
                −
              </button>
              <span className="w-5 text-center text-xs font-medium font-manrope text-[#071E3B]">
                {bookingData.luggage}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    luggage: Math.min(15, bookingData.luggage + 1),
                  })
                }
                className="w-6 h-6 bg-[#F8F7F4] hover:bg-slate-200 rounded-sm flex items-center justify-center text-[#071E3B] text-sm font-bold font-manrope transition-colors cursor-pointer"
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
            className={`w-4 h-4 rounded-sm flex items-center justify-center transition-colors ${
              bookingData.meetAndGreet ? "bg-[#C6A45A]" : "bg-white/40 border border-white"
            }`}
          >
            {bookingData.meetAndGreet && (
              <Check className="w-3 h-3 text-white stroke-[3]" />
            )}
          </div>
          <span className="text-white text-xs font-normal font-manrope leading-5">
            {heroData.bookingForm.meetAndGreetLabel}
          </span>
        </label>

        {/* Recommended fleet for trip */}
        <div className="flex flex-col gap-1.5">
          <label className="text-white text-sm font-normal font-manrope leading-5">
            Recommended fleet for your trip
          </label>
          <div className="relative">
            <select
              value={bookingData.selectedFleetSlug}
              onChange={handleFleetChange}
              className="w-full appearance-none px-4 py-3 bg-white rounded-lg flex items-center justify-between text-xs font-normal font-manrope text-[#071E3B] shadow-sm outline-none cursor-pointer pr-24"
            >
              {fleetData.vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.model})
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
              <div className="flex flex-col items-end leading-none">
                <span className="text-[10px] text-[#667085] font-normal font-manrope leading-3">
                  Fixed fare
                </span>
                <span className="text-base font-semibold text-[#071E3B] font-manrope">
                  ${bookingData.baseFare}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#667085]" />
            </div>
          </div>
        </div>

        {/* Singapore Disclaimer */}
        <p className="text-white text-xs font-normal font-manrope leading-4 text-center">
          {heroData.bookingForm.disclaimer}
        </p>

        {/* Book Now Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-[#071E3B] hover:bg-[#0B2A4A] rounded-lg flex justify-center items-center gap-2.5 text-white text-base font-semibold font-manrope transition-all shadow-md cursor-pointer hover:shadow-lg"
        >
          <span>Book Now</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Footer Sub-links */}
        <div className="flex items-center justify-between pt-1">
          <Link
            href="/pricing"
            className="text-white/70 hover:text-white text-xs font-normal font-manrope leading-5 flex items-center gap-1 transition-colors"
          >
            <span>{heroData.bookingForm.viewPricesLabel}</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
          <a
            href="https://wa.me/6588006006"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white text-xs font-bold font-manrope leading-5 flex items-center gap-1 transition-colors"
          >
            <span>{heroData.bookingForm.whatsappLabel}</span>
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </form>
    </div>
  );
}

