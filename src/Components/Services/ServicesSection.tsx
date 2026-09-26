"use client";

import React from "react";
import servicesData from "@/data/services.json";
import Link from "next/link";
import {
  Plane,
  Briefcase,
  Sparkles,
  Users,
  Clock,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

interface ServicesSectionProps {
  isPage?: boolean;
}

export default function ServicesSection({ isPage = false }: ServicesSectionProps) {
  const iconMap: Record<string, React.ReactNode> = {
    Plane: <Plane className="w-6 h-6 text-[#123F6B]" />,
    Briefcase: <Briefcase className="w-6 h-6 text-[#123F6B]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#123F6B]" />,
    Users: <Users className="w-6 h-6 text-[#123F6B]" />,
    Clock: <Clock className="w-6 h-6 text-[#123F6B]" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-[#123F6B]" />,
  };

  return (
    <section id="services" className="py-16 sm:py-20 px-6 sm:px-12 lg:px-24 bg-white">
      <div className="max-w-[1360px] mx-auto flex flex-col items-center gap-12 sm:gap-14">
        {/* Header (if not already rendered by page hero) */}
        {!isPage && (
          <div className="text-center flex flex-col items-center gap-3 max-w-3xl">
            <span className="text-xs font-bold text-[#C6A45A] uppercase tracking-[1px] font-manrope">
              {servicesData.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071E3B] tracking-tight font-manrope">
              {servicesData.title}
            </h2>
            <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
              {servicesData.subtitle}
            </p>
          </div>
        )}

        {/* 6 Grid Cards matching servicepagedesign.html */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {servicesData.services.map((item) => (
            <Link
              key={item.id}
              href={`/services/${item.slug || item.id}`}
              className="p-7 sm:p-8 rounded-2xl bg-white border border-[#E9ECEF] hover:border-[#C6A45A] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex flex-col gap-5">
                {/* Icon & Title */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EEF5FB] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {iconMap[item.icon]}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-xl font-bold text-[#071E3B] group-hover:text-[#C6A45A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#667085] leading-relaxed">
                      {item.shortDescription || item.heroDescription}
                    </p>
                  </div>
                </div>

                {/* Pill Badges */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full bg-white border border-[#E9ECEF] text-xs font-medium text-[#5F6B7A]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Learn More link footer */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-end gap-1 text-sm font-semibold text-[#071E3B] group-hover:text-[#C6A45A] transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
