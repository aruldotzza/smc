"use client";

import React from "react";
import { useBookingModal } from "@/context/BookingContext";
import { ArrowRight, ChevronDown, MapPin, X } from "lucide-react";
import fleetData from "@/data/fleet.json";
import LocationAutocompleteInput from "./LocationAutocompleteInput";

interface HourlyCharterCardProps {
  isModal?: boolean;
}

export default function HourlyCharterCard({ isModal = true }: HourlyCharterCardProps) {
  const { bookingData, updateBookingData, setStep, closeModal } = useBookingModal();

  const durationOptions = [3, 4, 6, 8, 10, 12];
  const currentDuration = bookingData.durationHours || 3;

  const handleDurationSelect = (hours: number) => {
    updateBookingData({ durationHours: hours });
  };

  const handleFleetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = fleetData.vehicles.find((v) => v.id === e.target.value);
    if (selected) {
      updateBookingData({
        selectedFleet: selected.name,
        selectedFleetSlug: selected.slug,
        baseFare: parseInt(selected.price.replace(/[^0-9]/g, "")) || 65,
      });
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    updateBookingData({
      serviceType: "Hourly Charter",
      dropoff: "As-Directed City Tour / Flexible Itinerary",
    });
    setStep(2);
  };

  const handleMultiDay = () => {
    updateBookingData({
      durationHours: 24,
      specialRequests: (bookingData.specialRequests ? bookingData.specialRequests + " | " : "") + "Multi-day Charter Request",
    });
    const text = encodeURIComponent(
      "Hi Singapore Maxi Cabs, I would like to inquire about a Multi-Day Hourly Charter service with dedicated chauffeur."
    );
    window.open(`https://wa.me/6588006006?text=${text}`, "_blank");
  };

  // Calculate rate based on duration
  const hourlyRate = bookingData.baseFare >= 50 && bookingData.baseFare <= 120 ? bookingData.baseFare : 65;
  const estimatedFare = hourlyRate * currentDuration;

  // Percentage for progress slider
  const minHour = 3;
  const maxHour = 12;
  const progressPercent = Math.min(
    100,
    Math.max(0, ((currentDuration - minHour) / (maxHour - minHour)) * 100)
  );

  return (
    <div className="w-full max-w-[620px] mx-auto p-5 sm:p-9 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col justify-start items-start gap-4 sm:gap-5 relative max-h-[92vh] overflow-y-auto">
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
      <div className="self-stretch flex flex-col justify-start items-start pr-8 sm:pr-0">
        <div className="self-stretch text-[#C6A45A] text-xs font-semibold font-manrope leading-4 uppercase tracking-wider">
          Hourly Charter
        </div>
        <div className="self-stretch pt-1 flex flex-col justify-start items-start">
          <div className="text-left text-[#071E3B] text-base sm:text-lg font-bold font-manrope uppercase leading-6 tracking-wide">
            FIXED ALL-INCLUSIVE FARE
          </div>
        </div>
      </div>

      <form onSubmit={handleContinue} className="self-stretch flex flex-col justify-start items-start gap-4">
        {/* Pickup Location */}
        <LocationAutocompleteInput
          label="Pickup Location"
          placeholder="e.g. Hotel Grand Pacific Singapore / Changi Airport"
          value={bookingData.pickup}
          onChange={(val) => updateBookingData({ pickup: val })}
          required
        />

        {/* Duration Section matching hourly.html */}
        <div className="self-stretch flex flex-col justify-start items-start gap-2 bg-[#F8F7F4] p-4 rounded-xl border border-slate-200/90">
          <div className="self-stretch flex justify-between items-center">
            <label className="text-[#071E3B] text-xs sm:text-sm font-medium font-inter leading-5">
              Duration
            </label>
            <div className="flex items-baseline gap-1 text-[#C6A45A]">
              <span className="text-2xl font-bold font-manrope leading-7">
                {currentDuration}
              </span>
              <span className="text-xs font-semibold font-manrope">hrs</span>
            </div>
          </div>

          {/* Interactive Progress Bar */}
          <div className="self-stretch py-2 flex items-center relative">
            <div className="w-full h-1.5 bg-slate-200 rounded-full relative">
              <div
                className="h-full bg-[#C6A45A] rounded-full transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#C6A45A] rounded-full shadow-[0px_1px_4px_0px_rgba(180,83,9,0.35)] ring-4 ring-white transition-all duration-200"
                style={{ left: `calc(${progressPercent}% - 10px)` }}
              />
            </div>
          </div>

          {/* Duration Clickable Stops */}
          <div className="self-stretch px-0.5 pt-1 flex justify-between items-center">
            {durationOptions.map((hour) => {
              const isSelected = currentDuration === hour;
              return (
                <button
                  key={hour}
                  type="button"
                  onClick={() => handleDurationSelect(hour)}
                  className={`px-2 py-1 rounded-md text-sm font-manrope transition-all cursor-pointer ${
                    isSelected
                      ? "text-[#C6A45A] font-bold bg-[#FEF3C7] shadow-xs"
                      : "text-[#667085] hover:text-[#071E3B] font-medium"
                  }`}
                >
                  {hour}h
                </button>
              );
            })}
          </div>

          {/* Subtext Row */}
          <div className="self-stretch pt-2 border-t border-slate-200/60 flex justify-between items-center text-xs">
            <span className="text-[#667085] font-manrope font-normal">
              ${hourlyRate}/hr · 3 hr minimum
            </span>
            <button
              type="button"
              onClick={handleMultiDay}
              className="text-[#C6A45A] hover:text-[#B58E45] font-bold font-manrope inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Multi-day booking</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Steppers: Passengers & Luggage */}
        <div className="self-stretch grid grid-cols-2 gap-3 sm:gap-8 items-start">
          {/* Passengers */}
          <div className="px-2.5 sm:px-3 py-2 sm:py-2.5 bg-[#F8F7F4] rounded-lg border border-slate-200/90 flex justify-between items-center">
            <span className="text-[#5F6B7A] text-xs font-semibold font-manrope leading-4">
              Passengers
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    passengers: Math.max(1, bookingData.passengers - 1),
                  })
                }
                className="w-6 h-6 bg-white rounded-sm shadow-[0px_0px_0px_1px_rgba(0,0,0,0.09)] flex justify-center items-center text-[#5F6B7A] text-xs font-bold font-manrope hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
                aria-label="Decrease passengers"
              >
                -
              </button>
              <span className="w-4 text-center text-xs font-medium font-manrope text-[#071E3B]">
                {bookingData.passengers}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    passengers: Math.min(13, bookingData.passengers + 1),
                  })
                }
                className="w-6 h-6 bg-white rounded-sm shadow-[0px_0px_0px_1px_rgba(0,0,0,0.09)] flex justify-center items-center text-[#5F6B7A] text-xs font-bold font-manrope hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
                aria-label="Increase passengers"
              >
                +
              </button>
            </div>
          </div>

          {/* Luggage */}
          <div className="px-2.5 sm:px-3 py-2 sm:py-2.5 bg-[#F8F7F4] rounded-lg border border-slate-200/90 flex justify-between items-center">
            <span className="text-[#5F6B7A] text-xs font-semibold font-manrope leading-4">
              Luggage
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    luggage: Math.max(0, bookingData.luggage - 1),
                  })
                }
                className="w-6 h-6 bg-white rounded-sm shadow-[0px_0px_0px_1px_rgba(0,0,0,0.09)] flex justify-center items-center text-[#5F6B7A] text-xs font-bold font-manrope hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
                aria-label="Decrease luggage"
              >
                -
              </button>
              <span className="w-4 text-center text-xs font-medium font-manrope text-[#071E3B]">
                {bookingData.luggage}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateBookingData({
                    luggage: Math.min(15, bookingData.luggage + 1),
                  })
                }
                className="w-6 h-6 bg-white rounded-sm shadow-[0px_0px_0px_1px_rgba(0,0,0,0.09)] flex justify-center items-center text-[#5F6B7A] text-xs font-bold font-manrope hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
                aria-label="Increase luggage"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Recommended fleet dropdown */}
        <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
          <label className="text-[#071E3B] text-xs sm:text-sm font-medium font-inter leading-5">
            Recommended fleet for your trip
          </label>
          <div className="self-stretch relative px-3 py-2.5 bg-[#F8F7F4] rounded-lg border border-slate-200/90 flex justify-between items-center">
            <select
              value={bookingData.selectedFleetSlug}
              onChange={handleFleetChange}
              className="w-full appearance-none bg-transparent text-xs sm:text-sm font-normal font-manrope text-[#071E3B] pr-28 outline-none cursor-pointer"
            >
              {fleetData.vehicles.map((v) => (
                <option key={v.id} value={v.id} className="text-[#071E3B] bg-white">
                  {v.name} ({v.model})
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
              <div className="flex flex-col items-end leading-none">
                <span className="text-[10px] text-[#667085] font-manrope">
                  ${hourlyRate}/hr
                </span>
                <span className="text-right text-[#071E3B] text-base sm:text-lg font-bold font-manrope">
                  ${estimatedFare}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#667085]" />
            </div>
          </div>
        </div>

        {/* Special Request */}
        <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
          <label className="text-[#071E3B] text-xs sm:text-sm font-medium font-inter leading-5">
            Special Request
          </label>
          <div className="self-stretch p-3.5 sm:p-4 bg-[#F8F7F4] rounded-lg border border-slate-200/90 flex justify-start items-center overflow-hidden focus-within:border-[#C6A45A] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#C6A45A] transition-all">
            <textarea
              rows={2}
              placeholder="Eg. Need anything extra? Add a stop, set your temperature preference, or request a company invoice."
              value={bookingData.specialRequests}
              onChange={(e) => updateBookingData({ specialRequests: e.target.value })}
              className="flex-1 text-xs font-normal font-manrope leading-relaxed text-[#071E3B] placeholder:text-[#667085] outline-none bg-transparent resize-none"
            />
          </div>
        </div>

        {/* Disclaimer & Book Now Button */}
        <div className="self-stretch flex flex-col justify-start items-start gap-2 pt-1">
          <div className="self-stretch rounded-sm text-center text-[#667085] text-xs font-normal font-manrope leading-4">
            Singapore trips only — cross-border rides to Malaysia not available.
          </div>
          <button
            type="submit"
            className="self-stretch px-8 py-3.5 bg-[#071E3B] hover:bg-[#0B2A4A] active:scale-[0.98] text-white rounded-lg flex justify-center items-center gap-3 font-semibold font-manrope text-base leading-6 transition-all shadow-md hover:shadow-lg cursor-pointer group"
          >
            <span>Book Now</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Footer Info Bar */}
        <div className="self-stretch pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-[#071E3B] font-manrope text-center border-t border-slate-100">
          <span className="font-normal">All-inclusive transparent rates</span>
          <span>·</span>
          <span className="font-normal">Fixed Price Guarantee</span>
          <span>·</span>
          <span className="font-semibold text-[#C6A45A]">24/7 (+65) 8800 6006</span>
        </div>
      </form>
    </div>
  );
}
