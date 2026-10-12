"use client";

import React from "react";
import { useBookingModal } from "@/context/BookingContext";
import AirportTransferCard from "./AirportTransferCard";
import CityTransferCard from "./CityTransferCard";
import HourlyCharterCard from "./HourlyCharterCard";
import CityTourCard from "./CityTourCard";

interface Step1CardProps {
  isModal?: boolean;
}

export default function Step1Card({ isModal = true }: Step1CardProps) {
  const { bookingData } = useBookingModal();

  const service = (bookingData.serviceType || "").toLowerCase();

  const isCityTour = service.includes("tour") || service.includes("sightseeing");
  const isAirport = !isCityTour && (service.includes("airport") || service.includes("arrival") || service.includes("departure"));
  const isHourly = !isCityTour && (service.includes("hourly") || service.includes("charter"));
  const isCity = !isCityTour && !isAirport && !isHourly;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Render the specialized card without top tab switcher */}
      {isAirport && <AirportTransferCard isModal={isModal} />}
      {isHourly && <HourlyCharterCard isModal={isModal} />}
      {isCityTour && <CityTourCard isModal={isModal} />}
      {isCity && <CityTransferCard isModal={isModal} />}
    </div>
  );
}
