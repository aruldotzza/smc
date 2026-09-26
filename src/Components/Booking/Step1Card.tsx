"use client";

import React from "react";
import { useBookingModal } from "@/context/BookingContext";
import { MapPin, ArrowRight, Check, ChevronDown, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import fleetData from "@/data/fleet.json";

interface Step1CardProps {
  isModal?: boolean;
}

export default function Step1Card({ isModal = true }: Step1CardProps) {
  const { bookingData, updateBookingData, setStep, closeModal } = useBookingModal();

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

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E9ECEF] p-6 sm:p-7 shadow-xl flex flex-col gap-5 text-[#071E3B] relative">
      {/* Close button if in modal */}
      {isModal && closeModal && (
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A45A] block mb-1 font-manrope">
          QUICK &amp; EASY BOOKING
        </span>
        <h3 className="text-xl font-bold text-[#071E3B] font-manrope">
          Where are you travelling from?
        </h3>
      </div>

      <form onSubmit={handleContinue} className="flex flex-col gap-4">
        {/* Pickup Location */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#071E3B] font-inter">
            Pickup Location
          </label>
          <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-[#7A8593]/60 focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A] transition-all">
            <input
              type="text"
              placeholder="e.g. Singapore Changi Airport (T1-T4)"
              value={bookingData.pickup}
              onChange={(e) => updateBookingData({ pickup: e.target.value })}
              required
              className="w-full text-xs sm:text-[13px] text-[#071E3B] placeholder:text-[#667085] outline-none bg-transparent"
            />
            <MapPin className="w-4 h-4 text-[#C6A45A] shrink-0 ml-2" />
          </div>
        </div>

        {/* Dropoff Location */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#071E3B] font-inter">
            Dropoff Location
          </label>
          <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-[#7A8593]/60 focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A] transition-all">
            <input
              type="text"
              placeholder="e.g. Marina Bay Sands Hotel / Orchard Rd"
              value={bookingData.dropoff}
              onChange={(e) => updateBookingData({ dropoff: e.target.value })}
              required
              className="w-full text-xs sm:text-[13px] text-[#071E3B] placeholder:text-[#667085] outline-none bg-transparent"
            />
            <MapPin className="w-4 h-4 text-[#C6A45A] shrink-0 ml-2" />
          </div>
        </div>

        {/* Steppers */}
        <div className="grid grid-cols-2 gap-3">
          {/* Passengers */}
          <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2.5 border border-[#7A8593]/60">
            <span className="text-xs font-semibold text-[#5F6B7A]">
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
                className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-[#5F6B7A] font-bold text-xs flex items-center justify-center transition-colors shadow-2xs"
              >
                -
              </button>
              <span className="w-4 text-center text-xs font-medium text-[#071E3B]">
                {bookingData.passengers}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    passengers: Math.min(13, bookingData.passengers + 1),
                  })
                }
                className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-[#5F6B7A] font-bold text-xs flex items-center justify-center transition-colors shadow-2xs"
              >
                +
              </button>
            </div>
          </div>

          {/* Luggage */}
          <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2.5 border border-[#7A8593]/60">
            <span className="text-xs font-semibold text-[#5F6B7A]">
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
                className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-[#5F6B7A] font-bold text-xs flex items-center justify-center transition-colors shadow-2xs"
              >
                -
              </button>
              <span className="w-4 text-center text-xs font-medium text-[#071E3B]">
                {bookingData.luggage}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    luggage: Math.min(15, bookingData.luggage + 1),
                  })
                }
                className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-[#5F6B7A] font-bold text-xs flex items-center justify-center transition-colors shadow-2xs"
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
              bookingData.meetAndGreet
                ? "bg-[#C6A45A]"
                : "border border-[#7A8593]/60 bg-white"
            }`}
          >
            {bookingData.meetAndGreet && (
              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
            )}
          </div>
          <span className="text-xs text-[#071E3B] font-normal">
            Include Meet &amp; Greet service
          </span>
        </label>

        {/* Recommended fleet for trip dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#071E3B] font-inter">
            Recommended fleet for your trip
          </label>
          <div className="relative">
            <select
              value={bookingData.selectedFleetSlug}
              onChange={handleFleetChange}
              className="w-full appearance-none bg-white rounded-lg px-4 py-2.5 pr-16 border border-[#7A8593]/60 text-xs sm:text-sm font-medium text-[#071E3B] focus:border-[#C6A45A] focus:ring-1 focus:ring-[#C6A45A] outline-none cursor-pointer"
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

        {/* Singapore Trips Only Disclaimer */}
        <p className="text-center text-[11px] text-[#5F6B7A] pt-1">
          Singapore trips only — cross-border rides to Malaysia not available.
        </p>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 rounded-lg bg-[#071E3B] hover:bg-[#0B2A4A] text-white text-base font-semibold flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          <span>Book Now</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Sub-links */}
        <div className="flex items-center justify-between pt-1 text-xs sm:text-[13px]">
          <Link
            href="/pricing"
            onClick={closeModal}
            className="text-[#667085] hover:text-[#071E3B] flex items-center gap-1 transition-colors"
          >
            <span>View all prices</span>
            <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-[#667085]" />
          </Link>
          <a
            href="https://wa.me/6588006006"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#16803C] hover:text-emerald-800 font-medium flex items-center gap-1.5 transition-colors"
          >
            <span>Book via WhatsApp us</span>
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
          </a>
        </div>
      </form>
    </div>
  );
}
