import React from "react";
import occasionsData from "@/data/occasions.json";
import { Building2, HeartPulse, Sparkles, Plane } from "lucide-react";

export default function OccasionsSection() {
  const icons = [
    <Building2 key="bld" className="w-5 h-5 text-[#C6A45A]" />,
    <HeartPulse key="pulse" className="w-5 h-5 text-[#C6A45A]" />,
    <Sparkles key="spark" className="w-5 h-5 text-[#C6A45A]" />,
    <Plane key="plane" className="w-5 h-5 text-[#C6A45A]" />,
  ];

  return (
    <section id="about" className="py-16 sm:py-20 px-6 sm:px-12 bg-white">
      <div className="max-w-[1360px] mx-auto rounded-[24px] overflow-hidden bg-[#071E3B] text-white p-8 sm:p-14 relative shadow-2xl">
        {/* Subtle Ambient Backing */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071E3B] via-[#0B2A4A] to-[#071E3B] opacity-95 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C6A45A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-3 max-w-3xl">
            <span className="text-xs font-bold text-[#C6A45A] uppercase tracking-[1px]">
              {occasionsData.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Premium Rides for Every
              <br />
              Important Occasion
            </h2>
            <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed mt-1">
              {occasionsData.subtitle}
            </p>
          </div>

          {/* 4 Cards Grid with rgba(255, 255, 255, 0.20) and border */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {occasionsData.cards.map((card, idx) => (
              <div
                key={card.id}
                className="p-6 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/20 hover:bg-white/[0.12] transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  {icons[idx]}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-bold text-white tracking-wide uppercase">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
