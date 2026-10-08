import { NextRequest, NextResponse } from "next/server";
import { GooglePlacesAutocompleteResponse, GooglePlaceSuggestion } from "@/types/api";

// Fallback curated Singapore places for development, testing, or when API key is not yet configured
const FALLBACK_SINGAPORE_PLACES = [
  {
    name: "Singapore Changi Airport (SIN)",
    secondary: "Airport Boulevard, Singapore",
    placeId: "fallback_changi_all",
    types: ["airport", "establishment", "point_of_interest"],
  },
  {
    name: "Changi Airport Terminal 1",
    secondary: "80 Airport Boulevard, Singapore 819642",
    placeId: "fallback_changi_t1",
    types: ["airport", "transit_station"],
  },
  {
    name: "Changi Airport Terminal 2",
    secondary: "60 Airport Boulevard, Singapore 819643",
    placeId: "fallback_changi_t2",
    types: ["airport", "transit_station"],
  },
  {
    name: "Changi Airport Terminal 3",
    secondary: "65 Airport Boulevard, Singapore 819663",
    placeId: "fallback_changi_t3",
    types: ["airport", "transit_station"],
  },
  {
    name: "Changi Airport Terminal 4",
    secondary: "10 Airport Boulevard, Singapore 819665",
    placeId: "fallback_changi_t4",
    types: ["airport", "transit_station"],
  },
  {
    name: "Jewel Changi Airport",
    secondary: "78 Airport Boulevard, Singapore 819666",
    placeId: "fallback_jewel_changi",
    types: ["shopping_mall", "tourist_attraction", "establishment"],
  },
  {
    name: "Marina Bay Sands Hotel",
    secondary: "10 Bayfront Avenue, Singapore 018956",
    placeId: "fallback_mbs",
    types: ["lodging", "tourist_attraction", "establishment"],
  },
  {
    name: "Marina Bay Cruise Centre Singapore (MBCCS)",
    secondary: "61 Marina Coastal Drive, Singapore 018947",
    placeId: "fallback_mbccs",
    types: ["transit_station", "establishment"],
  },
  {
    name: "Singapore Cruise Centre (HarbourFront)",
    secondary: "1 Maritime Square, Singapore 099253",
    placeId: "fallback_scc_harbourfront",
    types: ["transit_station", "establishment"],
  },
  {
    name: "Orchard Road Shopping District",
    secondary: "Orchard Road, Singapore",
    placeId: "fallback_orchard_road",
    types: ["shopping_mall", "point_of_interest"],
  },
  {
    name: "Resorts World Sentosa / Universal Studios Singapore",
    secondary: "8 Sentosa Gateway, Sentosa Island, Singapore 098269",
    placeId: "fallback_rws_uss",
    types: ["amusement_park", "tourist_attraction", "lodging"],
  },
  {
    name: "Sentosa Island (Beach & Attractions)",
    secondary: "Sentosa, Singapore",
    placeId: "fallback_sentosa_island",
    types: ["tourist_attraction", "point_of_interest"],
  },
  {
    name: "Raffles Hotel Singapore",
    secondary: "1 Beach Road, Singapore 189673",
    placeId: "fallback_raffles_hotel",
    types: ["lodging", "historical_landmark"],
  },
  {
    name: "Raffles Place Financial District (CBD)",
    secondary: "Raffles Place, Downtown Core, Singapore 048616",
    placeId: "fallback_raffles_place",
    types: ["finance", "transit_station"],
  },
  {
    name: "Gardens by the Bay",
    secondary: "18 Marina Gardens Drive, Singapore 018953",
    placeId: "fallback_gardens_by_the_bay",
    types: ["park", "tourist_attraction"],
  },
  {
    name: "Mandai Wildlife Reserve / Singapore Zoo",
    secondary: "80 Mandai Lake Road, Singapore 729826",
    placeId: "fallback_singapore_zoo",
    types: ["zoo", "tourist_attraction"],
  },
  {
    name: "Clarke Quay Riverside",
    secondary: "3 River Valley Road, Singapore 179024",
    placeId: "fallback_clarke_quay",
    types: ["food", "night_club", "tourist_attraction"],
  },
  {
    name: "Suntec Singapore Convention & Exhibition Centre",
    secondary: "1 Raffles Boulevard, Singapore 039593",
    placeId: "fallback_suntec_city",
    types: ["convention_center", "establishment"],
  },
  {
    name: "The Fullerton Hotel Singapore",
    secondary: "1 Fullerton Square, Singapore 049178",
    placeId: "fallback_fullerton_hotel",
    types: ["lodging", "establishment"],
  },
  {
    name: "Pan Pacific Singapore",
    secondary: "7 Raffles Boulevard, Marina Square, Singapore 039595",
    placeId: "fallback_pan_pacific",
    types: ["lodging", "establishment"],
  },
  {
    name: "Hotel Grand Pacific Singapore",
    secondary: "101 Victoria Street, Singapore 188018",
    placeId: "fallback_hotel_grand_pacific",
    types: ["lodging", "establishment"],
  },
  {
    name: "Woodlands Train Checkpoint / Customs",
    secondary: "Woodlands Crossing, Singapore 738404",
    placeId: "fallback_woodlands_checkpoint",
    types: ["transit_station", "establishment"],
  },
  {
    name: "Tuas Checkpoint",
    secondary: "Tuas West Drive, Singapore 638404",
    placeId: "fallback_tuas_checkpoint",
    types: ["transit_station", "establishment"],
  },
];

function getFallbackSuggestions(input: string): GooglePlacesAutocompleteResponse {
  const query = (input || "").toLowerCase().trim();
  const matched = query
    ? FALLBACK_SINGAPORE_PLACES.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.secondary.toLowerCase().includes(query)
      )
    : FALLBACK_SINGAPORE_PLACES.slice(0, 8);

  const suggestions: GooglePlaceSuggestion[] = matched.map((item) => ({
    placePrediction: {
      place: `places/${item.placeId}`,
      placeId: item.placeId,
      text: {
        text: `${item.name}, ${item.secondary}`,
      },
      structuredFormat: {
        mainText: {
          text: item.name,
        },
        secondaryText: {
          text: item.secondary,
        },
      },
      types: item.types,
    },
  }));

  return { suggestions };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const input = typeof body.input === "string" ? body.input.trim() : "";
    const includedRegionCodes = Array.isArray(body.includedRegionCodes)
      ? body.includedRegionCodes
      : ["sg"];

    if (!input) {
      return NextResponse.json(getFallbackSuggestions(""));
    }

    const apiKey =
      process.env.GOOGLE_PLACES_API_KEY ||
      process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ||
      "";

    // If API key is provided, call Google Places Autocomplete API
    if (apiKey && apiKey.trim() !== "") {
      try {
        const googleRes = await fetch(
          "https://places.googleapis.com/v1/places:autocomplete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": apiKey.trim(),
            },
            body: JSON.stringify({
              input,
              includedRegionCodes,
            }),
            cache: "no-store",
          }
        );

        if (googleRes.ok) {
          const data: GooglePlacesAutocompleteResponse = await googleRes.json();
          return NextResponse.json(data);
        }

        const errorText = await googleRes.text();
        console.warn(
          `Google Places API call returned ${googleRes.status}: ${errorText}. Falling back to curated Singapore landmark dataset.`
        );
      } catch (googleErr) {
        console.warn("Google Places fetch exception:", googleErr);
      }
    }

    // Graceful fallback to curated dataset
    return NextResponse.json(getFallbackSuggestions(input));
  } catch (err: unknown) {
    console.error("Autocomplete handler error:", err);
    return NextResponse.json(
      {
        error: {
          message: (err as Error).message || "Internal Autocomplete Error",
          status: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input") || "";
  const region = searchParams.get("region") || "sg";

  const apiKey =
    process.env.GOOGLE_PLACES_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ||
    "";

  if (apiKey && apiKey.trim() !== "" && input) {
    try {
      const googleRes = await fetch(
        "https://places.googleapis.com/v1/places:autocomplete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey.trim(),
          },
          body: JSON.stringify({
            input,
            includedRegionCodes: [region],
          }),
          cache: "no-store",
        }
      );

      if (googleRes.ok) {
        const data: GooglePlacesAutocompleteResponse = await googleRes.json();
        return NextResponse.json(data);
      }
    } catch (e) {
      console.warn("Google Places GET error, returning fallback:", e);
    }
  }

  return NextResponse.json(getFallbackSuggestions(input));
}
