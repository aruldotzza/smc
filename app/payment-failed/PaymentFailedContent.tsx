"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import BookingValueProps from "@/Components/Booking/BookingValueProps";
import PaymentFailedCard from "@/Components/Booking/PaymentFailedCard";

export default function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const nameParam = searchParams.get("name") || "";
  const reasonParam = searchParams.get("reason") || searchParams.get("error") || "";
  const titleParam = searchParams.get("title") || "Booking Failed";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left Column (5 Cols): Why Book With Us & Fixed Rate Reference */}
      <div className="lg:col-span-5 order-2 lg:order-1">
        <BookingValueProps />
      </div>

      {/* Right Column (7 Cols): Payment Failed Card */}
      <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center lg:justify-start">
        <PaymentFailedCard
          title={titleParam}
          customerName={nameParam}
          errorMessage={reasonParam}
          retryHref="/book"
        />
      </div>
    </div>
  );
}
