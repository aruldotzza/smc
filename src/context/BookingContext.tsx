"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface BookingData {
  serviceType: string;
  pickup: string;
  dropoff: string;
  passengers: number;
  luggage: number;
  meetAndGreet: boolean;
  durationHours: number;
  selectedFleet: string;
  selectedFleetSlug: string;
  baseFare: number;
  pickupDate: string;
  pickupTime: string;
  flightNo: string;
  babySeat: boolean;
  specialRequests: string;
  name: string;
  phone: string;
  countryCode: string;
  email: string;
}

interface BookingModalOptions {
  initialStep?: number;
  serviceType?: string;
  selectedFleet?: string;
  selectedFleetSlug?: string;
  baseFare?: number;
  pickup?: string;
  dropoff?: string;
  durationHours?: number;
}

interface BookingContextType {
  isModalOpen: boolean;
  step: number;
  bookingData: BookingData;
  openModal: (options?: BookingModalOptions) => void;
  closeModal: () => void;
  setStep: (step: number) => void;
  updateBookingData: (data: Partial<BookingData>) => void;
  resetBooking: () => void;
  calculateTotal: () => number;
}

const defaultBookingData: BookingData = {
  serviceType: "Airport Transfer",
  pickup: "Singapore Changi Airport (SIN)",
  dropoff: "Marina Bay Sands Hotel",
  passengers: 1,
  luggage: 0,
  meetAndGreet: true,
  durationHours: 3,
  selectedFleet: "Mercedes-Benz Vito / Toyota Hiace 9S",
  selectedFleetSlug: "9-seater",
  baseFare: 70,
  pickupDate: new Date().toISOString().split("T")[0],
  pickupTime: "17:15",
  flightNo: "SQ 321",
  babySeat: false,
  specialRequests: "",
  name: "Alexander Wright",
  phone: "88006006",
  countryCode: "+65",
  email: "alexander.wright@example.com",
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>(defaultBookingData);

  const openModal = (options?: BookingModalOptions) => {
    if (options) {
      setBookingData((prev) => ({
        ...prev,
        serviceType: options.serviceType || prev.serviceType,
        selectedFleet: options.selectedFleet || prev.selectedFleet,
        selectedFleetSlug: options.selectedFleetSlug || prev.selectedFleetSlug,
        baseFare: options.baseFare ?? prev.baseFare,
        pickup: options.pickup ?? prev.pickup,
        dropoff: options.dropoff ?? prev.dropoff,
        durationHours: options.durationHours ?? prev.durationHours,
      }));
      setStep(options.initialStep ?? 1);
    } else {
      setStep(1);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const resetBooking = () => {
    setBookingData(defaultBookingData);
    setStep(1);
  };

  const calculateTotal = () => {
    let total = bookingData.baseFare;
    const isHourly = bookingData.serviceType.toLowerCase().includes("hourly");
    const isAirport = bookingData.serviceType.toLowerCase().includes("airport") || bookingData.serviceType.toLowerCase().includes("arrival");

    if (isHourly) {
      const hours = bookingData.durationHours || 3;
      const ratePerHour = bookingData.baseFare >= 50 && bookingData.baseFare <= 120 ? bookingData.baseFare : 65;
      total = ratePerHour * hours;
    } else if (isAirport && bookingData.meetAndGreet) {
      total += 25;
    }

    if (bookingData.babySeat) total += 20;
    return total;
  };

  return (
    <BookingContext.Provider
      value={{
        isModalOpen,
        step,
        bookingData,
        openModal,
        closeModal,
        setStep,
        updateBookingData,
        resetBooking,
        calculateTotal,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}

