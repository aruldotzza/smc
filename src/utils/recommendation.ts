import { VehicleCard } from "@/services/api";
import fleetData from "@/data/fleet.json";

export interface RecommendedFleetResult {
  vehicleId: number;
  selectedFleet: string;
  selectedFleetSlug: string;
  baseFare: number;
}

export function getRecommendedFleet(
  passengers: number,
  luggage: number,
  serviceType: string = "Airport Transfer",
  liveVehicles?: VehicleCard[]
): RecommendedFleetResult {
  const isAirport = serviceType.toLowerCase().includes("airport");
  const isHourly = serviceType.toLowerCase().includes("hourly");

  // If live backend catalog is available
  if (liveVehicles && liveVehicles.length > 0) {
    // Filter matching vehicles that fit both pax & luggage
    const suitable = liveVehicles.filter(
      (v) => (v.passengerCapacity ?? 7) >= passengers && (v.luggageCapacity ?? 5) >= luggage
    );

    // Sort by capacity ascending to get the most optimal size
    suitable.sort((a, b) => (a.passengerCapacity ?? 7) - (b.passengerCapacity ?? 7));

    const chosen = suitable[0] || liveVehicles[liveVehicles.length - 1];
    if (chosen) {
      const slug =
        chosen.passengerCapacity === 6
          ? "6-seater"
          : chosen.passengerCapacity === 7
          ? "7-seater"
          : chosen.passengerCapacity === 9
          ? "9-seater"
          : chosen.passengerCapacity === 13
          ? "13-seater"
          : `vehicle-${chosen.id}`;

      let fare = 70;
      if (isAirport) {
        fare = chosen.prices?.arrival?.amount || chosen.prices?.departure_transfer?.amount || 75;
      } else if (isHourly) {
        fare = chosen.prices?.hourly?.amount || 65;
      } else {
        fare = chosen.prices?.departure_transfer?.amount || 65;
      }

      return {
        vehicleId: chosen.id,
        selectedFleet: chosen.name,
        selectedFleetSlug: slug,
        baseFare: fare,
      };
    }
  }

  // Local rule-based recommendation fallback matching fleet.json
  if (passengers <= 6 && luggage <= 4) {
    return {
      vehicleId: 1,
      selectedFleet: "6 Seater Maxi Cab",
      selectedFleetSlug: "6-seater",
      baseFare: isAirport ? 70 : isHourly ? 60 : 65,
    };
  } else if (passengers <= 7 && luggage <= 5) {
    return {
      vehicleId: 3,
      selectedFleet: "7 Seater Maxi Cab",
      selectedFleetSlug: "7-seater",
      baseFare: isAirport ? 75 : isHourly ? 65 : 70,
    };
  } else if (passengers <= 9 && luggage <= 6) {
    return {
      vehicleId: 4,
      selectedFleet: "9 Seater Maxi Cab",
      selectedFleetSlug: "9-seater",
      baseFare: isAirport ? 80 : isHourly ? 70 : 75,
    };
  } else {
    return {
      vehicleId: 5,
      selectedFleet: "13 Seater Minibus",
      selectedFleetSlug: "13-seater",
      baseFare: isAirport ? 85 : isHourly ? 75 : 80,
    };
  }
}
