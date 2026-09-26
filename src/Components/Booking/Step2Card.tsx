"use client";

import React from "react";
import { useBookingModal } from "@/context/BookingContext";
import { ArrowRight, ArrowLeft, ChevronDown, MessageCircle, X } from "lucide-react";
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
    <div className="w-full max-w-[562px] mx-auto p-5 sm:p-7 bg-white rounded-2xl border border-slate-200 backdrop-blur-lg flex flex-col justify-start items-start gap-5 shadow-2xl relative">
      {/* Close button if in modal */}
      {isModal && closeModal && (
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#667085] hover:text-[#071E3B] hover:bg-slate-100 transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Header */}
      <div className="flex flex-col justify-start items-start">
        <div className="flex flex-col justify-start items-start">
          <div className="justify-center text-[#C6A45A] text-xs font-semibold font-manrope leading-4 uppercase tracking-wide">
            QUICK &amp; EASY BOOKING
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="justify-center text-[#071E3B] text-xl font-semibold font-manrope leading-7">
            Tell Us About Your Journey
          </div>
        </div>
      </div>

      <form onSubmit={handleContinue} className="self-stretch flex flex-col justify-start items-start gap-4">
        {/* Date & Time Row */}
        <div className="self-stretch grid grid-cols-2 gap-3 sm:gap-4 items-start">
          {/* Pickup Date */}
          <div className="flex flex-col justify-start items-start gap-1.5">
            <label className="justify-center text-[#071E3B] text-sm font-medium font-inter leading-5">
              Pickup Date
            </label>
            <div className="self-stretch p-4 bg-white rounded-lg border border-[#7A8593] flex justify-between items-center overflow-hidden focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A] transition-all">
              <input
                type="date"
                value={bookingData.pickupDate}
                onChange={(e) => updateBookingData({ pickupDate: e.target.value })}
                required
                className="w-full text-xs font-normal font-manrope leading-4 text-[#071E3B] outline-none bg-transparent cursor-pointer"
              />
              <svg
                className="w-3.5 h-3.5 text-[#C6A45A] shrink-0 ml-1 pointer-events-none"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1.5" y="2.5" width="11" height="9.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M1.5 5.5H12.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4.5 1V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M9.5 1V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Pickup Time */}
          <div className="flex flex-col justify-start items-start gap-1.5">
            <label className="justify-center text-[#071E3B] text-sm font-medium font-inter leading-5">
              Pickup Time
            </label>
            <div className="self-stretch p-4 bg-white rounded-lg border border-[#7A8593] flex justify-between items-center overflow-hidden focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A] transition-all">
              <input
                type="time"
                value={bookingData.pickupTime}
                onChange={(e) => updateBookingData({ pickupTime: e.target.value })}
                required
                className="w-full text-xs font-normal font-manrope leading-4 text-[#071E3B] outline-none bg-transparent cursor-pointer"
              />
              <svg
                className="w-3.5 h-3.5 text-[#C6A45A] shrink-0 ml-1 pointer-events-none"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M7 4V7L9 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Add Ons */}
        <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
          <label className="justify-center text-[#071E3B] text-sm font-medium font-inter leading-5">
            Add Ons
          </label>
          <div
            onClick={() => updateBookingData({ babySeat: !bookingData.babySeat })}
            className="self-stretch px-3 py-2.5 bg-white rounded-lg border border-[#7A8593] flex justify-between items-center cursor-pointer hover:border-[#C6A45A] transition-colors"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-sm flex items-center justify-center transition-colors ${
                  bookingData.babySeat ? "bg-[#C6A45A]" : "border border-[#7A8593] bg-white"
                }`}
              >
                {bookingData.babySeat && (
                  <svg
                    className="w-2.5 h-2 text-white"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 4L3.8 6.5L8.5 1.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div className="justify-center text-[#071E3B] text-sm font-normal font-manrope leading-5">
                Baby Seat
              </div>
            </div>
            <div className="flex justify-start items-center gap-3">
              <div className="text-right justify-center text-[#071E3B] text-lg font-bold font-manrope leading-7">
                $20
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#667085] transition-transform ${
                  bookingData.babySeat ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {/* Special Request */}
        <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
          <label className="justify-center text-[#071E3B] text-sm font-medium font-inter leading-5">
            Special Request
          </label>
          <div className="self-stretch p-3.5 bg-white rounded-lg border border-[#7A8593] flex justify-start items-center overflow-hidden focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A] transition-all">
            <textarea
              rows={2}
              placeholder="Eg. Need anything extra? Add a stop, set your temperature preference, or request a company invoice."
              value={bookingData.specialRequests}
              onChange={(e) => updateBookingData({ specialRequests: e.target.value })}
              className="flex-1 text-xs font-normal font-manrope leading-4 text-[#071E3B] placeholder:text-[#667085] outline-none bg-transparent resize-none"
            />
          </div>
        </div>

        {/* Name & WhatsApp Number */}
        <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-start">
          {/* Name */}
          <div className="flex flex-col justify-start items-start gap-1.5">
            <label className="justify-center text-[#071E3B] text-sm font-medium font-inter leading-5">
              Name
            </label>
            <div className="self-stretch p-4 bg-white rounded-lg border border-[#7A8593] flex justify-start items-center overflow-hidden focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A] transition-all">
              <input
                type="text"
                placeholder="John Smith"
                value={bookingData.name}
                onChange={(e) => updateBookingData({ name: e.target.value })}
                required
                className="w-full text-xs font-normal font-manrope leading-4 text-[#071E3B] placeholder:text-[#667085] outline-none bg-transparent"
              />
            </div>
          </div>

          {/* WhatsApp Number */}
          <div className="flex flex-col justify-start items-start gap-1.5">
            <label className="justify-center text-[#071E3B] text-sm font-medium font-inter leading-5">
              WhatsApp Number
            </label>
            <div className="self-stretch flex justify-start items-center gap-1.5">
              <div className="relative">
                <select
                  value={bookingData.countryCode}
                  onChange={(e) => updateBookingData({ countryCode: e.target.value })}
                  className="appearance-none px-3 py-4 bg-white rounded-lg border border-[#7A8593] text-xs font-normal font-manrope leading-4 text-[#071E3B] pr-7 outline-none focus:border-[#C6A45A] cursor-pointer"
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#667085] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="flex-1 p-4 bg-white rounded-lg border border-[#7A8593] flex justify-start items-center overflow-hidden focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A] transition-all">
                <input
                  type="tel"
                  placeholder="9876123450"
                  value={bookingData.phone}
                  onChange={(e) => updateBookingData({ phone: e.target.value })}
                  required
                  className="w-full text-xs font-normal font-manrope leading-4 text-[#071E3B] placeholder:text-[#667085] outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Email ID */}
        <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
          <label className="justify-center text-[#071E3B] text-sm font-medium font-inter leading-5">
            Email ID
          </label>
          <div className="self-stretch p-4 bg-white rounded-lg border border-[#7A8593] flex justify-start items-center overflow-hidden focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A] transition-all">
            <input
              type="email"
              placeholder="Sample@example.com"
              value={bookingData.email}
              onChange={(e) => updateBookingData({ email: e.target.value })}
              required
              className="w-full text-xs font-normal font-manrope leading-4 text-[#071E3B] placeholder:text-[#667085] outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="self-stretch rounded-sm flex flex-col justify-start items-center">
          <div className="text-center justify-center text-[#5F6B7A] text-xs font-normal font-manrope leading-4">
            Singapore trips only — cross-border rides to Malaysia not available.
          </div>
        </div>

        {/* Action Buttons: Back & Continue */}
        <div className="self-stretch flex justify-start items-start gap-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="px-8 py-3 bg-[#E9ECEF] hover:bg-slate-200 rounded-lg flex justify-center items-center gap-4 transition-colors cursor-pointer text-[#5F6B7A] text-base font-semibold font-manrope leading-6"
          >
            <ArrowLeft className="w-4 h-4 text-[#5F6B7A]" />
            <span>Back</span>
          </button>
          <button
            type="submit"
            className="flex-1 px-8 py-3 bg-[#071E3B] hover:bg-[#0B2A4A] text-white rounded-lg flex justify-center items-center gap-4 transition-all shadow-md hover:shadow-lg cursor-pointer group"
          >
            <span className="text-center justify-center text-white text-base font-semibold font-manrope leading-6">
              Continue
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
            <div className="justify-center text-[#667085] group-hover:text-[#071E3B] text-sm font-normal font-manrope leading-5 transition-colors">
              View all prices
            </div>
            <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-[#667085] group-hover:text-[#071E3B] transition-colors" />
          </Link>
          <a
            href="https://wa.me/6588006006"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-start items-center gap-2 group transition-colors"
          >
            <div className="justify-center text-[#16803C] group-hover:text-emerald-700 text-sm font-normal font-manrope leading-5 transition-colors">
              Book via whatsapp us
            </div>
            <MessageCircle className="w-4 h-4 text-[#16803C] fill-current group-hover:text-emerald-700 transition-colors" />
          </a>
        </div>
      </form>
    </div>
  );
}
