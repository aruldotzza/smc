"use client";

import React from "react";
import heroData from "@/data/hero.json";
import fleetData from "@/data/fleet.json";
import { MapPin, ArrowRight, Check, ChevronDown, MessageCircle } from "lucide-react";
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
    <div className="w-full max-w-[520px] bg-white/10 backdrop-blur-[24px] border border-white/20 rounded-2xl p-6 sm:p-7 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.35)] flex flex-col gap-5 text-white">
      {/* Eyebrow & Title */}
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-white/90 block mb-1">
          {heroData.bookingForm.eyebrow}
        </span>
        <h3 className="text-xl font-bold text-white font-manrope">
          {heroData.bookingForm.title}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Pickup Location */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-normal text-white">Pickup Location</label>
          <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 text-slate-800 shadow-sm focus-within:ring-2 focus-within:ring-[#C6A45A]">
            <input
              type="text"
              placeholder={heroData.bookingForm.pickupPlaceholder}
              value={bookingData.pickup}
              onChange={(e) => updateBookingData({ pickup: e.target.value })}
              required
              className="w-full text-[13px] text-slate-900 placeholder:text-[#667085] outline-none bg-transparent"
            />
            <MapPin className="w-4 h-4 text-[#C6A45A] shrink-0 ml-2" />
          </div>
        </div>

        {/* Dropoff Location */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-normal text-white">Dropoff Location</label>
          <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 text-slate-800 shadow-sm focus-within:ring-2 focus-within:ring-[#C6A45A]">
            <input
              type="text"
              placeholder={heroData.bookingForm.dropoffPlaceholder}
              value={bookingData.dropoff}
              onChange={(e) => updateBookingData({ dropoff: e.target.value })}
              required
              className="w-full text-[13px] text-slate-900 placeholder:text-[#667085] outline-none bg-transparent"
            />
            <MapPin className="w-4 h-4 text-[#C6A45A] shrink-0 ml-2" />
          </div>
        </div>

        {/* Passengers & Luggage Steppers */}
        <div className="grid grid-cols-2 gap-3">
          {/* Passengers */}
          <div className="flex items-center justify-between bg-white rounded-lg px-3.5 py-2.5 shadow-sm">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28px] text-[#5F6B7A]">
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
                className="w-6 h-6 rounded bg-[#F2F3F1] hover:bg-slate-200 text-[#071E3B] font-bold text-sm flex items-center justify-center transition-colors"
              >
                −
              </button>
              <span className="w-5 text-center text-[13px] font-medium text-[#071E3B]">
                {bookingData.passengers}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    passengers: Math.min(13, bookingData.passengers + 1),
                  })
                }
                className="w-6 h-6 rounded bg-[#F2F3F1] hover:bg-slate-200 text-[#071E3B] font-bold text-sm flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Luggage */}
          <div className="flex items-center justify-between bg-white rounded-lg px-3.5 py-2.5 shadow-sm">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28px] text-[#5F6B7A]">
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
                className="w-6 h-6 rounded bg-[#F2F3F1] hover:bg-slate-200 text-[#071E3B] font-bold text-sm flex items-center justify-center transition-colors"
              >
                −
              </button>
              <span className="w-5 text-center text-[13px] font-medium text-[#071E3B]">
                {bookingData.luggage}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    luggage: Math.min(15, bookingData.luggage + 1),
                  })
                }
                className="w-6 h-6 rounded bg-[#F2F3F1] hover:bg-slate-200 text-[#071E3B] font-bold text-sm flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Meet & Greet Checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer select-none py-1">
          <input
            type="checkbox"
            checked={bookingData.meetAndGreet}
            onChange={(e) =>
              updateBookingData({ meetAndGreet: e.target.checked })
            }
            className="sr-only"
          />
          <div
            className={`w-[18px] h-[18px] rounded flex items-center justify-center transition-colors ${
              bookingData.meetAndGreet ? "bg-[#C6A45A]" : "bg-white/40 border border-white"
            }`}
          >
            {bookingData.meetAndGreet && (
              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
            )}
          </div>
          <span className="text-[13px] text-white">
            {heroData.bookingForm.meetAndGreetLabel}
          </span>
        </label>

        {/* Recommended fleet for trip */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-normal text-white">
            Recommended fleet for your trip
          </label>
          <div className="relative">
            <select
              value={bookingData.selectedFleetSlug}
              onChange={handleFleetChange}
              className="w-full appearance-none bg-white rounded-lg px-4 py-3 pr-20 text-[13px] text-slate-800 font-medium shadow-sm outline-none cursor-pointer"
            >
              {fleetData.vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.model}) — {v.price} {v.currency}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
              <span className="text-sm font-bold text-[#071E3B]">
                ${bookingData.baseFare}
              </span>
              <ChevronDown className="w-4 h-4 text-[#667085]" />
            </div>
          </div>
        </div>

        {/* Singapore Disclaimer */}
        <p className="text-center text-xs text-white/90 -mt-1">
          {heroData.bookingForm.disclaimer}
        </p>

        {/* Book Now Button */}
        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-lg bg-[#071E3B] hover:bg-[#0B2A4A] text-white text-[15px] font-semibold flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer hover:shadow-lg"
        >
          <span>Book Now</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Footer Sub-links */}
        <div className="flex items-center justify-between pt-1 text-[13px]">
          <Link
            href="/pricing"
            className="text-white/80 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>{heroData.bookingForm.viewPricesLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
          </Link>
          <a
            href="https://wa.me/6588006006"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#F4EAD1] font-bold flex items-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current text-[#60D669]" />
            <span>{heroData.bookingForm.whatsappLabel}</span>
          </a>
        </div>
      </form>
    </div>
  );
}
