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

  const handleProceed = () => {
    // Generate WhatsApp Booking Message
    const text =
      `*New Singapore Maxi Cab Booking Request*%0A` +
      `--------------------------------%0A` +
      `*Service:* ${bookingData.serviceType}%0A` +
      `*Vehicle:* ${bookingData.selectedFleet}%0A` +
      `*Pickup:* ${bookingData.pickup}%0A` +
      `*Dropoff:* ${bookingData.dropoff}%0A` +
      `*Date:* ${bookingData.pickupDate || "24 Oct 2024"} at ${bookingData.pickupTime || "17:15"} SGT%0A` +
      `*Passengers:* ${bookingData.passengers} Pax | *Luggage:* ${bookingData.luggage} Bags%0A` +
      `*Meet & Greet:* ${bookingData.meetAndGreet ? "Yes (Included)" : "No"}%0A` +
      `*Baby Seat:* ${bookingData.babySeat ? "Yes (+$20 SGD)" : "No"}%0A` +
      `*Special Notes / Flight:* ${bookingData.specialRequests || "SQ 321 Buffer"}%0A` +
      `--------------------------------%0A` +
      `*Passenger Name:* ${bookingData.name || "Alexander Wright"}%0A` +
      `*WhatsApp:* ${bookingData.countryCode} ${bookingData.phone || "9123 4567"}%0A` +
      `*Email:* ${bookingData.email || "Sample@example.com"}%0A` +
      `*Final Tariff:* $${totalFare}.00 SGD NETT%0A` +
      `--------------------------------%0A` +
      `Please confirm driver dispatch availability. Thank you!`;

    window.open(`https://wa.me/6588006006?text=${text}`, "_blank");
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-[562px] mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center flex flex-col items-center gap-6 shadow-2xl relative">
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
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-10 h-10 stroke-[2]" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-[#071E3B] font-['Manrope']">
            Booking Request Dispatched!
          </h3>
          <p className="text-sm text-[#5F6B7A] max-w-md font-['Manrope']">
            We have redirected your itinerary to our 24/7 WhatsApp dispatch team. Your driver details and flight buffer will be confirmed in 2–5 minutes.
          </p>
        </div>

        <div className="w-full p-4 rounded-xl bg-[#FBF7EC] border border-[#F4EAD1] text-left text-xs space-y-1.5 text-[#071E3B] font-['Manrope']">
          <div className="flex justify-between font-semibold">
            <span>Passenger:</span>
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

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              if (closeModal) closeModal();
            }}
            className="px-6 py-2.5 rounded-lg bg-[#071E3B] hover:bg-[#0B2A4A] text-white text-sm font-semibold font-['Manrope'] transition-all cursor-pointer"
          >
            Done
          </button>
          <a
            href="https://wa.me/6588006006"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-lg border border-[#C6A45A] hover:bg-[#C6A45A]/10 text-[#8A5A00] text-sm font-semibold font-['Manrope'] transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[562px] mx-auto p-5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-slate-200 flex flex-col justify-start items-start gap-5 shadow-2xl relative max-h-[92vh] overflow-y-auto">
      {/* Close button if in modal */}
      {isModal && closeModal && (
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#667085] hover:text-[#071E3B] hover:bg-slate-100 transition-colors z-30 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Header */}
      <div className="flex flex-col justify-start items-start">
        <div className="flex flex-col justify-start items-start">
          <div className="justify-center text-[#C6A45A] text-xs font-semibold font-['Manrope'] leading-4 uppercase tracking-wider">
            QUICK &amp; EASY BOOKING
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start">
          <div className="justify-center text-[#071E3B] text-xl font-semibold font-['Manrope'] leading-7">
            Review Your Journey
          </div>
        </div>
      </div>

      {/* Confirmed Vehicle Class Hero Card */}
      <div className="self-stretch h-72 relative rounded-xl flex flex-col justify-between p-4 overflow-hidden bg-slate-900">
        <Image
          src="/images/Home/Hero_tab.png"
          alt={bookingData.selectedFleet || "Mercedes-Benz V-Class / Toyota Vellfire"}
          fill
          sizes="(max-width: 640px) 100vw, 520px"
          className="object-cover object-center"
        />
        {/* Figma Linear Gradient: 270deg from slate-900 to transparent */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-900/90 via-slate-900/35 to-slate-900/0 pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center gap-4 flex-wrap">
          <div className="px-2 py-1 bg-[rgba(7,30,59,0.5)] rounded-sm shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-white/20 backdrop-blur-[6px] flex justify-start items-center gap-1.5">
            <svg
              className="w-3 h-3 text-[#C6A45A] fill-[#C6A45A]"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.2 3,11 3.5,7.5 1,5 4.5,4.5" />
            </svg>
            <div className="justify-center text-white text-xs font-semibold font-['Manrope'] leading-4 tracking-wide">
              VIP CHANGI CONCIERGE
            </div>
          </div>
          <div className="px-2 py-1 bg-[rgba(7,30,59,0.5)] rounded-sm outline outline-1 outline-offset-[-1px] outline-white/20 backdrop-blur-[20px] inline-flex flex-col justify-start items-start">
            <div className="justify-center text-white text-xs font-semibold font-['Manrope'] leading-4 uppercase tracking-wide">
              {bookingData.selectedFleet ? "7 SEATER MAXI CAB" : "7 SEATER MAXI CAB"}
            </div>
          </div>
        </div>

        {/* Bottom Vehicle Info */}
        <div className="relative z-10 flex flex-col justify-start items-start gap-1">
          <div className="self-stretch inline-flex justify-between items-center gap-2 flex-wrap">
            <div className="justify-center text-[#C6A45A] text-sm font-bold font-['Manrope'] leading-5 tracking-wide">
              CONFIRMED VEHICLE CLASS
            </div>
            <div className="px-2 py-1 bg-[rgba(255,255,255,0.20)] rounded-sm outline outline-1 outline-offset-[-1px] outline-white/20 backdrop-blur-[6px] flex justify-start items-center gap-1.5">
              <svg
                className="w-2.5 h-3 text-[#C6A45A] fill-[#C6A45A]"
                viewBox="0 0 10 12"
              >
                <circle cx="5" cy="3" r="2.5" />
                <path d="M1 11C1 8.5 2.8 7 5 7C7.2 7 9 8.5 9 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <div className="justify-center text-white text-xs font-semibold font-['Manrope'] leading-4">
                Max {bookingData.passengers || 7} Passengers
              </div>
              <div className="justify-center text-white text-xs font-normal font-['Manrope'] leading-6">
                •
              </div>
              <svg
                className="w-2.5 h-3 text-[#C6A45A]"
                viewBox="0 0 10 12"
                fill="none"
              >
                <rect x="1" y="3.5" width="8" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" />
                <path d="M3.5 3.5V2C3.5 1.45 3.95 1 4.5 1H5.5C6.05 1 6.5 1.45 6.5 2V3.5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <div className="justify-center text-white text-xs font-semibold font-['Manrope'] leading-4">
                {bookingData.luggage || 5} Luggage&apos;s
              </div>
            </div>
          </div>
          <div className="justify-center text-white text-2xl font-semibold font-['Manrope'] leading-8">
            {bookingData.selectedFleet || "Mercedes-Benz V-Class / Toyota Vellfire"}
          </div>
        </div>
      </div>

      {/* Journey & Booking Details Flow */}
      <div className="self-stretch flex flex-col justify-start items-start gap-8">
        {/* Row 1: Pick Up & Destination */}
        <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Pick Up */}
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="self-stretch inline-flex justify-start items-center gap-1.5">
              <div className="justify-center text-[#8A5A00] text-sm font-medium font-['Inter'] leading-5">
                Pick Up
              </div>
              <div className="px-2 py-1 bg-[#123F6B] rounded-sm inline-flex flex-col justify-start items-start">
                <div className="justify-center text-white text-xs font-normal font-['Manrope'] leading-4">
                  Terminal 3
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start overflow-hidden">
              <div className="self-stretch justify-center text-[#071E3B] text-base font-bold font-['Manrope'] leading-7">
                {bookingData.pickup || "Singapore Changi Airport (SIN)"}
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-[#667085] text-base font-normal font-['Manrope'] leading-6">
                Arrival Hall Belt 42 Meetpoint , Flight buffer active
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="py-0.5 flex flex-col justify-start items-start">
              <div className="justify-center text-[#8A5A00] text-sm font-medium font-['Inter'] leading-5">
                Destination
              </div>
            </div>
            <div className="flex flex-col justify-start items-start overflow-hidden">
              <div className="justify-center text-[#071E3B] text-base font-bold font-['Manrope'] leading-7">
                {bookingData.dropoff || "Marina Bay Sands Hotel"}
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div className="self-stretch justify-center text-[#667085] text-base font-normal font-['Manrope'] leading-6">
                10 Bayfront Avenue, Singapore 018956 (Tower 1 VIP Foyer)
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Date & Time & iPad Signboard */}
        <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-start">
          <div className="flex flex-col justify-start items-start gap-1">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-center text-[#C6A45A] text-xs font-bold font-['Manrope'] leading-4 uppercase tracking-wider">
                DATE &amp; TIME
              </div>
            </div>
            <div className="flex flex-col justify-start items-start">
              <div className="justify-center text-[#071E3B] text-base font-bold font-['Manrope'] leading-6">
                {bookingData.pickupDate || "24 Oct 2024"}
              </div>
            </div>
            <div className="flex flex-col justify-start items-start">
              <div className="justify-center text-[#5F6B7A] text-sm font-medium font-['Manrope'] leading-5">
                {bookingData.pickupTime || "17:15"} SGT (SQ 321 Buffer)
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-1">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-center text-[#C6A45A] text-xs font-bold font-['Manrope'] leading-4 uppercase tracking-wider">
                IPAD SIGNBOARD
              </div>
            </div>
            <div className="flex flex-col justify-start items-start">
              <div className="justify-center text-[#071E3B] text-base font-bold font-['Manrope'] leading-6 uppercase">
                {bookingData.name ? `MR. ${bookingData.name.toUpperCase()}` : "MR. ALEXANDER WRIGHT"}
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch justify-center text-[#5F6B7A] text-sm font-medium font-['Manrope'] leading-5">
                Driver will hold in Arrival Hall
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Passenger */}
        <div className="flex flex-col justify-start items-start gap-1">
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="justify-center text-[#C6A45A] text-xs font-bold font-['Manrope'] leading-4 uppercase tracking-wider">
              PASSENGER
            </div>
          </div>
          <div className="flex flex-col justify-start items-start">
            <div className="justify-center text-[#071E3B] text-base font-bold font-['Manrope'] leading-6">
              {bookingData.name || "Alexander Wright"}
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch justify-center text-[#5F6B7A] text-sm font-medium font-['Manrope'] leading-5">
              {bookingData.countryCode} {bookingData.phone || "9123 4567"}
            </div>
          </div>
        </div>

        {/* Tariff Breakdown Section */}
        <div className="self-stretch bg-white rounded-2xl flex flex-col justify-start items-start gap-4">
          {/* Header */}
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="flex justify-start items-center gap-1.5">
              <div className="w-5 h-4 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#8A5A00] fill-[#8A5A00]"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="justify-center text-[#071E3B] text-lg font-bold font-['Manrope'] leading-7">
                Tariff Breakdown
              </div>
            </div>
            <div className="px-2 py-1 bg-[#FFF8E7] rounded-xl inline-flex flex-col justify-start items-start">
              <div className="justify-center text-[#8A5A00] text-xs font-semibold font-['Manrope'] leading-4">
                Zero Hidden Charges
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            {/* Transfer Line Item */}
            <div className="self-stretch py-2 inline-flex justify-between items-center">
              <div className="inline-flex flex-col justify-start items-start">
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="justify-center text-slate-900 text-sm font-medium font-['Inter'] leading-5">
                    {bookingData.selectedFleet || "7-Seater Maxi Cab"} Transfer
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="justify-center text-zinc-700 text-xs font-normal font-['Manrope'] leading-4">
                    Includes terminal meet &amp; greet, toll systems, and driver dispatch
                  </div>
                </div>
              </div>
              <div className="inline-flex flex-col justify-start items-end">
                <div className="text-right justify-center text-slate-900 text-xl font-semibold font-['Manrope'] leading-7">
                  ${bookingData.baseFare || 70}.00
                </div>
                <div className="text-right justify-center text-slate-900 text-xs font-normal font-['Manrope'] leading-4">
                  SGD
                </div>
              </div>
            </div>

            {/* Optional Baby Seat Item if added */}
            {bookingData.babySeat && (
              <div className="self-stretch py-1 inline-flex justify-between items-center">
                <div className="inline-flex flex-col justify-start items-start">
                  <div className="justify-center text-slate-900 text-sm font-medium font-['Inter'] leading-5">
                    Child / Baby Safety Seat
                  </div>
                </div>
                <div className="inline-flex flex-col justify-start items-end">
                  <div className="text-right justify-center text-slate-900 text-base font-semibold font-['Manrope']">
                    +$20.00
                  </div>
                  <div className="text-right justify-center text-slate-900 text-xs font-normal font-['Manrope']">
                    SGD
                  </div>
                </div>
              </div>
            )}

            {/* Inclusions */}
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div className="self-stretch inline-flex justify-start items-center gap-1.5">
                <div className="w-3.5 h-3.5 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-[#8A5A00]"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M4.5 7L6.2 8.7L9.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="justify-center text-[#5F6B7A] text-sm font-medium font-['Manrope'] leading-5 uppercase">
                  ALL-INCLUSIVE INCLUSIONS ($0 EXTRA CHARGES)
                </div>
              </div>
              <div className="self-stretch grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-start">
                <div className="p-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-[#E9ECEF] inline-flex flex-col justify-start items-start gap-1">
                  <div className="justify-center text-[#5F6B7A] text-xs font-normal font-['Manrope'] leading-4">
                    ERP &amp; Tolls
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <div className="justify-center text-[#8A5A00] text-xs font-bold font-['Manrope'] leading-4">
                      INCLUDED ($0)
                    </div>
                  </div>
                </div>
                <div className="p-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-[#E9ECEF] inline-flex flex-col justify-start items-start gap-1">
                  <div className="justify-center text-[#5F6B7A] text-xs font-normal font-['Manrope'] leading-4">
                    Meet &amp; Greet + 60m Wait
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <div className="justify-center text-[#8A5A00] text-xs font-bold font-['Manrope'] leading-4">
                      INCLUDED ($0)
                    </div>
                  </div>
                </div>
                <div className="p-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-[#E9ECEF] inline-flex flex-col justify-start items-start gap-1">
                  <div className="justify-center text-[#5F6B7A] text-xs font-normal font-['Manrope'] leading-4">
                    Midnight / Peak Surcharge
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <div className="justify-center text-[#8A5A00] text-xs font-bold font-['Manrope'] leading-4">
                      WAIVED ($0)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Tariff */}
            <div className="self-stretch flex flex-col justify-start items-start pt-2">
              <div className="self-stretch rounded-lg inline-flex justify-between items-center">
                <div className="w-80 inline-flex flex-col justify-start items-start">
                  <div className="self-stretch flex flex-col justify-start items-start">
                    <div className="justify-center text-[#8A5A00] text-base font-bold font-['Manrope'] leading-6">
                      Final Tariff
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-start">
                    <div className="justify-center text-zinc-700 text-xs font-normal font-['Manrope'] leading-4">
                      Guaranteed fixed rate · Zero surge or hidden fees
                    </div>
                  </div>
                </div>
                <div className="h-14 inline-flex flex-col justify-between items-end">
                  <div className="justify-center text-slate-900 text-3xl font-semibold font-['Manrope'] leading-10">
                    ${totalFare}.00
                  </div>
                  <div className="justify-center text-zinc-700 text-xs font-normal font-['Manrope'] leading-4 uppercase">
                    SGD NETT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Buttons */}
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="self-stretch rounded-sm flex flex-col justify-start items-center">
            <div className="justify-center text-[#5F6B7A] text-xs font-normal font-['Manrope'] leading-4">
              Singapore trips only — cross-border rides to Malaysia not available.
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-start gap-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-8 py-3 bg-[#E9ECEF] hover:bg-slate-200 rounded-lg flex justify-center items-center gap-4 transition-colors cursor-pointer text-[#5F6B7A] text-base font-semibold font-['Manrope'] leading-6"
            >
              <ArrowLeft className="w-4 h-4 text-[#5F6B7A]" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleProceed}
              className="flex-1 px-8 py-3 bg-[#071E3B] hover:bg-[#0B2A4A] rounded-lg flex justify-center items-center gap-4 transition-all shadow-md hover:shadow-lg cursor-pointer group text-white text-base font-semibold font-['Manrope'] leading-6"
            >
              <span className="text-center justify-center">
                Proceed to Payment
              </span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
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
            <div className="justify-center text-[#667085] group-hover:text-[#071E3B] text-sm font-normal font-['Manrope'] leading-5 transition-colors">
              View all prices
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#667085] group-hover:text-[#071E3B] transition-colors" />
          </Link>
          <a
            href="https://wa.me/6588006006"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-start items-center gap-1 group transition-colors"
          >
            <div className="justify-center text-[#16803C] group-hover:text-emerald-700 text-sm font-normal font-['Manrope'] leading-5 transition-colors">
              Book via whatsapp us
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#16803C] group-hover:text-emerald-700 transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
}
