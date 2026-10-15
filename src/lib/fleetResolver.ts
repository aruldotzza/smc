import fleetData from "@/data/fleet.json";
import { VehicleDetail } from "@/Components/Fleet/FleetDetailTemplate";
import { VehicleCard } from "@/types/api";

/**
 * Fetch all vehicles directly from the live API with quick timeout and caching
 */
export async function fetchLiveVehicles(): Promise<VehicleCard[]> {
  try {
    const res = await fetch("https://api.singaporemaxicabs.com.sg/api/vehicles", {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.warn("Could not fetch live vehicles from API, using static fallbacks:", err);
    return [];
  }
}

/**
 * Resolve a vehicle by slug, ID, or name, merging live API data with static fallbacks
 */
export async function resolveVehicle(rawSlug: string): Promise<VehicleDetail | null> {
  const slug = decodeURIComponent(rawSlug).toLowerCase().trim();
  const apiVehicles = await fetchLiveVehicles();

  // 1. Match API vehicle
  const apiMatch = apiVehicles.find((v) => {
    const vName = v.name.toLowerCase();
    const vIdStr = v.id.toString();
    const vNameSlug = vName.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    if (vIdStr === slug || `vehicle-${vIdStr}` === slug || vNameSlug === slug) {
      return true;
    }

    if (
      slug === "6-seater" &&
      (v.passengerCapacity === 6 || v.id === 3 || vName.includes("alphard") || vName.includes("6 seater"))
    ) {
      return true;
    }
    if (
      slug === "7-seater" &&
      ((v.passengerCapacity === 7 && !vName.includes("wheelchair")) || v.id === 4 || vName.includes("vito"))
    ) {
      return true;
    }
    if (
      slug === "9-seater" &&
      ((v.passengerCapacity === 9 && !vName.includes("wheelchair")) || v.id === 12)
    ) {
      return true;
    }
    if (
      slug === "13-seater" &&
      ((v.passengerCapacity === 13 && !vName.includes("vip")) || v.id === 6 || vName.includes("hiace"))
    ) {
      return true;
    }
    if (
      slug === "vip-lounge" &&
      (vName.includes("vip") || vName.includes("v-class") || v.id === 5 || v.id === 7)
    ) {
      return true;
    }
    if (slug === "mercedes-e-class" && (vName.includes("e class") || v.id === 1)) {
      return true;
    }
    if (slug === "mercedes-s-class" && (vName.includes("s class") || v.id === 2)) {
      return true;
    }
    if (slug === "wheelchair-cab" && (vName.includes("wheelchair") || v.id === 8 || v.id === 11)) {
      return true;
    }
    if (slug === "23-seater-coach" && (v.passengerCapacity === 23 || v.id === 9)) {
      return true;
    }
    if (slug === "40-seater-coach" && (v.passengerCapacity === 40 || v.id === 10)) {
      return true;
    }

    return false;
  });

  // 2. Match static vehicle from fleetData.vehicles
  const staticMatch = fleetData.vehicles.find((v) => {
    const sId = v.id.toLowerCase();
    const sSlug = (v.slug || v.id).toLowerCase();
    if (sId === slug || sSlug === slug) return true;
    if (apiMatch) {
      if (v.id === `vehicle-${apiMatch.id}`) return true;
      if (apiMatch.passengerCapacity && v.paxCount === apiMatch.passengerCapacity) {
        // Prevent wheelchair vs regular mismatch
        const isApiWheelchair = apiMatch.name.toLowerCase().includes("wheelchair");
        const isStaticWheelchair = v.id.includes("wheelchair");
        if (isApiWheelchair === isStaticWheelchair) return true;
      }
    }
    return false;
  });

  // If neither API nor static match exists, vehicle is not found
  if (!apiMatch && !staticMatch) {
    return null;
  }

  // 3. Extract pricing from API or fallback to static
  const departureAmount = apiMatch?.prices?.departure_transfer?.amount;
  const arrivalAmount = apiMatch?.prices?.arrival?.amount;
  const hourlyRate = apiMatch?.prices?.hourly?.amount;
  const hourly3h =
    apiMatch?.prices?.hourly?.threeHourAmount ?? (hourlyRate ? hourlyRate * 3 : undefined);
  const hourly8h =
    apiMatch?.prices?.hourly?.eightHourAmount ?? (hourlyRate ? hourlyRate * 8 : undefined);

  const basePriceNum =
    departureAmount ||
    arrivalAmount ||
    (staticMatch?.price ? parseInt(staticMatch.price.replace(/[^0-9]/g, ""), 10) : 65);

  const priceStr = `$${basePriceNum}`;

  const pointToPointStr = departureAmount
    ? `$${departureAmount} SGD`
    : arrivalAmount
    ? `$${arrivalAmount} SGD`
    : staticMatch?.pointToPoint || `$${basePriceNum} SGD`;

  const meetAndGreetStr = arrivalAmount
    ? `$${arrivalAmount} SGD`
    : departureAmount
    ? `$${departureAmount + 10} SGD`
    : staticMatch?.meetAndGreet || `$${basePriceNum + 10} SGD`;

  const charter3hStr = hourly3h
    ? `$${hourly3h} SGD`
    : staticMatch?.charter3h || "$180 SGD";

  const charter8hStr = hourly8h
    ? `$${hourly8h} SGD`
    : staticMatch?.charter8h || "$480 SGD";

  // Passenger and luggage counts from API first, fallback to static
  const paxStr =
    apiMatch?.passengerCapacity != null
      ? `${apiMatch.passengerCapacity} Pax`
      : staticMatch?.pax || "7 Pax";

  const bagsStr =
    apiMatch?.luggageCapacity != null
      ? `${apiMatch.luggageCapacity} Bags`
      : staticMatch?.bags || "4–5 Bags";

  // Vehicle image
  let imageSrc = staticMatch?.image || "/images/Cab.png";
  if (apiMatch?.imageUrl) {
    imageSrc = apiMatch.imageUrl.startsWith("http")
      ? apiMatch.imageUrl
      : `https://api.singaporemaxicabs.com.sg${apiMatch.imageUrl}`;
  }

  // Vehicle model display
  const modelStr =
    staticMatch?.model ||
    apiMatch?.vehicleType ||
    staticMatch?.vehicleType ||
    apiMatch?.name ||
    "Executive Maxi Cab";

  const vehicleTypeStr =
    apiMatch?.vehicleType ||
    staticMatch?.vehicleType ||
    staticMatch?.model ||
    apiMatch?.name ||
    "Toyota Vellfire / Alphard";

  // Display Name: prefer clean static name if matching category, else API name
  const displayName = staticMatch?.name || apiMatch?.name || "Singapore Maxi Cab";

  return {
    id: apiMatch ? String(apiMatch.id) : staticMatch?.id || slug,
    slug,
    apiVehicleId: apiMatch?.id,
    name: displayName,
    model: modelStr,
    price: priceStr,
    currency: apiMatch?.currency || staticMatch?.currency || "SGD",
    description:
      apiMatch?.description ||
      staticMatch?.description ||
      "Comfortable luxury maxi cab with air-conditioned cabin and professional chauffeur.",
    heroDescription:
      staticMatch?.heroDescription ||
      apiMatch?.description ||
      staticMatch?.description ||
      "The premier choice for corporate transfers, family travel, and reliable point-to-point journeys across Singapore.",
    pax: paxStr,
    bags: bagsStr,
    pointToPoint: pointToPointStr,
    meetAndGreet: meetAndGreetStr,
    charter3h: charter3hStr,
    charter8h: charter8hStr,
    vehicleType: vehicleTypeStr,
    inclusions: staticMatch?.inclusions || [
      "Fixed flat-rate pricing",
      "Licensed & professional chauffeur",
      "Flight tracking for airport pickups",
      "Air-conditioned, clean interior",
      "Child seat available on request",
      "WhatsApp driver contact",
    ],
    image: imageSrc,
    isApiConnected: Boolean(apiMatch),
  };
}
