"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  calculateQuote,
  createBookingCheckout,
  getVehicles,
  getServices,
  getAddOns,
  generateIdempotencyKey,
} from "@/lib/api";
import {
  VehicleCard,
  ServiceItem,
  AddOnItem,
  QuoteResponse,
  CheckoutResponse,
  QuoteRequest,
  CheckoutRequest,
} from "@/types/api";

export interface BookingData {
  vehicleId?: number;
  serviceId?: number;
  serviceCode?: string;
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
  flightNumber?: string;
  signboardName?: string;
  terminal?: string;
  babySeat: boolean;
  nightTravel?: boolean;
  extraStopsWithin2km?: number;
  extraStopsOver2km?: number;
  specialRequests: string;
  name: string;
  phone: string;
  countryCode: string;
  email: string;
}

interface BookingModalOptions {
  initialStep?: number;
  serviceType?: string;
  vehicleId?: number;
  serviceId?: number;
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
  vehicles: VehicleCard[];
  services: ServiceItem[];
  addOns: AddOnItem[];
  quote: QuoteResponse | null;
  isQuoting: boolean;
  quoteError: string | null;
  isCheckingOut: boolean;
  checkoutError: string | null;
  openModal: (options?: BookingModalOptions) => void;
  closeModal: () => void;
  setStep: (step: number) => void;
  updateBookingData: (data: Partial<BookingData>) => void;
  resetBooking: () => void;
  calculateTotal: () => number;
  fetchLiveQuote: () => Promise<QuoteResponse | null>;
  submitLiveCheckout: () => Promise<CheckoutResponse | null>;
}

const defaultBookingData: BookingData = {
  vehicleId: 3,
  serviceId: 1,
  serviceCode: "arrival",
  serviceType: "Airport Transfer",
  pickup: "Singapore Changi Airport (SIN)",
  dropoff: "Marina Bay Sands Hotel",
  passengers: 7,
  luggage: 5,
  meetAndGreet: true,
  durationHours: 3,
  selectedFleet: "7 Seater Maxi Cab",
  selectedFleetSlug: "7-seater",
  baseFare: 70,
  pickupDate: new Date().toISOString().split("T")[0],
  pickupTime: "17:15",
  flightNo: "SQ 321",
  flightNumber: "SQ 321",
  signboardName: "MR. ALEXANDER WRIGHT",
  terminal: "Terminal 3",
  babySeat: false,
  nightTravel: false,
  extraStopsWithin2km: 0,
  extraStopsOver2km: 0,
  specialRequests: "",
  name: "Alexander Wright",
  phone: "91234567",
  countryCode: "+65",
  email: "alexander.wright@example.com",
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>(defaultBookingData);

  // Live Catalog State from API
  const [vehicles, setVehicles] = useState<VehicleCard[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [addOns, setAddOns] = useState<AddOnItem[]>([]);

  // Live Quote & Checkout State
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [isQuoting, setIsQuoting] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Fetch initial catalog data
  useEffect(() => {
    let isMounted = true;
    async function loadCatalog() {
      try {
        const [vehiclesRes, servicesRes, addOnsRes] = await Promise.allSettled([
          getVehicles(),
          getServices(),
          getAddOns(),
        ]);

        if (!isMounted) return;

        if (vehiclesRes.status === "fulfilled" && vehiclesRes.value.data) {
          setVehicles(vehiclesRes.value.data);
        }
        if (servicesRes.status === "fulfilled" && servicesRes.value.services) {
          setServices(servicesRes.value.services);
        }
        if (addOnsRes.status === "fulfilled" && addOnsRes.value.data) {
          setAddOns(addOnsRes.value.data);
        }
      } catch (e) {
        console.warn("Could not connect to live backend catalog, using local fallbacks:", e);
      }
    }
    loadCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  const openModal = (options?: BookingModalOptions) => {
    if (options) {
      setBookingData((prev) => ({
        ...prev,
        serviceType: options.serviceType || prev.serviceType,
        vehicleId: options.vehicleId ?? prev.vehicleId,
        serviceId: options.serviceId ?? prev.serviceId,
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
    setQuote(null);
    setQuoteError(null);
    setCheckoutError(null);
    setStep(1);
  };

  // Helper to build Add-On Selections for API
  const buildAddOnSelections = () => {
    const list: { add_on_id: number; quantity: number }[] = [];

    // Find add_on IDs dynamically or use standard defaults from handoff
    const meetGreetAddOn = addOns.find((a) => a.code === "MEET_GREET");
    const babySeatAddOn = addOns.find((a) => a.code === "BABY_SEAT");
    const nightTravelAddOn = addOns.find((a) => a.code === "NIGHT_TRAVEL");
    const stopWithin2km = addOns.find((a) => a.code === "STOP_WITHIN_2KM");
    const stopOver2km = addOns.find((a) => a.code === "STOP_OVER_2KM");

    if (bookingData.meetAndGreet) {
      list.push({ add_on_id: meetGreetAddOn?.id || 2, quantity: 1 });
    }
    if (bookingData.babySeat) {
      list.push({ add_on_id: babySeatAddOn?.id || 3, quantity: 1 });
    }
    if (bookingData.nightTravel) {
      list.push({ add_on_id: nightTravelAddOn?.id || 1, quantity: 1 });
    }
    if (bookingData.extraStopsWithin2km && bookingData.extraStopsWithin2km > 0) {
      list.push({ add_on_id: stopWithin2km?.id || 4, quantity: bookingData.extraStopsWithin2km });
    }
    if (bookingData.extraStopsOver2km && bookingData.extraStopsOver2km > 0) {
      list.push({ add_on_id: stopOver2km?.id || 5, quantity: bookingData.extraStopsOver2km });
    }

    return list;
  };

  // 8. Calculate live quote via API
  const fetchLiveQuote = async (): Promise<QuoteResponse | null> => {
    setIsQuoting(true);
    setQuoteError(null);

    const isHourly = bookingData.serviceType.toLowerCase().includes("hourly");

    // Dynamic resolution of service ID
    let resolvedServiceId = bookingData.serviceId || 1;
    if (services.length > 0) {
      if (isHourly) {
        const found = services.find((s) => s.code === "hourly" || s.unit === "hour");
        if (found) resolvedServiceId = found.id;
      } else if (bookingData.serviceType.toLowerCase().includes("departure")) {
        const found = services.find((s) => s.code === "departure_transfer");
        if (found) resolvedServiceId = found.id;
      } else {
        const found = services.find((s) => s.code === "arrival" || s.name.toLowerCase().includes("arrival"));
        if (found) resolvedServiceId = found.id;
      }
    }

    const payload: QuoteRequest = {
      vehicle_id: bookingData.vehicleId || 3,
      service_id: resolvedServiceId,
      pickup: { address: bookingData.pickup || "Singapore Changi Airport" },
      drop: { address: bookingData.dropoff || "Marina Bay Sands" },
      add_ons: buildAddOnSelections(),
      ...(isHourly ? { hours: Math.min(24, Math.max(1, bookingData.durationHours || 3)) } : {}),
    };

    try {
      const response = await calculateQuote(payload);
      setQuote(response);
      return response;
    } catch (err: unknown) {
      const msg = (err as Error).message || "Failed to calculate live quotation";
      setQuoteError(msg);
      console.warn("Quote calculation warning:", msg);
      return null;
    } finally {
      setIsQuoting(false);
    }
  };

  // 9. Submit live booking and redirect to Stripe Checkout
  const submitLiveCheckout = async (): Promise<CheckoutResponse | null> => {
    setIsCheckingOut(true);
    setCheckoutError(null);

    const isHourly = bookingData.serviceType.toLowerCase().includes("hourly");

    let resolvedServiceId = bookingData.serviceId || 1;
    if (services.length > 0) {
      if (isHourly) {
        const found = services.find((s) => s.code === "hourly" || s.unit === "hour");
        if (found) resolvedServiceId = found.id;
      } else if (bookingData.serviceType.toLowerCase().includes("departure")) {
        const found = services.find((s) => s.code === "departure_transfer");
        if (found) resolvedServiceId = found.id;
      } else {
        const found = services.find((s) => s.code === "arrival");
        if (found) resolvedServiceId = found.id;
      }
    }

    // Format phone to E.164 (+ followed by 7-15 digits)
    const cleanCountry = (bookingData.countryCode || "+65").replace(/[^\d+]/g, "");
    const cleanDigits = (bookingData.phone || "88006006").replace(/\D/g, "");
    const formattedPhone = cleanCountry.startsWith("+")
      ? `${cleanCountry}${cleanDigits}`
      : `+${cleanCountry}${cleanDigits}`;

    const payload: CheckoutRequest = {
      customer: {
        name: bookingData.name.trim() || "Customer",
        email: bookingData.email.trim() || "booking@singaporemaxicabs.com.sg",
        phone: formattedPhone,
      },
      vehicle_id: bookingData.vehicleId || 3,
      service_id: resolvedServiceId,
      pickup: { address: bookingData.pickup || "Singapore Changi Airport" },
      drop: { address: bookingData.dropoff || "Marina Bay Sands" },
      add_ons: buildAddOnSelections(),
      payment_method: "STRIPE",
      ...(isHourly ? { hours: Math.min(24, Math.max(1, bookingData.durationHours || 3)) } : {}),
    };

    const idempotencyKey = generateIdempotencyKey();

    try {
      const response = await createBookingCheckout(payload, { idempotencyKey });
      if (response && "stripe_checkout_url" in response && response.stripe_checkout_url) {
        window.location.href = response.stripe_checkout_url;
      }
      return response;
    } catch (err: unknown) {
      const msg = (err as Error).message || "Checkout session could not be created";
      setCheckoutError(msg);
      console.warn("Checkout error:", msg);
      return null;
    } finally {
      setIsCheckingOut(false);
    }
  };

  const calculateTotal = () => {
    // If we have a live quote from the backend API, return authoritative total amount
    if (quote && quote.quote_status === "AVAILABLE" && quote.quote) {
      return quote.quote.total_amount;
    }

    let total = bookingData.baseFare;
    const isHourly = bookingData.serviceType.toLowerCase().includes("hourly");
    const isAirport =
      bookingData.serviceType.toLowerCase().includes("airport") ||
      bookingData.serviceType.toLowerCase().includes("arrival");

    if (isHourly) {
      const hours = bookingData.durationHours || 3;
      const ratePerHour =
        bookingData.baseFare >= 50 && bookingData.baseFare <= 120
          ? bookingData.baseFare
          : 65;
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
        vehicles,
        services,
        addOns,
        quote,
        isQuoting,
        quoteError,
        isCheckingOut,
        checkoutError,
        openModal,
        closeModal,
        setStep,
        updateBookingData,
        resetBooking,
        calculateTotal,
        fetchLiveQuote,
        submitLiveCheckout,
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
