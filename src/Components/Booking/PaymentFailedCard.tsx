"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, RefreshCw, X, AlertTriangle } from "lucide-react";
import { useBookingModal } from "@/context/BookingContext";

interface PaymentFailedCardProps {
  title?: string;
  customerName?: string;
  errorMessage?: string;
  onRetry?: () => void;
  retryHref?: string;
  whatsappNumber?: string;
  className?: string;
}

export default function PaymentFailedCard({
  title = "Booking Failed",
  customerName,
  errorMessage,
  onRetry,
  retryHref = "/book",
  whatsappNumber = "6588006006",
  className = "",
}: PaymentFailedCardProps) {
  const { bookingData, setStep } = useBookingModal();

  // Prefer explicitly passed customerName, then bookingData.name, otherwise fallback to "Valued Customer" or omit
  const displayName = customerName || bookingData?.name?.trim() || "";

  const handleRetry = (e: React.MouseEvent) => {
    if (onRetry) {
      e.preventDefault();
      onRetry();
    } else {
      setStep(1);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Singapore Maxicabs, my booking or payment could not be processed${
      displayName ? ` for ${displayName}` : ""
    }${
      bookingData?.serviceType ? ` (${bookingData.serviceType})` : ""
    }. Could you please assist me?`
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div
      className={`w-full max-w-[633px] p-6 sm:p-10 bg-white rounded-2xl shadow-[0px_4px_24px_rgba(0,0,0,0.06)] border border-[#E9ECEF] flex flex-col justify-start items-center overflow-hidden transition-all duration-200 ${className}`}
    >
      <div className="w-full py-4 sm:py-6 flex flex-col justify-start items-center gap-6 sm:gap-7">
        {/* Error Status Icon Circle */}
        <div className="w-20 h-20 rounded-full bg-[#FEF3F2] border border-rose-100 flex items-center justify-center text-[#C1271C] shadow-xs shrink-0 animate-in fade-in zoom-in duration-300">
          <div className="w-10 h-10 rounded-full bg-rose-100/60 flex items-center justify-center">
            <X className="w-6 h-6 stroke-[3] text-[#C1271C]" />
          </div>
        </div>

        {/* Title & Personalized Description */}
        <div className="w-full max-w-md flex flex-col items-center text-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#071E3B] font-manrope tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#667085] font-normal font-manrope leading-relaxed">
            {displayName ? (
              <>
                We&apos;re sorry,{" "}
                <span className="font-semibold text-[#071E3B]">{displayName}</span>!
              </>
            ) : (
              "We're sorry!"
            )}{" "}
            Your booking couldn&apos;t be processed at this time. Please try again or
            contact support for assistance.
          </p>

          {errorMessage && (
            <div className="mt-2 px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-medium inline-flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm flex flex-col items-center gap-3 pt-2">
          {/* Try Booking Again CTA */}
          <Link
            href={retryHref}
            onClick={handleRetry}
            className="w-full py-3.5 px-6 rounded-lg bg-[#C1271C] hover:bg-[#a82016] active:bg-[#8e1b12] text-white text-base font-semibold font-manrope transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow text-center group"
          >
            <RefreshCw className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
            <span>Try Booking Again</span>
          </Link>

          {/* Contact Support on WhatsApp CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-lg bg-[#F8F7F4] hover:bg-[#EEEDE6] active:bg-[#E5E3DC] border border-[#E9ECEF] text-[#071E3B] hover:text-[#071E3B] text-base font-semibold font-manrope transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer shadow-2xs group text-center"
          >
            {/* WhatsApp Brand Badge Icon */}
            <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-xs">
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
            </div>
            <span>Contact Support on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
