import type { Metadata } from "next";
import Navbar from "@/Components/Header/Navbar";
import FleetsPageSectionWise from "@/Components/Fleet/FleetsPageSectionWise";
import Footer from "@/Components/Footer/Footer";

export const metadata: Metadata = {
  title: "Our Fleet | Singapore Maxicabs - Executive Sedans, Maxi Cabs & Minibuses",
  description:
    "Explore Singapore Maxicabs' luxury fleet section-wise: Executive Mercedes E & S-Class, Toyota Vellfire 6, 7 & 9-Seaters, and 13-Seater Minibuses.",
};

export default function FleetsPage() {
  return (
    <main className="min-h-screen flex flex-col w-full selection:bg-[#C6A45A] selection:text-[#071E3B]">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Section-wise Fleets Layout matching fleetdeign.html */}
      <FleetsPageSectionWise />

      {/* 3. Footer */}
      <Footer />
    </main>
  );
}
