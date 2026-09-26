import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/Components/Header/Navbar";
import ServiceDetailTemplate from "@/Components/Services/ServiceDetailTemplate";
import Footer from "@/Components/Footer/Footer";
import servicesData from "@/data/services.json";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return servicesData.services.map((s) => ({
    slug: s.slug || s.id,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.services.find((s) => (s.slug || s.id) === slug);

  if (!service) {
    return {
      title: "Service Not Found | Singapore Maxicabs",
    };
  }

  return {
    title: `${service.title} | Singapore Maxicabs Flat-Rate Booking`,
    description: service.heroDescription || service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData.services.find((s) => (s.slug || s.id) === slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col w-full selection:bg-[#C6A45A] selection:text-[#071E3B]">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Reusable Service Detail Template */}
      <ServiceDetailTemplate service={service as any} />

      {/* 3. Footer */}
      <Footer />
    </main>
  );
}
