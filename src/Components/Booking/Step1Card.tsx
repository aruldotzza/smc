"use client";

import React from "react";
import { useBookingModal } from "@/context/BookingContext";
import { ArrowRight, ChevronDown, MessageCircle, X } from "lucide-react";
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
    <div className="w-full max-w-[562px] mx-auto p-4 sm:p-7 bg-white rounded-2xl border border-[#E9ECEF] backdrop-blur-lg flex flex-col justify-start items-start gap-4 sm:gap-5 shadow-2xl relative max-h-[92vh] overflow-y-auto">
      {/* Close button if in modal */}
      {isModal && closeModal && (
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-full text-[#667085] hover:text-[#071E3B] hover:bg-slate-100 active:scale-95 transition-all z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Header */}
      <div className="flex flex-col justify-start items-start pr-8 sm:pr-0">
        <div className="text-[#C6A45A] text-[11px] sm:text-xs font-bold font-manrope leading-4 uppercase tracking-wider">
          QUICK &amp; EASY BOOKING
        </div>
        <div className="text-[#071E3B] text-lg sm:text-xl font-bold font-manrope leading-6 sm:leading-7 pt-0.5">
          Where are you travelling from?
        </div>
      </div>

      <form onSubmit={handleContinue} className="self-stretch flex flex-col justify-start items-start gap-3.5 sm:gap-4">
        {/* Pickup Location */}
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <label className="text-[#071E3B] text-xs sm:text-sm font-medium font-inter leading-5">
            Pickup Location
          </label>
          <div className="self-stretch p-3 sm:p-3.5 bg-white rounded-xl border border-[#7A8593] flex justify-between items-center overflow-hidden focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A] transition-all">
            <input
              type="text"
              placeholder="e.g. Singapore Changi Airport (T1-T4)"
              value={bookingData.pickup}
              onChange={(e) => updateBookingData({ pickup: e.target.value })}
              required
              className="flex-1 text-sm sm:text-xs font-normal font-manrope text-[#071E3B] placeholder:text-[#667085] outline-none bg-transparent"
            />
            <svg
              className="w-4 h-4 text-[#C6A45A] shrink-0 ml-2"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1.5C4.79 1.5 3 3.29 3 5.5C3 8.5 7 12.5 7 12.5C7 12.5 11 8.5 11 5.5C11 3.29 9.21 1.5 7 1.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="7" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>
        </div>

        {/* Dropoff Location */}
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <label className="text-[#071E3B] text-xs sm:text-sm font-medium font-inter leading-5">
            Dropoff Location
          </label>
          <div className="self-stretch p-3 sm:p-3.5 bg-white rounded-xl border border-[#7A8593] flex justify-between items-center overflow-hidden focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A] transition-all">
            <input
              type="text"
              placeholder="e.g. Marina Bay Sands Hotel / Orchard Rd"
              value={bookingData.dropoff}
              onChange={(e) => updateBookingData({ dropoff: e.target.value })}
              required
              className="flex-1 text-sm sm:text-xs font-normal font-manrope text-[#071E3B] placeholder:text-[#667085] outline-none bg-transparent"
            />
            <svg
              className="w-4 h-4 text-[#C6A45A] shrink-0 ml-2"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1.5C4.79 1.5 3 3.29 3 5.5C3 8.5 7 12.5 7 12.5C7 12.5 11 8.5 11 5.5C11 3.29 9.21 1.5 7 1.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="7" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>
        </div>

        {/* Steppers: Passengers & Luggage */}
        <div className="self-stretch grid grid-cols-2 gap-2.5 sm:gap-4 items-start">
          {/* Passengers */}
          <div className="px-3 py-2 sm:py-2.5 bg-white rounded-xl border border-[#7A8593] flex justify-between items-center">
            <span className="text-[#5F6B7A] text-[11px] sm:text-xs font-bold font-manrope uppercase">
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
                className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-50 hover:bg-slate-200 active:bg-slate-300 rounded-lg flex items-center justify-center text-[#5F6B7A] text-base font-bold font-manrope transition-colors cursor-pointer border border-slate-200"
                aria-label="Decrease passengers"
              >
                -
              </button>
              <span className="w-4 text-center text-xs sm:text-sm font-bold font-manrope text-[#071E3B]">
                {bookingData.passengers}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    passengers: Math.min(13, bookingData.passengers + 1),
                  })
                }
                className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-50 hover:bg-slate-200 active:bg-slate-300 rounded-lg flex items-center justify-center text-[#5F6B7A] text-base font-bold font-manrope transition-colors cursor-pointer border border-slate-200"
                aria-label="Increase passengers"
              >
                +
              </button>
            </div>
          </div>

          {/* Luggage */}
          <div className="px-3 py-2 sm:py-2.5 bg-white rounded-xl border border-[#7A8593] flex justify-between items-center">
            <span className="text-[#5F6B7A] text-[11px] sm:text-xs font-bold font-manrope uppercase">
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
                className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-50 hover:bg-slate-200 active:bg-slate-300 rounded-lg flex items-center justify-center text-[#5F6B7A] text-base font-bold font-manrope transition-colors cursor-pointer border border-slate-200"
                aria-label="Decrease luggage"
              >
                -
              </button>
              <span className="w-4 text-center text-xs sm:text-sm font-bold font-manrope text-[#071E3B]">
                {bookingData.luggage}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    luggage: Math.min(15, bookingData.luggage + 1),
                  })
                }
                className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-50 hover:bg-slate-200 active:bg-slate-300 rounded-lg flex items-center justify-center text-[#5F6B7A] text-base font-bold font-manrope transition-colors cursor-pointer border border-slate-200"
                aria-label="Increase luggage"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Meet & Greet Checkbox */}
        <label
          onClick={() =>
            updateBookingData({ meetAndGreet: !bookingData.meetAndGreet })
          }
          className="self-stretch inline-flex justify-start items-center gap-2 cursor-pointer select-none py-0.5"
        >
          <div
            className={`w-4 h-4 rounded-md inline-flex flex-col justify-center items-center transition-colors ${
              bookingData.meetAndGreet
                ? "bg-[#C6A45A]"
                : "border border-[#7A8593] bg-white"
            }`}
          >
            {bookingData.meetAndGreet && (
              <svg
                className="w-2.5 h-2 text-[#071E3B]"
                viewBox="0 0 10 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 4L3.8 6.5L8.5 1.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span className="text-[#071E3B] text-xs font-medium font-manrope leading-4">
            Include Meet &amp; Greet service
          </span>
        </label>

        {/* Recommended fleet dropdown */}
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <label className="text-[#071E3B] text-xs sm:text-sm font-medium font-inter leading-5">
            Recommended fleet for your trip
          </label>
          <div className="self-stretch relative">
            <select
              value={bookingData.selectedFleetSlug}
              onChange={handleFleetChange}
              className="w-full appearance-none px-3.5 py-3 bg-white rounded-xl border border-[#7A8593] text-xs sm:text-sm font-semibold font-manrope text-[#071E3B] pr-20 outline-none focus:border-[#C6A45A] focus:ring-1 focus:ring-[#C6A45A] cursor-pointer"
            >
              {fleetData.vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.model})
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1.5">
              <div className="text-right text-[#071E3B] text-base sm:text-lg font-bold font-manrope">
                ${bookingData.baseFare}
              </div>
              <ChevronDown className="w-4 h-4 text-[#667085]" />
            </div>
          </div>
        </div>

        {/* Disclaimer & CTA Button */}
        <div className="self-stretch flex flex-col justify-start items-start gap-2 pt-1">
          <div className="self-stretch text-center text-[#5F6B7A] text-[11px] sm:text-xs font-normal font-manrope">
            Singapore trips only — cross-border rides to Malaysia not available.
          </div>
          <button
            type="submit"
            className="self-stretch py-3.5 bg-[#071E3B] hover:bg-[#0B2A4A] active:scale-98 rounded-xl flex justify-center items-center gap-3 text-white transition-all shadow-md hover:shadow-lg cursor-pointer group"
          >
            <span className="text-white text-sm sm:text-base font-bold font-manrope">
              Continue to Details
            </span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Sub Links */}
        <div className="self-stretch inline-flex justify-between items-center pt-1">
          <Link
            href="/pricing"
            onClick={closeModal}
            className="flex justify-start items-center gap-1 group transition-colors"
          >
            <span className="text-[#667085] group-hover:text-[#071E3B] text-xs sm:text-sm font-normal font-manrope leading-5">
              View all prices
            </span>
            <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-[#667085] group-hover:text-[#071E3B]" />
          </Link>
          <a
            href="https://wa.me/6588006006"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-start items-center gap-1.5 group transition-colors"
          >
            <span className="text-[#16803C] group-hover:text-emerald-700 text-xs sm:text-sm font-bold font-manrope leading-5">
              WhatsApp Us
            </span>
            <MessageCircle className="w-3.5 h-3.5 text-[#16803C] fill-current" />
          </a>
        </div>
      </form>
    </div>
  );
}

