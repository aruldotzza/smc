"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useBookingModal } from "@/context/BookingContext";
import {
  ArrowLeft,
  CheckCircle2,
  Users,
  Briefcase,
  ShieldCheck,
  ChevronDown,
  MessageCircle,
  CreditCard,
  Sparkles,
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
    // Generate WhatsApp Message
    const text = `*New Singapore Maxi Cab Booking Request*%0A` +
      `--------------------------------%0A` +
      `*Service:* ${bookingData.serviceType}%0A` +
      `*Vehicle:* ${bookingData.selectedFleet}%0A` +
      `*Pickup:* ${bookingData.pickup}%0A` +
      `*Dropoff:* ${bookingData.dropoff}%0A` +
      `*Date:* ${bookingData.pickupDate} at ${bookingData.pickupTime} SGT%0A` +
      `*Passengers:* ${bookingData.passengers} Pax | *Luggage:* ${bookingData.luggage} Bags%0A` +
      `*Meet & Greet:* ${bookingData.meetAndGreet ? "Yes (Included)" : "No"}%0A` +
      `*Baby Seat:* ${bookingData.babySeat ? "Yes (+$20 SGD)" : "No"}%0A` +
      `*Special Notes / Flight:* ${bookingData.specialRequests || "None"}%0A` +
      `--------------------------------%0A` +
      `*Passenger Name:* ${bookingData.name}%0A` +
      `*WhatsApp:* ${bookingData.countryCode} ${bookingData.phone}%0A` +
      `*Email:* ${bookingData.email}%0A` +
      `*Estimated Fare:* $${totalFare}.00 SGD Nett%0A` +
      `--------------------------------%0A` +
      `Please confirm driver dispatch availability. Thank you!`;

    window.open(`https://wa.me/6588006006?text=${text}`, "_blank");
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center flex flex-col items-center gap-6 shadow-2xl relative">
        {isModal && closeModal && (
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-10 h-10 stroke-[2]" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-[#071E3B]">
            Booking Request Dispatched!
          </h3>
          <p className="text-sm text-[#5F6B7A] max-w-md">
            We have redirected your itinerary to our 24/7 WhatsApp dispatch team. Your driver details and flight tracking buffer will be confirmed in 2–5 minutes.
          </p>
        </div>

        <div className="w-full max-w-sm p-4 rounded-xl bg-[#FBF7EC] border border-[#F4EAD1] text-left text-xs space-y-1.5 text-[#071E3B]">
          <div className="flex justify-between font-semibold">
            <span>Passenger:</span>
            <span>{bookingData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5F6B7A]">Vehicle:</span>
            <span>{bookingData.selectedFleet}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5F6B7A]">Date &amp; Time:</span>
            <span>{bookingData.pickupDate} {bookingData.pickupTime} SGT</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-[#C6A45A]/20 text-[#A77E3C] text-sm">
            <span>Guaranteed Fixed Tariff:</span>
            <span>${totalFare}.00 SGD Nett</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsSuccess(false);
              if (closeModal) closeModal();
            }}
            className="px-6 py-2.5 rounded-lg bg-[#071E3B] hover:bg-[#0B2A4A] text-white text-sm font-semibold transition-all cursor-pointer"
          >
            Done
          </button>
          <a
            href="https://wa.me/6588006006"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-lg border border-[#C6A45A] hover:bg-[#C6A45A]/10 text-[#C6A45A] text-sm font-semibold transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-7 shadow-xl flex flex-col gap-5 text-[#071E3B] relative max-h-[85vh] overflow-y-auto">
      {/* Close button */}
      {isModal && closeModal && (
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20"
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
          Review Your Journey
        </h3>
      </div>

      {/* Confirmed Vehicle Class Banner Visual */}
      <div className="relative w-full h-52 sm:h-60 rounded-xl overflow-hidden bg-[#071E3B] p-5 flex flex-col justify-between text-white shadow-md">
        {/* Background Image & Ambient Overlay */}
        <Image
          src="/images/Cab.png"
          alt={bookingData.selectedFleet || "Maxi Cab Singapore"}
          fill
          sizes="(max-width: 640px) 100vw, 520px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071E3B] via-[#071E3B]/70 to-[#071E3B]/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded bg-[#071E3B]/80 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#C6A45A]" />
            VIP CHANGI CONCIERGE
          </span>
          <span className="px-2.5 py-1 rounded bg-black/40 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white uppercase shadow-sm">
            {bookingData.serviceType}
          </span>
        </div>

        {/* Bottom Details */}
        <div className="relative z-10 flex flex-col gap-1.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-[#C6A45A] uppercase tracking-wider">
              CONFIRMED VEHICLE CLASS
            </span>
            <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded border border-white/20 text-[11px] font-semibold text-white">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-[#C6A45A]" />
                Max {bookingData.passengers} Passengers
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-[#C6A45A]" />
                {bookingData.luggage} Luggage&apos;s
              </span>
            </div>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-white">
            {bookingData.selectedFleet}
          </h4>
        </div>
      </div>

      {/* Journey Points Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
        {/* Pickup */}
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-[#8A5A00] uppercase tracking-wider">
            Pick Up
          </span>
          <p className="font-bold text-sm text-[#071E3B]">
            {bookingData.pickup}
          </p>
          <span className="text-[#667085]">
            Flight buffer &amp; Meetpoint active
          </span>
        </div>

        {/* Dropoff */}
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-[#8A5A00] uppercase tracking-wider">
            Destination
          </span>
          <p className="font-bold text-sm text-[#071E3B]">
            {bookingData.dropoff}
          </p>
          <span className="text-[#667085]">Singapore Mainland Transfer</span>
        </div>
      </div>

      {/* Date, Time & Passenger */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white border border-[#E9ECEF] text-xs">
        <div>
          <span className="font-bold text-[#C6A45A] uppercase block">
            DATE &amp; TIME
          </span>
          <span className="font-bold text-sm text-[#071E3B] block mt-0.5">
            {bookingData.pickupDate}
          </span>
          <span className="text-[#5F6B7A]">
            {bookingData.pickupTime} SGT
          </span>
        </div>

        <div>
          <span className="font-bold text-[#C6A45A] uppercase block">
            IPAD SIGNBOARD
          </span>
          <span className="font-bold text-sm text-[#071E3B] block mt-0.5 uppercase">
            {bookingData.name}
          </span>
          <span className="text-[#5F6B7A]">Arrival Hall Meet &amp; Greet</span>
        </div>

        <div>
          <span className="font-bold text-[#C6A45A] uppercase block">
            PASSENGER CONTACT
          </span>
          <span className="font-bold text-sm text-[#071E3B] block mt-0.5">
            {bookingData.countryCode} {bookingData.phone}
          </span>
          <span className="text-[#5F6B7A] truncate block">{bookingData.email}</span>
        </div>
      </div>

      {/* Tariff Breakdown Card matching Figma */}
      <div className="rounded-xl border border-[#E9ECEF] p-4 sm:p-5 flex flex-col gap-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8A5A00]" />
            <h5 className="font-bold text-base text-[#071E3B]">
              Tariff Breakdown
            </h5>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#FFF8E7] text-[#8A5A00] text-xs font-semibold">
            Zero Hidden Charges
          </span>
        </div>

        {/* Base Transfer Item */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs sm:text-sm">
          <div>
            <p className="font-medium text-[#071E3B]">
              {bookingData.selectedFleet} Transfer
            </p>
            <p className="text-[11px] text-[#5F6B7A]">
              Includes terminal meet &amp; greet, toll systems, and driver dispatch
            </p>
          </div>
          <span className="font-bold text-base text-[#071E3B]">
            ${bookingData.baseFare}.00 SGD
          </span>
        </div>

        {/* Inclusions Pill Bar */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase text-[#5F6B7A] tracking-wider">
            ALL-INCLUSIVE INCLUSIONS ($0 EXTRA CHARGES)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-2.5 rounded-lg border border-[#E9ECEF] bg-[#F7F5EF] flex flex-col">
              <span className="text-[11px] text-[#5F6B7A]">ERP &amp; Tolls</span>
              <span className="text-xs font-bold text-[#8A5A00]">
                INCLUDED ($0)
              </span>
            </div>
            <div className="p-2.5 rounded-lg border border-[#E9ECEF] bg-[#F7F5EF] flex flex-col">
              <span className="text-[11px] text-[#5F6B7A]">
                Meet &amp; Greet + 60m Wait
              </span>
              <span className="text-xs font-bold text-[#8A5A00]">
                INCLUDED ($0)
              </span>
            </div>
            <div className="p-2.5 rounded-lg border border-[#E9ECEF] bg-[#F7F5EF] flex flex-col">
              <span className="text-[11px] text-[#5F6B7A]">
                Midnight / Peak Surcharge
              </span>
              <span className="text-xs font-bold text-[#8A5A00]">
                WAIVED ($0)
              </span>
            </div>
          </div>
        </div>

        {/* Optional Add-on line if Baby seat */}
        {bookingData.babySeat && (
          <div className="flex items-center justify-between py-1 text-xs">
            <span className="text-[#071E3B] font-medium">Child Safety Seat</span>
            <span className="font-bold text-[#071E3B]">+$20.00 SGD</span>
          </div>
        )}

        {/* Final Tariff Box */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-[#7B5900] block">
              Final Tariff
            </span>
            <span className="text-[11px] text-[#5F6B7A]">
              Guaranteed fixed rate · Zero surge or hidden fees
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-[#071E3B] leading-none">
              ${totalFare}.00
            </span>
            <span className="text-[10px] block text-[#5F6B7A] font-semibold">
              SGD NETT
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="py-3 px-6 rounded-lg bg-[#E9ECEF] hover:bg-slate-200 text-[#5F6B7A] text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={handleProceed}
          className="flex-1 py-3 px-6 rounded-lg bg-[#071E3B] hover:bg-[#0B2A4A] text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          <CreditCard className="w-4 h-4 text-[#C6A45A]" />
          <span>Proceed to Payment &amp; WhatsApp Confirmation</span>
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
    </div>
  );
}
