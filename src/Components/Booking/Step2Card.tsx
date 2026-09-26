"use client";

import React from "react";
import { useBookingModal } from "@/context/BookingContext";
import { Calendar, Clock, ArrowRight, ArrowLeft, MessageCircle, ChevronDown, X } from "lucide-react";
import Link from "next/link";

interface Step2CardProps {
  isModal?: boolean;
}

export default function Step2Card({ isModal = true }: Step2CardProps) {
  const { bookingData, updateBookingData, setStep, closeModal } = useBookingModal();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const countryCodes = [
    { code: "+65", country: "SG" },
    { code: "+60", country: "MY" },
    { code: "+91", country: "IN" },
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "AU" },
    { code: "+81", country: "JP" },
    { code: "+86", country: "CN" },
    { code: "+62", country: "ID" },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-7 shadow-xl flex flex-col gap-5 text-[#071E3B] relative">
      {/* Close button */}
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
          Tell Us About Your Journey
        </h3>
      </div>

      <form onSubmit={handleContinue} className="flex flex-col gap-4">
        {/* Date & Time Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Pickup Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#071E3B] font-inter">
              Pickup Date
            </label>
            <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-[#7A8593]/60 focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A]">
              <input
                type="date"
                value={bookingData.pickupDate}
                onChange={(e) => updateBookingData({ pickupDate: e.target.value })}
                required
                className="w-full text-xs sm:text-[13px] text-[#071E3B] outline-none bg-transparent"
              />
              <Calendar className="w-4 h-4 text-[#C6A45A] shrink-0 ml-1 pointer-events-none" />
            </div>
          </div>

          {/* Pickup Time */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#071E3B] font-inter">
              Pickup Time
            </label>
            <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-[#7A8593]/60 focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A]">
              <input
                type="time"
                value={bookingData.pickupTime}
                onChange={(e) => updateBookingData({ pickupTime: e.target.value })}
                required
                className="w-full text-xs sm:text-[13px] text-[#071E3B] outline-none bg-transparent"
              />
              <Clock className="w-4 h-4 text-[#C6A45A] shrink-0 ml-1 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Add Ons / Baby Seat */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#071E3B] font-inter">
            Add Ons
          </label>
          <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2.5 border border-[#7A8593]/60">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={bookingData.babySeat}
                onChange={(e) => updateBookingData({ babySeat: e.target.checked })}
                className="rounded text-[#C6A45A] focus:ring-[#C6A45A] w-4 h-4"
              />
              <span className="text-xs sm:text-sm text-[#071E3B] font-medium">
                Child / Baby Safety Seat
              </span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#071E3B]">+$20</span>
              <span className="text-xs text-[#667085]">SGD</span>
            </div>
          </div>
        </div>

        {/* Special Request */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#071E3B] font-inter">
            Special Request &amp; Flight Number
          </label>
          <div className="bg-white rounded-lg px-4 py-2.5 border border-[#7A8593]/60 focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A]">
            <textarea
              rows={2}
              placeholder="Eg. Flight SQ 321, need extra stop, specific temperature preference, or iPad arrival signboard name."
              value={bookingData.specialRequests}
              onChange={(e) =>
                updateBookingData({ specialRequests: e.target.value })
              }
              className="w-full text-xs sm:text-[13px] text-[#071E3B] placeholder:text-[#667085] outline-none bg-transparent resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Passenger Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#071E3B] font-inter">
              Passenger Name
            </label>
            <div className="bg-white rounded-lg px-4 py-2.5 border border-[#7A8593]/60 focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A]">
              <input
                type="text"
                placeholder="e.g. John Smith"
                value={bookingData.name}
                onChange={(e) => updateBookingData({ name: e.target.value })}
                required
                className="w-full text-xs sm:text-[13px] text-[#071E3B] placeholder:text-[#667085] outline-none bg-transparent"
              />
            </div>
          </div>

          {/* WhatsApp Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#071E3B] font-inter">
              WhatsApp Number
            </label>
            <div className="flex items-center gap-1.5">
              <select
                value={bookingData.countryCode}
                onChange={(e) =>
                  updateBookingData({ countryCode: e.target.value })
                }
                className="bg-white rounded-lg px-2.5 py-2.5 border border-[#7A8593]/60 text-xs font-semibold text-[#071E3B] outline-none focus:border-[#C6A45A]"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.country})
                  </option>
                ))}
              </select>
              <div className="flex-1 bg-white rounded-lg px-3 py-2.5 border border-[#7A8593]/60 focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A]">
                <input
                  type="tel"
                  placeholder="8800 6006"
                  value={bookingData.phone}
                  onChange={(e) => updateBookingData({ phone: e.target.value })}
                  required
                  className="w-full text-xs sm:text-[13px] text-[#071E3B] placeholder:text-[#667085] outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#071E3B] font-inter">
            Email Address (for Booking Confirmation)
          </label>
          <div className="bg-white rounded-lg px-4 py-2.5 border border-[#7A8593]/60 focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A]">
            <input
              type="email"
              placeholder="e.g. sample@example.com"
              value={bookingData.email}
              onChange={(e) => updateBookingData({ email: e.target.value })}
              required
              className="w-full text-xs sm:text-[13px] text-[#071E3B] placeholder:text-[#667085] outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] text-[#5F6B7A] pt-1">
          Singapore trips only — cross-border rides to Malaysia not available.
        </p>

        {/* Buttons Row */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="py-3 px-6 rounded-lg bg-[#E9ECEF] hover:bg-slate-200 text-[#5F6B7A] text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-6 rounded-lg bg-[#071E3B] hover:bg-[#0B2A4A] text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

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
