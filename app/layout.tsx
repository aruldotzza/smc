import type { Metadata } from "next";
import { manrope, inter } from "@/fonts";
import "./globals.css";
import { BookingModalProvider } from "@/context/BookingContext";
import BookingModal from "@/Components/Booking/BookingModal";

export const metadata: Metadata = {
  title: "Singapore Maxicabs | Premium Maxi Cab & Luxury Chauffeur Service",
  description:
    "Singapore's premium maxi cab service. Comfortable rides, fixed flat-rate fares, airport transfers, corporate transport, and wheelchair mobility.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-white text-[#071E3B]">
        <BookingModalProvider>
          {children}
          <BookingModal />
        </BookingModalProvider>
      </body>
    </html>
  );
}
