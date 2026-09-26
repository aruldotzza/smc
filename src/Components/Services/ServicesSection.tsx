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

export default function ServicesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Plane: <Plane className="w-5 h-5 text-[#C6A45A]" />,
    Briefcase: <Briefcase className="w-5 h-5 text-[#C6A45A]" />,
    Sparkles: <Sparkles className="w-5 h-5 text-[#C6A45A]" />,
    Users: <Users className="w-5 h-5 text-[#C6A45A]" />,
    Clock: <Clock className="w-5 h-5 text-[#C6A45A]" />,
    HeartHandshake: <HeartHandshake className="w-5 h-5 text-[#C6A45A]" />,
  };

  return (
    <section id="services" className="py-20 px-6 sm:px-12 bg-white">
      <div className="max-w-[1360px] mx-auto flex flex-col items-center gap-14">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3 max-w-2xl">
          <span className="text-xs font-bold text-[#C6A45A] uppercase tracking-[1px]">
            {servicesData.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#071E3B] tracking-tight">
            {servicesData.title}
          </h2>
          <p className="text-base sm:text-lg text-[#667085] leading-relaxed">
            {servicesData.subtitle}
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.services.map((item) => (
            <Link
              key={item.id}
              href="#booking"
              className="p-7 rounded-2xl bg-[#F7FAFF] border border-[#E1EAF3] hover:border-[#C6A45A] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-white border border-[#E1EAF3] shadow-xs flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-[#C6A45A]/40 transition-all">
                  {iconMap[item.icon]}
                </div>
                <h3 className="text-lg font-semibold text-[#071E3B] mb-2 group-hover:text-[#C6A45A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-white border border-[#E1EAF3] flex items-center justify-center text-[#071E3B] group-hover:bg-[#C6A45A] group-hover:text-white group-hover:border-[#C6A45A] transition-all">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
