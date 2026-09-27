import type { Metadata, Viewport } from "next";
import { manrope, inter, playfair } from "@/fonts";
import "./globals.css";
import { BookingModalProvider } from "@/context/BookingContext";
import BookingModal from "@/Components/Booking/BookingModal";
import MobileQuickBar from "@/Components/Mobile/MobileQuickBar";

export const metadata: Metadata = {
  title: "Singapore Maxicabs | Premium Maxi Cab & Luxury Chauffeur Service",
  description:
    "Singapore's premium maxi cab service. Comfortable rides, fixed flat-rate fares, airport transfers, corporate transport, and wheelchair mobility.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#071E3B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-white text-[#071E3B] pb-16 md:pb-0">
        <BookingModalProvider>
          {children}
          <BookingModal />
          <MobileQuickBar />
        </BookingModalProvider>
      </body>
    </html>
  );
}

