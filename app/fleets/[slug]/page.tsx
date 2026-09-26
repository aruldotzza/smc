import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/Components/Header/Navbar";
import FleetDetailTemplate from "@/Components/Fleet/FleetDetailTemplate";
import Footer from "@/Components/Footer/Footer";
import fleetData from "@/data/fleet.json";

interface FleetPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return fleetData.vehicles.map((v) => ({
    slug: v.slug || v.id,
  }));
}

export async function generateMetadata({ params }: FleetPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = fleetData.vehicles.find((v) => (v.slug || v.id) === slug);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | Singapore Maxicabs",
    };
  }

  return {
    title: `${vehicle.name} | Singapore Maxicabs Rates & Specs`,
    description: vehicle.heroDescription || vehicle.description,
  };
}

export default async function FleetDetailPage({ params }: FleetPageProps) {
  const { slug } = await params;
  const vehicle = fleetData.vehicles.find((v) => (v.slug || v.id) === slug);

  if (!vehicle) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col w-full selection:bg-[#C6A45A] selection:text-[#071E3B]">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Reusable Fleet Detail Template */}
      <FleetDetailTemplate vehicle={vehicle as any} />

      {/* 3. Footer */}
      <Footer />
    </main>
  );
}
