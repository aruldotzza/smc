"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useBookingModal } from "@/context/BookingContext";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  X,
} from "lucide-react";
import Link from "next/link";

interface Step3CardProps {
  isModal?: boolean;
}

export default function Step3Card({ isModal = true }: Step3CardProps) {
  const { bookingData, calculateTotal, setStep, closeModal } = useBookingModal();
  const [isSuccess, setIsSuccess] = useState(false);

  const totalFare = calculateTotal();

  const isHourly = bookingData.serviceType.toLowerCase().includes("hourly");
  const isAirport =
    bookingData.serviceType.toLowerCase().includes("airport") ||
    bookingData.serviceType.toLowerCase().includes("arrival");
  const hourlyRate =
    bookingData.baseFare >= 50 && bookingData.baseFare <= 120
      ? bookingData.baseFare
      : 65;
  const duration = bookingData.durationHours || 3;

  const handleProceed = () => {
    // Generate WhatsApp Booking Message
    const text =
      `*New Singapore Maxi Cab Booking Request*%0A` +
      `--------------------------------%0A` +
      `*Service:* ${bookingData.serviceType}%0A` +
      (isHourly ? `*Duration:* ${duration} Hours%0A` : "") +
      `*Vehicle:* ${bookingData.selectedFleet}%0A` +
      `*Pickup:* ${bookingData.pickup}%0A` +
      (!isHourly ? `*Dropoff:* ${bookingData.dropoff}%0A` : `*Dropoff / Scope:* ${bookingData.dropoff || "As-Directed City Tour"}%0A`) +
      `*Date:* ${bookingData.pickupDate || "Today"} at ${bookingData.pickupTime || "17:15"} SGT%0A` +
      `*Passengers:* ${bookingData.passengers} Pax | *Luggage:* ${bookingData.luggage} Bags%0A` +
      (isAirport ? `*Meet & Greet:* ${bookingData.meetAndGreet ? "Yes (+$25 SGD)" : "No"}%0A` : "") +
      `*Baby Seat:* ${bookingData.babySeat ? "Yes (+$20 SGD)" : "No"}%0A` +
      `*Special Notes / Request:* ${bookingData.specialRequests || "None"}%0A` +
      `--------------------------------%0A` +
      `*Passenger Name:* ${bookingData.name || "Alexander Wright"}%0A` +
      `*WhatsApp:* ${bookingData.countryCode} ${bookingData.phone || "88006006"}%0A` +
      `*Email:* ${bookingData.email || "Sample@example.com"}%0A` +
      `*Final Tariff:* $${totalFare}.00 SGD NETT%0A` +
      `--------------------------------%0A` +
      `Please confirm driver dispatch availability. Thank you!`;

    window.open(`https://wa.me/6588006006?text=${text}`, "_blank");
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-[562px] mx-auto bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 text-center flex flex-col items-center gap-5 sm:gap-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
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
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2]" />
        </div>
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <h3 className="text-xl sm:text-2xl font-bold text-[#071E3B] font-manrope">
            Booking Request Dispatched!
          </h3>
          <p className="text-xs sm:text-sm text-[#5F6B7A] max-w-md font-manrope leading-relaxed">
            We have redirected your itinerary to our 24/7 WhatsApp dispatch team. Your driver details and flight buffer will be confirmed in 2–5 minutes.
          </p>
        </div>

        <div className="w-full p-4 rounded-xl bg-[#FBF7EC] border border-[#F4EAD1] text-left text-xs space-y-1.5 text-[#071E3B] font-manrope">
          <div className="flex justify-between font-semibold">
            <span className="text-[#5F6B7A]">Passenger:</span>
            <span>{bookingData.name || "Alexander Wright"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5F6B7A]">Vehicle:</span>
            <span>{bookingData.selectedFleet || "Mercedes-Benz V-Class / Toyota Vellfire"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5F6B7A]">Date &amp; Time:</span>
            <span>
              {bookingData.pickupDate || "24 Oct 2024"} {bookingData.pickupTime || "17:15"} SGT
            </span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-[#C6A45A]/20 text-[#8A5A00] text-sm">
            <span>Guaranteed Final Tariff:</span>
            <span>${totalFare}.00 SGD NETT</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              if (closeModal) closeModal();
            }}
            className="w-full sm:w-auto flex-1 px-6 py-3 rounded-xl bg-[#071E3B] hover:bg-[#0B2A4A] active:scale-98 text-white text-sm font-bold font-manrope transition-all cursor-pointer"
          >
            Done
          </button>
          <a
            href="https://wa.me/6588006006"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 px-6 py-3 rounded-xl border border-[#C6A45A] hover:bg-[#C6A45A]/10 active:scale-98 text-[#8A5A00] text-sm font-bold font-manrope transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Open WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[562px] mx-auto p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 flex flex-col justify-start items-start gap-4 sm:gap-5 shadow-2xl relative max-h-[92vh] overflow-y-auto">
      {/* Close button if in modal */}
      {isModal && closeModal && (
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full text-[#667085] hover:text-[#071E3B] hover:bg-slate-100 active:scale-95 transition-all z-30 cursor-pointer"
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
          Review Your Journey
        </div>
      </div>

      {/* Confirmed Vehicle Class Hero Card */}
      <div className="self-stretch h-48 sm:h-64 relative rounded-xl flex flex-col justify-between p-3.5 sm:p-4 overflow-hidden bg-slate-900">
        <Image
          src="/images/bookinpage3.png"
          alt={bookingData.selectedFleet || "Mercedes-Benz V-Class / Toyota Vellfire"}
          fill
          sizes="(max-width: 640px) 100vw, 520px"
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="px-2 py-0.5 sm:py-1 bg-[rgba(7,30,59,0.7)] rounded-md outline outline-1 outline-white/20 backdrop-blur-md flex items-center gap-1">
            <svg
              className="w-3 h-3 text-[#C6A45A] fill-[#C6A45A]"
              viewBox="0 0 12 12"
            >
              <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.2 3,11 3.5,7.5 1,5 4.5,4.5" />
            </svg>
            <span className="text-white text-[10px] sm:text-xs font-bold font-manrope uppercase tracking-wider">
              VIP CHANGI CONCIERGE
            </span>
          </div>
          <div className="px-2 py-0.5 sm:py-1 bg-[rgba(7,30,59,0.7)] rounded-md outline outline-1 outline-white/20 backdrop-blur-md">
            <span className="text-white text-[10px] sm:text-xs font-bold font-manrope uppercase tracking-wider">
              {bookingData.selectedFleet ? "7 SEATER MAXI CAB" : "7 SEATER MAXI CAB"}
            </span>
          </div>
        </div>

        {/* Bottom Vehicle Info */}
        <div className="relative z-10 flex flex-col justify-start items-start gap-1">
          <div className="self-stretch flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[#C6A45A] text-xs font-bold font-manrope uppercase tracking-wider">
              CONFIRMED VEHICLE CLASS
            </span>
            <div className="px-2 py-0.5 bg-white/20 rounded-md backdrop-blur-md flex items-center gap-1.5 text-white text-[11px] sm:text-xs font-semibold font-manrope">
              <span>Max {bookingData.passengers || 7} Pax</span>
              <span>•</span>
              <span>{bookingData.luggage || 5} Bags</span>
            </div>
          </div>
          <div className="text-white text-lg sm:text-2xl font-bold font-manrope leading-tight">
            {bookingData.selectedFleet || "Mercedes-Benz V-Class / Toyota Vellfire"}
          </div>
        </div>
      </div>

      {/* Journey & Booking Details Flow */}
      <div className="self-stretch flex flex-col justify-start items-start gap-5 sm:gap-6">
        {/* Row 1: Pick Up & Destination */}
        <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start bg-[#F8F7F4] p-3.5 sm:p-4 rounded-xl border border-slate-200/80">
          {/* Pick Up */}
          <div className="flex flex-col justify-start items-start gap-1">
            <div className="inline-flex items-center gap-1.5">
              <span className="text-[#8A5A00] text-xs sm:text-sm font-bold font-inter">
                Pick Up
              </span>
              <span className="px-1.5 py-0.5 bg-[#123F6B] rounded text-white text-[10px] font-semibold font-manrope">
                Terminal 3
              </span>
            </div>
            <div className="text-[#071E3B] text-sm sm:text-base font-bold font-manrope leading-snug">
              {bookingData.pickup || "Singapore Changi Airport (SIN)"}
            </div>
            <div className="text-[#667085] text-xs font-normal font-manrope leading-relaxed">
              Arrival Hall Meetpoint · Flight tracking active
            </div>
          </div>

          {/* Destination */}
          <div className="flex flex-col justify-start items-start gap-1 border-t sm:border-t-0 sm:border-l border-slate-200/80 pt-3 sm:pt-0 sm:pl-4">
            <span className="text-[#8A5A00] text-xs sm:text-sm font-bold font-inter">
              Destination
            </span>
            <div className="text-[#071E3B] text-sm sm:text-base font-bold font-manrope leading-snug">
              {bookingData.dropoff || "Marina Bay Sands Hotel"}
            </div>
            <div className="text-[#667085] text-xs font-normal font-manrope leading-relaxed">
              10 Bayfront Avenue, Singapore (VIP Foyer)
            </div>
          </div>
        </div>

        {/* Row 2: Date & Time & Passenger */}
        <div className="self-stretch grid grid-cols-2 gap-3 sm:gap-4 items-start">
          <div className="flex flex-col gap-0.5">
            <span className="text-[#C6A45A] text-[10px] sm:text-xs font-bold font-manrope uppercase tracking-wider">
              DATE &amp; TIME
            </span>
            <div className="text-[#071E3B] text-sm sm:text-base font-bold font-manrope leading-snug">
              {bookingData.pickupDate || "24 Oct 2024"}
            </div>
            <div className="text-[#5F6B7A] text-xs font-medium font-manrope">
              {bookingData.pickupTime || "17:15"} SGT
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[#C6A45A] text-[10px] sm:text-xs font-bold font-manrope uppercase tracking-wider">
              PASSENGER
            </span>
            <div className="text-[#071E3B] text-sm sm:text-base font-bold font-manrope leading-snug">
              {bookingData.name || "Alexander Wright"}
            </div>
            <div className="text-[#5F6B7A] text-xs font-medium font-manrope">
              {bookingData.countryCode} {bookingData.phone || "88006006"}
            </div>
          </div>
        </div>

        {/* Tariff Breakdown Section */}
        <div className="self-stretch bg-[#FBF7EC] p-4 rounded-xl border border-[#F4EAD1] flex flex-col gap-3.5">
          {/* Header */}
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-[#071E3B] text-base font-bold font-manrope">
                Tariff Breakdown
              </span>
            </div>
            <span className="px-2 py-0.5 bg-[#FFF8E7] rounded-md text-[#8A5A00] text-xs font-bold font-manrope border border-[#F4EAD1]">
              Zero Hidden Fees
            </span>
          </div>

          <div className="self-stretch flex flex-col gap-2.5">
            {/* Transfer / Charter Line Item */}
            <div className="self-stretch py-1 flex justify-between items-center text-xs sm:text-sm">
              <div className="flex flex-col">
                <span className="text-slate-900 font-semibold font-manrope">
                  {bookingData.selectedFleet || "Maxi Cab"} {isHourly ? `(${duration} Hours Charter)` : "Transfer"}
                </span>
                <span className="text-[#667085] text-xs font-normal">
                  {isHourly
                    ? `${duration} hours dedicated chauffeur @ $${hourlyRate}/hr`
                    : "Includes ERP toll systems, luggage assist"}
                </span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-slate-900 font-bold font-manrope text-base sm:text-lg">
                  ${isHourly ? hourlyRate * duration : (bookingData.baseFare || 70)}.00
                </span>
                <span className="text-[#667085] text-[10px] block">SGD</span>
              </div>
            </div>

            {/* Airport Meet & Greet Item if selected */}
            {isAirport && bookingData.meetAndGreet && (
              <div className="self-stretch py-1 flex justify-between items-center text-xs sm:text-sm border-t border-slate-200/60 pt-2">
                <div className="flex flex-col">
                  <span className="text-slate-900 font-semibold font-manrope">
                    Airport Meet &amp; Greet
                  </span>
                  <span className="text-[#667085] text-xs font-normal">
                    Arrival hall name board &amp; 60m flight tracking
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-slate-900 font-bold font-manrope text-sm sm:text-base">
                    +$25.00
                  </span>
                  <span className="text-[#667085] text-[10px] block">SGD</span>
                </div>
              </div>
            )}

            {/* Optional Baby Seat Item if added */}
            {bookingData.babySeat && (
              <div className="self-stretch py-1 flex justify-between items-center text-xs sm:text-sm border-t border-slate-200/60 pt-2">
                <span className="text-slate-900 font-semibold font-manrope">
                  Child / Baby Safety Seat
                </span>
                <div className="text-right shrink-0">
                  <span className="text-slate-900 font-bold font-manrope text-sm sm:text-base">
                    +$20.00
                  </span>
                  <span className="text-[#667085] text-[10px] block">SGD</span>
                </div>
              </div>
            )}

            {/* Inclusions */}
            <div className="self-stretch grid grid-cols-3 gap-2 pt-2 border-t border-[#C6A45A]/20 text-center">
              <div className="p-2 bg-white rounded-lg border border-[#E9ECEF]">
                <div className="text-[#5F6B7A] text-[10px] font-normal">ERP &amp; Tolls</div>
                <div className="text-[#8A5A00] text-[11px] font-bold">INCLUDED</div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-[#E9ECEF]">
                <div className="text-[#5F6B7A] text-[10px] font-normal">60m Flight Wait</div>
                <div className="text-[#8A5A00] text-[11px] font-bold">INCLUDED</div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-[#E9ECEF]">
                <div className="text-[#5F6B7A] text-[10px] font-normal">Midnight Surge</div>
                <div className="text-[#8A5A00] text-[11px] font-bold">WAIVED</div>
              </div>
            </div>

            {/* Final Tariff */}
            <div className="self-stretch pt-2 border-t border-[#C6A45A]/30 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[#8A5A00] text-sm sm:text-base font-extrabold font-manrope">
                  Final Guaranteed Tariff
                </span>
                <span className="text-[#667085] text-[11px]">
                  Fixed rate · Zero surge or hidden fees
                </span>
              </div>
              <div className="text-right">
                <div className="text-slate-900 text-2xl sm:text-3xl font-extrabold font-manrope">
                  ${totalFare}.00
                </div>
                <div className="text-[#8A5A00] text-[10px] font-bold tracking-wider uppercase">
                  SGD NETT
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Buttons */}
        <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch text-center text-[#5F6B7A] text-[11px] sm:text-xs font-normal font-manrope">
            Singapore trips only — cross-border rides to Malaysia not available.
          </div>
          <div className="self-stretch flex justify-start items-center gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 sm:px-8 py-3.5 bg-[#E9ECEF] hover:bg-slate-200 active:scale-95 rounded-xl flex justify-center items-center gap-2 transition-colors cursor-pointer text-[#5F6B7A] text-sm sm:text-base font-bold font-manrope"
            >
              <ArrowLeft className="w-4 h-4 text-[#5F6B7A]" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleProceed}
              className="flex-1 py-3.5 bg-gradient-to-r from-[#C6A45A] to-[#B58E45] active:scale-98 text-[#071E3B] rounded-xl flex justify-center items-center gap-3 transition-all shadow-md hover:shadow-lg cursor-pointer group text-sm sm:text-base font-extrabold font-manrope"
            >
              <span>Confirm via WhatsApp</span>
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
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
            <ArrowRight className="w-3.5 h-3.5 text-[#667085] group-hover:text-[#071E3B]" />
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
      </div>
    </div>
  );
}

